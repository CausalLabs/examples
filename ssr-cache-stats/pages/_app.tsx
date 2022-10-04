import { NextPageContext } from "next";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import {
  qb,
  Session,
  SessionContext,
  SessionJSON,
  useSession,
} from "../causal";
import Feature2 from "../components/Feature2";
import "../styles/globals.css";
import { getOrMakeDeviceId, RequestIdContext } from "../utils";

type MyProps = { sessionJson: SessionJSON; requestId: string };
type MyAppProps = AppProps & MyProps;
type MyAppInitialProps = AppInitialProps & MyProps;

function StatsLogger() {
  const session = useSession();
  const router = useRouter();

  // log out cache misses for SSR
  const logCacheMisses = typeof window == "undefined";
  if (logCacheMisses) {
    if (session == undefined) console.log("No session for Stats Logger");
    else {
      const impressionStats = session.getImpressionStats();
      if (impressionStats.cacheMisses.length > 0) {
        console.log(
          "WARNING!: The following features were not cached: " +
            JSON.stringify(impressionStats.cacheMisses) +
            `. Please make sure your page (route pathname = ${router.pathname}) ` +
            "is requesting them in getInitialProps"
        );
      }
      if (impressionStats.cacheNoOps.length > 0) {
        console.log(
          "WARNING!: The following features were spuriously cached: " +
            JSON.stringify(impressionStats.cacheNoOps) +
            `. Please make sure your page (route pathname = ${router.pathname}) ` +
            "is not needlessly requesting them in getInitialProps"
        );
      }
    }
  }
  return null;
}

function MyApp({ Component, pageProps, sessionJson, requestId }: MyAppProps) {
  const session = Session.fromJSON(sessionJson);
  session.clearImpressionStats();

  const result = (
    <SessionContext.Provider value={session}>
      <RequestIdContext.Provider value={requestId}>
        <Feature2>
          <Component {...pageProps} />
        </Feature2>
        <StatsLogger />
      </RequestIdContext.Provider>
    </SessionContext.Provider>
  );

  return result;
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<MyAppInitialProps> => {
  const debugLog = (msg: string) => {
    // console.log(msg);
  };

  debugLog("getInitialProps");

  const deviceId = getOrMakeDeviceId(context.ctx);
  debugLog(`deviceId = ${deviceId}`);

  // In this example, we are using a new impressionId for every request
  //
  // In general, we recommend that you use explicit impression ids
  // to control when impressions are registered.
  //
  // If you don't use explicit impression ids, impression lifecycles will be
  // tied to react component lifecycles.
  // This may, or may not be, what you want
  //
  // For example, in this example app, Feature2 would never get
  // a new impression without explicit impression ids because
  // it is never unmounted.
  const requestId = uuidv4();
  debugLog(`requestId = ${requestId}`);

  const session = Session.fromDeviceId(deviceId, context.ctx.req);
  await session.requestImpression(
    qb().getFeature2({ exampleArg: "123" }),
    requestId
  );

  const appProps = await App.getInitialProps({
    ...context,
    ctx: {
      ...context.ctx,
      session,
    } as NextPageContext & {
      session: Session;
    },
  });

  const ret = {
    ...appProps,
    sessionJson: session.toJSON(),
    requestId,
  };
  return ret;
};

export default MyApp;
