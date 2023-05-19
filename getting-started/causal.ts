// This is a FeatureDL automatically generated file. DO NOT DIRECTLY EDIT, your changes will not persist.
import fetch from "cross-fetch";
import {
  useEffect,
  useReducer,
  useRef,
  useContext,
  createContext,
} from "react";

class FeatureBase {
  // featureName FeatureBasewill always be set
  // we don't want to set them in the constructor
  // This is to save on lines of geenrated code
  // It is set when the impresson is created
  featureName?: string;

  readonly _: {
    impressionId?: string;
    impression?: ImpressionImpl;
  } = {};
}

///////////////////////////////////////////////////////////////////////////////
//#region  parameterized

/* eslint-disable */

export interface ImpressionTime {
   impressionId: string;
   impressionTime: number;
}


/** 
* Wraps a rating box that we can put on various product pages
* to collect ratings from our users
*/
export class RatingBox extends FeatureBase {
    /** 
    * The product that we are collecting ratings for
    */
    readonly product: string = "";
    /** 
     * The text next to the stars that prompts the visitor to rate the product
     *
     *  Control: "Rate this product!"
     */
    readonly callToAction: string = "Rate this product!";

    /**
     * Occurs each time a rating is collected
    */
    signalRating( { stars } 
        : {  stars : number  } ) : void {
            signalInstance(this, "Rating", arguments[0]);
    }
    /** 
     * Occurs each time a rating is collected
     */
    static signalRating( sessionKeys: SessionKeys | Session, impressionId : string,  { stars } 
        : {  stars : number  } ) : void
 {
        signalStatic("RatingBox", "Rating", [...arguments]);
    }
  }

/** 
* An empty feature to use only as a kill switch
*/
export class ProductInfo extends FeatureBase {

  }

/** 
* Another feature just for demonstration purposes
*/
export class Feature2 extends FeatureBase {
    /** 
    * Example args
    */
    readonly exampleArg: string = "";
    /** 
     * Example output
     *
     *  Control: "Example output"
     */
    readonly exampleOutput: string = "Example output";

    /**
     * Example event
    */
    signalExampleEvent( { data } 
        : {  data : string  } ) : void {
            signalInstance(this, "ExampleEvent", arguments[0]);
    }
    /** 
     * Example event
     */
    static signalExampleEvent( sessionKeys: SessionKeys | Session, impressionId : string,  { data } 
        : {  data : string  } ) : void
 {
        signalStatic("Feature2", "ExampleEvent", [...arguments]);
    }
  }


/* eslint-enable */

/** @deprecated */
export const allFeatureTypes = {
    RatingBox,
    ProductInfo,
    Feature2,

    };


/**
 * The arguments defined in the args section of the FDL schema
 */
export type SessionArgs = {
   deviceId: string;
};

/* eslint-disable */

class SessionEvents {
  readonly _: { sessionKeys: SessionKeys };

  constructor(sessionKeys: SessionKeys) {
    this._ = { sessionKeys };
  }
}

/* eslint-enable */

function sessionKeys( s : Partial<SessionArgs> ) {
  return {
    deviceId : s?.deviceId,
  };
}

/**
 * @returns a map of X-Causal headers, one for each session key
 */
function getCausalHeaders( s : Partial<SessionArgs>): Record<string, string> {
    return {
        "X-Causal-deviceId": s?.deviceId ?? "null",
    };
}

function sseUrl( s : Partial<SessionArgs> ) {
  let sseUrl = network.getBaseUrl().replace(
        /\/?$/,
        "/sse?id=");
  if ( s.deviceId != undefined)
      sseUrl += s.deviceId + "+";
  return sseUrl;
}

/* eslint-disable */

/** 
* Features to query, along with their arguments.
*
* A query is created by using either [[queryBuilder]] or [[createQuery]].
*
* A query is executed by calling either [[requestImpression]] or [[useImpression]].
*
*/
class Query<T extends FeatureNames>{
    /** 
    * Wraps a rating box that we can put on various product pages
    * to collect ratings from our users
    */
    getRatingBox( { product } 
      : {  product : string  } )
        : Query<T | "RatingBox"> {
        return this;
    }
    /** 
    * An empty feature to use only as a kill switch
    */
    getProductInfo()
        : Query<T | "ProductInfo"> {
        return this;
    }
    /** 
    * Another feature just for demonstration purposes
    */
    getFeature2( { exampleArg } 
      : {  exampleArg : string  } )
        : Query<T | "Feature2"> {
        return this;
    }


    readonly _: {
        _?: T; // T must be in the type for inference to work correctly
        wireArgs: Record<string, unknown>;
    } = {
        wireArgs: {},
    };

    constructor() {
        bindAllMethods(this);
    }
}

/* eslint-enable */

/**
 * The state of the feature flags when the FDL was compiled to this file.
 */
export const defaultFlags: Flags<FeatureNames> = {
    RatingBox: true,
    ProductInfo: true,
    Feature2: true,

};

export class Session extends SessionEvents {

  static fromDeviceId( deviceId: string, req?: IncomingMessage): Session {
      const sessionArgs: Partial<SessionArgs> = { deviceId:deviceId };
      return new Session(sessionArgs as SessionArgs, req);
  }

//#endregion
///////////////////////////////////////////////////////////////////////////////

  /** @internal */
  _: {
    args: Partial<SessionArgs>;
    sessionKeys: SessionKeys;
    implicitArgs: ImplicitArgs;
    cache: _Cache;
    originator: "ssr" | "csr";
    fromTransferredJson: boolean;
    hydrating: boolean;
    hydrationKeys: {
      featureName: string;
      args: unknown;
    }[];

    // this track the number of times useImpression() returned with loading == true
    // it's used a part of testing, to ensure we are not doing this incorrectly
    loadingImpressionsCount: number;

    // iserver communication information
    commSnapshot: CommSnapshot;
  };

  constructor(args: SessionArgs, req?: IncomingMessage) {
    super(sessionKeys(args));

    const _backingStore = makeBackingStore(
      misc.ssr ? cacheOptions.ssrCacheType : cacheOptions.csrCacheType,
      cacheOptions.makeCustomStore
    );
    const _cache = new _Cache(args, _backingStore, cacheOptions);

    this._ = {
      args,
      cache: _cache,
      implicitArgs: {},
      originator: misc.ssr ? "ssr" : "csr",
      hydrating: false,
      hydrationKeys: [],
      loadingImpressionsCount: 0,
      commSnapshot: {
        fetches: 0,
        featuresReceived: 0,
        featuresRequested: 0,
        errorsReceived: 0,
        errorsAndWarnings: [],
      },
      sessionKeys: sessionKeys(args),
      fromTransferredJson: false,
    };

    if (req) this.addIncomingMessageArgs(req);
    bindAllMethods(this);
  }

  args(): SessionArgs {
    return { ...this._.args } as SessionArgs;
  }

  /**
   * Mark the session as still active
   */
  keepAlive(): boolean {
    // rate limit the keep alives to no more than 1 per second
    if (Date.now() - Session.lastKeepAlive > 1000) {
      Session.lastKeepAlive = Date.now();
      network.sendBeacon(getCausalHeaders(sessionKeys(this._.args)), {
        id: this._.args,
      });
      return true;
    }
    return false;
  }
  static lastKeepAlive = 0;

  /**
   * The currently active experiment variants. This is intended for reporting information to other
   * systems. It should *not* be used as an input for any display or logic on your site.
   *
   * These are updated after a call to requestImpression, useImpression or useFeature
   * The active variants will not be available until after the first call to one of these methods
   */
  get activeVariants(): ActiveVariant[] {
    if (
      this._.commSnapshot.featuresRequested == 0 &&
      !this._.fromTransferredJson
    ) {
      log.warn(
        "session.activeVariants called before any features were requested"
      );
    }

    return (this._.cache.get(activeVariantsKey) ?? []) as ActiveVariant[];
  }

  /**
   * All the features that have been requested so far. This is intended for reporting information to other
   * systems. It should *not* be used as an input for any display or logic on your site.
   */
  get requestedFeatures(): RequestedFeature[] {
    return (this._.cache.get(requestedFeaturesKey) ?? []) as RequestedFeature[];
  }

  /**
   * Returns true if the call to session constructor [i.e. new Session()] created a new cache
   * This is true iff
   *    - this is the first time creating a session
   *    - the previous session expired
   *    - the session was created with different session args then what was cached
   *    - you are using an ephemeral cache (e.g. in SSR)
   *
   * This call is useful in the browser to determine if you've created a new session
   */
  get constructedNewCache(): boolean {
    return this._.cache.isNew;
  }

  /** Returns information about this sessions communication with the impression server */
  commSnapshot(): CommSnapshot {
    return this._.commSnapshot;
  }

  /**
   * Serializes a session to JSON. Used in conjunction with [[fromJSON]]. Useful to transfer a session across a JSON serialization boundary
   *
   * @returns the serialized JSON
   */
  toJSON(): SessionJSON {
    if (this._.commSnapshot.fetches == 0) {
      log.warn(
        "Session.toJSON() called before a call to requestImpression() or requestCacheFill()"
      );
    }

    const cacheJson: Record<string, string> = {};
    const featureJson: (_RequestStoreEntry & {
      featureName: string;
      args: unknown;
    })[] = [];
    for (const key of this._.cache.backingStore.keys()) {
      if (key.startsWith(nonFeaturePrefix)) {
        const noPrefixKey = key.substring(nonFeaturePrefix.length);
        if (noPrefixKey != cacheInfoKey) {
          const value = this._.cache.backingStore.get(key) as string;
          cacheJson[noPrefixKey] = value;
        }
      } else {
        const featureName = key;
        const featureEntry = this._.cache.backingStore.get(featureName) as
          | FeatureEntry
          | undefined;
        if (featureEntry) {
          for (const [args, _entry] of Object.entries(featureEntry)) {
            const entry = { ..._entry, featureName, args };
            featureJson.push(entry);
          }
        }
      }
    }

    const sessionJson: SessionJSON = {
      sessionArgs: this._.args,
      cacheJson,
      featureJson,
      commSnapshotJson: this.commSnapshot(),
      originator: this._.originator,
      activeVariants: this.activeVariants,
    };

    // the line below removes all undefined attributes
    // some frameworks do not like undefined across serialization boundaries
    // most notably, next.js, see:
    //   https://github.com/vercel/next.js/discussions/11209
    return JSON.parse(JSON.stringify(sessionJson));
  }

  /**
   *
   * YOU PROBABLY WANT TO USE [[useSessionJSON]] AND NOT THIS FUNCTION.
   *  Converts serialized JSON back to a session. Used in conjunction with [[toJSON]].
   *  Useful to transfer a session across a JSON serialization boundary
   *
   * @returns the new session
   */
  static fromJSON(
    json: SessionJSON,
    options?: {
      /** If true, will delete any existing cache entries in a shared cache (like localStorage). Defaults to false. */
      alwaysDelExistingCache?: boolean;

      /**
       * If true, will set session hydrating to true (see [[Session.setHydrating]]) and all the transferred entries to hydratable.
       *  Doing this makes useImpression only return hydratable entries immediately (to match the SSR render).
       *  After hydration completes, it is important to indicate to the session that the hydration is complete with [[Session.hydrationComplete]].
       *  Default to true if transfering from ssr to csr, otherwise false
       */
      hydrating?: boolean;
    }
  ): Session {
    const _options = {
      ...{
        alwaysDelExistingCache: false,
        hydrating: json.originator == "ssr" && !misc.ssr,
      },
      ...options,
    };

    // if the session args are different,
    // creating the session will (correctly) clear the cache
    // it will also expire the cache if the cache is too old
    const session = new Session(json.sessionArgs as SessionArgs);
    session._.originator = json.originator;
    session._.fromTransferredJson = true;

    if (_options.alwaysDelExistingCache) session._.cache.backingStore.delAll();

    const hydrating = _options.hydrating;

    // transfer the cache entries
    const cacheJson = json.cacheJson;
    const featuresJson = json.featureJson;

    if (cacheJson != undefined) {
      for (const [k, v] of Object.entries(cacheJson)) {
        if (v) {
          try {
            session._.cache.set(k, v);
          } catch {
            log.warn("failed to restore non feature " + k);
          }
        }
      }
    }

    // dump the transferred snapshot into the cache to make it easy to view in the browser
    session._.cache.set("transferredCommSnapshot", json.commSnapshotJson);

    if (featuresJson != undefined) {
      for (const { featureName, args, ...entry } of featuresJson) {
        try {
          const { created: _created, expires: _expires, ...rest } = entry;

          const created = new Date(_created);
          const expires = new Date(_expires);

          session._.cache.setFeature(featureName, args, {
            ...rest,
            created,
            expires,
            hydratable: hydrating,
          });
        } catch {
          log.warn(`failed to restore feature entry ${featureName} ${args}`);
        }
      }

      session._.hydrating = hydrating;
      if (hydrating)
        session._.hydrationKeys = featuresJson.map(({ featureName, args }) => {
          return { featureName, args };
        });
      else session._.hydrationKeys = [];
    }

    return session;
  }

