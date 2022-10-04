// This is a FeatureDL automatically generated file. DO NOT DIRECTLY EDIT, your changes will not persist.
import fetch from "cross-fetch";
import React, { useEffect, useReducer, useRef, useContext } from "react";

///////////////////////////////////////////////////////////////////////////////
//#region  parameterized


/** Wraps a rating box that we can put on various product pages to collect ratings from our users
 *   */
type RatingBoxWireOutputs = {
  readonly callToAction: string | undefined;
  readonly _impressionId: string;
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

    // the features requested since this session object was constructed
    requestedFeatures: Set<FeatureNames>;
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
      requestedFeatures: new Set(),
      activeVariants: [],
    };

    if (req) this.addIncomingMessageArgs(req);
    this._.cache.testAndTouchSession();
  }

  /**
   * The currently active experiment variants
   */
  get activeVariants(): ActiveVariant[] {
    return this._.activeVariants;
  }

  /**
   * Serializes a session to JSON. Used in conjunction with [[fromJSON]]. Useful to transfer a session across a JSON serialization boundary
   *
   * @returns the serialized JSON
   */
  toJSON(): SessionJSON {
    const cacheJson: Record<string, _CacheStoreEntry> = {};
    for (const key of this._.cache.backingStore.keys()) {
      let entry = this._.cache.backingStore.get(key);
      if (entry) {
        if (this._.requestedFeatures.has(key as FeatureNames)) {
          // b/c this cache is getting transferred,
          // the first read from cache has already accounted for
          entry = { ...entry, suppressBeaconCount: 1 };
          cacheJson[key] = entry;
        } else cacheJson[key] = entry;
      }
    }

    const json: SessionJSON = {
      sessionArgs: this._.args,
      cacheJson,
      originator: misc.ssr ? "ssr" : "csr",
      activeVariants: this.activeVariants,
    };

    // the line below removes all undefined attributes
    // some frameworks do not like undefined across serialization boundaries
    // most notably, next.js, see:
    //   https://github.com/vercel/next.js/discussions/11209
    return JSON.parse(JSON.stringify(json));
  }

  /**
   * Converts serialized JSON back to a session. Used in conjunction with [[toJSON]]. Useful to transfer a session across a JSON serialization boundary
   *
   * @returns the serialized JSON
   */
  static fromJSON(json: SessionJSON): Session {
    // if the session args are different,
    // creating the session will (correctly) clear the cache
    const session = new Session(json.sessionArgs as SessionArgs);
    session._.activeVariants = json.activeVariants;

    // if we are going from csr to csr (i.e. we are in the same browser)
    // and we are using local storage as the backing store, no need to actually transfer
    const csrSelfDelete = false;

    const delAll =
      csrSelfDelete ||
      misc.ssr == true ||
      json.originator == "ssr" ||
      (cacheOptions.csrCacheType != "localStorage" &&
        cacheOptions.csrCacheType != "customLocalStorage");

    // we are doing a cache transfer, assume the incoming cache
    // this avoids issues with hydration
    if (delAll) session._.cache.backingStore.delAll();

    // transfer the cache entries
    const cacheJson = json.cacheJson;
    if (cacheJson != undefined) {
      for (const [k, entry] of Object.entries(cacheJson)) {
        if (entry) session._.cache.backingStore.set(k, entry);
      }
    }

    return session;
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
   * Please note - The return value is strongly typed. A TypeDoc documentation generation bug shows it as an Object here. It returns the same values as [[useImpression]].
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

    Object.keys(query._.wireArgs).forEach((k) =>
      this._.requestedFeatures.add(k as FeatureNames)
    );

    const cache = this._.cache;

    const { cachedImpression, cachedFlags, metadata } = getCachedImpression<T>(
      this,
      query._.wireArgs
    );

    if (
      cachedImpression != undefined &&
      cachedFlags != undefined &&
      metadata != undefined
    ) {
      let impression: Impression<T>;
      if (sendImpressionBeacon(cachedImpression, impressionId, metadata)) {
        impression = updateImpressionIds(
          cachedImpression,
          impressionId,
          query._.wireArgs
        );
      } else impression = cachedImpression;
      this._.cache.updateFromMetadata(metadata);
      return {
        impression,
        flags: cachedFlags as Flags<T>, // cast needed for older version of TS
      };
    }

    const fetchOptions: FetchOptions[] = [];

    const { flags, impression, error, activeVariants } = await iserverFetch({
      options: fetchOptions,
      impressionId,
      sessionArgs: this._.args,
      implicitArgs: this._.implicitArgs,
      wireArgs: query._.wireArgs,
    });

    // not needed for the impression stuff, but might as well cache them since we got them
    if (flags) cache.setFlags(flags);

    if (activeVariants) this._.activeVariants = activeVariants;

    if (impression) {
      cache.setOutputs(query._.wireArgs, impression.toJSON().wireOutputs);
      return {
        impression: impression as unknown as Impression<T>,
        flags: flagsFromImpression(impression) as Flags<T>, // cast needed for older version of TS
        error,
      };
    } else {
      const errImpression = errorImpression(this, "Fetch Failure", {
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
   * @deprecated Please use [[requestImpression]].
   * Async function to get the on/off flags associated with a feature.
   *
   * @returns A promise that will resolve with the current set of feature flags.
   * On an error, it will return the default flags and an additional informational error value.
   *
   * Please note - The return value is strongly typed. A TypDoc documentation generation bug shows it as an Object here. It returns the same values as [[useFlags]].
   */
  async requestFlags(session: Session): Promise<{
    flags: Flags<FeatureNames>;
    error?: ErrorTypes;
  }> {
    const args = session._.args;

    const cache = session._.cache;
    const cachedFlags = cache.flags();
    if (cachedFlags != undefined) return { flags: cachedFlags };

    const { flags: responseFlags, error } = await iserverFetch({
      sessionArgs: args,
      implicitArgs: session._.implicitArgs,
      options: ["flags"],
    });

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
  } {
    const cacheStats = this._.cache.cacheStats;
    const cacheHits = [...cacheStats.hits.keys()];
    const cacheMisses = [...cacheStats.misses.keys()];

    // perhaps this logic should live in the Cache class
    const keys = this._.cache.backingStore.keys();
    const cacheNoOps = keys.filter(
      (k) =>
        !k.startsWith("_") &&
        k != "session" &&
        cacheStats.hits.get(k) == undefined &&
        cacheStats.misses.get(k) == undefined
    );

    return {
      cacheHits,
      cacheMisses,
      cacheNoOps,
    };
  }
}

type ImplicitArgs = {
  userAgent?: string;
  ipAddress?: string;
  entryUrl?: string;
  clientType?: string;
};

function makeBackingStore(
  cacheType: CacheType,
  makeCustomStore?: () => _BackingStore
): _BackingStore {
  switch (cacheType) {
    case "none":
      return new NoOpStore();
    case "inMemory":
      return new _InMemoryStore();
    case "localStorage":
      return new LocalStorageStore();
    case "custom":
    case "customLocalStorage":
      return (
        makeCustomStore ??
        (() => {
          log.warn("no makeCustomStore");
          return new NoOpStore();
        })
      )();
    default:
      log.error("unknown cache type");
      const _: never = cacheType;
      _;
      return new NoOpStore();
  }
}

function sessionArgsMatch(
  args1: Partial<SessionArgs> | undefined,
  args2: Partial<SessionArgs> | undefined
): boolean {
  return JSON.stringify(args1) == JSON.stringify(args2);
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

function getCachedImpression(
  session: Session,
  wireArgs: _WireArgs
): {
  cachedImpression?: undefined;
  cachedFlags?: undefined;
  metadata?: Map<string, EntryMetaData>;
};

function getCachedImpression<T extends FeatureNames>(
  session: Session,
  wireArgs: _WireArgs
): {
  cachedImpression: Impression<T>;
  cachedFlags: Flags<T>;
  metadata: Map<string, EntryMetaData>;
};

function getCachedImpression<T extends FeatureNames>(
  session: Session,
  wireArgs: _WireArgs
): {
  cachedImpression?: Impression<T>;
  cachedFlags?: Flags<T>;
  metadata?: Map<string, EntryMetaData>;
} {
  const cache = session._.cache;

  const outputs = cache.outputs(wireArgs);
  if (outputs == undefined) return {};
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
 * A session converted to JSON. Used in conjunction with [[Session.toJSON]] and [[Session.fromJSON]]. These are useful to transfer a session across a JSON serialization boundary
 */
export type SessionJSON = {
  sessionArgs: Partial<SessionArgs>;
  originator: "ssr" | "csr";
  cacheJson: Record<string, _CacheStoreEntry> | undefined;
  activeVariants: ActiveVariant[];
};

/**
 * @internal
 * Exported for testing
 */
export class _InMemoryStore implements _BackingStore {
  // store as strings and not raw values to mimic local storage
  // this also prevents any truth equality based on references
  map = new Map<string, string>();

  get(key: string): undefined | _CacheStoreEntry {
    const raw = this.map.get(key);
    if (raw == undefined) return undefined;
    const entry: _CacheStoreEntry = JSON.parse(raw);
    return entry;
  }

  set(key: string, storeEntry: _CacheStoreEntry) {
    return this.map.set(key, JSON.stringify(storeEntry));
  }

  del(key: string) {
    return this.map.delete(key);
  }

  delAll(filter?: (entry: _CacheStoreEntry) => boolean): void {
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
  get(key: string): undefined | _CacheStoreEntry;
  set(key: string, entry: _CacheStoreEntry): void;

  del(key: string): void;
  delAll(filter?: (entry: _CacheStoreEntry) => boolean): void;
  isEmpty(): boolean;
  keys(): string[];
  dontStore(): boolean;
};

/**
 * @internal
 *
 * Be careful when changing this class, existing caches
 * need to be handled correctly
 */
type EntryMetaData = {
  origRender: "ssr" | "csr";
  lastRender: "ssr" | "csr";
  suppressBeaconCount: number;
};

/**
 * @internal
 * Do not use - only exported for testing
 *
 * Be careful when changing this class, existing caches
 * need to be handled correctly
 */
export type _CacheStoreEntry = {
  created: string;
  expires: string;
  identity: string;
  value: unknown;
} & Partial<EntryMetaData>;

type CacheEntry = {
  created: Date;
  expires: Date;
  identity: string;
  value: unknown;
} & Partial<EntryMetaData>;

type CacheInputEntry = {
  created?: Date;
  expires: Date;
  identity: string;
  value: unknown;
} & Partial<EntryMetaData>;

class LocalStorageStore implements _BackingStore {
  static prefix = "_causal_";

  static makeKey(key: string): string {
    return LocalStorageStore.prefix + key;
  }

  get(key: string, autoPrefix = true): undefined | _CacheStoreEntry {
    const _key = autoPrefix ? LocalStorageStore.makeKey(key) : key;
    const raw = window.localStorage.getItem(_key);
    if (!raw) return undefined;
    try {
      const storeEntry: _CacheStoreEntry = JSON.parse(raw);
      return storeEntry;
    } catch (e) {
      log.warn(
        "failed to deserialize from cache. Error = " + JSON.stringify(e)
      );
      window.localStorage.removeItem(_key);
      return undefined;
    }
  }

  set(key: string, storeEntry: _CacheStoreEntry) {
    const _key = LocalStorageStore.makeKey(key);
    return window.localStorage.setItem(_key, JSON.stringify(storeEntry));
  }

  del(key: string) {
    const _key = LocalStorageStore.makeKey(key);
    window.localStorage.removeItem(_key);
  }

  delAll(filter?: (entry: _CacheStoreEntry) => boolean): void {
    for (let ii = localStorage.length - 1; ii >= 0; --ii) {
      const key = localStorage.key(ii);
      if (
        key?.startsWith(LocalStorageStore.prefix) &&
        key != _causal_registered
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

const _cacheInfo = "_cacheInfo";
const _cacheVersion = "_cacheVersion";
const _causal_registered = "_causal_registered";

type CacheInfo = {
  sessionStart: string;
  lastAccess: string;
  sessionArgs: Partial<SessionArgs> | undefined;
};

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
        this.eventSource.addEventListener("flush", this.sseFlush.bind(this));
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

  get(key: string): Required<CacheEntry> | undefined {
    const storeEntry = this.backingStore.get(key);
    if (storeEntry == undefined) return;

    const {
      identity,
      value,
      created,
      expires,
      origRender: _origRender,
      lastRender: _lastRender,
      suppressBeaconCount: _suppressBeaconCount,
    }: _CacheStoreEntry = storeEntry;
    const now = new Date();
    const createdTS = new Date(created);
    const expiresTS = new Date(expires);

    const origRender = _origRender ?? misc.ssr ? "ssr" : "csr";
    const lastRender = _lastRender ?? origRender;
    const suppressBeaconCount = _suppressBeaconCount ?? 0;

    if (expiresTS < now) {
      this.backingStore.del(key);
      return undefined;
    }
    return {
      identity,
      value,
      created: createdTS,
      expires: expiresTS,
      origRender,
      lastRender,
      suppressBeaconCount,
    };
  }

  set(
    key: string,
    {
      expires,
      created,
      origRender,
      lastRender,
      suppressBeaconCount,
      ...rest
    }: CacheInputEntry
  ) {
    const createdString = (created ?? new Date()).toISOString();
    const expiresString = expires.toISOString();
    origRender = origRender ?? (misc.ssr ? "ssr" : "csr");
    lastRender = lastRender ?? origRender;
    suppressBeaconCount = suppressBeaconCount ?? 0;
    const toStore: Required<_CacheStoreEntry> = {
      ...rest,
      created: createdString,
      expires: expiresString,
      origRender,
      lastRender,
      suppressBeaconCount,
    };
    return this.backingStore.set(key, toStore);
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

    const oldCacheInfo = this.get(_cacheInfo)?.value as CacheInfo | undefined;

    const now = new Date();
    let cacheExpired = false;

    if (oldCacheInfo) {
      const expires = addSeconds(
        new Date(oldCacheInfo.lastAccess),
        this.sessionCacheExpirySeconds
      );

      const invalid = isNaN(expires.valueOf());
      if (expires < now || invalid) {
        log.debug(1, "session expired");
        cacheExpired = true;

        // should never happen, but be extra cautious to avoid render loop
        const invalidateHooks = !invalid;
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
    };

    this.set(_cacheInfo, {
      identity: "",
      value: newCacheInfo,
      expires: maxDate,
    });
    return true;
  }

  getOutputExpiry() {
    if (this.outputExpirySeconds == undefined) return maxDate;
    return makeFutureDate(this.outputExpirySeconds);
  }

  getOutputIdentity(
    featureName: FeatureNames | "session",
    wireArg: _WireArgs[keyof _WireArgs]
  ): string | undefined {
    if (featureName == undefined) {
      log.warn("unexpected undefined featureName");
      return;
    }

    if (wireArg == undefined) {
      log.warn("unexpected undefined wireArgs");
      return;
    }

    return JSON.stringify({
      n: featureName,
      a: wireArg,
    });
  }

  flags(): Flags<FeatureNames> | undefined {
    if (!this.testAndTouchSession()) return undefined;

    const store = this.get("_flags");
    if (store == undefined) return undefined;

    const { value } = store;
    return value as Flags<FeatureNames>;
  }

  setFlags(flags: Flags<FeatureNames>) {
    if (!this.testAndTouchSession()) return;
    this.set("_flags", {
      identity: "",
      value: flags,
      expires: maxDate,
    }); // flags expire with session
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
    this.cacheStats = { hits: new Map(), misses: new Map() };
  }

  outputs(wireArgs: _WireArgs):
    | {
        wireOutputs: _WireOutputs;
        metadata: Map<string, EntryMetaData>;
      }
    | undefined {
    if (!this.testAndTouchSession()) return undefined;

    const outputs: _WireOutputs = {};
    const metadata: Map<string, EntryMetaData> = new Map();

    let allCached = true;

    const sessionOutput = this.get("session");
    if (sessionOutput == undefined) {
      allCached = false;
      this.addCacheMiss("session");
      this.addCacheMiss(...Object.keys(wireArgs));
    } else {
      outputs["session"] = sessionOutput.value as SessionArgs;

      for (const k of Object.keys(wireArgs) as (keyof _WireArgs)[]) {
        const featureName: FeatureNames = k;

        const output = this.get(k);
        if (output == undefined) {
          allCached = false;
          this.addCacheMiss(k);
          break;
        }

        const identity = this.getOutputIdentity(featureName, wireArgs[k]);
        if (identity !== output.identity) {
          allCached = false;
          this.addCacheMiss(k);
          break;
        }

        try {
          // eslint-disable-next-line
          (outputs as any)[k] = output.value;
          const origRender = output.origRender ?? (misc.ssr ? "ssr" : "csr");
          metadata.set(k, {
            origRender,
            lastRender: output.lastRender ?? origRender,
            suppressBeaconCount: output.suppressBeaconCount ?? 0,
          });

          this.addCacheHit(k);
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

  setOutputs(wireArgs: _WireArgs, wireOutputs: _WireOutputs) {
    if (!this.testAndTouchSession()) return;
    const nextExpiry = this.getOutputExpiry();

    for (const [k, v] of Object.entries(wireOutputs) as [
      keyof _WireOutputs,
      _WireOutputs[keyof _WireOutputs]
    ][]) {
      if (k == "session") {
        const sessionIdentity = JSON.stringify(this.sessionArgs);
        this.set(k, {
          identity: sessionIdentity,
          value: v,
          expires: nextExpiry,
        });
      } else {
        const wireArg = wireArgs[k];
        if (wireArg != undefined) {
          const identity = this.getOutputIdentity(k, wireArg);
          if (identity != undefined && !(k as string).startsWith("_"))
            this.set(k, {
              identity,
              value: v,
              expires: nextExpiry,
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
      const cur = this.get(name);
      if (cur == undefined) return;
      if (cur.created < createdBefore) this.backingStore.del(name);
    } catch (e) {
      log.warn(
        "unexpected error analyzing cache - deleting entry. error was " +
          JSON.stringify(e)
      );
      this.backingStore.del(name);
    }
  }

  // handle the "flush" sse, which is now deprecated.
  // data is either '_all', or a list of features to flush
  sseFlush(evt: Event) {
    if (this.backingStore.dontStore()) return;

    const mevt: MessageEvent = evt as MessageEvent;
    _flushCount++;
    if (mevt.data == "_all") this.deleteAll(false);
    // hooks already invalidated
    else this.sseMaybeDel(mevt.data, null);
    this.set(_cacheVersion, {
      identity: "",
      value: "0",
      expires: maxDate,
    });
  }

  // handle the "flushcache" sse.
  // flush the entire cache. The cache version is send in the data.
  sseFlushCache(evt: Event) {
    if (this.backingStore.dontStore()) return;

    const mevt: MessageEvent = evt as MessageEvent;
    _flushCount++;
    this.deleteAll(false);
    this.set(_cacheVersion, {
      identity: "",
      value: mevt.data,
      expires: maxDate,
    });
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
    const cacheVersion = this.get("_cacheVersion");
    if (cacheVersion != undefined && mevt.data != cacheVersion.value)
      this.deleteAll(true);
    this.set(_cacheVersion, {
      identity: "",
      value: mevt.data,
      expires: maxDate,
    });
  }

  updateFromMetadata(metadata: Map<string, EntryMetaData>) {
    for (const [k, v] of metadata.entries()) {
      const elem = this.get(k);
      if (elem) {
        this.set(k, { ...elem, ...v });
      }
    }
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
 * Active experiments variants can also be reported to you by setting
 * the `reporter` property when calling [[initCausal]]
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
   * By default Causal will send all network requests as defined by the impression server environment variables
   * See: https://tech.causallabs.io/docs/reference/install/configuration/
   *
   * You can alternatively set it here - for example if you want to use a different URL on the client and server.
   */
  baseUrl?: string;

  /**
   * useServerSentEvents: Use server side events to update features
   * Defaults to true for registered devices, false otherwise.
   */
  useServerSentEvents?: boolean;

  /**
   * How long to wait for the impression server to respond before a timeout
   * The default is 1000 ms (1 second)
   */
  timeoutMs?: number;

  /**
   * A function that wil get called with various reporting information
   * such as all the active experiment/variants in effect
   */
  reporter?: ReportFn;

  /**
   * What should be logged
   *
   * The default it to log everything
   * To suppress all logging pass in an empty array
   */
  logLevel?: ("info" | "warn" | "error")[];
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
    console.error(...args);
  },
  error: (...args) => {
    console.warn(...args);
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

type MiscOptions = Required<
  Pick<CausalOptions, "reporter"> & Pick<CausalDebugOptions, "ssr">
>;

const defaultSSR = typeof window == "undefined";
const defaultMisc: MiscOptions = {
  ssr: defaultSSR,
  reporter: () => {
    // noop by default
  },
};
const misc: MiscOptions = { ...defaultMisc };

const defaultCacheOptions: Required<CacheOptions> = {
  outputExpirySeconds: 60 * 60 * 24 * 365 * 100, // 100 years (so will expire with the session)
  useServerSentEvents:
    typeof window != "undefined"
      ? window.localStorage.getItem(_causal_registered) == "true"
      : false,
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
  misc.reporter = options?.reporter ?? defaultMisc.reporter;

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

/**
 * @internal
 * Do not use - only exported for testing
 */
export type IServerResponse = _WireOutputs & {
  _flags: _WireFlags;
  _variants?: {
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
  }[];
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
  activeVariants?: ActiveVariant[];
}> {
  const fetchOptions = [...options];
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
    let fetchExceptionError = "";

    wireArgs = cleanWireArgs(wireArgs);

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

      result = await network.fetch(network.getBaseUrl() + "features", {
        method: "POST",
        body: JSON.stringify(body),
        headers,
      });
    } catch (e) {
      if ((e as Error).message) fetchExceptionError = (e as Error).message;
      else fetchExceptionError = "Unknown exception calling fetch. ";
    }

    if (result == undefined) {
      const errMsg =
        "Received null or undefined result. Impression server error or timeout. " +
        fetchExceptionError;

      const error: ErrorFetch = {
        errorType: "fetch",
        message: errMsg,
      };
      log.debug(1, errMsg);

      return {
        impression: undefined,
        flags: undefined,
        error,
      };
    } else if (result.status != 200) {
      let errMsg = "Impression server error or timeout. " + fetchExceptionError;
      if (result.text != undefined && typeof result.text == "function") {
        const errTxt = await result.text();
        errMsg += errTxt;
      }

      const error: ErrorFetch = {
        errorType: "fetch",
        message: errMsg,
      };
      log.debug(1, errMsg);

      return {
        impression: undefined,
        flags: undefined,
        error,
      };
    }
    const response = (await result.json()) as IServerResponse | undefined;
    if (response == undefined) {
      const error: ErrorFetch = {
        errorType: "fetch",
        message: "unexpected null response or timeout",
      };
      const errMsg = "Impression server error: " + JSON.stringify(error);
      log.debug(1, errMsg);

      return {
        impression: undefined,
        flags: undefined,
        error,
      };
    }

    const {
      _flags: responseFlags,
      errors,
      _variants,
      ...wireOutputs
    } = response;

    log.debug(4, "fetch outputs:", wireOutputs);

    const impression = new ImpressionImpl({
      impressionType: "real",
      sessionKeys: sessionKeys(wireOutputs.session as SessionArgs),
      wireArgs,
      wireOutputs,
    });

    let returnFlags = responseFlags;
    if (fetchOptions?.includes("flags") && responseFlags == undefined) {
      log.warn("unexpected empty response flags");
      returnFlags = returnFlags ?? defaultFlags;
    }

    let error: ErrorField | undefined = undefined;
    if (errors != undefined) {
      error = {
        errorType: "field",
        message: "fetch succeeded, but one or more fields had an error",
        fieldErrors: errors,
      };
    }

    const activeVariants: ActiveVariant[] = (_variants ?? []).map((v) => {
      return {
        experimentId: v.id,
        experimentName: v.name,
        variantId: v.variant?.id ?? undefined,
        variantName: v.variant?.name ?? "control",
      };
    });

    misc.reporter({
      variants: activeVariants,
    });

    return {
      impression,
      flags: returnFlags,
      error,
      activeVariants,
    };
  } catch (e) {
    const errMsg = "unexpected error in network.fetch";
    log.warn(errMsg, e);

    const error: ErrorFetch = {
      errorType: "fetch",
      message: errMsg,
    };

    return {
      impression: undefined,
      flags: undefined,
      error,
    };
  }
}

/**
 * Sends a beacon to the iserver to indicate an impression was viewed from cache
 * Will send if suppressBeaconCount == 0, otherwise decrements suppressBeaconCount
 */
function sendImpressionBeacon<T extends FeatureNames>(
  impression: Impression<T>,
  impressionId: string,
  metadata: Map<string, EntryMetaData>
): boolean {
  const outputs = impression.toJSON().wireOutputs;
  const impressionIdMap: {
    [idx: string]: { impression: string; newImpression: string | undefined };
  } = {};

  let count = 0;
  Object.entries(outputs).forEach(([k, _v]) => {
    const v = _v as _WireOutputs[keyof Omit<_WireOutputs, "session">]; // TS not smart enough

    if (k != "session" && v != "OFF" && v != undefined) {
      const entry = metadata.get(k);
      if (entry) {
        entry.lastRender = misc.ssr ? "ssr" : "csr";
        const suppressCount = entry?.suppressBeaconCount ?? 0;
        if (suppressCount == 0) {
          count += 1;
          impressionIdMap[k] = {
            impression: v?._impressionId,
            newImpression: impressionId,
          };
        } else entry.suppressBeaconCount = suppressCount - 1;
      } else log.warn("entry is null, ignoring");
    }
  });

  if (count > 0) {
    network.sendBeacon({
      id: impression.sessionKeys,
      impressions: impressionIdMap,
    });
  }

  return count > 0;
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
 * ErrorType indicated that a network fetch failed
 */
export type ErrorFetch = {
  errorType: "fetch";
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
export type ErrorTypes = ErrorFetch | ErrorUnknown | ErrorField;

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
  state: "cached";
  newImpressionId: string;
  cachedImpression: Impression<T>;
  impression: Impression<T>;
  metadata: Map<string, EntryMetaData>;
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
export const SessionContext = React.createContext<Session | undefined>(
  undefined
);

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

  // send beacons for cached impressions
  useEffect(() => {
    log.debug(1, "useImpression useEffect: cached");
    if (impressionState.current.state == "cached") {
      sendImpressionBeacon(
        impressionState.current.cachedImpression,
        impressionState.current.newImpressionId,
        impressionState.current.metadata
      );
      _session._.cache.updateFromMetadata(impressionState.current.metadata);
      impressionState.current = {
        state: "done",
        impression: impressionState.current.impression,
      };
    }
  });

  // return current values
  const loading =
    impressionState.current.state == "none" ||
    impressionState.current.state == "loading";
  log.debug(3, "useImpression returning. loading", loading);

  if (hasChange) forceUpdate();

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
