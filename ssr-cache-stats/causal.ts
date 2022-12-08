// This is a FeatureDL automatically generated file. DO NOT DIRECTLY EDIT, your changes will not persist.
import fetch from "cross-fetch";
import {
  useEffect,
  useReducer,
  useRef,
  useContext,
  createContext,
} from "react";

///////////////////////////////////////////////////////////////////////////////
//#region  parameterized


/** Wraps a rating box that we can put on various product pages to collect ratings from our users
 *   */
type RatingBoxWireOutputs = {
  readonly callToAction: string | undefined;
  readonly _impressionId: string;
  readonly _variants?: WireVariant[];
}

/** Wraps a rating box that we can put on various product pages to collect ratings from our users
 *   */
export class RatingBox {
    /** The product that we are collecting ratings for
     *  Default: null
     *   */
    readonly product: string;
    /** The text next to the stars that prompts the visitor to rate the product
     *  Control: "Rate this product!"
     *   */
    readonly callToAction: string;

    /** @internal */
    readonly _: {

        /**
        * when constructed from cache, this is the original impression
        * otherwise it will be the the one associated with the fetch
        */
        impression: ImpressionImpl;
        impressionId: string;
    }

    /** Occurs each time a rating is collected   
    *  */
    signalRating( { stars } 
        : {  stars : number  } ) : void
    {
      RatingBox.signalRating( this._.impression.sessionKeys, this._.impressionId, { stars, } );
    }
    /** Occurs each time a rating is collected   
      *  */
    static signalRating( sessionKeys: SessionKeys, impressionId : string,  { stars } 
        : {  stars : number  } ) : void
    {
        const _data = { 
          id : sessionKeys,
          feature: "RatingBox",
          event: "Rating",
          impressionId: impressionId,
          args: {  stars: stars  }
        };
      network.sendBeacon(_data);
    }

  constructor( 
    impression: ImpressionImpl, 
    args: NonNullable<_WireArgs["RatingBox"]>, 
    outputs: RatingBoxWireOutputs ) {
    this._ = {impression, impressionId: outputs._impressionId};
    this.product = args.product;
    if (outputs.callToAction !== undefined) {
        this.callToAction = outputs.callToAction ?? undefined;
    } else {
        this.callToAction = "Rate this product!";    }
  }
}
/** An empty feature to use only as a kill switch
 *   */
type ProductInfoWireOutputs = {
  readonly _impressionId: string;
  readonly _variants?: WireVariant[];
}

/** An empty feature to use only as a kill switch
 *   */
export class ProductInfo {

    /** @internal */
    readonly _: {

        /**
        * when constructed from cache, this is the original impression
        * otherwise it will be the the one associated with the fetch
        */
        impression: ImpressionImpl;
        impressionId: string;
    }


  constructor( 
    impression: ImpressionImpl, 
    args: NonNullable<_WireArgs["ProductInfo"]>, 
    outputs: ProductInfoWireOutputs ) {
    this._ = {impression, impressionId: outputs._impressionId};
  }
}
/** Another feature just for demonstration purposes
 *   */
type Feature2WireOutputs = {
  readonly exampleOutput: string | undefined;
  readonly _impressionId: string;
  readonly _variants?: WireVariant[];
}

/** Another feature just for demonstration purposes
 *   */
export class Feature2 {
    /** Example args
     *  Default: null
     *   */
    readonly exampleArg: string;
    /** Example output
     *  Control: "Example output"
     *   */
    readonly exampleOutput: string;

    /** @internal */
    readonly _: {

        /**
        * when constructed from cache, this is the original impression
        * otherwise it will be the the one associated with the fetch
        */
        impression: ImpressionImpl;
        impressionId: string;
    }

    /** Example event   
    *  */
    signalExampleEvent( { data } 
        : {  data : string  } ) : void
    {
      Feature2.signalExampleEvent( this._.impression.sessionKeys, this._.impressionId, { data, } );
    }
    /** Example event   
      *  */
    static signalExampleEvent( sessionKeys: SessionKeys, impressionId : string,  { data } 
        : {  data : string  } ) : void
    {
        const _data = { 
          id : sessionKeys,
          feature: "Feature2",
          event: "ExampleEvent",
          impressionId: impressionId,
          args: {  data: data  }
        };
      network.sendBeacon(_data);
    }