  /**
   * Indicate to the session that hydration is complete
   */
  setHydrationComplete() {
    if (this._.hydrating) {
      const keys = this._.hydrationKeys;
      for (const k of keys) {
        const entry = this._.cache.getFeature(k.featureName, k.args);
        if (entry) {
          this._.cache.setFeature(k.featureName, k.args, {
            ...entry,
            hydratable: false,
          });
        }
      }
      this._.hydrating = false;
      this._.hydrationKeys = [];
    }
  }

  /**
   * Add implicit session arguments (such as the ip address) from the incoming message
   * @param incomingMessage an HTTP IncomingMessage
   */
  addIncomingMessageArgs(incomingMessage: IncomingMessage) {
    this._.implicitArgs = {
      ...this._.args,
      userAgent: incomingMessage?.headers["user-agent"] as string,
      clientType: "typescript",
      ipAddress: incomingMessage?.socket.remoteAddress,
      entryUrl: incomingMessage?.url,
    };
  }

  /**
   * Async function to get the impression and on/off flags associated with a feature.
   *
   * @returns A promise that will resolve with the impression and the current set of feature flags.
   * On an error, it will return the default values for the impression and flags, as well as an additional informational error value.
   *
   * @typeparam Type information for the request and returned impression. Typically inferred from the query.
   * @param query Features to request and their arguments.
   * @param sessionArgs The session args as defined in the FDL
   * @param impressionId The impression id.
   *
   */
  async requestImpression<Q extends Query<FeatureNames>>(
    query: Q,
    impressionId?: string
  ): Promise<{
    impression: ImpressionType<Q>;
    flags: FlagsType<Q>;
    error?: ErrorTypes;
  }> {
    if (impressionId == undefined) impressionId = uuidv4();
    return await requestImpression(this, query, impressionId);
  }

  /**
   * Async function to fill the cache with impressions. This is typically used for SSR.
   * This function will first test the cache to see if the requested impressions are already cached.
   * If not it will fetch the impression and populate the cache.
   * The cached impressions will not be logged and will not count towards any metrics until they are fetched from the cache
   *  by [[Session.requestImpression]] or [[useImpression]]
   *
   * @returns A promise that will resolve with the impression and the current set of feature flags.
   * On an error, it will return the default values for the impression and flags, as well as an additional informational error value.
   *
   * @typeparam Type information for the request and returned impression. Typically inferred from the query.
   * @param query Features to request and their arguments.
   *
   */
  async requestCacheFill<Q extends Query<FeatureNames>>(
    query: Q
  ): Promise<void> {
    await requestImpression(this, query, undefined);
  }

  /**
   * Clear all impression stats. Resets cache hits, misses, and noops
   */
  clearImpressionStats() {
    this._.loadingImpressionsCount = 0;
    this._.cache.clearCacheStats();
  }

  /**
   * Get impression stats
   * @returns returns features that have were served from cache (hits), not served from cache (misses), or not requested (noOps)
   */
  getImpressionStats(): {
    cacheMisses: string[];
    cacheHits: string[];
    cacheNoOps: string[];
    loadingImpressions: number;
  } {
    const cacheStats = this._.cache.cacheStats;
    const cacheHits = [...cacheStats.hits.keys()];
    const cacheMisses = [...cacheStats.misses.keys()];
    const loadingImpressions = this._.loadingImpressionsCount;

    // perhaps this logic should live in the Cache class
    const keys = this._.cache.backingStore.keys();
    const cacheNoOps = keys.filter(
      (k) =>
        !k.startsWith(nonFeaturePrefix) &&
        k != "session" &&
        cacheStats.hits.get(k) == undefined &&
        cacheStats.misses.get(k) == undefined
    );

    return {
      cacheHits,
      cacheMisses,
      cacheNoOps,
      loadingImpressions,
    };
  }
}

type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };
type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type UndefinedToNull<T> = {
  [P in keyof T]-?: undefined extends T[P] ? T[P] | null : T[P];
};

type FeatureNames = keyof typeof allFeatureTypes;
type SessionKeys = Partial<ReturnType<typeof sessionKeys>>;
type Flags<T extends FeatureNames> = { [P in T]: boolean };
type _WireFlags = typeof defaultFlags;

type Impression<T extends FeatureNames> = {
  [P in keyof Pick<
    ImpressionImpl,
    T | "toJSON" | "sessionKeys"
  >]: ImpressionImpl[P];
} & SessionEvents;

/**
 * Represents the type of a query, both its features and arguments.
 *
 * This type generally will not be constructed manually, but instead be inferred from the return value of [[queryBuilder]] or [[createQuery]].
 *
 * @paramtype The feature to query for
 */
type QueryArgs<T extends FeatureNames> = {
  [F in T]: Parameters<Query<T>[`get${F}`]>[number] | Record<string, never>;
};

function signalInstance(feature: FeatureBase, event: string, args: unknown) {
  // this is default feature, can't really signal
  if (feature._.impression == undefined) return;
  if (feature._.impressionId == undefined) return;

  signal(
    feature.featureName,
    event,
    feature._.impression.sessionKeys,
    feature._.impressionId,
    args
  );
}

function signalStatic(feature: string, event: string, argsArr: unknown[]) {
  const arg0 = argsArr[0];
  const sk =
    arg0 instanceof Session
      ? sessionKeys(arg0.args())
      : sessionKeys(arg0 as SessionArgs);
  const impressionId = argsArr[1] as string;
  const args = argsArr[2];

  signal(feature, event, sk, impressionId, args);
}

function signalSession(
  event: string,
  session: Session | SessionKeys | SessionEvents,
  args: unknown
): void {
  const sk =
    session instanceof Session
      ? sessionKeys(session.args())
      : session instanceof SessionEvents
      ? sessionKeys(session._.sessionKeys)
      : sessionKeys(session);

  if (session instanceof Session) {
    if (session._.commSnapshot.fetches == 0) {
      log.info(
        "Possibly signaling a session event without requesting an impression. " +
          "If the impression was requested with another Session with the same args, you can ignore this message."
      );
    }
  }
  signal(undefined, event, sk, undefined, args);
}

/**
 * Create a query to use with [[requestImpression]] or [[useImpression]].
 *
 * @typeparam The names of the features to query for.
 * @param args The arguments for each feature in T.
 * @return Query to use with [[requestImpression]] or [[useImpression]].
 */
export function createQuery<T extends FeatureNames>(
  args: QueryArgs<T>
): Query<T> {
  const query = new Query();
  query._.wireArgs = args;
  return query as Query<T>;
}

type FeatureNamesNoArgs = keyof OmitNever<{
  [F in FeatureNames]: Parameters<Query<F>[`get${F}`]>[0] extends undefined
    ? F
    : never;
}>;

/** This type represents the common portion of all features outputs  */
type WireFeatureCommon = {
  /** The imperssion id for this feature impression */
  _impressionId: string;

  /** Any variants that should be turned on if this feature goes from cacheOnly to a real impression */
  _variants?: WireVariant[];
};

type AllFeatureClasses = {
  [F in keyof typeof allFeatureTypes]: InstanceType<typeof allFeatureTypes[F]>;
};

type AFeatureOutput<F extends FeatureNames> = {
  // eslint-disable-next-line
  [P in keyof AllFeatureClasses[F]]: AllFeatureClasses[F][P] extends Function
    ? never
    : AllFeatureClasses[F][P];
};

type FeatureOutputs = {
  [F in FeatureNames]?: Omit<
    OmitNever<Writeable<UndefinedToNull<AFeatureOutput<F>>>>,
    "_" | "featureName"
  >;
};

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _WireArgs = Partial<QueryArgs<FeatureNames>>;

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _WireOutputs = { session?: SessionArgs } & Partial<{
  [P in FeatureNames]:
    | (FeatureOutputs[P] & WireFeatureCommon)
    | "OFF"
    | "UNKNOWN";
}>;

function signal(
  feature: string | undefined,
  event: string,
  sessionKeys: SessionKeys,
  impressionId: string | undefined,
  args: unknown
): void {
  const _data = {
    id: sessionKeys,
    feature,
    event,
    impressionId,
    args,
  };
  network.sendBeacon(getCausalHeaders(sessionKeys), _data);
}

// ImpressionBaseType and ImpressionBase are a bit of trickery
// to tell the TS compiler that ImpressionImp really does
// potentially have each of the feature classes as a member
type ImpressionBaseType = Partial<{
  [F in keyof typeof allFeatureTypes]: InstanceType<typeof allFeatureTypes[F]>;
}> &
  SessionEvents;

interface ImpressionBase {
  new (sessionKeys: SessionKeys): ImpressionBaseType;
}

class ImpressionImpl extends (SessionEvents as ImpressionBase) {
  /** internal */
  readonly _: { sessionKeys: SessionKeys; json: ImpressionJSON };

  // Note: There is no impression id declared at this level
  // The features have impression ids as part of their outputs

  toJSON() {
    return this._.json;
  }

  get sessionKeys() {
    return this._.json.sessionKeys;
  }

  constructor(impressionJson: ImpressionJSON) {
    super(impressionJson.sessionKeys);
    this._ = { json: impressionJson, sessionKeys: impressionJson.sessionKeys };
    const { wireOutputs, wireArgs } = impressionJson;

    for (const featureName of Object.keys(wireArgs ?? {}) as (
      | FeatureNames
      | "Session"
      | "session"
    )[]) {
      if (featureName == "Session" || featureName == "session") continue;
      const output = wireOutputs[featureName];

      let shouldCreateFeature: boolean;
      switch (impressionJson.impressionType) {
        case "error":
          shouldCreateFeature = defaultFlags[featureName];
          break;
        case "loading":
          shouldCreateFeature = false;
          break;
        case "real":
          if (output == "OFF") shouldCreateFeature = false;
          else if (output == undefined || output == "UNKNOWN") {
            log.info(
              "undefined, null or UNKNOWN output for " +
                featureName +
                ". Using defaults."
            );
            shouldCreateFeature = defaultFlags[featureName];
          } else shouldCreateFeature = true;
      }

      if (shouldCreateFeature) {
        const constructor = allFeatureTypes[featureName as FeatureNames];
        const feature = new constructor() as FeatureBase;
        feature.featureName = featureName;
        bindAllMethods(feature);

        const featureOutputs = wireOutputs[featureName] as
          | (WireFeatureCommon & Record<string, unknown>)
          | undefined;

        const featureArgs = wireArgs[featureName] as
          | Record<string, unknown>
          | undefined;

        const impressionId = featureOutputs?._impressionId;
        if (featureOutputs) {
          feature._.impression = this;
          feature._.impressionId = impressionId;
        }

        // if proxies are not supported (very old browswers), just return the defaults
        if (typeof Proxy == "function") {
          const handler = {
            get(
              target: typeof feature,
              prop: string,
              receiver: typeof feature
            ) {
              // very hard to correctly proxy signal handler b/c of default parameters
              if (prop.startsWith("signal")) {
                return Reflect.get(target, prop, receiver);
              }

              // return args value
              if (featureArgs?.[prop] !== undefined) {
                return featureArgs[prop];
              }

              // return impression value
              // if not available the default was the value initialized in the class
              if (featureOutputs?.[prop] !== undefined) {
                return featureOutputs[prop] ?? undefined; // null -> undefined (set so do not get default value)
              }
              return Reflect.get(target, prop, receiver);
            },
          };
          this[featureName] = new Proxy(feature, handler) as never;
        }
      }
    }
    bindAllMethods(this);
  }
}

// eslint-disable-next-line
function bindAllMethods(obj: any) {
  // this is used in exported class constructors
  // so that those classes can be destructured
  // w/o worrying about "this" semantics
  const props = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));

  props.forEach((prop) => {
    const descriptor = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(obj),
      prop
    );

    if (
      descriptor &&
      typeof descriptor.value === "function" &&
      prop !== "constructor"
    ) {
      obj[prop] = obj[prop].bind(obj);
    }
  });
}

type ImplicitArgs = {
  userAgent?: string;
  ipAddress?: string;
  entryUrl?: string;
  clientType?: string;
};

type ImpressionType<Q> = Q extends Query<infer T> ? Impression<T> : never;
type FlagsType<Q> = Q extends Query<infer T> ? Flags<T> : never;

async function requestImpression<Q extends Query<FeatureNames>>(
  session: Session,
  query: Q,
  /** if impressionId is undefined it is a cache fill */
  impressionId: string | undefined
): Promise<{
  impression: ImpressionType<Q>;
  flags: FlagsType<Q>;
  error?: ErrorTypes;
}> {
  const cache = session._.cache;
  const wireArgs = query._.wireArgs;

  const { cachedImpression, cachedFlags } = getCachedImpression(
    session,
    wireArgs
  );

  if (cachedImpression != undefined && cachedFlags != undefined) {
    // signal and return the cached impression
    let impression = cachedImpression;
    if (impressionId != undefined) {
      // impressionId != undefined means this is not a cache fill request
      updateSessionVariants(session, undefined, impressionId, cachedImpression);
      sendImpressionBeacon(session, cachedImpression, impressionId);
      impression = updateImpressionIds(
        cachedImpression,
        impressionId,
        wireArgs
      );
    }

    return {
      impression: impression as unknown as ImpressionType<Q>,
      flags: cachedFlags as FlagsType<Q>, // cast needed for older version of TS
    };
  }

  const fetchOptions: FetchOptions[] = [];

  const {
    flags,
    impression,
    error,
    warning,
    activeVariants,
    featuresRequested,
    featuresReceived,
  } = await iserverFetch({
    options: fetchOptions,
    impressionId,
    sessionArgs: session._.args,
    implicitArgs: session._.implicitArgs,
    wireArgs: wireArgs,
  });

  cache.maybeRegisterSSEHandler();

  session._.commSnapshot.fetches += 1;
  session._.commSnapshot.featuresRequested += featuresRequested;
  session._.commSnapshot.featuresReceived += featuresReceived;
  if (error) {
    session._.commSnapshot.errorsReceived += 1;
    session._.commSnapshot.errorsAndWarnings.unshift(error);
  }
  if (warning) {
    session._.commSnapshot.errorsReceived += 1;
    session._.commSnapshot.errorsAndWarnings.unshift(warning);
  }
  session._.commSnapshot.errorsAndWarnings.splice(5);

  // not needed for the impression stuff, but might as well cache them since we got them
  if (flags) cache.setFlags(flags);

  if (activeVariants)
    updateSessionVariants(session, activeVariants, impressionId, impression);

  if (impression != undefined) {
    cache.setOutputs(
      wireArgs,
      impression.toJSON().wireOutputs,
      impressionId == undefined
    );
    return {
      impression: impression as unknown as ImpressionType<Q>,
      flags: flagsFromImpression(impression) as unknown as FlagsType<Q>, // cast needed for older version of TS
      error,
    };
  } else {
    const errImpression = errorImpression(session, "Fetch Failure", {
      wireArgs,
    });

    return {
      impression: errImpression as unknown as ImpressionType<Q>,
      flags: flagsFromImpression(errImpression) as FlagsType<Q>,
      error: error ?? {
        errorType: "unknown",
        message: "unknown error",
      },
    };
  }
}

/**
 * Creates a session from transferred [[SessionJSON]] originally created with [[Session.toJSON]]. This function
 *  is preferred to [[Session.fromJSON]], as this function ensures react client hydration works correctly
 * @param json
 * @returns
 */
export function useSessionJSON(json: SessionJSON): Session {
  // this hook doesn't need to trigger any updates
  // the hooks that return impressions will do the right thing if the cache changes
  const jsonRef = useRef(json);
  const sessionRef = useRef<Session | undefined>(undefined);

  if (json != jsonRef.current || sessionRef.current == undefined) {
    sessionRef.current = Session.fromJSON(json);
  }

  useEffect(() => {
    // this no-ops if called multiple times
    sessionRef.current?.setHydrationComplete();
  });

  return sessionRef.current as Session;
}

function makeBackingStore(
  cacheType: CacheType,
  makeCustomStore?: () => _BackingStore
): _BackingStore {
  switch (cacheType) {
    case "none":
      return new NoOpStore();
    case "inMemory":
      return new _InMemoryStore();
  }

  let backingStore: _BackingStore | undefined = undefined;
  switch (cacheType) {
    case "localStorage":
      backingStore = new LocalStorageStore();
      break;
    case "custom":
    case "customLocalStorage":
      backingStore = (
        makeCustomStore ??
        (() => {
          log.warn("no makeCustomStore");
          return new NoOpStore();
        })
      )();
      break;
    default:
      log.error("unknown cache type");
      const _: never = cacheType;
      _;
      backingStore = new NoOpStore();
  }

  if (backingStore.dontStore()) return backingStore;

  const testKey = "_causal_storage_test";
  const testVal = "tests if storage works";
  let storageWorks = false;
  try {
    backingStore.set(testKey, testVal);
    const val = backingStore.get(testKey);
    backingStore.del(testKey);
    if (val == testVal) storageWorks = true;
  } catch {}

  if (storageWorks) return backingStore;
  log.warn(
    `The requested storage "${cacheType}" did not work. Falling back to in-memory store`
  );
  return new _InMemoryStore();
}

function sessionArgsMatch(
  args1: Partial<SessionArgs> | undefined,
  args2: Partial<SessionArgs> | undefined
): boolean {
  return (
    JSON.stringify(args1, sortReplacer) == JSON.stringify(args2, sortReplacer)
  );
}

function flagsFromImpression(
  impression?: ImpressionImpl
): Flags<FeatureNames> | undefined {
  if (impression == undefined) return undefined;

  const wireArgs = impression._.json.wireArgs;
  const wireOutputs = impression._.json.wireOutputs;
  const flags: Record<string, boolean> = {};
  for (const k of Object.keys(wireArgs ?? {})) {
    const v = wireOutputs[k as FeatureNames];
    const key = k as FeatureNames;
    if (v === undefined || v == "UNKNOWN") flags[key] = defaultFlags[key];
    else flags[key] = v != "OFF";
  }

  return flags as Flags<FeatureNames>;
}

function getCachedImpression(
  session: Session,
  wireArgs: _WireArgs
): {
  cachedImpression?: ImpressionImpl;
  cachedFlags?: Flags<FeatureNames>;
  metadata: Map<string, RequestMetadata>;
} {
  const cache = session._.cache;

  const outputs = cache.outputs(wireArgs);
  if (outputs == undefined) return { metadata: new Map() };
  const { wireOutputs: cachedOutputs, metadata } = outputs;

  // create and return the cached impression
  const cachedImpression = toImpressionImpl({
    impressionType: "real", // only cache real impressions, not errors or loads
    wireArgs,
    sessionKeys: sessionKeys(session._.args),
    wireOutputs: cachedOutputs,
  });

  const cachedFlags = flagsFromImpression(cachedImpression);

  // register the SSE handler if necessary
  cache.maybeRegisterSSEHandler();

  return {
    cachedImpression,
    cachedFlags,
    metadata,
  };
}

function loadingImpression(session: Session): ImpressionImpl {
  const impression = new ImpressionImpl({
    impressionType: "loading",
    sessionKeys: sessionKeys(session._.args),
    wireArgs: {},
    wireOutputs: {},
  });
  return impression;
}

function errorImpression(
  session: Session | undefined,
  reason: string,
  { wireArgs }: Pick<ImpressionJSON, "wireArgs">
): ImpressionImpl {
  const impression = new ImpressionImpl({
    sessionKeys: session ? sessionKeys(session._.args) : ({} as SessionKeys),
    impressionType: "error",
    reason,
    wireArgs: cleanWireArgs(wireArgs),
    wireOutputs: {},
  });
  return impression;
}

/** Type of cache to use */
type CacheType =
  /** Don't cache */
  | "none"
  /** Use Local Storage */
  | "localStorage"
  /** Use a in memory cache */
  | "inMemory"
  /** Use a custom cache (makeBackingStore function must be set) */
  | "custom"
  /**
   * Use a custom cache (makeBackingStore function must be set)
   * Treated like localStorage (i.e. cache is assumed to be shared on client)
   */
  | "customLocalStorage";

/**
 * Information relating to the communication with the impression server
 */
export type CommSnapshot = {
  fetches: number;
  featuresRequested: number;
  featuresReceived: number;
  errorsReceived: number;
  errorsAndWarnings: ErrorTypes[];
};

/**
 * A session converted to JSON. Used in conjunction with [[Session.toJSON]] and [[Session.fromJSON]]. These are useful to transfer a session across a JSON serialization boundary
 */
export type SessionJSON = {
  sessionArgs: Partial<SessionArgs>;
  originator: "ssr" | "csr";
  cacheJson: Record<string, unknown>;
  commSnapshotJson: CommSnapshot;
  featureJson:
    | (_RequestStoreEntry & { featureName: string; args: unknown })[]
    | undefined;
  activeVariants: ActiveVariant[];
};

/** very basic uuid generator (to minimize external dependencies) **/
function uuidv4() {
  let digits = "";
  let ii = 0;
  for (; digits.length < 32 && ii < 100; ii++)
    digits += (Math.random() * 0xffffffff).toString(16).split(".")[0];

  if (ii == 100) {
    throw new Error("FATAL: failed to generate uuid");
  }

  return (
    digits.slice(0, 8) +
    "-" +
    digits.slice(8, 12) +
    "-" +
    digits.slice(12, 16) +
    "-" +
    digits.slice(16, 20) +
    "-" +
    digits.slice(20, 32)
  );
}

//#region caching

let _flushCount = 0;

/**
 * @internal
 * Do not use
 */
export type _BackingStore = {
  get(key: string): unknown;
  set(key: string, entry: unknown): void;

  del(key: string): void;
  delAll(filter?: (entry: unknown) => boolean): void;
  isEmpty(): boolean;
  keys(): string[];
  dontStore(): boolean;
};

/**
 * @internal
 *
 * Be careful when changing this class, existing caches
 * need to be handled correctly.
 * Consider upgrading the cache version
 */
type RequestMetadata = {
  origRender: "ssr" | "csr";
  lastRender: "ssr" | "csr";
  hydratable: boolean;
  impressionCount: number;
};

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _RequestStoreEntry = {
  created: string;
  expires: string;
  value: unknown;
} & RequestMetadata;

type RequestEntry = {
  created: Date;
  expires: Date;
  value: unknown;
} & RequestMetadata;

type RequestInputEntry = {
  created?: Date;
  expires: Date;
  value: unknown;
} & Partial<RequestMetadata>;

class NoOpStore implements _BackingStore {
  get(): undefined {
    return undefined;
  }
  set() {
    undefined;
  }

  del() {
    undefined;
  }

  delAll(): void {
    undefined;
  }

  isEmpty(): boolean {
    return true;
  }

  keys(): string[] {
    return [];
  }

  dontStore() {
    return true;
  }
}

class LocalStorageStore implements _BackingStore {
  static prefix = "_causal_";

  static makeKey(key: string): string {
    return LocalStorageStore.prefix + key;
  }

  get(key: string, autoPrefix = true): undefined | unknown {
    const _key = autoPrefix ? LocalStorageStore.makeKey(key) : key;
    const stringEntry = window.localStorage.getItem(_key);
    if (!stringEntry) return undefined;
    try {
      const jsonEntry = JSON.parse(stringEntry);
      return jsonEntry;
    } catch (e) {
      log.warn(
        "failed to deserialize from cache. Error = " + JSON.stringify(e)
      );
      window.localStorage.removeItem(_key);
      return undefined;
    }
  }

  set(key: string, jsonEntry: _RequestStoreEntry) {
    const _key = LocalStorageStore.makeKey(key);
    return window.localStorage.setItem(_key, JSON.stringify(jsonEntry));
  }

  del(key: string) {
    const _key = LocalStorageStore.makeKey(key);
    window.localStorage.removeItem(_key);
  }

  delAll(filter?: (entry: unknown) => boolean): void {
    for (let ii = localStorage.length - 1; ii >= 0; --ii) {
      const key = localStorage.key(ii);
      if (
        key?.startsWith(LocalStorageStore.prefix) &&
        key != causalRegisteredKey
      ) {
        const entry = this.get(key, false);
        if (filter == undefined || entry == undefined || filter(entry))
          localStorage.removeItem(key);
      }
    }
  }

  isEmpty(): boolean {
    for (let ii = 0; ii < localStorage.length; ii++) {
      const key = localStorage.key(ii);
      if (key?.startsWith(LocalStorageStore.prefix)) return false;
    }
    return true;
  }