  constructor( 
    impression: ImpressionImpl, 
    args: NonNullable<_WireArgs["Feature2"]>, 
    outputs: Feature2WireOutputs ) {
    this._ = {impression, impressionId: outputs._impressionId};
    this.exampleArg = args.exampleArg;
    if (outputs.exampleOutput !== undefined) {
        this.exampleOutput = outputs.exampleOutput ?? undefined;
    } else {
        this.exampleOutput = "Example output";    }
  }
}

/**
 * The arguments defined in the args section of the FDL schema
 */
export type SessionArgs = {
   deviceId: string;
};

function sseUrl( s : Partial<SessionArgs> ) {
  let sseUrl = network.getBaseUrl().replace(
        /\/?$/,
        "/sse?id=");
  if ( s.deviceId != undefined)
      sseUrl += s.deviceId + "+";
  return sseUrl;
}

class ImpressionImpl implements Impression<FeatureNames> {
  readonly _: {json: ImpressionJSON<FeatureNames>};

  // Note: There is no impression id declared at this level
  // The features have impression ids as part of their outputs

  toJSON() {
    return this._.json;
  }

  get sessionKeys() {
    return this._.json.sessionKeys;
  }

  constructor(impressionJson: ImpressionJSON<FeatureNames>) {
    this._ = {json: impressionJson};
    const { wireArgs, wireOutputs } = impressionJson;
    for (const [featureName, args] of Object.entries(wireArgs) as [
      keyof _WireArgs,
      _WireArgs[keyof _WireArgs]
    ][]) {
      const output = wireOutputs[featureName];

      let featureHasData;
      switch (impressionJson.impressionType) {
        case "error":
          featureHasData = defaultFlags[featureName];
          break;
        case "loading":
          featureHasData = false;
          break;
        case "real":
          featureHasData = output != "OFF" && output !== undefined;
          if (output == undefined) {
            log.warn("undefined or null output for " + featureName + ". Using defaults.");
            featureHasData = defaultFlags[featureName];            
          }
      }

      if (featureHasData) {
        (this as any)[featureName] = new (allFeatureTypes as any)[featureName]( // eslint-disable-line
          this,
          args as any, // eslint-disable-line
          (output == undefined
            ? { _impressionId: "errNoOutputs" }
            : output) as any // eslint-disable-line
        ) as any; // eslint-disable-line
      }
    }
  }

  RatingBox?: RatingBox 
  ProductInfo?: ProductInfo 
  Feature2?: Feature2 

}

/**
 * Represents the type of a query, both its features and arguments. 
 * 
 * The type signature looks complicated, but it just represents an object that maps the selected feature names to the corresponding feature arguments.
 * This type generally will not be constructed manually, but instead be inferred from the return value of [[queryBuilder]] or [[createQuery]]. 
 * The typing will then cary through to all the other Causal functions like [[useImpression]] and [[requestImpression]].
 *
 * @paramtype The feature to query for
 */
export type QueryArgs<T extends FeatureNames> = 
    /** Wraps a rating box that we can put on various product pages to collect ratings from our users
     *   */
    & ("RatingBox" extends T ?   
      { RatingBox : 
          {  product : string  } } : unknown ) 
    /** An empty feature to use only as a kill switch
     *   */
    & ("ProductInfo" extends T ?   
      { ProductInfo : 
          { _ignore_forceExcessPropertyCheck?: undefined } } : unknown ) 
    /** Another feature just for demonstration purposes
     *   */
    & ("Feature2" extends T ?   
      { Feature2 : 
          {  exampleArg : string  } } : unknown ) 

      

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
  const query = new Query<T>();
  const _args = args as unknown as QueryArgs<FeatureNames>; // cast needed for older versions of typescript
   
  if (_args.RatingBox !== undefined)
    query.getRatingBox(_args.RatingBox);
  if (_args.ProductInfo !== undefined)
    query.getProductInfo();
  if (_args.Feature2 !== undefined)
    query.getFeature2(_args.Feature2);
  return query;
}

/** 
* Features to query, along with their arguments.
*
* A query is created by using either [[queryBuilder]] or [[createQuery]].
*
* A query is executed by calling either [[requestImpression]] or [[useImpression]].
*
*/
export class Query<T extends FeatureNames>{
    /** Wraps a rating box that we can put on various product pages to collect ratings from our users
     *   */
    getRatingBox( { product } 
      : {  product : string  } )
        : Query<T | "RatingBox"> {
        this._.wireArgs['RatingBox'] = { product: product, }
        return this
    }
    /** An empty feature to use only as a kill switch
     *   */
    getProductInfo()
        : Query<T | "ProductInfo"> {
        this._.wireArgs['ProductInfo'] = { }
        return this
    }
    /** Another feature just for demonstration purposes
     *   */
    getFeature2( { exampleArg } 
      : {  exampleArg : string  } )
        : Query<T | "Feature2"> {
        this._.wireArgs['Feature2'] = { exampleArg: exampleArg, }
        return this
    }