  keys(): string[] {
    const _keys: string[] = [];
    const prefixLen = LocalStorageStore.prefix.length;

    for (let ii = 0; ii < localStorage.length; ii++) {
      const key = localStorage.key(ii);
      if (key?.startsWith(LocalStorageStore.prefix))
        _keys.push(key.substring(prefixLen));
    }

    return _keys;
  }

  dontStore() {
    return false;
  }
}

/**
 * @internal
 * Exported for testing
 */
export class _InMemoryStore implements _BackingStore {
  // store as strings and not raw values to mimic local storage
  // this also prevents any truth equality based on references
  map = new Map<string, string>();

  get(key: string): unknown {
    const raw = this.map.get(key);
    if (raw == undefined) return undefined;
    const entry = JSON.parse(raw);
    return entry;
  }

  set(key: string, storeEntry: _RequestStoreEntry) {
    const stringEntry = JSON.stringify(storeEntry);
    return this.map.set(key, stringEntry);
  }

  del(key: string) {
    return this.map.delete(key);
  }

  delAll(filter?: (entry: unknown) => boolean): void {
    if (filter == undefined) this.map = new Map<string, string>();
    else {
      for (const k of this.keys()) {
        const entry = this.get(k);
        if (entry == undefined || filter(entry)) this.del(k);
      }
    }
  }

  isEmpty(): boolean {
    return this.map.size == 0;
  }

  keys(): string[] {
    return [...this.map.keys()];
  }

  dontStore() {
    return false;
  }
}

/**
 * @internal
 */
export type CacheOptions = {
  /**
   * The maximum amount of time to cache feature values.
   * The default is to cache for the same duration as a session
   * Setting to zero will disable caching
   * Setting to a negative number will be ignored
   */
  outputExpirySeconds?: number;

  /**
   * The duration of inactivity before the entire cache is flushed
   * The default is 30 minutes (1800 seconds)
   * This is typically set in your environment and compiled into this file
   * It is not recommended you set it here
   */
  sessionCacheExpirySeconds?: number;

  /**
   *
   * Defaults to false.
   * Setting to true will enable session cache busting outside of QA flows.
   * This is not yet implemented end to end, so do not set it to true.
   * */
  useServerSentEvents?: boolean;

  /**
   * The default ssr cache type to use if none is specified.
   * This defaults to "inMemory"
   */
  ssrCacheType?: "none" | "inMemory" | "custom";

  /**
   * The default csr cache type to use if none is specified.
   * This defaults to "localStorage"
   */
  csrCacheType?: CacheType;

  /**
   * If the cache type is "custom" or "customLocalStorage", a function that returns a custom backing store
   */
  makeCustomStore?: () => _BackingStore;
};

const cacheVersion = 1;

const sseInfoKey = "sseInfo";
const cacheInfoKey = "cacheInfo";
const flagsKey = "flags";
const activeVariantsKey = "activeVariants";
const requestedFeaturesKey = "activeFeatures";

const causalRegisteredKey = "_causal_registered";

// features have no prefix in the cache
// non features are prefix with this
const nonFeaturePrefix = "_";

type CacheInfo = {
  version: number;
  sessionStart: string;
  lastAccess: string;
  sessionArgs: Partial<SessionArgs> | undefined;
};

// maps args to cache store entries
type FeatureEntry = Record<string, _RequestStoreEntry>;

/** @internal only exported for testing */
export const _eventSourceInfo: {
  source: EventSource | undefined;
  cache: _Cache | undefined;
  forceUpdateFns: Set<() => void>;
} = { source: undefined, cache: undefined, forceUpdateFns: new Set() };

function registerForceUpdateFn(fn: () => void) {
  _eventSourceInfo.forceUpdateFns.add(fn);
}

function unRegisterForceUpdateFn(fn: () => void) {
  _eventSourceInfo.forceUpdateFns.delete(fn);
}

function forceHookUpdates() {
  for (const fn of _eventSourceInfo.forceUpdateFns) fn();
}

function registerEventSource(cache: _Cache) {
  if (_eventSourceInfo.cache == cache && _eventSourceInfo.source != undefined) {
    // already registered
    return;
  }

  // close previous one
  if (_eventSourceInfo.source != undefined) {
    _eventSourceInfo.source.close();
    _eventSourceInfo.cache = undefined;
    _eventSourceInfo.source = undefined;
  }

  if (cache.sessionArgs == undefined || network.newEvtSource == undefined) {
    // nothing to do
    return;
  }

  const url = sseUrl(cache.sessionArgs);
  _eventSourceInfo.cache = cache;

  const source = network.newEvtSource(url);
  _eventSourceInfo.source = source;
  source.addEventListener("flushcache", cache.sseFlushCache.bind(cache));
  source.addEventListener("flushfeatures", cache.sseFlushFeatures.bind(cache));
  source.addEventListener("hello", cache.sseHello.bind(cache));
  return true;
}

/**
 * @internal
 * Do not use - only exported for testing
 */
export class _Cache {
  sessionArgs: Partial<SessionArgs> | undefined;
  backingStore: _BackingStore;
  outputExpirySeconds: number | undefined;
  useServerSentEvents: boolean;
  sessionCacheExpirySeconds: number;
  isNew: boolean;
  cacheStats: {
    hits: Map<string, number>;
    misses: Map<string, number>;
  } = { hits: new Map(), misses: new Map() };

  constructor(
    sessionArgs: Partial<SessionArgs> | undefined,
    backingStore: _BackingStore,
    options: Required<CacheOptions>
  ) {
    const {
      outputExpirySeconds,
      useServerSentEvents,
      sessionCacheExpirySeconds,
    } = options;

    this.backingStore = backingStore;
    this.outputExpirySeconds = outputExpirySeconds;
    this.useServerSentEvents = useServerSentEvents;
    this.sessionCacheExpirySeconds = sessionCacheExpirySeconds;
    this.sessionArgs = sessionArgs;
    this.isNew = this.touchCacheInfo().isNew;
  }

  shouldRegisterSSEHandler(): boolean {
    if (_eventSourceInfo.cache == this && _eventSourceInfo.source != undefined)
      return false;
    return (
      this.sessionArgs != undefined &&
      !misc.ssr &&
      !this.backingStore.dontStore() &&
      (this.useServerSentEvents || isCausalRegistered())
    );
  }

  maybeRegisterSSEHandler(): boolean {
    if (this.shouldRegisterSSEHandler()) {
      registerEventSource(this);
      return true;
    }
    return false;
  }

  get(key: string): unknown {
    return this.backingStore.get(nonFeaturePrefix + key) as string;
  }
  set(key: string, value: unknown) {
    this.backingStore.set(nonFeaturePrefix + key, value);
  }

  getFeature(
    featureName: string,
    args: unknown
  ): Required<RequestEntry> | undefined {
    const featureEntry = this.backingStore.get(featureName) as FeatureEntry;
    if (featureEntry == undefined) return;

    const argsKey = getArgsAsKey(args);

    const requestEntry = featureEntry[argsKey];
    if (requestEntry == undefined) return undefined;

    const { created, expires, ...rest } = requestEntry as _RequestStoreEntry;
    const now = new Date();
    const createdTS = new Date(created);
    const expiresTS = new Date(expires);

    if (expiresTS < now) {
      this.backingStore.del(featureName);
      return undefined;
    }

    return {
      ...rest,
      created: createdTS,
      expires: expiresTS,
    };
  }

  getFeatures(
    featureName: string
  ): (Required<RequestEntry> & { args: unknown })[] {
    const featureEntry = this.backingStore.get(featureName) as FeatureEntry;
    if (featureEntry == undefined) [];

    const entries: (Required<RequestEntry> & { args: unknown })[] = [];
    for (const [_args, requestStoreEntry] of Object.entries(featureEntry)) {
      const args = JSON.parse(_args) as unknown;
      const created = new Date(requestStoreEntry.created);
      const expires = new Date(requestStoreEntry.expires);

      entries.push({ ...requestStoreEntry, args, created, expires });
    }
    return entries;
  }

  setFeature(
    featureName: string,
    args: unknown,
    /** set to undefined to delete request entry */
    requestEntry: RequestInputEntry | undefined
  ) {
    let featureEntry = this.backingStore.get(featureName) as
      | FeatureEntry
      | undefined;

    if (featureEntry == undefined) {
      // the feature entry doesn't exist, so nothing to delete
      if (requestEntry == undefined) return;

      // otherwise need to create the feature entry
      // it will hold the request entries
      featureEntry = {};
    }

    const argsKey = getArgsAsKey(args);

    // requestEntry == undefined => delete the entry
    if (requestEntry == undefined) {
      delete featureEntry[argsKey];
      this.backingStore.set(featureName, featureEntry);
      return;
    }

    const {
      expires,
      created,
      origRender: _origRender,
      lastRender: _lastRender,
      impressionCount: _impressionCount,
      hydratable: _hydratable,
      ...rest
    } = requestEntry;

    const createdString = (created ?? new Date()).toISOString();
    const expiresString = expires.toISOString();
    const origRender = _origRender ?? (misc.ssr ? "ssr" : "csr");
    const lastRender = _lastRender ?? origRender;
    const hydratable = _hydratable ?? false;
    const impressionCount = _impressionCount ?? 1;

    const newRequestStoreEntry: _RequestStoreEntry = {
      ...rest,
      created: createdString,
      expires: expiresString,
      origRender,
      lastRender,
      impressionCount,
      hydratable,
    };

    featureEntry[argsKey] = newRequestStoreEntry;
    return this.backingStore.set(featureName, featureEntry);
  }

  deleteAll(invalidateHooks: boolean): void {
    if (this.sessionArgs == undefined) return;

    this.backingStore.delAll();

    // forces react hooks to re-execute next time they are used
    if (invalidateHooks) _flushCount += 1;
  }

  /**
   * Touches the cacheInfo and updates the expiry
   * If no cacheInfo, incompatible cache info, or the past expiry, creates a new one
   * @returns undefined if no cache info is available
   */
  touchCacheInfo(): { cacheInfo: CacheInfo | undefined; isNew: boolean } {
    log.debug(5, "testAndTouchSession");
    if (this.backingStore.dontStore())
      return { cacheInfo: undefined, isNew: true };

    const oldCacheInfo = this.get(cacheInfoKey) as CacheInfo | undefined;

    const now = new Date();
    let cacheExpired = false;

    let invalidExpires = false;
    if (oldCacheInfo) {
      try {
        const expires = addSeconds(
          new Date(oldCacheInfo.lastAccess),
          this.sessionCacheExpirySeconds
        );

        invalidExpires = isNaN(expires.valueOf());

        if (
          oldCacheInfo.version == undefined ||
          oldCacheInfo.version < cacheVersion ||
          expires < now ||
          invalidExpires
        ) {
          cacheExpired = true;
        }
      } catch {
        cacheExpired = true;
        invalidExpires = true;
      }

      if (cacheExpired) {
        log.debug(1, "session expired");
        cacheExpired = true;

        // should never happen, but be extra cautious to avoid render loop
        const invalidateHooks = !invalidExpires;
        this.deleteAll(invalidateHooks);
      }
    }

    let argsMismatch = false;
    const curSessionArgs = this.sessionArgs;
    if (
      !this.backingStore.isEmpty() &&
      oldCacheInfo?.sessionArgs &&
      !sessionArgsMatch(oldCacheInfo.sessionArgs, curSessionArgs)
    ) {
      argsMismatch = true;
      log.debug(1, "session args changes, deleting values");
      this.deleteAll(true);
    }

    const newCacheInfo: CacheInfo = {
      sessionStart:
        cacheExpired || !oldCacheInfo
          ? now.toISOString()
          : oldCacheInfo.sessionStart,
      lastAccess: now.toISOString(),
      sessionArgs: this.sessionArgs,
      version: cacheVersion,
    };

    this.set(cacheInfoKey, newCacheInfo);

    return {
      cacheInfo: newCacheInfo,
      isNew: cacheExpired || argsMismatch || !oldCacheInfo,
    };
  }

  getOutputExpiry() {
    if (this.outputExpirySeconds == undefined) return maxDate;
    return makeFutureDate(this.outputExpirySeconds);
  }

  flags(): Flags<FeatureNames> | undefined {
    if (!this.touchCacheInfo().cacheInfo) return undefined;

    const value = this.get(flagsKey);
    if (value == undefined) return undefined;
    return value as Flags<FeatureNames>;
  }

  setFlags(flags: _WireFlags) {
    if (!this.touchCacheInfo().cacheInfo) return;
    this.set(flagsKey, flags);
  }

  addCacheHit(...featureNames: string[]) {
    for (const featureName of featureNames) {
      const count = this.cacheStats.hits.get(featureName) ?? 0;
      this.cacheStats.hits.set(featureName, count + 1);
    }
  }

  addCacheMiss(...featureNames: string[]) {
    for (const featureName of featureNames) {
      const count = this.cacheStats.misses.get(featureName) ?? 0;
      this.cacheStats.misses.set(featureName, count + 1);
    }
  }

  clearCacheStats() {
    this.cacheStats = {
      hits: new Map(),
      misses: new Map(),
    };
  }

  outputs(wireArgs: _WireArgs):
    | {
        wireOutputs: _WireOutputs;

        /** the key is feature.args */
        metadata: Map<string, RequestMetadata>;
      }
    | undefined {
    if (!this.touchCacheInfo().cacheInfo) return undefined;

    const outputs: _WireOutputs = {};
    const metadata: Map<string, RequestMetadata> = new Map();

    let allCached = true;

    const sessionOutput = this.getFeature("session", this.sessionArgs);
    if (sessionOutput == undefined) {
      allCached = false;
      this.addCacheMiss("session");
      this.addCacheMiss(...Object.keys(wireArgs ?? {}));
    } else {
      outputs["session"] = sessionOutput.value as SessionArgs;

      for (const [featureName, args] of Object.entries(wireArgs)) {
        const entry = this.getFeature(featureName, args);
        if (entry == undefined) {
          allCached = false;
          this.addCacheMiss(featureName);
          break;
        }

        try {
          // eslint-disable-next-line
          (outputs as any)[featureName] = entry.value;

          const argsKey = getArgsAsKey(args);
          const metadataKey = `${featureName}.${argsKey}`;

          metadata.set(metadataKey, {
            origRender: entry.origRender,
            lastRender: entry.lastRender,
            impressionCount: entry.impressionCount,
            hydratable: entry.hydratable,
          });

          this.addCacheHit(featureName);
        } catch {
          log.warn("unexpected exception retrieving from cache");
          allCached = false;
          break;
        }
      }
    }
    if (allCached) {
      return { wireOutputs: outputs, metadata };
    }
    return undefined;
  }

  setOutputs(
    wireArgs: _WireArgs,
    wireOutputs: _WireOutputs,
    isCacheFill: boolean
  ) {
    if (!this.touchCacheInfo().cacheInfo) return;
    const nextExpiry = this.getOutputExpiry();

    for (const [featureName, v] of Object.entries(wireOutputs) as [
      keyof _WireOutputs,
      _WireOutputs[keyof _WireOutputs]
    ][]) {
      if (featureName == "session") {
        if (this.get(sseInfoKey) == undefined) {
          // older version of the iserver didn't send the last flush time
          // in that case use the session start time
          // will re-render too often in that case, but only for QA registered users
          const lastFlushTime = (v as any)?.startTime; // eslint-disable-line
          const startTime = (v as any)?.startTime; // eslint-disable-line
          const sseInfo = lastFlushTime ?? startTime;
          if (sseInfo != undefined) this.set(sseInfoKey, sseInfo);
        }
        this.setFeature(featureName, this.sessionArgs, {
          value: v,
          expires: nextExpiry,
        });
      } else {
        const wireArg = wireArgs[featureName as FeatureNames];
        if (wireArg != undefined) {
          if (!(featureName as string).startsWith(nonFeaturePrefix))
            this.setFeature(featureName, wireArg, {
              value: v,
              expires: nextExpiry,
              impressionCount: isCacheFill ? 0 : 1,
            });
        }
      }
    }
  }

  //#region server sent events
  sseMaybeDel(name: string, createdBeforeDate: string | null) {
    if (this.backingStore.dontStore()) return;

    if (!createdBeforeDate) {
      this.backingStore.del(name);
      return;
    }

    try {
      const createdBefore = new Date(createdBeforeDate);
      const entries = this.getFeatures(name);
      if (entries == undefined) return;
      for (const entry of entries) {
        if (entry.created < createdBefore)
          this.setFeature(name, entry.args, undefined);
      }
    } catch (e) {
      log.warn(
        "unexpected error analyzing cache - deleting entry. error was " +
          JSON.stringify(e)
      );
      this.backingStore.del(name);
    }
  }

  // handle the "flushcache" sse.
  // flush the entire cache. The cache version is sent in the data.
  sseFlushCache(evt: Event) {
    if (this.backingStore.dontStore()) return;

    const mevt: MessageEvent = evt as MessageEvent;
    _flushCount++;
    this.deleteAll(false);
    this.set(sseInfoKey, mevt.data);
    forceHookUpdates();
  }

  // handle the "flushfeatures" sse.
  // flush the cache for the feature names listed in the data.
  sseFlushFeatures(evt: Event) {
    if (this.backingStore.dontStore()) return;

    const mevt: MessageEvent = evt as MessageEvent;
    _flushCount++;
    this.sseMaybeDel(mevt.data, null);
    forceHookUpdates();
  }

  sseHello(evt: Event) {
    if (this.backingStore.dontStore()) return;

    function safeFlushTime(raw: unknown): number {
      if (typeof raw == "number") return raw;
      if (typeof raw == "string") {
        const num = parseInt(raw);
        if (isNaN(num)) return 0;
        return num;
      }
      return 0;
    }

    const mevt: MessageEvent = evt as MessageEvent;
    const newFlushTime = safeFlushTime(mevt.data);
    const prevFlushTime = safeFlushTime(this.get(sseInfoKey));
    if (prevFlushTime == undefined || newFlushTime > prevFlushTime) {
      this.deleteAll(true);
      forceHookUpdates();
    }
    this.set(sseInfoKey, mevt.data);
  }
}

//#endregion

//#endregion

//#region initialization

function normalizeUrl(url: string) {
  if (url.endsWith("/")) return url;
  return url + "/";
}

let lastLoggedUrl = "";

function makeBaseUrl(ssr: boolean): string {
  let url: string | undefined = undefined;
  if (ssr) {
    url = process.env.CAUSAL_ISERVER;
    if (url == undefined) {
      log.warn(
        "SSR impression server environment variable not set, defaulting to 'http://localhost:3004/iserver'. " +
          "Please set CAUSAL_ISERVER"
      );
      url = "http://localhost:3004/iserver/";
    }
  } else {
    url =
      process.env.NEXT_PUBLIC_CAUSAL_BROWSER_ISERVER ??
      process.env.VAGRANT_CAUSAL_BROWSER_ISERVER ??
      process.env.REACT_APP_CAUSAL_BROWSER_ISERVER ??
      process.env.RAZZLE_CAUSAL_BROWSER_ISERVER ??
      process.env.CAUSAL_BROWSER_ISERVER;

    if (url == undefined) {
      log.warn(
        "Browser impression server environment variable not set, defaulting to http://localhost:3004/iserver " +
          "Please set one of: NEXT_PUBLIC_CAUSAL_BROWSER_ISERVER, VAGRANT_CAUSAL_BROWSER_ISERVER, RAZZLE_CAUSAL_BROWSER_ISERVER, CAUSAL_BROWSER_ISERVER"
      );
      url = "http://localhost:3004/iserver/";
    }
  }

  url = normalizeUrl(url);

  if (misc.ssr && url != lastLoggedUrl) {
    // it's easy to see the url on the client, but a bit harder in SSR output
    log.info("impression server url: ", url);
    lastLoggedUrl = url;
  }
  return url;
}

/**
 * @internal
 * Do not use - only exported for testing
 */
type _LogFn = (message: string, ...optionalParams: unknown[]) => void;

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _FetchUrl = string;

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _FetchRequestInit = {
  method?: "GET" | "POST";
  body?: string;
  signal?: AbortSignal;
  headers?: Record<string, string>;
  keepalive?: boolean;
};

// eslint-disable-next-line
function sortReplacer(_: any, value: any) {
  if (!(value instanceof Object) || value instanceof Array) return value;

  return (
    Object.keys(value)
      .sort()
      // eslint-disable-next-line
      .reduce((sorted: any, key: any) => {
        sorted[key] = value[key];
        return sorted;
      }, {})
  );
}

function getArgsAsKey(wireArg: unknown): string {
  return typeof wireArg == "string"
    ? wireArg
    : JSON.stringify(wireArg ?? {}, sortReplacer);
}

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _FetchResponse = {
  status: number;
  text(): Promise<string>;
  json(): Promise<unknown>;
};

/**
 * This represents an active experiment variant within Causal. This is intended for reporting information to other
 * systems. It should *not* be used as an input for any display or logic on your site.
 *
 * Active variants are available on the [[Session.activeVariants]] property and the [[CausalOptions.onImpression]] callback
 *
 */
export type ActiveVariant = {
  /** the id of the experiment */
  experimentId: string;

  /** the name of the experiment */
  experimentName: string;

  /** the name of the variant, undefined for control */
  variantId: string | undefined;

  /** the name of the variant */
  variantName: string;
};

/**
 * This represents the state of all features requested so far. This is intended for reporting information to other
 * systems. It should *not* be used as an input for any display or logic on your site.
 *
 * RequestedFeature is on the [[Session.requestedFeatures]] property and the [[CausalOptions.onImpression]] callback
 */
export type RequestedFeature = {
  featureName: string;
  isOn: boolean;
};

/**
 * Causal configuration options that can be passed to [[initCausal]]
 */
export type CausalOptions = {
  /**
   * By default Causal will send all network requests as defined by the impression server environment variables.
   * See: https://tech.causallabs.io/docs/reference/install/configuration/
   *
   * You can alternatively set it here.
   */
  baseUrl?: string;

  /**
   * How long to wait for the impression server to respond before a timeout.
   * The default is 1000 ms (1 second)
   */
  timeoutMs?: number;

  /**
   * What should be logged
   *
   * The default it to log everything
   * To suppress all logging pass in an empty array
   */
  logLevel?: ("info" | "warn" | "error")[];

  /**
   * If true, log to info() all the request and response information to/from the iserver.
   * This is useful for diagnostics, and generally should NOT be set. It is very verbose.
   *
   * The default is false.
   */
  logIServerDetails?: boolean;

  /**
   * @deprecated
   *
   * If true, log to error() any errors communicating with the iserver.
   * Errors include timeouts, exceptions thrown from fetch, and empty responses.
   *
   * The default is true.
   */
  logIServerCommErrors?: boolean;

  /**
   * @deprecated
   * Callback called whenever the active variants are updated. This is intended for reporting information to other
   * systems. It should *not* be used as an input for any display or logic on your site.
   */
  onUpdateActiveVariants?: (variants: ActiveVariant[]) => void;

  /**
   * Callback called when an impression is returned. This is intended for reporting information to other
   * systems. It should *not* be used as an input for any display or logic on your site.
   */
  onImpression?: (info: {
    newVariants: ActiveVariant[];
    allVariants: ActiveVariant[];
    newFeatures: RequestedFeature[];
    allFeatures: RequestedFeature[];
  }) => void;
};

/**
 * @internal
 * This API may change at any point
 */
export type CausalDebugOptions = {
  /**
   * By default Causal use console.log to log info
   * You can alter this behavior be providing a logging function.
   */
  logInfo?: _LogFn;

  /**
   * By default Causal use console.warn to log warnings.
   * You can alter this behavior be providing a logging function.
   */
  logWarn?: _LogFn;

  /**
   * By default Causal use console.error to log errors.
   * You can alter this behavior be providing a logging function.
   */
  logError?: _LogFn;

  /**
   * By default, Causal uses cross-fetch to fetch
   * You can alter this behavior by setting this function
   */
  fetch?: (url: string, init?: _FetchRequestInit) => Promise<_FetchResponse>;

  /**
   * By default, Causal uses new EventSource to create an EvtSource
   * You can alter this behavior by setting this function
   */
  newEvtSource?: (url: string) => EventSource;

  /**
   * Is this an SSR render
   * By default this is true if typeof window == "undefined", otherwise false
   */
  ssr?: boolean;

  /**
   * Global cacheing options
   */
  cacheOptions?: CacheOptions;
};

// eslint-disable-next-line
let debugLogLevel = -1;

const defaultLog: {
  info: _LogFn;
  warn: _LogFn;
  error: _LogFn;
  debug: (level: number, message: string, ...optionalParams: unknown[]) => void;
} = {
  info: (...args) => {
    console.log(...args);
  },
  warn: (...args) => {
    console.warn(...args);
  },
  error: (...args) => {
    console.error(...args);
  },
  debug(level: number, message: string, ...optionalParams: unknown[]) {
    if (level <= debugLogLevel) console.log(message, ...optionalParams);
  },
};