    /** @internal **/
    readonly _: {wireArgs: _WireArgs} = {wireArgs: {}};
}

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _WireArgs = {
    RatingBox?:  { 
      product: string
       },
    ProductInfo?:       Record<string, never>,
    Feature2?:  { 
      exampleArg: string
       },

};

const featureNames = [
    "RatingBox",
    "ProductInfo",
    "Feature2",
] as const;

type FeatureNames = typeof featureNames[number];


/**
 * An object of the form `{"FeatureName": FeatureType}` for all features
 * Useful as an object to autocomplete off of.
 */
export const allFeatureTypes = {
    RatingBox,
    ProductInfo,
    Feature2,
    };

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _WireOutputs = {
    session?: SessionArgs;
    RatingBox?:RatingBoxWireOutputs | "OFF";
    ProductInfo?:ProductInfoWireOutputs | "OFF";
    Feature2?:Feature2WireOutputs | "OFF";
}

type SessionKeys = {
    /**  Default: null */
    deviceId?: string
    };

function sessionKeys( s : Partial<SessionArgs> ) : SessionKeys {
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

type Impression<T extends FeatureNames> =
    & ("RatingBox" extends T ? { RatingBox?:RatingBox } : unknown)
    & ("ProductInfo" extends T ? { ProductInfo?:ProductInfo } : unknown)
    & ("Feature2" extends T ? { Feature2?:Feature2 } : unknown)
    & { sessionKeys: SessionKeys }
    & { toJSON(): ImpressionJSON<T> }
    & { _: {json: ImpressionJSON<T>} }
    & {
    }

/**
 * @internal
 * Do not use - only exported for testing
 */
export type _WireFlags = {
    RatingBox: boolean;
    ProductInfo: boolean;
    Feature2: boolean;

};

type Flags<T extends FeatureNames> = 
    & ("RatingBox" extends T ? { RatingBox: boolean } : unknown )
    & ("ProductInfo" extends T ? { ProductInfo: boolean } : unknown )
    & ("Feature2" extends T ? { Feature2: boolean } : unknown )


/**
 * The state of the feature flags when the FDL was compiled to this file.
 */
export const defaultFlags: Flags<FeatureNames> = {
    RatingBox: true,
    ProductInfo: true,
    Feature2: true,
};

export class Session {
  /**
   * Construct a session from partial session arguments. Note: To use this, you need to have the impression server configured to accept partial session arguments
   *
   * @param deviceId
   * @param req
   * @returns
   */
  static fromDeviceId( deviceId: string, req?: IncomingMessage): Session {
      const sessionArgs: Partial<SessionArgs> = { deviceId:deviceId };
      return new Session(sessionArgs as SessionArgs, req);
  }


//#endregion
///////////////////////////////////////////////////////////////////////////////

  /** @internal */
  _: {
    args: Partial<SessionArgs>;
    implicitArgs: ImplicitArgs;
    cache: _Cache;
    activeVariants: ActiveVariant[];
    originator: "ssr" | "csr";
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
    const _backingStore = makeBackingStore(
      misc.ssr ? cacheOptions.ssrCacheType : cacheOptions.csrCacheType,
      cacheOptions.makeCustomStore
    );
    const _cache = new _Cache(args, _backingStore, cacheOptions);

    this._ = {
      args,
      cache: _cache,
      implicitArgs: {},
      activeVariants: [],
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
    };

    if (req) this.addIncomingMessageArgs(req);
    this._.cache.testAndTouchSession();
  }

  /**
   * Mark the session as still active
   */
  keepAlive(): boolean {
    // rate limit the keep alives to no more than 1 per second
    if (Date.now() - Session.lastKeepAlive > 1000) {
      Session.lastKeepAlive = Date.now();
      network.sendBeacon({ id: this._.args });
      return true;
    }
    return false;
  }
  static lastKeepAlive = 0;

  /**
   * The currently active experiment variants
   */
  get activeVariants(): ActiveVariant[] {
    return this._.activeVariants;
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
    session._.activeVariants = json.activeVariants;
    session._.originator = json.originator;

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
  async requestImpression<T extends FeatureNames>(
    query: Query<T>,
    impressionId?: string
  ): Promise<{
    impression: Impression<T>;
    flags: Flags<T>;
    error?: ErrorTypes;
  }> {
    if (impressionId == undefined) impressionId = uuidv4();
    return requestImpression(this, query, impressionId);
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
   * @param sessionArgs The session args as defined in the FDL
   * @param impressionId The impression id.
   *
   */
  async requestCacheFill<T extends FeatureNames>(
    query: Query<T>
  ): Promise<void> {
    await requestImpression(this, query, undefined);
  }

  /**
   * @deprecated Please use [[requestImpression]].
   * Async function to get the on/off flags associated with a feature.
   *
   * @returns A promise that will resolve with the current set of feature flags.
   * On an error, it will return the default flags and an additional informational error value.
   *
   */
  async requestFlags(session: Session): Promise<{
    flags: Flags<FeatureNames>;
    error?: ErrorTypes;
  }> {
    const args = session._.args;

    const cache = session._.cache;
    const cachedFlags = cache.flags();
    if (cachedFlags != undefined) return { flags: cachedFlags };

    const {
      flags: responseFlags,
      error,
      warning,
      featuresRequested,
      featuresReceived,
    } = await iserverFetch({
      sessionArgs: args,
      implicitArgs: session._.implicitArgs,
      options: ["flags"],
    });

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

    if (!error) {
      if (responseFlags == undefined)
        log.warn("no error requesting flags, but no responseFlags");
      else {
        cache.setFlags(responseFlags);
      }
    }

    // cache.flags() is very likely to be undefined, but on the off
    // chance a different request completed, including here
    return { flags: responseFlags ?? cache.flags() ?? defaultFlags, error };
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

type ImplicitArgs = {
  userAgent?: string;
  ipAddress?: string;
  entryUrl?: string;
  clientType?: string;
};

async function requestImpression<T extends FeatureNames>(
  session: Session,
  query: Query<T>,
  impressionId: string | undefined
): Promise<{
  impression: Impression<T>;
  flags: Flags<T>;
  error?: ErrorTypes;
}> {
  const cache = session._.cache;

  const { cachedImpression, cachedFlags } = getCachedImpression<T>(
    session,
    query._.wireArgs
  );

  if (cachedImpression != undefined && cachedFlags != undefined) {
    let impression = cachedImpression;
    if (impressionId != undefined) {
      // not a cache fill
      updateSessionVariants(session, cachedImpression);
      sendImpressionBeacon(session, cachedImpression, impressionId);
      impression = updateImpressionIds(
        cachedImpression,
        impressionId,
        query._.wireArgs
      );
    }

    return {
      impression,
      flags: cachedFlags as Flags<T>, // cast needed for older version of TS
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
    wireArgs: query._.wireArgs,
  });

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

  if (activeVariants) session._.activeVariants = activeVariants;

  if (impression) {
    cache.setOutputs(
      query._.wireArgs,
      impression.toJSON().wireOutputs,
      impressionId == undefined
    );
    return {
      impression: impression as unknown as Impression<T>,
      flags: flagsFromImpression(impression) as Flags<T>, // cast needed for older version of TS
      error,
    };
  } else {
    const errImpression = errorImpression(session, "Fetch Failure", {
      wireArgs: query._.wireArgs,
    }) as Impression<T>;

    return {
      impression: errImpression,
      flags: flagsFromImpression(errImpression),
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

function flagsFromImpression(impression?: undefined): undefined;

function flagsFromImpression<T extends FeatureNames>(
  impression: Impression<T>
): Flags<T>;

function flagsFromImpression<T extends FeatureNames>(
  impression?: Impression<T>
): Flags<T> | undefined {
  if (impression == undefined) return undefined;

  const wireArgs = impression._.json.wireArgs;
  const wireOutputs = impression._.json.wireOutputs;
  const flags: Partial<Flags<FeatureNames>> = {};
  for (const k of Object.keys(wireArgs)) {
    const v = wireOutputs[k as FeatureNames];
    const key = k as FeatureNames;
    if (v === undefined) flags[key] = defaultFlags[key];
    else flags[key] = v != "OFF";
  }

  return flags as Flags<T>;
}

function getCachedImpression<T extends FeatureNames>(
  session: Session,
  wireArgs: _WireArgs
): {
  cachedImpression?: Impression<T>;
  cachedFlags?: Flags<T>;
  metadata: Map<string, RequestMetadata>;
} {
  const cache = session._.cache;

  const outputs = cache.outputs(wireArgs);
  if (outputs == undefined) return { metadata: new Map() };
  const { wireOutputs: cachedOutputs, metadata } = outputs;

  const cachedImpression: Impression<T> = toImpression({
    impressionType: "real", // only cache real impressions, not errors or loads
    wireArgs,
    sessionKeys: sessionKeys(session._.args),
    wireOutputs: cachedOutputs,
  });

  const cachedFlags = flagsFromImpression(cachedImpression);

  return {
    cachedImpression,
    cachedFlags,
    metadata,
  };
}

function loadingImpression<T extends FeatureNames>(
  session: Session
): Impression<T> {
  const impression = new ImpressionImpl({
    impressionType: "loading",
    sessionKeys: sessionKeys(session._.args),
    wireArgs: {},
    wireOutputs: {} as _WireOutputs,
  });
  return impression as unknown as Impression<T>;
}

function errorImpression<T extends FeatureNames>(
  session: Session | undefined,
  reason: string,
  { wireArgs }: Pick<ImpressionJSON<T>, "wireArgs">
): Impression<T> {
  const impression = new ImpressionImpl({
    sessionKeys: session ? sessionKeys(session._.args) : ({} as SessionKeys),
    impressionType: "error",
    reason,
    wireArgs: cleanWireArgs(wireArgs),
    wireOutputs: {} as _WireOutputs,
  });
  return impression as unknown as Impression<T>;
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

  /** useServerSentEvents: Use server side events to update features
   *  defaults to true for CSR, unless caching is disabled
   *
   *  setting to false will prevent push updates to feature outputs,
   *  in which case features will only update when the cache expires
   */
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
  eventSource: EventSource | undefined;
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

    if (sessionArgs == undefined) return;

    // register server side events
    this.eventSource = undefined;
    if (
      sessionArgs != undefined &&
      !misc.ssr &&
      !this.backingStore.dontStore() &&
      this.useServerSentEvents
    ) {
      if (!network.newEvtSource) {
        throw new Error("fatal: can not register server sent events");
      } else {
        const url = sseUrl(sessionArgs);
        this.eventSource = network.newEvtSource(url);
        this.eventSource.addEventListener(
          "flushcache",
          this.sseFlushCache.bind(this)
        );
        this.eventSource.addEventListener(
          "flushfeatures",
          this.sseFlushFeatures.bind(this)
        );
        this.eventSource.addEventListener("hello", this.sseHello.bind(this));
      }
    }
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
   * @returns false if the caller should short circuit
   */
  testAndTouchSession(): boolean {
    log.debug(5, "testAndTouchSession");
    if (this.backingStore.dontStore()) return false;

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

    const curSessionArgs = this.sessionArgs;
    if (
      !this.backingStore.isEmpty() &&
      oldCacheInfo?.sessionArgs &&
      !sessionArgsMatch(oldCacheInfo.sessionArgs, curSessionArgs)
    ) {
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

    return true;
  }

  getOutputExpiry() {
    if (this.outputExpirySeconds == undefined) return maxDate;
    return makeFutureDate(this.outputExpirySeconds);
  }

  flags(): Flags<FeatureNames> | undefined {
    if (!this.testAndTouchSession()) return undefined;

    const value = this.get(flagsKey);
    if (value == undefined) return undefined;
    return value as Flags<FeatureNames>;
  }

  setFlags(flags: Flags<FeatureNames>) {
    if (!this.testAndTouchSession()) return;
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
    if (!this.testAndTouchSession()) return undefined;

    const outputs: _WireOutputs = {};
    const metadata: Map<string, RequestMetadata> = new Map();

    let allCached = true;

    const sessionOutput = this.getFeature("session", this.sessionArgs);
    if (sessionOutput == undefined) {
      allCached = false;
      this.addCacheMiss("session");
      this.addCacheMiss(...Object.keys(wireArgs));
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
    if (!this.testAndTouchSession()) return;
    const nextExpiry = this.getOutputExpiry();

    for (const [featureName, v] of Object.entries(wireOutputs) as [
      keyof _WireOutputs,
      _WireOutputs[keyof _WireOutputs]
    ][]) {
      if (featureName == "session") {
        this.setFeature(featureName, this.sessionArgs, {
          value: v,
          expires: nextExpiry,
        });
      } else {
        const wireArg = wireArgs[featureName];
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
  }

  // handle the "flushfeatures" sse.
  // flush the cache for the feature names listed in the data.
  sseFlushFeatures(evt: Event) {
    if (this.backingStore.dontStore()) return;

    const mevt: MessageEvent = evt as MessageEvent;
    _flushCount++;
    this.sseMaybeDel(mevt.data, null);
  }

  sseHello(evt: Event) {
    if (this.backingStore.dontStore()) return;
    const mevt: MessageEvent = evt as MessageEvent;
    const cacheVersion = this.get(sseInfoKey) as number;
    if (cacheVersion != undefined && mevt.data != cacheVersion)
      this.deleteAll(true);
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
 * This represents an active experiment variant within Causal.
 *
 * Active variants are available on the [[Session.activeVariants]]
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
 * A function that wil get called with various reporting information
 * such as all the active experiment/variants in effect
 */
export type ReportFn = (data: { variants: ActiveVariant[] }) => void;

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
   * useServerSentEvents: Use server side events to update features.
   * Defaults to true for registered devices, false otherwise.
   */
  useServerSentEvents?: boolean;

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
   * If true, log to warn() any errors communicating with the iserver.
   * Errors include timeouts, exceptions thrown from fetch, and empty responses.
   *
   * The default is true.
   */
  logIServerCommErrors?: boolean;
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
   * By default, when running in the browser, Causal uses Navigator.sendBeacons to send non synchronous data.
   * By default, when running in node, Causal uses fetch.
   * You can alter this behavior by setting this function
   */
  sendBeacon?: (data: unknown) => void;

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
   * By default this is true if typeof window == "undefined" or typeof localStorage == "undefined", otherwise false
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
  Required<Pick<CausalOptions, "logIServerDetails" | "logIServerCommErrors">>;

const defaultSSR = typeof window == "undefined";

const defaultMisc: MiscOptions = {
  ssr: defaultSSR,
  logIServerDetails: false,
  logIServerCommErrors: true,
};
const misc: MiscOptions = { ...defaultMisc };

function isCausalRegistered() {
  try {
    return window.localStorage?.getItem(causalRegisteredKey) == "true" ?? false;
  } catch {
    return false;
  }
}

const defaultCacheOptions: Required<CacheOptions> = {
  outputExpirySeconds: 60 * 60 * 24 * 365 * 100, // 100 years (so will expire with the session)
  useServerSentEvents: defaultSSR ? false : isCausalRegistered(),
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
  sendBeacon: (data: unknown) => {
    if (typeof navigator == "undefined") {
      // we are running server side
      log.debug(2, "defaultSendBeacon as fetch");
      network.fetch(network.getBaseUrl() + "signal", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } else {
      log.debug(2, "defaultSendBeacon as beacon");
      navigator.sendBeacon(
        network.getBaseUrl() + "signal",
        JSON.stringify(data)
      );
    }
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
    sendBeacon: debugOptions?.sendBeacon ?? defaultNetwork.sendBeacon,
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
      options?.useServerSentEvents ?? defaultCacheOptions.useServerSentEvents,
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
  return new Query();
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
 *
 * @typeparam T Type information for the impression. Use the same type when converting back to an impression with [[toImpression]].
 */
export type ImpressionJSON<T extends FeatureNames> = {
  /** @internal */
  t?: T; // unused - suppresses T is unused error

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
export function toImpression<T extends FeatureNames>({
  impressionType,
  sessionKeys,
  wireArgs,
  wireOutputs: outputs,
}: ImpressionJSON<T>): Impression<T> {
  const impression = new ImpressionImpl({
    impressionType,
    sessionKeys,
    wireArgs,
    wireOutputs: outputs as _WireOutputs,
  });
  return impression as unknown as Impression<T>;
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
export type IServerResponse = _WireOutputs & {
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
  flags?: Flags<FeatureNames>;
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

    let response = undefined;
    try {
      response = (await result.json()) as IServerResponse | undefined;

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
      logIServerIssue(errMsg);
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

    if (featureName != "session" && output != "OFF" && output != undefined) {
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
    network.sendBeacon({
      id: impression.sessionKeys,
      impressions: impressionIdMap,
    });
  }
}

function updateSessionVariants(
  session: Session,
  impression: ImpressionImpl
): void {
  const outputs = impression._.json.wireOutputs;
  const wireArgs = impression._.json.wireArgs;

  // this will hold all variants that should now be active
  const variantIdToVariant = new Map<string, Variant>();

  Object.entries(outputs).forEach(([featureName, _output]) => {
    const output = _output as _WireOutputs[keyof Omit<_WireOutputs, "session">];
    const args = (wireArgs as Record<string, unknown>)[featureName];

    if (featureName != "session" && output != "OFF" && output != undefined) {
      const entry = session._.cache.getFeature(featureName, args);
      if (entry && entry.impressionCount == 0) {
        for (const wireVariant of output._variants ?? []) {
          const id = wireVariant.variant?.id ?? wireVariant.id;
          if (variantIdToVariant.get(id) == undefined)
            variantIdToVariant.set(id, variantFromWire(wireVariant));
        }
      }
    }
  });

  if (variantIdToVariant.size > 0) {
    // we have some variants to turn on,
    // combine them with existing variants
    for (const variant of session._.activeVariants) {
      variantIdToVariant.set(
        variant.variantId ?? variant.experimentId,
        variant
      );
    }
    const sortMeVariants = [...variantIdToVariant.values()];
    sortVariants(sortMeVariants);
    session._.activeVariants = sortMeVariants;
  }
}

function updateImpressionIds<T extends FeatureNames>(
  impression: Impression<T>,
  newImpressionId: string,
  wireArgs: _WireArgs
): Impression<T> {
  const newOutputs: _WireOutputs = {};
  for (const k of Object.keys(wireArgs) as (keyof _WireArgs)[]) {
    const currentOutput = impression.toJSON().wireOutputs[k];

    // if the feature is off (or not there), don't update the impression ids
    if (currentOutput == "OFF" || currentOutput == undefined) {
      // Casting b/c it can be too much for TS to understand
      (newOutputs as { [idx: string]: unknown })[k] = currentOutput;
    } else {
      const newOutput: { _impressionId: string } = {
        ...(currentOutput as any), // eslint-disable-line
        _impressionId: newImpressionId,
      };
      // Casting b/c it can be too much for TS to understand
      (newOutputs as { [idx: string]: unknown })[k] = newOutput;
    }
  }
  return toImpression({
    impressionType: impression.toJSON().impressionType,
    sessionKeys: impression.sessionKeys,
    wireArgs,
    wireOutputs: newOutputs,
  });
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

type FlagsNone = { state: "none" };
type FlagsLoading = { state: "loading" };
type FlagsDone<T extends FeatureNames> = { state: "done"; flags: Flags<T> };

type FlagsState<T extends FeatureNames> =
  | FlagsNone
  | FlagsLoading
  | FlagsDone<T>;

/**
 * @deprecated please use [[useImpression]]
 * React hook to get the on/off flags associated with a feature
 */
export function useFlags(session?: Session): {
  loading: boolean;
  flags: Flags<FeatureNames> | undefined;
  error: ErrorTypes | undefined;
} {
  const _session = useSession();
  session = session ?? _session;
  if (session == undefined) {
    throw new Error(
      "No session conext (SessionProvider), and no session passed in"
    );
  }

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const errorState = useRef<ErrorTypes>();
  const flagsState = useRef<FlagsState<FeatureNames>>({ state: "none" });
  const prevSession = useRef(session);
  const prevFlushCount = useRef(_flushCount);
  let hasChange = false;

  const cache = session._.cache;

  // re-request if cache is busted or if the session changes
  if (
    !sessionArgsMatch(prevSession.current._.args, session._.args) ||
    prevFlushCount.current != _flushCount
  ) {
    // not using useEffect / dependency array for this b/c want
    // this code to reset the state in the same render cycle,
    // the rest of the non effect code in the hook can further update it
    hasChange = true;
    flagsState.current = { state: "none" };

    // update prev's
    prevSession.current = session;
    prevFlushCount.current = _flushCount;
  }

  // get cached values
  const _cacheFlags = cache.flags();
  if (flagsState.current.state == "none" && _cacheFlags != undefined) {
    hasChange = true;
    flagsState.current = {
      state: "done",
      flags: _cacheFlags,
    };
  }

  // fetch results
  useEffect(() => {
    log.debug(1, "useFlags fetch results effect");

    async function request() {
      log.debug(1, "useFlags fetch results effect: request()");
      if (!session) {
        throw new Error(
          "unexpected undefined session in useFlags(), useEffect"
        );
      }

      log.debug(1, "request");

      const { flags, error } = await session.requestFlags(session as Session);
      flagsState.current = {
        state: "done",
        flags,
      };
      errorState.current = error;
      forceUpdate();
    }

    if (flagsState.current.state == "none") {
      flagsState.current = { state: "loading" };
      request();
      forceUpdate();
    }
  });

  // return current values
  const loading =
    flagsState.current.state == "none" || flagsState.current.state == "loading";

  log.debug(3, "useFlags returning. loading", loading);

  let flags: Flags<FeatureNames> | undefined = undefined;
  if (flagsState.current.state == "done") flags = flagsState.current.flags;

  if (hasChange) forceUpdate();

  return {
    loading,
    flags: flags,
    error: errorState.current,
  };
}

type ImpressionNone<T extends FeatureNames> = {
  state: "none";
  impression: Impression<T>;
};

type ImpressionCached<T extends FeatureNames> = {
  state: "loadingCached" | "cached";
  newImpressionId: string;
  cachedImpression: Impression<T>;
  impression: Impression<T>;
  metadata: Map<string, RequestMetadata>;
};

type ImpressionLoading<T extends FeatureNames> = {
  state: "loading";
  impression: Impression<T>;
};

type ImpressionDone<T extends FeatureNames> = {
  state: "done";
  impression: Impression<T>;
};

type ImpressionState<T extends FeatureNames> =
  | ImpressionNone<T>
  | ImpressionCached<T>
  | ImpressionLoading<T>
  | ImpressionDone<T>;

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

/**
 * React hook to get both the impression and the on/off flags associated with a feature
 */
export function useImpression<T extends FeatureNames>(
  query: Query<T>,
  impressionId?: string,
  session?: Session
): {
  impression: Impression<T>;
  flags: Flags<T> | undefined;
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
  const _loadingImpression = useRef<Impression<T>>(loadingImpression(session));

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const errorState = useRef<ErrorTypes>();
  const impressionState = useRef<ImpressionState<T>>({
    state: "none",
    impression: _loadingImpression.current,
  });

  const firstTime = useRef(true);
  const requestFinishTS = useRef<Date>();
  const wireArgsJson = JSON.stringify(query._.wireArgs);
  const prevSession = useRef(_session);
  const prevWireArgsJson = useRef(wireArgsJson);
  const prevFlushCount = useRef(_flushCount);
  const prevImpressionId = useRef(impressionId);

  let hasChange = false;

  // re-request as frequently as the cache expires
  // or if cache is busted
  // or if the session args change
  // or if the query changes
  // of it the impression id changes
  let nextCycle: Date | undefined = undefined;
  const now = new Date();
  if (
    requestFinishTS.current != undefined &&
    _session._.cache.outputExpirySeconds
  )
    nextCycle = addSeconds(
      requestFinishTS.current,
      _session._.cache.outputExpirySeconds
    );

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
  if (impressionState.current.state == "none") {
    const { cachedImpression, metadata } = getCachedImpression<T>(
      session,
      query._.wireArgs
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

      updateSessionVariants(_session, cachedImpression);

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
            query._.wireArgs
          ),
          cachedImpression,
          metadata,
        };
      }
    }
  }

  // fetch results
  useEffect(() => {
    log.debug(1, "useImpression fetch results effect");

    async function request() {
      log.debug(1, "useImpression fetch results effect: request()");
      log.debug(1, "request");

      const { impression, error } = await _session.requestImpression(
        query,
        impressionId
      );
      requestFinishTS.current = new Date();
      impressionState.current = {
        state: "done",
        impression,
      };
      errorState.current = error;
      forceUpdate();
    }

    if (impressionState.current.state == "none") {
      impressionState.current = {
        state: "loading",
        impression: _loadingImpression.current,
      };
      request();
      forceUpdate();
    }
  });

  useEffect(() => {
    if (impressionState.current.state == "loadingCached") {
      const newImpressionId = impressionState.current.newImpressionId;
      const cachedImpression = impressionState.current.cachedImpression;
      const metadata = impressionState.current.metadata;

      impressionState.current = {
        state: "cached",
        newImpressionId,
        impression: updateImpressionIds(
          cachedImpression,
          newImpressionId,
          query._.wireArgs
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
    impression: impressionState.current.impression,
    flags,
    error: errorState.current,
  };
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