let log = {
  ...defaultLog,
};

/**
 * @internal
 * Do not use - only exported for testing
 */
export function _getLog() {
  return log;
}

type MiscOptions = Required<Pick<CausalDebugOptions, "ssr">> &
  Required<
    Pick<
      CausalOptions,
      | "logIServerDetails"
      | "logIServerCommErrors"
      | "onUpdateActiveVariants"
      | "onImpression"
    >
  >;

const defaultSSR = typeof window == "undefined";

const defaultMisc: MiscOptions = {
  ssr: defaultSSR,
  logIServerDetails: false,
  logIServerCommErrors: true,
  onUpdateActiveVariants: () => {
    // noop
  },
  onImpression: () => {
    // noop
  },
};
const misc: MiscOptions = { ...defaultMisc };

function isCausalRegistered() {
  try {
    if (typeof window == "undefined") return false;
    return window.localStorage?.getItem(causalRegisteredKey) == "true" ?? false;
  } catch {
    return false;
  }
}

const defaultCacheOptions: Required<CacheOptions> = {
  outputExpirySeconds: 60 * 60 * 24 * 365 * 100, // 100 years (so will expire with the session)
  useServerSentEvents: false,
  sessionCacheExpirySeconds: 60 * 30,
  ssrCacheType: "inMemory",
  csrCacheType: "localStorage",
  makeCustomStore: () => {
    log.warn("no custom store function");
    return new NoOpStore();
  },
};
let cacheOptions = { ...defaultCacheOptions };

let baseUrl: string | undefined = undefined;
const defaultNetwork = {
  timeoutMs: 1000,
  sendBeacon: (headers: Record<string, string>, data: unknown) => {
    network.fetch(network.getBaseUrl() + "signal", {
      method: "POST",
      body: JSON.stringify(data),
      headers,
      keepalive: true,
    });
  },
  fetch: (
    url: _FetchUrl,
    init?: _FetchRequestInit
  ): Promise<_FetchResponse> => {
    log.debug(2, "defaultFetch");
    return fetch(url, init);
  },
  newEvtSource:
    typeof EventSource == "undefined"
      ? undefined
      : (url: string) => {
          return new EventSource(url);
        },
  getBaseUrl: () => {
    return baseUrl ?? (baseUrl = makeBaseUrl(defaultSSR));
  },
};
let network = { ...defaultNetwork };

// eslint-disable-next-line

/**
 * An optional method to set Causal options
 *
 * @param options Configurable options.
 * @param debugOptions Options that may change between releases
 */
export function initCausal(
  options?: CausalOptions,
  debugOptions?: CausalDebugOptions
) {
  let baseUrl = options?.baseUrl ? normalizeUrl(options?.baseUrl) : undefined;
  misc.ssr = debugOptions?.ssr ?? defaultSSR;
  misc.logIServerDetails = options?.logIServerDetails ?? false;
  misc.logIServerCommErrors = options?.logIServerCommErrors ?? true;
  misc.onUpdateActiveVariants =
    options?.onUpdateActiveVariants ??
    (() => {
      // noop
    });
  misc.onImpression =
    options?.onImpression ??
    (() => {
      // noop
    });

  log = { ...defaultLog };
  log.info = debugOptions?.logInfo ?? defaultLog.info;
  log.warn = debugOptions?.logWarn ?? defaultLog.warn;
  log.error = debugOptions?.logError ?? defaultLog.error;

  const logLevel = options?.logLevel ?? ["info", "warn", "error"];
  const noOp = () => {
    undefined;
  };
  if (!logLevel.includes("info")) log.info = noOp;
  if (!logLevel.includes("warn")) log.warn = noOp;
  if (!logLevel.includes("error")) log.error = noOp;

  network = {
    timeoutMs: options?.timeoutMs ?? defaultNetwork.timeoutMs,
    getBaseUrl: () => {
      return (
        baseUrl ??
        (baseUrl = options?.baseUrl
          ? normalizeUrl(options.baseUrl)
          : defaultNetwork.getBaseUrl())
      );
    },

    fetch: (
      url: _FetchUrl,
      init?: _FetchRequestInit
    ): Promise<_FetchResponse> => {
      const baseFetch = debugOptions?.fetch ?? defaultNetwork.fetch;

      if (typeof AbortController == "undefined") {
        return baseFetch(url, init);
      } else {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), network.timeoutMs);
        return baseFetch(url, { ...init, signal: controller.signal })
          .then((response) => {
            clearTimeout(id);
            return response;
          })
          .catch((response) => {
            clearTimeout(id);
            return response;
          });
      }
    },

    sendBeacon: (headers: Record<string, string>, data: unknown) => {
      network.fetch(network.getBaseUrl() + "signal", {
        method: "POST",
        body: JSON.stringify(data),
        headers,
        keepalive: true,
      });
    },

    newEvtSource: debugOptions?.newEvtSource ?? defaultNetwork.newEvtSource,
  };

  const debugCO = debugOptions?.cacheOptions;
  cacheOptions = {
    outputExpirySeconds:
      debugCO?.outputExpirySeconds ?? defaultCacheOptions.outputExpirySeconds,
    sessionCacheExpirySeconds:
      debugCO?.sessionCacheExpirySeconds ??
      defaultCacheOptions.sessionCacheExpirySeconds,
    useServerSentEvents:
      debugCO?.useServerSentEvents ?? defaultCacheOptions.useServerSentEvents,
    ssrCacheType:
      debugOptions?.cacheOptions?.ssrCacheType ??
      defaultCacheOptions.ssrCacheType,
    csrCacheType:
      debugOptions?.cacheOptions?.csrCacheType ??
      defaultCacheOptions.csrCacheType,
    makeCustomStore:
      debugOptions?.cacheOptions?.makeCustomStore ??
      defaultCacheOptions.makeCustomStore,
  };
}

type IncomingMessage = {
  headers: { [key: string]: string | string[] | undefined };
  url?: string;
  socket: {
    remoteAddress?: string;
  };
};

//#endregion

//#region impressions + flags

/**
 * This is a utility type so autocomplete works better.
 * I.e. `type MyFeatures = SelectFeatures<"this_will_autocomplete">`.
 * If it is not autocompleting, try typing a quote (') or double quote (").
 */
export type SelectFeatures<T extends FeatureNames> = T;

/**
 * Create a query to use with [[requestImpression]] or [[useImpression]] using the builder pattern.
 *
 * @return Query to use with [[requestImpression]] or [[useImpression]].
 */
export function queryBuilder(): Query<never> {
  const query = new Query();

  // if proxies are not supported (very old browswers), we won't call the impression serer
  // default values will be provided for all features
  if (typeof Proxy != "function") return query as Query<never>;

  const handler = {
    get(target: typeof query, prop: string, receiver: typeof query) {
      if (prop.startsWith("get")) {
        const feature = prop.slice(3) as FeatureNames;
        const getter = (args: never) => {
          target._.wireArgs[feature] = args ?? {};
          return receiver;
        };
        return getter;
      }
      return Reflect.get(target, prop, receiver);
    },
  };

  return new Proxy(query, handler) as Query<never>;
}

/**
 * Create a query to use with [[requestImpression]] or [[useImpression]] using the builder pattern.
 * This is the same as QueryBuilder, just less typing
 *
 * @return Query to use with [[requestImpression]] or [[useImpression]].
 */
export const qb = queryBuilder;

/**
 * JSON format for an impression.
 * This can be safely serialized to JSON with functions like `JSON.stringify()`.
 * Use the function [[toImpression]] to convert back to an impression.
 */
export type ImpressionJSON = {
  /** @internal */
  sessionKeys: SessionKeys;

  /** @internal */
  impressionType: "real" | "loading" | "error";

  /** @internal If an error, why */
  reason?: string;

  /** @internal */
  wireArgs: _WireArgs;

  /** @internal */
  wireOutputs: _WireOutputs;
};

/**
 * Convert a [[ImpressionJSON]] back to an impression.
 */

export function toImpression<T extends FeatureNames>(
  impressionJson: ImpressionJSON
): ImpressionType<Query<T>> {
  return toImpressionImpl(impressionJson) as Impression<T>;
}

export function toImpressionImpl({
  impressionType,
  sessionKeys,
  wireArgs,
  wireOutputs: outputs,
}: ImpressionJSON): ImpressionImpl {
  const impression = new ImpressionImpl({
    impressionType,
    sessionKeys,
    wireArgs,
    wireOutputs: outputs as _WireOutputs,
  });
  return impression;
}

type Variant = {
  experimentId: string;
  experimentName: string;
  variantId: string | undefined;
  variantName: string;
};

type WireVariant = {
  /** the id of the experiment */
  id: string;
  /** the name of the experiment */
  name: string;

  /** the variant, null if control */
  variant: null | {
    /** the id of the variant */
    id: string;
    /** the name of the variant */
    name: string;
  };
};

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _IServerResponse = _WireOutputs & {
  _flags: _WireFlags;
  _variants?: WireVariant[];
  errors?: Partial<Record<FeatureNames, string>>;
};

// Currently only one kind of fetch option now, do we want to get the complete set of flags
type FetchOptions = "flags";

function cleanWireArgs(wireArgs: _WireArgs | undefined): _WireArgs {
  // the line below removes all undefined attributes
  // i.e. {a:1, b:undefined} => {a:1}
  // we do this because the wire args are returned back to the client and
  // some frameworks do not like undefined across serialization boundaries
  // most notably, next.js, see:
  //   https://github.com/vercel/next.js/discussions/11209
  //
  // this should be reasonably quick, and this should not be a huge
  // increase over all the other serialization that will happen as
  // part of the request
  return wireArgs == undefined ? {} : JSON.parse(JSON.stringify(wireArgs));
}

function logIServerIssue(message: string, ...optionalParams: unknown[]): void {
  if (misc.logIServerCommErrors) log.error(message, ...optionalParams);
  else if (misc.logIServerDetails) log.info(message, ...optionalParams);
}

function logIServerIssueAsWarn(
  message: string,
  ...optionalParams: unknown[]
): void {
  if (misc.logIServerCommErrors) log.warn(message, ...optionalParams);
  else if (misc.logIServerDetails) log.info(message, ...optionalParams);
}

/**
 * Make the actual network call to the impression server to get feature and flag information
 *
 * @param impressionId
 * @param wireArgs
 * @param getFlags
 * @returns
 */
async function iserverFetch({
  options,
  impressionId,
  sessionArgs,
  implicitArgs,
  wireArgs,
}: {
  options: readonly FetchOptions[];
  impressionId?: string;
  sessionArgs: Partial<SessionArgs>;
  implicitArgs: ImplicitArgs;
  wireArgs?: _WireArgs;
}): Promise<{
  impression?: ImpressionImpl;
  flags?: _WireFlags;
  error?: ErrorTypes;
  warning?: ErrorTypes;
  activeVariants?: ActiveVariant[];
  featuresRequested: number;
  featuresReceived: number;
}> {
  const fetchOptions = [...options];

  if (misc.logIServerDetails) log.info("iserver fetch START ------");
  try {
    if (
      misc.ssr &&
      implicitArgs.ipAddress == undefined &&
      // stifle this message in development because the dev version compiles the page on
      // every render which prints this message each time
      process.env.NODE_ENV != "development"
    ) {
      log.warn(
        "Looks like you are rendering server side (SSR), did you forget to pass incomingMessage? " +
          "This message can also appear during a static build of a CSR page, in which case you can ignore it."
      );
    }

    let result: _FetchResponse | undefined = undefined;
    wireArgs = cleanWireArgs(wireArgs);
    const featuresRequested = Object.keys(wireArgs ?? {}).length;

    try {
      const body: {
        fetchOptions: FetchOptions[] | undefined;
        args: Partial<SessionArgs>;
        requests: _WireArgs | undefined;
        impressionId: string | undefined;
      } = {
        fetchOptions,
        args: { ...sessionArgs, ...implicitArgs },
        impressionId,
        requests: wireArgs,
      };

      const headers = getCausalHeaders(sessionArgs);

      const url = network.getBaseUrl() + "features";
      const payload: _FetchRequestInit = {
        method: "POST",
        body: JSON.stringify(body),
        headers,
      };

      if (misc.logIServerDetails) {
        log.info("fetch from url:", url);
        log.info("fetch with payload:", payload);
      }

      result = await network.fetch(url, payload);

      if (misc.logIServerDetails) log.info("fetch() result:", result);

      if (result == undefined) {
        const msg = "Received undefined or null fetch() result ";
        logIServerIssue(msg);
      }
    } catch (e) {
      const errMsg = "fetch threw an exception: ";
      logIServerIssue(errMsg, e);

      const error: ErrorFetch = {
        errorType: "fetch",
        message: errMsg,
      };

      return {
        impression: undefined,
        flags: undefined,
        error,
        featuresRequested,
        featuresReceived: 0,
      };
    }

    if (result == undefined) {
      const errMsg = "fetch returned null";

      const error: ErrorFetchResponse = {
        errorType: "fetchResponse",
        message: errMsg,
      };

      return {
        impression: undefined,
        flags: undefined,
        error,
        featuresRequested,
        featuresReceived: 0,
      };
    } else if (result.status != 200) {
      let errMsg = `Impression server non 200. Result = ${result.status}.`;
      if (result.text != undefined && typeof result.text == "function") {
        const errTxt = await result.text();
        errMsg += `  fetch text() response = ${errTxt}.`;
      }

      logIServerIssue(errMsg);

      const error: ErrorFetchResponse = {
        errorType: "fetchResponse",
        message: errMsg,
      };

      return {
        impression: undefined,
        flags: undefined,
        error,
        featuresReceived: 0,
        featuresRequested,
      };
    }

    let response;
    try {
      response = (await result.json()) as _IServerResponse | undefined;

      if (misc.logIServerDetails) log.info("fetch...json() response", response);

      if (response == undefined || Object.keys(response).length == 0) {
        const errMsg =
          response == undefined
            ? "Unexpected undefined or null response callling fetch...json()"
            : "Response was defined calling fetch...json(), but contained no data";
        logIServerIssue(errMsg);

        const error: ErrorFetchResponse = {
          errorType: "fetchResponse",
          message: errMsg,
        };

        return {
          impression: undefined,
          flags: undefined,
          error,
          featuresRequested,
          featuresReceived: 0,
        };
      }
    } catch (e) {
      const errMsg = "exception thrown calling fetch...json()";
      logIServerIssue(errMsg, e);

      const error: ErrorFetch = {
        errorType: "fetch",
        message: errMsg,
      };

      return {
        impression: undefined,
        flags: undefined,
        error,
        featuresRequested,
        featuresReceived: 0,
      };
    }

    const {
      _flags: responseFlags,
      errors,
      _variants,
      ...wireOutputs
    } = response;

    const impression = new ImpressionImpl({
      impressionType: "real",
      sessionKeys: sessionKeys(wireOutputs.session as SessionArgs),
      wireArgs,
      wireOutputs,
    });

    let error: ErrorTypes | undefined = undefined;
    let warning: ErrorTypes | undefined = undefined;

    let returnFlags = responseFlags;

    const { session, ...restOfFeatures } = wireOutputs ?? {};
    const featuresReceived = Object.keys(restOfFeatures ?? {}).length;

    if (featuresRequested > 0 && featuresReceived == 0) {
      const errMsg = "no features were returned by the impression server";
      logIServerIssueAsWarn(errMsg);
      warning = {
        errorType: "fetchResponse",
        message: errMsg,
      };
    }

    if (session == undefined) {
      const errMsg = "no session returned from impression server";
      logIServerIssue(errMsg);
      error = {
        errorType: "fetchResponse",
        message: errMsg,
      };
    } else if (fetchOptions?.includes("flags") && responseFlags == undefined) {
      const errMsg = "unexpected empty response flags";
      logIServerIssue(errMsg);
      error = {
        errorType: "fetchResponse",
        message: errMsg,
      };
      returnFlags = returnFlags ?? defaultFlags;
    } else if (errors != undefined) {
      error = {
        errorType: "field",
        message: "fetch succeeded, but one or more fields had an error",
        fieldErrors: errors,
      };
    }
    const activeVariants: ActiveVariant[] = (_variants ?? []).map(
      variantFromWire
    );
    sortVariants(activeVariants);

    return {
      impression,
      flags: returnFlags,
      error,
      warning,
      activeVariants,
      featuresRequested,
      featuresReceived,
    };
  } catch (e) {
    const errMsg = "unexpected iserverFetch exception.";
    logIServerIssue(errMsg, e);

    const error: ErrorFetch = {
      errorType: "fetch",
      message: errMsg,
    };

    return {
      impression: undefined,
      flags: undefined,
      error,
      featuresRequested: 0,
      featuresReceived: 0,
    };
  } finally {
    if (misc.logIServerDetails) log.info("iserver fetch END ------");
  }
}

function variantFromWire(wireVariant: WireVariant): Variant {
  return {
    experimentId: wireVariant.id,
    experimentName: wireVariant.name,
    variantId: wireVariant.variant?.id ?? undefined,
    variantName: wireVariant.variant?.name ?? "control",
  };
}

function sortVariants(variants: Variant[]) {
  variants.sort((a, b) => {
    if (a == b) return 0;
    if (a.experimentId == b.experimentId) {
      if (a.variantId == b.variantId) return 0;
      if (a.variantId == undefined) return -1;
      if (b.variantId == undefined) return 1;
      return a.variantId?.localeCompare(b.variantId);
    }
    return a.experimentId.localeCompare(b.experimentId);
  });
}

/**
 * Sends a beacon to the iserver to indicate an impression was viewed from cache
 * This will also update the impression count in the cache
 *
 * @returns true if an beacon was sent, false if the beacon was suppressed
 */
function sendImpressionBeacon(
  session: Session,
  impression: ImpressionImpl,
  impressionId: string
): void {
  const outputs = impression._.json.wireOutputs;
  const wireArgs = impression._.json.wireArgs;
  const impressionIdMap: {
    [idx: string]: { impression: string; newImpression: string | undefined };
  } = {};

  let count = 0;
  Object.entries(outputs).forEach(([featureName, _output]) => {
    const output = _output as _WireOutputs[keyof Omit<_WireOutputs, "session">];
    const args = (wireArgs as Record<string, unknown>)[featureName];

    if (
      featureName != "session" &&
      output != "OFF" &&
      output != "UNKNOWN" &&
      output != undefined
    ) {
      const entry = session._.cache.getFeature(featureName, args);
      if (entry) {
        entry.lastRender = misc.ssr ? "ssr" : "csr";
        count += 1;
        impressionIdMap[featureName] = {
          impression: output?._impressionId,
          newImpression: impressionId,
        };
        entry.impressionCount += 1;
        session._.cache.setFeature(featureName, args, entry);
      } else log.warn("entry is null, ignoring");
    }
  });

  if (count > 0) {
    network.sendBeacon(getCausalHeaders(sessionKeys(session._.args)), {
      id: impression.sessionKeys,
      impressions: impressionIdMap,
    });
  }
}

function updateSessionVariants(
  session: Session,
  iserverVariants: ActiveVariant[] | undefined,
  impressionId: string | undefined,
  impression: ImpressionImpl | undefined
): void {
  if (impressionId == undefined) {
    // no need to update active variants on a cache fill
    return;
  }

  if (impression == undefined) {
    // nothing to do
    return;
  }

  const outputs = impression._.json.wireOutputs;
  const wireArgs = impression._.json.wireArgs;

  /* --- update requested features --- */
  const prevFeatures = (session._.cache.get(requestedFeaturesKey) ??
    []) as RequestedFeature[];

  const nameToPrevFeature = new Map(
    prevFeatures.map((f) => [f.featureName, f])
  );

  const nameToFeature = new Map<string, RequestedFeature>();

  Object.entries(outputs).forEach(([featureName, _output]) => {
    const output = _output as _WireOutputs[keyof Omit<_WireOutputs, "session">];
    if (
      featureName != "session" &&
      // the impression server in theory could send back things not requested
      // in practice, this happens in unit tests
      wireArgs[featureName as FeatureNames] != undefined
    )
      nameToFeature.set(featureName, {
        featureName,
        isOn: output != "OFF" && output != "UNKNOWN",
      });
  });

  const updatedFeatures = [...nameToFeature.values()];
  const newFeatures: RequestedFeature[] = [];

  for (const [name, feature] of nameToPrevFeature) {
    if (!nameToFeature.has(name)) updatedFeatures.push(feature);
  }

  for (const [name, feature] of nameToFeature) {
    if (!nameToPrevFeature.has(name)) newFeatures.push(feature);
  }

  const sortFn = (a: RequestedFeature, b: RequestedFeature) =>
    a.featureName.localeCompare(b.featureName);
  updatedFeatures.sort(sortFn);
  newFeatures.sort(sortFn);

  /* --- update active variants --- */
  const cachedVariants = (session._.cache.get(activeVariantsKey) ??
    []) as ActiveVariant[];
  const prevVariants = cachedVariants;
  const idToPrevVariant = new Map(
    prevVariants.map((v) => [v.variantId ?? v.experimentId, v])
  );

  const newVariants: ActiveVariant[] = [];
  let updatedVariants: ActiveVariant[];

  // this will hold all variants that should now be active
  let idToVariant = new Map<string, Variant>();

  if (iserverVariants != undefined) {
    // if the iserver sent us variants, those are the ones to use
    updatedVariants = iserverVariants;
    idToVariant = new Map(
      updatedVariants.map((v) => [v.variantId ?? v.experimentId, v])
    );
  } else {
    // this impression was served out of the cache
    // we need to add any variants that are now on b/c they were cached only impressions

    idToVariant = new Map<string, Variant>();

    Object.entries(outputs).forEach(([featureName, _output]) => {
      const output = _output as _WireOutputs[keyof Omit<
        _WireOutputs,
        "session"
      >];
      const args = (wireArgs as Record<string, unknown>)[featureName];

      if (
        featureName != "session" &&
        output != "OFF" &&
        output != "UNKNOWN" &&
        output != undefined
      ) {
        const entry = session._.cache.getFeature(featureName, args);
        if (entry && entry.impressionCount == 0) {
          for (const wireVariant of output._variants ?? []) {
            const id = wireVariant.variant?.id ?? wireVariant.id;
            if (idToVariant.get(id) == undefined)
              idToVariant.set(id, variantFromWire(wireVariant));
          }
        }
      }
    });

    updatedVariants = [...idToVariant.values()];
    for (const [id, variant] of idToPrevVariant) {
      if (!idToVariant.has(id)) updatedVariants.push(variant);
    }
  }

  for (const [id, variant] of idToVariant) {
    if (!idToPrevVariant.has(id)) newVariants.push(variant);
  }

  sortVariants(newVariants);
  sortVariants(updatedVariants);

  /* --- save and notify --- */
  session._.cache.set(activeVariantsKey, updatedVariants);
  session._.cache.set(requestedFeaturesKey, updatedFeatures);

  misc.onUpdateActiveVariants(newVariants);
  misc.onImpression({
    newVariants,
    allVariants: updatedVariants,
    newFeatures,
    allFeatures: updatedFeatures,
  });
}

function updateImpressionIds(
  impression: ImpressionImpl,
  newImpressionId: string,
  wireArgs: _WireArgs
): ImpressionImpl {
  const newOutputs: Record<string, unknown> = {};
  for (const _k of Object.keys(wireArgs ?? {}) as (keyof _WireArgs)[]) {
    const k = _k as FeatureNames;
    const currentOutput = impression.toJSON().wireOutputs[k];

    // if the feature is off (or not there), don't update the impression ids
    if (
      currentOutput == "OFF" ||
      currentOutput == "UNKNOWN" ||
      currentOutput == undefined
    ) {
      newOutputs[k] = currentOutput;
    } else {
      const newOutput = {
        ...(currentOutput as any), // eslint-disable-line
        _impressionId: newImpressionId,
      };
      newOutputs[k] = newOutput;
    }
  }
  return toImpressionImpl({
    impressionType: impression.toJSON().impressionType,
    sessionKeys: impression.sessionKeys,
    wireArgs,
    wireOutputs: newOutputs,
  }) as ImpressionImpl;
}

/**
 * ErrorType indicated that a network fetch failed in some way
 */
export type ErrorFetch = {
  errorType: "fetch";
  message: string;
};

/**
 * Error type indicated the response data was invalid in some way
 */
export type ErrorFetchResponse = {
  errorType: "fetchResponse";
  message: string;
};

/**
 * Error type indicating an unknown error occurred
 */
export type ErrorUnknown = {
  errorType: "unknown";
  message: string;
};

/**
 * Error type indicating a field level error occurred
 */
export type ErrorField = {
  errorType: "field";
  message: string;
  fieldErrors: Partial<Record<FeatureNames, string>>;
};

/**
 * Union type of possible Causal error types
 */
export type ErrorTypes =
  | ErrorFetch
  | ErrorFetchResponse
  | ErrorUnknown
  | ErrorField;

type ImpressionNone = {
  state: "none";
  impression: ImpressionImpl;
};

type ImpressionCached = {
  state: "loadingCached" | "cached";
  newImpressionId: string;
  cachedImpression: ImpressionImpl;
  impression: ImpressionImpl;
  metadata: Map<string, RequestMetadata>;
};

type ImpressionLoading = {
  state: "loading";
  impression: ImpressionImpl;
};

type ImpressionDone = {
  state: "done";
  impression: ImpressionImpl;
};

type ImpressionState =
  | ImpressionNone
  | ImpressionCached
  | ImpressionLoading
  | ImpressionDone;

/**
 * A React context to hold a [[Session]]
 * This uses the standard [React context](https://reactjs.org/docs/context.html) provider pattern
 */
export const SessionContext = createContext<Session | undefined>(undefined);

/**
 * A React hook to get the current [[Session]] in the [[SessionContext]]
 * @returns [[Session]]
 */
export function useSession(): Session | undefined {
  const session = useContext(SessionContext);
  return session;
}

type ImpressionNakedType<I> = I extends Impression<infer T> ? T : never;

/**
 * Type predicate to narrows the type of an impression. Useful for narrowing union types.
 * Example:
 *   const impression: Impression&lt;A&gt; | Impression&lt;B&gt; = ...
 *   if (isImpression(impression, "A")) {
 *     impression.A // impression has been narrowed to type A
 *   }
 */
export function isImpressionType<
  I extends Impression<FeatureNames>,
  T extends ImpressionNakedType<I>
>(impression: I, toTestType: T): impression is Impression<T> & I {
  if (toTestType == undefined) return false;
  return (
    (impression as unknown as ImpressionImpl)._.json.wireArgs[
      toTestType as FeatureNames
    ] != undefined
  );
}

type FeatureExNakedType<F> = F extends Feature<infer T> ? T : never;

/**
 * Type predicate to narrows the type of a feature. Useful for narrowing union types.
 * Example:
 *   const feature: FeatureA | FeatureB = ...
 *   if (isImpression(impression, "FeatureA")) {
 *     featureA // feature has been narrowed to type FeatureA
 *   }
 */
export function isFeatureType<
  F extends Feature<FeatureNames>,
  T extends FeatureExNakedType<F>
>(feature: F | undefined, toTestType: T): feature is Feature<T> & F {
  if (toTestType == undefined) return false;
  if (feature == undefined) return false;
  return feature.featureName == toTestType;
}

/**
 * React hook to get both the impression and the on/off flags associated with a feature
 */
export function useImpression<Q extends Query<FeatureNames>>(
  query: Q | undefined,
  impressionId?: string,
  session?: Session
): {
  impression: Q extends Query<infer T> ? Impression<T> : never;
  flags: FlagsType<Q> | undefined;
  loading: boolean;
  error?: ErrorTypes;
} {
  const _sessionContext = useSession();
  session = session ?? _sessionContext;
  if (session == undefined) {
    throw new Error(
      "No session conext (SessionProvider), and no session passed in"
    );
  }

  // _session is recognized as constant through, whereas TS doesn't
  // know session will be non-null inside nested functions
  const _session = session;

  // putting into a ref so hook always returns the same loading impression when loading
  const _loadingImpression = useRef(loadingImpression(session));

  const wireArgs = query?._.wireArgs as _WireArgs;

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const errorState = useRef<ErrorTypes>();
  const impressionState = useRef<ImpressionState>({
    state: "none",
    impression: _loadingImpression.current,
  });

  const firstTime = useRef(true);
  const requestFinishTS = useRef<Date>();
  const wireArgsJson = JSON.stringify(wireArgs ? wireArgs : undefined);
  const prevSession = useRef(_session);
  const prevWireArgsJson = useRef(wireArgsJson);
  const prevFlushCount = useRef(_flushCount);
  const prevImpressionId = useRef(impressionId);

  let hasChange = false;

  // re-request as frequently as the cache expires
  // or if cache is busted
  // or if the session args change
  // or if the query changes
  // or if the impression id changes
  let nextCycle: Date | undefined = undefined;
  const now = new Date();
  if (
    requestFinishTS.current != undefined &&
    _session._.cache.outputExpirySeconds
  ) {
    nextCycle = addSeconds(
      requestFinishTS.current,
      _session._.cache.outputExpirySeconds
    );
  }

  const sessionChanged = !sessionArgsMatch(
    prevSession.current._.args,
    _session._.args
  );

  if (
    sessionChanged ||
    (nextCycle != undefined && nextCycle < now) ||
    prevWireArgsJson.current != wireArgsJson ||
    prevFlushCount.current != _flushCount ||
    prevImpressionId.current != impressionId
  ) {
    // not using useEffect / dependency array for this b/c want
    // this code to reset the state in the same render cycle,
    // the rest of the non effect code in the hook can further update it

    hasChange = true;

    // update impression state
    impressionState.current = {
      state: "none",
      impression: _loadingImpression.current,
    };

    // update prev's
    requestFinishTS.current = undefined;
    prevSession.current = _session;
    prevWireArgsJson.current = wireArgsJson;
    prevFlushCount.current = _flushCount;
    prevImpressionId.current = impressionId;
    _loadingImpression.current = loadingImpression(session);
  }

  // get cached values
  if (query != undefined && impressionState.current.state == "none") {
    const { cachedImpression, metadata } = getCachedImpression(
      session,
      wireArgs
    );

    if (
      cachedImpression != undefined &&
      impressionState.current.state == "none"
    ) {
      hasChange = true;
      const newImpressionId = impressionId ?? uuidv4();

      let useLoadingImpression = false;

      if (session._.hydrating) {
        // We did a cache transfer and are potentially hydrating an SSR render.
        // We need to take care and make sure that the SSR and the hydration render identically,
        // otherwise we will get a hydration error from react
        // we do this by delaying the render of things that were not transferred for this render
        let allHydratable = true;
        for (const v of metadata.values()) {
          if (!v.hydratable) {
            allHydratable = false;
            break;
          }
        }
        useLoadingImpression = !allHydratable;
      }

      updateSessionVariants(
        _session,
        undefined,
        newImpressionId,
        cachedImpression
      );

      if (useLoadingImpression) {
        impressionState.current = {
          state: "loadingCached",
          newImpressionId,
          impression: _loadingImpression.current,
          cachedImpression,
          metadata,
        };
      } else {
        impressionState.current = {
          state: "cached",
          newImpressionId,
          impression: updateImpressionIds(
            cachedImpression,
            newImpressionId,
            wireArgs
          ),
          cachedImpression,
          metadata,
        };
      }
    }
  }

  // let QA refresh update this component
  useEffect(() => {
    if (isCausalRegistered()) {
      registerForceUpdateFn(forceUpdate);
      return () => {
        unRegisterForceUpdateFn(forceUpdate);
      };
    }
    return undefined;
  }, []);

  // fetch results
  useEffect(() => {
    log.debug(1, "useImpression fetch results effect");

    async function request() {
      if (query != undefined) {
        log.debug(1, "useImpression fetch results effect: request()");
        log.debug(1, "request");

        const { impression, error } = await _session.requestImpression(
          query,
          impressionId
        );
        requestFinishTS.current = new Date();
        impressionState.current = {
          state: "done",
          impression: impression as unknown as ImpressionImpl,
        };
        errorState.current = error;
        forceUpdate();
      }
    }

    if (query != undefined && impressionState.current.state == "none") {
      impressionState.current = {
        state: "loading",
        impression: _loadingImpression.current,
      };
      request();
      forceUpdate();
    }
  });
  useEffect(() => {
    if (
      query != undefined &&
      impressionState.current.state == "loadingCached"
    ) {
      const newImpressionId = impressionState.current.newImpressionId;
      const cachedImpression = impressionState.current.cachedImpression;
      const metadata = impressionState.current.metadata;

      impressionState.current = {
        state: "cached",
        newImpressionId,
        impression: updateImpressionIds(
          cachedImpression,
          newImpressionId,
          wireArgs
        ),
        cachedImpression,
        metadata,
      };
      forceUpdate();
    }
  });

  // send beacons for cached impressions
  useEffect(() => {
    log.debug(1, "useImpression useEffect: cached");
    if (impressionState.current.state == "cached") {
      sendImpressionBeacon(
        _session,
        impressionState.current.cachedImpression,
        impressionState.current.newImpressionId
      );
      impressionState.current = {
        state: "done",
        impression: impressionState.current.impression,
      };
    }
  });

  // return current values
  const loading =
    impressionState.current.state == "none" ||
    impressionState.current.state == "loading" ||
    impressionState.current.state == "loadingCached";

  log.debug(3, "useImpression returning. loading", loading);

  if (hasChange && !firstTime.current) {
    forceUpdate();
  }

  firstTime.current = false;
  if (loading) session._.loadingImpressionsCount += 1;

  const flags = flagsFromImpression(impressionState.current.impression);
  return {
    loading,
    impression: impressionState.current
      .impression as unknown as ImpressionType<Q>,
    flags: flags as FlagsType<Q>,
    error: errorState.current,
  };
}

type Feature<T extends FeatureNames> = Exclude<
  Impression<FeatureNames>[T],
  undefined
> & {
  featureName: T;
  impressionId: string;
  impression: Impression<T>;
};

/**
 Converts Feature<A|B|C> into Feature<A> | Feature<B> | Feature<C>
 */
type DistributeFeature<F> = F extends Feature<infer T>
  ? T extends unknown
    ? Feature<T>
    : never
  : never;

/**
 * React hook to get a single feature.
 *  As compared to [[useImpression]] this only retrieves a single feature.
 *  If the request is loading it will returned undefined.
 *  It does NOT return an error state, so you need to be happy with the control values on error.
 */
export function useFeature<T extends FeatureNamesNoArgs>(
  featureReq: T | undefined,
  impressionId?: string,
  session?: Session
): DistributeFeature<Feature<T>> | undefined;

/**
 * React hook to get a single feature.
 *  As compared to [[useImpression]] this only retrieves a single feature.
 *  If the request is loading it will returned undefined.
 *  It does NOT return an error state, so you need to be happy with the control values on error.
 */
export function useFeature<T extends FeatureNames>(
  featureReq: Query<T> | undefined,
  impressionId?: string,
  session?: Session
): DistributeFeature<Feature<T>> | undefined;

export function useFeature<T extends FeatureNames>(
  featureReq: T | Query<T> | undefined,
  impressionId?: string,
  session?: Session
): DistributeFeature<Feature<T>> | undefined {
  let featureName: T | undefined;
  let query: Query<T> | undefined;
  if (featureReq == undefined) {
    featureName = undefined;
    query = undefined;
  } else if (typeof featureReq == "string") {
    featureName = featureReq;
    const queryArgs: QueryArgs<T> = {} as QueryArgs<T>;
    queryArgs[featureName] = {};
    query = createQuery(queryArgs);
  } else {
    query = featureReq;
    const keys = [...Object.keys(query._.wireArgs ?? {})];
    featureName = keys[0] as T | undefined;
    if (keys.length == 0) log.warn("no feature requested for useFeature");
    if (keys.length > 1) {
      log.warn(
        `More than on feature requested from useFeature, using ${featureName}. (all = ${keys}) `
      );
    }
  }

  const { impression } = useImpression(query, impressionId, session);
  const impressionImpl = impression as ImpressionImpl;
  if (impression == undefined) return undefined;
  const feature = impression[featureName as unknown as keyof Impression<T>];
  if (feature == undefined) return undefined;

  const featureOutputs =
    impressionImpl._.json.wireOutputs[featureName as FeatureNames];
  const actualImpresionId =
    featureOutputs == "OFF" || featureOutputs == "UNKNOWN"
      ? undefined
      : featureOutputs?._impressionId;

  return {
    ...(feature as unknown as Omit<
      DistributeFeature<Feature<T>>,
      "impressionId" | "Impression"
    >),
    featureName,
    impressionId: actualImpresionId,
    impression,
  } as DistributeFeature<Feature<T>>;
}

//#endregion

//#region utility

const maxDate = new Date(8640000000000000);

function makeFutureDate(secondsFromNow: number): Date {
  return new Date(Date.now() + secondsFromNow * 1000);
}

function addSeconds(date: Date, seconds: number): Date {
  return new Date(date.valueOf() + seconds * 1000);
}

//#endregion
