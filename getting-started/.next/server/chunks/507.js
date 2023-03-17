"use strict";
exports.id = 507;
exports.ids = [507];
exports.modules = {

/***/ 921:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B3": () => (/* binding */ SessionContext),
/* harmony export */   "H_": () => (/* binding */ toImpression),
/* harmony export */   "N$": () => (/* binding */ useSessionJSON),
/* harmony export */   "br": () => (/* binding */ RatingBox),
/* harmony export */   "kB": () => (/* binding */ queryBuilder),
/* harmony export */   "on": () => (/* binding */ useImpression),
/* harmony export */   "qb": () => (/* binding */ qb),
/* harmony export */   "rP": () => (/* binding */ createQuery),
/* harmony export */   "z_": () => (/* binding */ Session)
/* harmony export */ });
/* unused harmony exports ProductInfo, Feature2, allFeatureTypes, defaultFlags, _InMemoryStore, _Cache, _getLog, initCausal, toImpressionImpl, useSession, isImpressionType, isFeatureType, useFeature */
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cross_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
// This is a FeatureDL automatically generated file. DO NOT DIRECTLY EDIT, your changes will not persist.


class FeatureBase {
    _ = {};
}
///////////////////////////////////////////////////////////////////////////////
//#region  parameterized
/* eslint-disable */ /** 
* Wraps a rating box that we can put on various product pages
* to collect ratings from our users
*/ class RatingBox extends FeatureBase {
    /** 
    * The product that we are collecting ratings for
    */ product = "";
    /** 
     * The text next to the stars that prompts the visitor to rate the product
     *
     *  Control: "Rate this product!"
     */ callToAction = "Rate this product!";
    /**
     * Occurs each time a rating is collected
    */ signalRating({ stars  }) {
        signalInstance(this, "Rating", arguments[0]);
    }
    /** 
     * Occurs each time a rating is collected
     */ static signalRating(sessionKeys, impressionId, { stars  }) {
        signalStatic("RatingBox", "Rating", [
            ...arguments
        ]);
    }
}
/** 
* An empty feature to use only as a kill switch
*/ class ProductInfo extends FeatureBase {
}
/** 
* Another feature just for demonstration purposes
*/ class Feature2 extends FeatureBase {
    /** 
    * Example args
    */ exampleArg = "";
    /** 
     * Example output
     *
     *  Control: "Example output"
     */ exampleOutput = "Example output";
    /**
     * Example event
    */ signalExampleEvent({ data  }) {
        signalInstance(this, "ExampleEvent", arguments[0]);
    }
    /** 
     * Example event
     */ static signalExampleEvent(sessionKeys, impressionId, { data  }) {
        signalStatic("Feature2", "ExampleEvent", [
            ...arguments
        ]);
    }
}
/* eslint-enable */ /** @deprecated */ const allFeatureTypes = {
    RatingBox,
    ProductInfo,
    Feature2
};
/* eslint-disable */ class SessionEvents {
    constructor(sessionKeys1){
        this._ = {
            sessionKeys: sessionKeys1
        };
    }
}
/* eslint-enable */ function sessionKeys(s) {
    return {
        deviceId: s?.deviceId
    };
}
/**
 * @returns a map of X-Causal headers, one for each session key
 */ function getCausalHeaders(s) {
    return {
        "X-Causal-deviceId": s?.deviceId ?? "null"
    };
}
function sseUrl(s) {
    let sseUrl1 = network.getBaseUrl().replace(/\/?$/, "/sse?id=");
    if (s.deviceId != undefined) sseUrl1 += s.deviceId + "+";
    return sseUrl1;
}
/* eslint-disable */ /** 
* Features to query, along with their arguments.
*
* A query is created by using either [[queryBuilder]] or [[createQuery]].
*
* A query is executed by calling either [[requestImpression]] or [[useImpression]].
*
*/ class Query {
    /** 
    * Wraps a rating box that we can put on various product pages
    * to collect ratings from our users
    */ getRatingBox({ product  }) {
        return this;
    }
    /** 
    * An empty feature to use only as a kill switch
    */ getProductInfo() {
        return this;
    }
    /** 
    * Another feature just for demonstration purposes
    */ getFeature2({ exampleArg  }) {
        return this;
    }
    _ = {
        wireArgs: {}
    };
    constructor(){
        bindAllMethods(this);
    }
}
/* eslint-enable */ /**
 * The state of the feature flags when the FDL was compiled to this file.
 */ const defaultFlags = {
    RatingBox: true,
    ProductInfo: true,
    Feature2: true
};
class Session extends SessionEvents {
    static fromDeviceId(deviceId, req) {
        const sessionArgs = {
            deviceId: deviceId
        };
        return new Session(sessionArgs, req);
    }
    constructor(args, req){
        super(sessionKeys(args));
        const _backingStore = makeBackingStore(misc.ssr ? cacheOptions.ssrCacheType : cacheOptions.csrCacheType, cacheOptions.makeCustomStore);
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
                errorsAndWarnings: []
            },
            sessionKeys: sessionKeys(args)
        };
        if (req) this.addIncomingMessageArgs(req);
        this._.cache.testAndTouchSession();
        bindAllMethods(this);
    }
    args() {
        return {
            ...this._.args
        };
    }
    /**
   * Mark the session as still active
   */ keepAlive() {
        // rate limit the keep alives to no more than 1 per second
        if (Date.now() - Session.lastKeepAlive > 1000) {
            Session.lastKeepAlive = Date.now();
            network.sendBeacon(getCausalHeaders(sessionKeys(this._.args)), {
                id: this._.args
            });
            return true;
        }
        return false;
    }
    static lastKeepAlive = 0;
    /**
   * The currently active experiment variants. This is intended for reporting information to other
   * systems. It should *not* be used as an input for any display or logic on your site.
   */ get activeVariants() {
        return this._.cache.get(activeVariantsKey) ?? [];
    }
    /**
   * All the features that have been requested so far. This is intended for reporting information to other
   * systems. It should *not* be used as an input for any display or logic on your site.
   */ get requestedFeatures() {
        return this._.cache.get(requestedFeaturesKey) ?? [];
    }
    /** Returns information about this sessions communication with the impression server */ commSnapshot() {
        return this._.commSnapshot;
    }
    /**
   * Serializes a session to JSON. Used in conjunction with [[fromJSON]]. Useful to transfer a session across a JSON serialization boundary
   *
   * @returns the serialized JSON
   */ toJSON() {
        if (this._.commSnapshot.fetches == 0) {
            log.warn("Session.toJSON() called before a call to requestImpression() or requestCacheFill()");
        }
        const cacheJson = {};
        const featureJson = [];
        for (const key of this._.cache.backingStore.keys()){
            if (key.startsWith(nonFeaturePrefix)) {
                const noPrefixKey = key.substring(nonFeaturePrefix.length);
                if (noPrefixKey != cacheInfoKey) {
                    const value = this._.cache.backingStore.get(key);
                    cacheJson[noPrefixKey] = value;
                }
            } else {
                const featureName = key;
                const featureEntry = this._.cache.backingStore.get(featureName);
                if (featureEntry) {
                    for (const [args, _entry] of Object.entries(featureEntry)){
                        const entry = {
                            ..._entry,
                            featureName,
                            args
                        };
                        featureJson.push(entry);
                    }
                }
            }
        }
        const sessionJson = {
            sessionArgs: this._.args,
            cacheJson,
            featureJson,
            commSnapshotJson: this.commSnapshot(),
            originator: this._.originator,
            activeVariants: this.activeVariants
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
   */ static fromJSON(json, options) {
        const _options = {
            ...{
                alwaysDelExistingCache: false,
                hydrating: json.originator == "ssr" && !misc.ssr
            },
            ...options
        };
        // if the session args are different,
        // creating the session will (correctly) clear the cache
        // it will also expire the cache if the cache is too old
        const session = new Session(json.sessionArgs);
        session._.originator = json.originator;
        if (_options.alwaysDelExistingCache) session._.cache.backingStore.delAll();
        const hydrating = _options.hydrating;
        // transfer the cache entries
        const cacheJson = json.cacheJson;
        const featuresJson = json.featureJson;
        if (cacheJson != undefined) {
            for (const [k, v] of Object.entries(cacheJson)){
                if (v) {
                    try {
                        session._.cache.set(k, v);
                    } catch  {
                        log.warn("failed to restore non feature " + k);
                    }
                }
            }
        }
        // dump the transferred snapshot into the cache to make it easy to view in the browser
        session._.cache.set("transferredCommSnapshot", json.commSnapshotJson);
        if (featuresJson != undefined) {
            for (const { featureName: featureName1 , args: args1 , ...entry } of featuresJson){
                try {
                    const { created: _created , expires: _expires , ...rest } = entry;
                    const created = new Date(_created);
                    const expires = new Date(_expires);
                    session._.cache.setFeature(featureName1, args1, {
                        ...rest,
                        created,
                        expires,
                        hydratable: hydrating
                    });
                } catch  {
                    log.warn(`failed to restore feature entry ${featureName1} ${args1}`);
                }
            }
            session._.hydrating = hydrating;
            if (hydrating) session._.hydrationKeys = featuresJson.map(({ featureName , args  })=>{
                return {
                    featureName,
                    args
                };
            });
            else session._.hydrationKeys = [];
        }
        return session;
    }
    /**
   * Indicate to the session that hydration is complete
   */ setHydrationComplete() {
        if (this._.hydrating) {
            const keys = this._.hydrationKeys;
            for (const k of keys){
                const entry = this._.cache.getFeature(k.featureName, k.args);
                if (entry) {
                    this._.cache.setFeature(k.featureName, k.args, {
                        ...entry,
                        hydratable: false
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
   */ addIncomingMessageArgs(incomingMessage) {
        this._.implicitArgs = {
            ...this._.args,
            userAgent: incomingMessage?.headers["user-agent"],
            clientType: "typescript",
            ipAddress: incomingMessage?.socket.remoteAddress,
            entryUrl: incomingMessage?.url
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
   */ async requestImpression(query, impressionId) {
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
   */ async requestCacheFill(query) {
        await requestImpression(this, query, undefined);
    }
    /**
   * Clear all impression stats. Resets cache hits, misses, and noops
   */ clearImpressionStats() {
        this._.loadingImpressionsCount = 0;
        this._.cache.clearCacheStats();
    }
    /**
   * Get impression stats
   * @returns returns features that have were served from cache (hits), not served from cache (misses), or not requested (noOps)
   */ getImpressionStats() {
        const cacheStats = this._.cache.cacheStats;
        const cacheHits = [
            ...cacheStats.hits.keys()
        ];
        const cacheMisses = [
            ...cacheStats.misses.keys()
        ];
        const loadingImpressions = this._.loadingImpressionsCount;
        // perhaps this logic should live in the Cache class
        const keys = this._.cache.backingStore.keys();
        const cacheNoOps = keys.filter((k)=>!k.startsWith(nonFeaturePrefix) && k != "session" && cacheStats.hits.get(k) == undefined && cacheStats.misses.get(k) == undefined
        );
        return {
            cacheHits,
            cacheMisses,
            cacheNoOps,
            loadingImpressions
        };
    }
}
function signalInstance(feature, event, args) {
    // this is default feature, can't really signal
    if (feature._.impression == undefined) return;
    if (feature._.impressionId == undefined) return;
    signal(feature.featureName, event, feature._.impression.sessionKeys, feature._.impressionId, args);
}
function signalStatic(feature, event, argsArr) {
    const arg0 = argsArr[0];
    const sk = arg0 instanceof Session ? sessionKeys(arg0.args()) : sessionKeys(arg0);
    const impressionId = argsArr[1];
    const args = argsArr[2];
    signal(feature, event, sk, impressionId, args);
}
function signalSession(event, session, args) {
    const sk = session instanceof Session ? sessionKeys(session.args()) : session instanceof SessionEvents ? sessionKeys(session._.sessionKeys) : sessionKeys(session);
    if (session instanceof Session) {
        if (session._.commSnapshot.fetches == 0) {
            log.info("Possibly signaling a session event without requesting an impression. " + "If the impression was requested with another Session with the same args, you can ignore this message.");
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
 */ function createQuery(args) {
    const query = new Query();
    query._.wireArgs = args;
    return query;
}
function signal(feature, event, sessionKeys2, impressionId, args) {
    const _data = {
        id: sessionKeys2,
        feature,
        event,
        impressionId,
        args
    };
    network.sendBeacon(getCausalHeaders(sessionKeys2), _data);
}
class ImpressionImpl extends SessionEvents {
    // Note: There is no impression id declared at this level
    // The features have impression ids as part of their outputs
    toJSON() {
        return this._.json;
    }
    get sessionKeys() {
        return this._.json.sessionKeys;
    }
    constructor(impressionJson){
        super(impressionJson.sessionKeys);
        this._ = {
            json: impressionJson,
            sessionKeys: impressionJson.sessionKeys
        };
        const { wireOutputs , wireArgs  } = impressionJson;
        for (const featureName of Object.keys(wireArgs ?? {})){
            if (featureName == "Session" || featureName == "session") continue;
            const output = wireOutputs[featureName];
            let shouldCreateFeature;
            switch(impressionJson.impressionType){
                case "error":
                    shouldCreateFeature = defaultFlags[featureName];
                    break;
                case "loading":
                    shouldCreateFeature = false;
                    break;
                case "real":
                    shouldCreateFeature = output != "OFF";
                    if (output == undefined) {
                        log.info("undefined or null output for " + featureName + ". Using defaults.");
                        shouldCreateFeature = defaultFlags[featureName];
                    }
            }
            if (shouldCreateFeature) {
                const constructor = allFeatureTypes[featureName];
                const feature = new constructor();
                feature.featureName = featureName;
                bindAllMethods(feature);
                const featureOutputs = wireOutputs[featureName];
                const featureArgs = wireArgs[featureName];
                const impressionId = featureOutputs?._impressionId;
                if (featureOutputs) {
                    feature._.impression = this;
                    feature._.impressionId = impressionId;
                }
                // if proxies are not supported (very old browswers), just return the defaults
                if (typeof Proxy == "function") {
                    const handler = {
                        get (target, prop, receiver) {
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
                        }
                    };
                    this[featureName] = new Proxy(feature, handler);
                }
            }
        }
        bindAllMethods(this);
    }
}
// eslint-disable-next-line
function bindAllMethods(obj) {
    // this is used in exported class constructors
    // so that those classes can be destructured
    // w/o worrying about "this" semantics
    Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter((method)=>typeof obj[method] === "function"
    ).filter((method)=>method != "constructor"
    ).forEach((method)=>obj[method] = obj[method].bind(obj)
    );
}
async function requestImpression(session, query, /** if impressionId is undefined it is a cache fill */ impressionId) {
    const cache = session._.cache;
    const wireArgs = query._.wireArgs;
    const { cachedImpression , cachedFlags  } = getCachedImpression(session, wireArgs);
    if (cachedImpression != undefined && cachedFlags != undefined) {
        let impression = cachedImpression;
        if (impressionId != undefined) {
            // impressionId != undefined means this is not a cache fill request
            updateSessionVariants(session, undefined, impressionId, cachedImpression);
            sendImpressionBeacon(session, cachedImpression, impressionId);
            impression = updateImpressionIds(cachedImpression, impressionId, wireArgs);
        }
        return {
            impression: impression,
            flags: cachedFlags
        };
    }
    const fetchOptions = [];
    const { flags , impression , error , warning , activeVariants , featuresRequested , featuresReceived ,  } = await iserverFetch({
        options: fetchOptions,
        impressionId,
        sessionArgs: session._.args,
        implicitArgs: session._.implicitArgs,
        wireArgs: wireArgs
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
    if (activeVariants) updateSessionVariants(session, activeVariants, impressionId, impression);
    if (impression != undefined) {
        cache.setOutputs(wireArgs, impression.toJSON().wireOutputs, impressionId == undefined);
        return {
            impression: impression,
            flags: flagsFromImpression(impression),
            error
        };
    } else {
        const errImpression = errorImpression(session, "Fetch Failure", {
            wireArgs
        });
        return {
            impression: errImpression,
            flags: flagsFromImpression(errImpression),
            error: error ?? {
                errorType: "unknown",
                message: "unknown error"
            }
        };
    }
}
/**
 * Creates a session from transferred [[SessionJSON]] originally created with [[Session.toJSON]]. This function
 *  is preferred to [[Session.fromJSON]], as this function ensures react client hydration works correctly
 * @param json
 * @returns
 */ function useSessionJSON(json) {
    // this hook doesn't need to trigger any updates
    // the hooks that return impressions will do the right thing if the cache changes
    const jsonRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(json);
    const sessionRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(undefined);
    if (json != jsonRef.current || sessionRef.current == undefined) {
        sessionRef.current = Session.fromJSON(json);
    }
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // this no-ops if called multiple times
        sessionRef.current?.setHydrationComplete();
    });
    return sessionRef.current;
}
function makeBackingStore(cacheType, makeCustomStore) {
    switch(cacheType){
        case "none":
            return new NoOpStore();
        case "inMemory":
            return new _InMemoryStore();
    }
    let backingStore = undefined;
    switch(cacheType){
        case "localStorage":
            backingStore = new LocalStorageStore();
            break;
        case "custom":
        case "customLocalStorage":
            backingStore = (makeCustomStore ?? (()=>{
                log.warn("no makeCustomStore");
                return new NoOpStore();
            }))();
            break;
        default:
            log.error("unknown cache type");
            const _ = cacheType;
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
    } catch  {}
    if (storageWorks) return backingStore;
    log.warn(`The requested storage "${cacheType}" did not work. Falling back to in-memory store`);
    return new _InMemoryStore();
}
function sessionArgsMatch(args1, args2) {
    return JSON.stringify(args1, sortReplacer) == JSON.stringify(args2, sortReplacer);
}
function flagsFromImpression(impression) {
    if (impression == undefined) return undefined;
    const wireArgs = impression._.json.wireArgs;
    const wireOutputs = impression._.json.wireOutputs;
    const flags = {};
    for (const k of Object.keys(wireArgs ?? {})){
        const v = wireOutputs[k];
        const key = k;
        if (v === undefined) flags[key] = defaultFlags[key];
        else flags[key] = v != "OFF";
    }
    return flags;
}
function getCachedImpression(session, wireArgs) {
    const cache = session._.cache;
    const outputs = cache.outputs(wireArgs);
    if (outputs == undefined) return {
        metadata: new Map()
    };
    const { wireOutputs: cachedOutputs , metadata  } = outputs;
    const cachedImpression = toImpressionImpl({
        impressionType: "real",
        wireArgs,
        sessionKeys: sessionKeys(session._.args),
        wireOutputs: cachedOutputs
    });
    const cachedFlags = flagsFromImpression(cachedImpression);
    return {
        cachedImpression,
        cachedFlags,
        metadata
    };
}
function loadingImpression(session) {
    const impression = new ImpressionImpl({
        impressionType: "loading",
        sessionKeys: sessionKeys(session._.args),
        wireArgs: {},
        wireOutputs: {}
    });
    return impression;
}
function errorImpression(session, reason, { wireArgs  }) {
    const impression = new ImpressionImpl({
        sessionKeys: session ? sessionKeys(session._.args) : {},
        impressionType: "error",
        reason,
        wireArgs: cleanWireArgs(wireArgs),
        wireOutputs: {}
    });
    return impression;
}
/** very basic uuid generator (to minimize external dependencies) **/ function uuidv4() {
    let digits = "";
    let ii = 0;
    for(; digits.length < 32 && ii < 100; ii++)digits += (Math.random() * 0xffffffff).toString(16).split(".")[0];
    if (ii == 100) {
        throw new Error("FATAL: failed to generate uuid");
    }
    return digits.slice(0, 8) + "-" + digits.slice(8, 12) + "-" + digits.slice(12, 16) + "-" + digits.slice(16, 20) + "-" + digits.slice(20, 32);
}
//#region caching
let _flushCount = 0;
class NoOpStore {
    get() {
        return undefined;
    }
    set() {
        undefined;
    }
    del() {
        undefined;
    }
    delAll() {
        undefined;
    }
    isEmpty() {
        return true;
    }
    keys() {
        return [];
    }
    dontStore() {
        return true;
    }
}
class LocalStorageStore {
    static prefix = "_causal_";
    static makeKey(key) {
        return LocalStorageStore.prefix + key;
    }
    get(key, autoPrefix = true) {
        const _key = autoPrefix ? LocalStorageStore.makeKey(key) : key;
        const stringEntry = window.localStorage.getItem(_key);
        if (!stringEntry) return undefined;
        try {
            const jsonEntry = JSON.parse(stringEntry);
            return jsonEntry;
        } catch (e) {
            log.warn("failed to deserialize from cache. Error = " + JSON.stringify(e));
            window.localStorage.removeItem(_key);
            return undefined;
        }
    }
    set(key, jsonEntry) {
        const _key = LocalStorageStore.makeKey(key);
        return window.localStorage.setItem(_key, JSON.stringify(jsonEntry));
    }
    del(key) {
        const _key = LocalStorageStore.makeKey(key);
        window.localStorage.removeItem(_key);
    }
    delAll(filter) {
        for(let ii = localStorage.length - 1; ii >= 0; --ii){
            const key = localStorage.key(ii);
            if (key?.startsWith(LocalStorageStore.prefix) && key != causalRegisteredKey) {
                const entry = this.get(key, false);
                if (filter == undefined || entry == undefined || filter(entry)) localStorage.removeItem(key);
            }
        }
    }
    isEmpty() {
        for(let ii = 0; ii < localStorage.length; ii++){
            const key = localStorage.key(ii);
            if (key?.startsWith(LocalStorageStore.prefix)) return false;
        }
        return true;
    }
    keys() {
        const _keys = [];
        const prefixLen = LocalStorageStore.prefix.length;
        for(let ii = 0; ii < localStorage.length; ii++){
            const key = localStorage.key(ii);
            if (key?.startsWith(LocalStorageStore.prefix)) _keys.push(key.substring(prefixLen));
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
 */ class _InMemoryStore {
    // store as strings and not raw values to mimic local storage
    // this also prevents any truth equality based on references
    map = new Map();
    get(key) {
        const raw = this.map.get(key);
        if (raw == undefined) return undefined;
        const entry = JSON.parse(raw);
        return entry;
    }
    set(key, storeEntry) {
        const stringEntry = JSON.stringify(storeEntry);
        return this.map.set(key, stringEntry);
    }
    del(key) {
        return this.map.delete(key);
    }
    delAll(filter) {
        if (filter == undefined) this.map = new Map();
        else {
            for (const k of this.keys()){
                const entry = this.get(k);
                if (entry == undefined || filter(entry)) this.del(k);
            }
        }
    }
    isEmpty() {
        return this.map.size == 0;
    }
    keys() {
        return [
            ...this.map.keys()
        ];
    }
    dontStore() {
        return false;
    }
}
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
/**
 * @internal
 * Do not use - only exported for testing
 */ class _Cache {
    cacheStats = {
        hits: new Map(),
        misses: new Map()
    };
    constructor(sessionArgs, backingStore, options){
        const { outputExpirySeconds , useServerSentEvents , sessionCacheExpirySeconds ,  } = options;
        this.backingStore = backingStore;
        this.outputExpirySeconds = outputExpirySeconds;
        this.useServerSentEvents = useServerSentEvents;
        this.sessionCacheExpirySeconds = sessionCacheExpirySeconds;
        this.sessionArgs = sessionArgs;
        if (sessionArgs == undefined) return;
        // register server side events
        this.eventSource = undefined;
        if (sessionArgs != undefined && !misc.ssr && !this.backingStore.dontStore() && this.useServerSentEvents) {
            if (!network.newEvtSource) {
                throw new Error("fatal: can not register server sent events");
            } else {
                const url = sseUrl(sessionArgs);
                this.eventSource = network.newEvtSource(url);
                this.eventSource.addEventListener("flushcache", this.sseFlushCache.bind(this));
                this.eventSource.addEventListener("flushfeatures", this.sseFlushFeatures.bind(this));
                this.eventSource.addEventListener("hello", this.sseHello.bind(this));
            }
        }
    }
    get(key) {
        return this.backingStore.get(nonFeaturePrefix + key);
    }
    set(key, value) {
        this.backingStore.set(nonFeaturePrefix + key, value);
    }
    getFeature(featureName, args) {
        const featureEntry = this.backingStore.get(featureName);
        if (featureEntry == undefined) return;
        const argsKey = getArgsAsKey(args);
        const requestEntry = featureEntry[argsKey];
        if (requestEntry == undefined) return undefined;
        const { created , expires , ...rest } = requestEntry;
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
            expires: expiresTS
        };
    }
    getFeatures(featureName) {
        const featureEntry = this.backingStore.get(featureName);
        if (featureEntry == undefined) [];
        const entries = [];
        for (const [_args, requestStoreEntry] of Object.entries(featureEntry)){
            const args = JSON.parse(_args);
            const created = new Date(requestStoreEntry.created);
            const expires = new Date(requestStoreEntry.expires);
            entries.push({
                ...requestStoreEntry,
                args,
                created,
                expires
            });
        }
        return entries;
    }
    setFeature(featureName, args, /** set to undefined to delete request entry */ requestEntry) {
        let featureEntry = this.backingStore.get(featureName);
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
        const { expires , created , origRender: _origRender , lastRender: _lastRender , impressionCount: _impressionCount , hydratable: _hydratable , ...rest } = requestEntry;
        const createdString = (created ?? new Date()).toISOString();
        const expiresString = expires.toISOString();
        const origRender = _origRender ?? (misc.ssr ? "ssr" : "csr");
        const lastRender = _lastRender ?? origRender;
        const hydratable = _hydratable ?? false;
        const impressionCount = _impressionCount ?? 1;
        const newRequestStoreEntry = {
            ...rest,
            created: createdString,
            expires: expiresString,
            origRender,
            lastRender,
            impressionCount,
            hydratable
        };
        featureEntry[argsKey] = newRequestStoreEntry;
        return this.backingStore.set(featureName, featureEntry);
    }
    deleteAll(invalidateHooks) {
        if (this.sessionArgs == undefined) return;
        this.backingStore.delAll();
        // forces react hooks to re-execute next time they are used
        if (invalidateHooks) _flushCount += 1;
    }
    /**
   * @returns false if the caller should short circuit
   */ testAndTouchSession() {
        log.debug(5, "testAndTouchSession");
        if (this.backingStore.dontStore()) return false;
        const oldCacheInfo = this.get(cacheInfoKey);
        const now = new Date();
        let cacheExpired = false;
        let invalidExpires = false;
        if (oldCacheInfo) {
            try {
                const expires = addSeconds(new Date(oldCacheInfo.lastAccess), this.sessionCacheExpirySeconds);
                invalidExpires = isNaN(expires.valueOf());
                if (oldCacheInfo.version == undefined || oldCacheInfo.version < cacheVersion || expires < now || invalidExpires) {
                    cacheExpired = true;
                }
            } catch  {
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
        if (!this.backingStore.isEmpty() && oldCacheInfo?.sessionArgs && !sessionArgsMatch(oldCacheInfo.sessionArgs, curSessionArgs)) {
            log.debug(1, "session args changes, deleting values");
            this.deleteAll(true);
        }
        const newCacheInfo = {
            sessionStart: cacheExpired || !oldCacheInfo ? now.toISOString() : oldCacheInfo.sessionStart,
            lastAccess: now.toISOString(),
            sessionArgs: this.sessionArgs,
            version: cacheVersion
        };
        this.set(cacheInfoKey, newCacheInfo);
        return true;
    }
    getOutputExpiry() {
        if (this.outputExpirySeconds == undefined) return maxDate;
        return makeFutureDate(this.outputExpirySeconds);
    }
    flags() {
        if (!this.testAndTouchSession()) return undefined;
        const value = this.get(flagsKey);
        if (value == undefined) return undefined;
        return value;
    }
    setFlags(flags) {
        if (!this.testAndTouchSession()) return;
        this.set(flagsKey, flags);
    }
    addCacheHit(...featureNames) {
        for (const featureName of featureNames){
            const count = this.cacheStats.hits.get(featureName) ?? 0;
            this.cacheStats.hits.set(featureName, count + 1);
        }
    }
    addCacheMiss(...featureNames) {
        for (const featureName of featureNames){
            const count = this.cacheStats.misses.get(featureName) ?? 0;
            this.cacheStats.misses.set(featureName, count + 1);
        }
    }
    clearCacheStats() {
        this.cacheStats = {
            hits: new Map(),
            misses: new Map()
        };
    }
    outputs(wireArgs) {
        if (!this.testAndTouchSession()) return undefined;
        const outputs = {};
        const metadata = new Map();
        let allCached = true;
        const sessionOutput = this.getFeature("session", this.sessionArgs);
        if (sessionOutput == undefined) {
            allCached = false;
            this.addCacheMiss("session");
            this.addCacheMiss(...Object.keys(wireArgs ?? {}));
        } else {
            outputs["session"] = sessionOutput.value;
            for (const [featureName, args] of Object.entries(wireArgs)){
                const entry = this.getFeature(featureName, args);
                if (entry == undefined) {
                    allCached = false;
                    this.addCacheMiss(featureName);
                    break;
                }
                try {
                    // eslint-disable-next-line
                    (outputs)[featureName] = entry.value;
                    const argsKey = getArgsAsKey(args);
                    const metadataKey = `${featureName}.${argsKey}`;
                    metadata.set(metadataKey, {
                        origRender: entry.origRender,
                        lastRender: entry.lastRender,
                        impressionCount: entry.impressionCount,
                        hydratable: entry.hydratable
                    });
                    this.addCacheHit(featureName);
                } catch  {
                    log.warn("unexpected exception retrieving from cache");
                    allCached = false;
                    break;
                }
            }
        }
        if (allCached) {
            return {
                wireOutputs: outputs,
                metadata
            };
        }
        return undefined;
    }
    setOutputs(wireArgs, wireOutputs, isCacheFill) {
        if (!this.testAndTouchSession()) return;
        const nextExpiry = this.getOutputExpiry();
        for (const [featureName, v] of Object.entries(wireOutputs)){
            if (featureName == "session") {
                this.setFeature(featureName, this.sessionArgs, {
                    value: v,
                    expires: nextExpiry
                });
            } else {
                const wireArg = wireArgs[featureName];
                if (wireArg != undefined) {
                    if (!featureName.startsWith(nonFeaturePrefix)) this.setFeature(featureName, wireArg, {
                        value: v,
                        expires: nextExpiry,
                        impressionCount: isCacheFill ? 0 : 1
                    });
                }
            }
        }
    }
    //#region server sent events
    sseMaybeDel(name, createdBeforeDate) {
        if (this.backingStore.dontStore()) return;
        if (!createdBeforeDate) {
            this.backingStore.del(name);
            return;
        }
        try {
            const createdBefore = new Date(createdBeforeDate);
            const entries = this.getFeatures(name);
            if (entries == undefined) return;
            for (const entry of entries){
                if (entry.created < createdBefore) this.setFeature(name, entry.args, undefined);
            }
        } catch (e) {
            log.warn("unexpected error analyzing cache - deleting entry. error was " + JSON.stringify(e));
            this.backingStore.del(name);
        }
    }
    // handle the "flushcache" sse.
    // flush the entire cache. The cache version is sent in the data.
    sseFlushCache(evt) {
        if (this.backingStore.dontStore()) return;
        const mevt = evt;
        _flushCount++;
        this.deleteAll(false);
        this.set(sseInfoKey, mevt.data);
    }
    // handle the "flushfeatures" sse.
    // flush the cache for the feature names listed in the data.
    sseFlushFeatures(evt) {
        if (this.backingStore.dontStore()) return;
        const mevt = evt;
        _flushCount++;
        this.sseMaybeDel(mevt.data, null);
    }
    sseHello(evt) {
        if (this.backingStore.dontStore()) return;
        const mevt = evt;
        const cacheVersion1 = this.get(sseInfoKey);
        if (cacheVersion1 != undefined && mevt.data != cacheVersion1) this.deleteAll(true);
        this.set(sseInfoKey, mevt.data);
    }
}
//#endregion
//#endregion
//#region initialization
function normalizeUrl(url) {
    if (url.endsWith("/")) return url;
    return url + "/";
}
let lastLoggedUrl = "";
function makeBaseUrl(ssr) {
    let url = undefined;
    if (ssr) {
        url = process.env.CAUSAL_ISERVER;
        if (url == undefined) {
            log.warn("SSR impression server environment variable not set, defaulting to 'http://localhost:3004/iserver'. " + "Please set CAUSAL_ISERVER");
            url = "http://localhost:3004/iserver/";
        }
    } else {
        url = ((("https://tools.causallabs.io/sandbox-iserver" ?? 0) ?? 0) ?? 0) ?? 0;
        if (url == undefined) {
            log.warn("Browser impression server environment variable not set, defaulting to http://localhost:3004/iserver " + "Please set one of: NEXT_PUBLIC_CAUSAL_BROWSER_ISERVER, VAGRANT_CAUSAL_BROWSER_ISERVER, RAZZLE_CAUSAL_BROWSER_ISERVER, CAUSAL_BROWSER_ISERVER");
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
// eslint-disable-next-line
function sortReplacer(_, value) {
    if (!(value instanceof Object) || value instanceof Array) return value;
    return Object.keys(value).sort()// eslint-disable-next-line
    .reduce((sorted, key)=>{
        sorted[key] = value[key];
        return sorted;
    }, {});
}
function getArgsAsKey(wireArg) {
    return typeof wireArg == "string" ? wireArg : JSON.stringify(wireArg ?? {}, sortReplacer);
}
// eslint-disable-next-line
let debugLogLevel = -1;
const defaultLog = {
    info: (...args)=>{
        console.log(...args);
    },
    warn: (...args)=>{
        console.warn(...args);
    },
    error: (...args)=>{
        console.error(...args);
    },
    debug (level, message, ...optionalParams) {
        if (level <= debugLogLevel) console.log(message, ...optionalParams);
    }
};
let log = {
    ...defaultLog
};
/**
 * @internal
 * Do not use - only exported for testing
 */ function _getLog() {
    return log;
}
const defaultSSR = "undefined" == "undefined";
const defaultMisc = {
    ssr: defaultSSR,
    logIServerDetails: false,
    logIServerCommErrors: true,
    onUpdateActiveVariants: ()=>{
    // noop
    },
    onImpression: ()=>{
    // noop
    }
};
const misc = {
    ...defaultMisc
};
function isCausalRegistered() {
    try {
        return (window.localStorage?.getItem(causalRegisteredKey) == "true") ?? false;
    } catch  {
        return false;
    }
}
const defaultCacheOptions = {
    outputExpirySeconds: 60 * 60 * 24 * 365 * 100,
    useServerSentEvents: defaultSSR ? false : isCausalRegistered(),
    sessionCacheExpirySeconds: 60 * 30,
    ssrCacheType: "inMemory",
    csrCacheType: "localStorage",
    makeCustomStore: ()=>{
        log.warn("no custom store function");
        return new NoOpStore();
    }
};
let cacheOptions = {
    ...defaultCacheOptions
};
let baseUrl = undefined;
const defaultNetwork = {
    timeoutMs: 1000,
    sendBeacon: (headers, data)=>{
        network.fetch(network.getBaseUrl() + "signal", {
            method: "POST",
            body: JSON.stringify(data),
            headers,
            keepalive: true
        });
    },
    fetch: (url, init)=>{
        log.debug(2, "defaultFetch");
        return cross_fetch__WEBPACK_IMPORTED_MODULE_0___default()(url, init);
    },
    newEvtSource: typeof EventSource == "undefined" ? undefined : (url)=>{
        return new EventSource(url);
    },
    getBaseUrl: ()=>{
        return baseUrl ?? (baseUrl = makeBaseUrl(defaultSSR));
    }
};
let network = {
    ...defaultNetwork
};
// eslint-disable-next-line
/**
 * An optional method to set Causal options
 *
 * @param options Configurable options.
 * @param debugOptions Options that may change between releases
 */ function initCausal(options, debugOptions) {
    let baseUrl1 = options?.baseUrl ? normalizeUrl(options?.baseUrl) : undefined;
    misc.ssr = debugOptions?.ssr ?? defaultSSR;
    misc.logIServerDetails = options?.logIServerDetails ?? false;
    misc.logIServerCommErrors = options?.logIServerCommErrors ?? true;
    misc.onUpdateActiveVariants = options?.onUpdateActiveVariants ?? (()=>{
    // noop
    });
    misc.onImpression = options?.onImpression ?? (()=>{
    // noop
    });
    log = {
        ...defaultLog
    };
    log.info = debugOptions?.logInfo ?? defaultLog.info;
    log.warn = debugOptions?.logWarn ?? defaultLog.warn;
    log.error = debugOptions?.logError ?? defaultLog.error;
    const logLevel = options?.logLevel ?? [
        "info",
        "warn",
        "error"
    ];
    const noOp = ()=>{
        undefined;
    };
    if (!logLevel.includes("info")) log.info = noOp;
    if (!logLevel.includes("warn")) log.warn = noOp;
    if (!logLevel.includes("error")) log.error = noOp;
    network = {
        timeoutMs: options?.timeoutMs ?? defaultNetwork.timeoutMs,
        getBaseUrl: ()=>{
            return baseUrl1 ?? (baseUrl1 = options?.baseUrl ? normalizeUrl(options.baseUrl) : defaultNetwork.getBaseUrl());
        },
        fetch: (url, init)=>{
            const baseFetch = debugOptions?.fetch ?? defaultNetwork.fetch;
            if (typeof AbortController == "undefined") {
                return baseFetch(url, init);
            } else {
                const controller = new AbortController();
                const id = setTimeout(()=>controller.abort()
                , network.timeoutMs);
                return baseFetch(url, {
                    ...init,
                    signal: controller.signal
                }).then((response)=>{
                    clearTimeout(id);
                    return response;
                }).catch((response)=>{
                    clearTimeout(id);
                    return response;
                });
            }
        },
        sendBeacon: (headers, data)=>{
            network.fetch(network.getBaseUrl() + "signal", {
                method: "POST",
                body: JSON.stringify(data),
                headers,
                keepalive: true
            });
        },
        newEvtSource: debugOptions?.newEvtSource ?? defaultNetwork.newEvtSource
    };
    const debugCO = debugOptions?.cacheOptions;
    cacheOptions = {
        outputExpirySeconds: debugCO?.outputExpirySeconds ?? defaultCacheOptions.outputExpirySeconds,
        sessionCacheExpirySeconds: debugCO?.sessionCacheExpirySeconds ?? defaultCacheOptions.sessionCacheExpirySeconds,
        useServerSentEvents: options?.useServerSentEvents ?? defaultCacheOptions.useServerSentEvents,
        ssrCacheType: debugOptions?.cacheOptions?.ssrCacheType ?? defaultCacheOptions.ssrCacheType,
        csrCacheType: debugOptions?.cacheOptions?.csrCacheType ?? defaultCacheOptions.csrCacheType,
        makeCustomStore: debugOptions?.cacheOptions?.makeCustomStore ?? defaultCacheOptions.makeCustomStore
    };
}
/**
 * Create a query to use with [[requestImpression]] or [[useImpression]] using the builder pattern.
 *
 * @return Query to use with [[requestImpression]] or [[useImpression]].
 */ function queryBuilder() {
    const query = new Query();
    // if proxies are not supported (very old browswers), we won't call the impression serer
    // default values will be provided for all features
    if (typeof Proxy != "function") return query;
    const handler = {
        get (target, prop, receiver) {
            if (prop.startsWith("get")) {
                const feature = prop.slice(3);
                const getter = (args)=>{
                    target._.wireArgs[feature] = args ?? {};
                    return receiver;
                };
                return getter;
            }
            return Reflect.get(target, prop, receiver);
        }
    };
    return new Proxy(query, handler);
}
/**
 * Create a query to use with [[requestImpression]] or [[useImpression]] using the builder pattern.
 * This is the same as QueryBuilder, just less typing
 *
 * @return Query to use with [[requestImpression]] or [[useImpression]].
 */ const qb = queryBuilder;
/**
 * Convert a [[ImpressionJSON]] back to an impression.
 */ function toImpression(impressionJson) {
    return toImpressionImpl(impressionJson);
}
function toImpressionImpl({ impressionType , sessionKeys: sessionKeys3 , wireArgs , wireOutputs: outputs  }) {
    const impression = new ImpressionImpl({
        impressionType,
        sessionKeys: sessionKeys3,
        wireArgs,
        wireOutputs: outputs
    });
    return impression;
}
function cleanWireArgs(wireArgs) {
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
function logIServerIssue(message, ...optionalParams) {
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
 */ async function iserverFetch({ options , impressionId , sessionArgs , implicitArgs , wireArgs  }) {
    const fetchOptions = [
        ...options
    ];
    if (misc.logIServerDetails) log.info("iserver fetch START ------");
    try {
        if (misc.ssr && implicitArgs.ipAddress == undefined && // stifle this message in development because the dev version compiles the page on
        // every render which prints this message each time
        "production" != "development") {
            log.warn("Looks like you are rendering server side (SSR), did you forget to pass incomingMessage? " + "This message can also appear during a static build of a CSR page, in which case you can ignore it.");
        }
        let result = undefined;
        wireArgs = cleanWireArgs(wireArgs);
        const featuresRequested = Object.keys(wireArgs ?? {}).length;
        try {
            const body = {
                fetchOptions,
                args: {
                    ...sessionArgs,
                    ...implicitArgs
                },
                impressionId,
                requests: wireArgs
            };
            const headers = getCausalHeaders(sessionArgs);
            const url = network.getBaseUrl() + "features";
            const payload = {
                method: "POST",
                body: JSON.stringify(body),
                headers
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
            const error = {
                errorType: "fetch",
                message: errMsg
            };
            return {
                impression: undefined,
                flags: undefined,
                error,
                featuresRequested,
                featuresReceived: 0
            };
        }
        if (result == undefined) {
            const errMsg = "fetch returned null";
            const error = {
                errorType: "fetchResponse",
                message: errMsg
            };
            return {
                impression: undefined,
                flags: undefined,
                error,
                featuresRequested,
                featuresReceived: 0
            };
        } else if (result.status != 200) {
            let errMsg = `Impression server non 200. Result = ${result.status}.`;
            if (result.text != undefined && typeof result.text == "function") {
                const errTxt = await result.text();
                errMsg += `  fetch text() response = ${errTxt}.`;
            }
            logIServerIssue(errMsg);
            const error = {
                errorType: "fetchResponse",
                message: errMsg
            };
            return {
                impression: undefined,
                flags: undefined,
                error,
                featuresReceived: 0,
                featuresRequested
            };
        }
        let response;
        try {
            response = await result.json();
            if (misc.logIServerDetails) log.info("fetch...json() response", response);
            if (response == undefined || Object.keys(response).length == 0) {
                const errMsg = response == undefined ? "Unexpected undefined or null response callling fetch...json()" : "Response was defined calling fetch...json(), but contained no data";
                logIServerIssue(errMsg);
                const error = {
                    errorType: "fetchResponse",
                    message: errMsg
                };
                return {
                    impression: undefined,
                    flags: undefined,
                    error,
                    featuresRequested,
                    featuresReceived: 0
                };
            }
        } catch (e1) {
            const errMsg = "exception thrown calling fetch...json()";
            logIServerIssue(errMsg, e1);
            const error = {
                errorType: "fetch",
                message: errMsg
            };
            return {
                impression: undefined,
                flags: undefined,
                error,
                featuresRequested,
                featuresReceived: 0
            };
        }
        const { _flags: responseFlags , errors , _variants , ...wireOutputs } = response;
        const impression = new ImpressionImpl({
            impressionType: "real",
            sessionKeys: sessionKeys(wireOutputs.session),
            wireArgs,
            wireOutputs
        });
        let error = undefined;
        let warning = undefined;
        let returnFlags = responseFlags;
        const { session , ...restOfFeatures } = wireOutputs ?? {};
        const featuresReceived = Object.keys(restOfFeatures ?? {}).length;
        if (featuresRequested > 0 && featuresReceived == 0) {
            const errMsg = "no features were returned by the impression server";
            logIServerIssue(errMsg);
            warning = {
                errorType: "fetchResponse",
                message: errMsg
            };
        }
        if (session == undefined) {
            const errMsg = "no session returned from impression server";
            logIServerIssue(errMsg);
            error = {
                errorType: "fetchResponse",
                message: errMsg
            };
        } else if (fetchOptions?.includes("flags") && responseFlags == undefined) {
            const errMsg = "unexpected empty response flags";
            logIServerIssue(errMsg);
            error = {
                errorType: "fetchResponse",
                message: errMsg
            };
            returnFlags = returnFlags ?? defaultFlags;
        } else if (errors != undefined) {
            error = {
                errorType: "field",
                message: "fetch succeeded, but one or more fields had an error",
                fieldErrors: errors
            };
        }
        const activeVariants = (_variants ?? []).map(variantFromWire);
        sortVariants(activeVariants);
        return {
            impression,
            flags: returnFlags,
            error,
            warning,
            activeVariants,
            featuresRequested,
            featuresReceived
        };
    } catch (e) {
        const errMsg = "unexpected iserverFetch exception.";
        logIServerIssue(errMsg, e);
        const error = {
            errorType: "fetch",
            message: errMsg
        };
        return {
            impression: undefined,
            flags: undefined,
            error,
            featuresRequested: 0,
            featuresReceived: 0
        };
    } finally{
        if (misc.logIServerDetails) log.info("iserver fetch END ------");
    }
}
function variantFromWire(wireVariant) {
    return {
        experimentId: wireVariant.id,
        experimentName: wireVariant.name,
        variantId: wireVariant.variant?.id ?? undefined,
        variantName: wireVariant.variant?.name ?? "control"
    };
}
function sortVariants(variants) {
    variants.sort((a, b)=>{
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
 */ function sendImpressionBeacon(session, impression, impressionId) {
    const outputs = impression._.json.wireOutputs;
    const wireArgs = impression._.json.wireArgs;
    const impressionIdMap = {};
    let count = 0;
    Object.entries(outputs).forEach(([featureName, _output])=>{
        const output = _output;
        const args = wireArgs[featureName];
        if (featureName != "session" && output != "OFF" && output != undefined) {
            const entry = session._.cache.getFeature(featureName, args);
            if (entry) {
                entry.lastRender = misc.ssr ? "ssr" : "csr";
                count += 1;
                impressionIdMap[featureName] = {
                    impression: output?._impressionId,
                    newImpression: impressionId
                };
                entry.impressionCount += 1;
                session._.cache.setFeature(featureName, args, entry);
            } else log.warn("entry is null, ignoring");
        }
    });
    if (count > 0) {
        network.sendBeacon(getCausalHeaders(sessionKeys(session._.args)), {
            id: impression.sessionKeys,
            impressions: impressionIdMap
        });
    }
}
function updateSessionVariants(session, iserverVariants, impressionId, impression) {
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
    /* --- update requested features --- */ const prevFeatures = session._.cache.get(requestedFeaturesKey) ?? [];
    const nameToPrevFeature = new Map(prevFeatures.map((f)=>[
            f.featureName,
            f
        ]
    ));
    const nameToFeature = new Map();
    Object.entries(outputs).forEach(([featureName, _output])=>{
        const output = _output;
        if (featureName != "session" && // the impression server in theory could send back things not requested
        // in practice, this happens in unit tests
        wireArgs[featureName] != undefined) nameToFeature.set(featureName, {
            featureName,
            isOn: output != "OFF"
        });
    });
    const updatedFeatures = [
        ...nameToFeature.values()
    ];
    const newFeatures = [];
    for (const [name, feature] of nameToPrevFeature){
        if (!nameToFeature.has(name)) updatedFeatures.push(feature);
    }
    for (const [name1, feature1] of nameToFeature){
        if (!nameToPrevFeature.has(name1)) newFeatures.push(feature1);
    }
    const sortFn = (a, b)=>a.featureName.localeCompare(b.featureName)
    ;
    updatedFeatures.sort(sortFn);
    newFeatures.sort(sortFn);
    /* --- update active variants --- */ const cachedVariants = session._.cache.get(activeVariantsKey) ?? [];
    const prevVariants = cachedVariants;
    const idToPrevVariant = new Map(prevVariants.map((v)=>[
            v.variantId ?? v.experimentId,
            v
        ]
    ));
    const newVariants = [];
    let updatedVariants;
    // this will hold all variants that should now be active
    let idToVariant = new Map();
    if (iserverVariants != undefined) {
        // if the iserver sent us variants, those are the ones to use
        updatedVariants = iserverVariants;
        idToVariant = new Map(updatedVariants.map((v)=>[
                v.variantId ?? v.experimentId,
                v
            ]
        ));
    } else {
        // this impression was served out of the cache
        // we need to add any variants that are now on b/c they were cached only impressions
        idToVariant = new Map();
        Object.entries(outputs).forEach(([featureName, _output])=>{
            const output = _output;
            const args = wireArgs[featureName];
            if (featureName != "session" && output != "OFF" && output != undefined) {
                const entry = session._.cache.getFeature(featureName, args);
                if (entry && entry.impressionCount == 0) {
                    for (const wireVariant of output._variants ?? []){
                        const id = wireVariant.variant?.id ?? wireVariant.id;
                        if (idToVariant.get(id) == undefined) idToVariant.set(id, variantFromWire(wireVariant));
                    }
                }
            }
        });
        updatedVariants = [
            ...idToVariant.values()
        ];
        for (const [id1, variant] of idToPrevVariant){
            if (!idToVariant.has(id1)) updatedVariants.push(variant);
        }
    }
    for (const [id2, variant] of idToVariant){
        if (!idToPrevVariant.has(id2)) newVariants.push(variant);
    }
    sortVariants(newVariants);
    sortVariants(updatedVariants);
    /* --- save and notify --- */ session._.cache.set(activeVariantsKey, updatedVariants);
    session._.cache.set(requestedFeaturesKey, updatedFeatures);
    misc.onUpdateActiveVariants(newVariants);
    misc.onImpression({
        newVariants,
        allVariants: updatedVariants,
        newFeatures,
        allFeatures: updatedFeatures
    });
}
function updateImpressionIds(impression, newImpressionId, wireArgs) {
    const newOutputs = {};
    for (const _k of Object.keys(wireArgs ?? {})){
        const k = _k;
        const currentOutput = impression.toJSON().wireOutputs[k];
        // if the feature is off (or not there), don't update the impression ids
        if (currentOutput == "OFF" || currentOutput == undefined) {
            newOutputs[k] = currentOutput;
        } else {
            const newOutput = {
                ...currentOutput,
                _impressionId: newImpressionId
            };
            newOutputs[k] = newOutput;
        }
    }
    return toImpressionImpl({
        impressionType: impression.toJSON().impressionType,
        sessionKeys: impression.sessionKeys,
        wireArgs,
        wireOutputs: newOutputs
    });
}
/**
 * A React context to hold a [[Session]]
 * This uses the standard [React context](https://reactjs.org/docs/context.html) provider pattern
 */ const SessionContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
/**
 * A React hook to get the current [[Session]] in the [[SessionContext]]
 * @returns [[Session]]
 */ function useSession() {
    const session = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SessionContext);
    return session;
}
/**
 * Type predicate to narrows the type of an impression. Useful for narrowing union types.
 * Example:
 *   const impression: Impression&lt;A&gt; | Impression&lt;B&gt; = ...
 *   if (isImpression(impression, "A")) {
 *     impression.A // impression has been narrowed to type A
 *   }
 */ function isImpressionType(impression, toTestType) {
    if (toTestType == undefined) return false;
    return impression._.json.wireArgs[toTestType] != undefined;
}
/**
 * Type predicate to narrows the type of a feature. Useful for narrowing union types.
 * Example:
 *   const feature: FeatureA | FeatureB = ...
 *   if (isImpression(impression, "FeatureA")) {
 *     featureA // feature has been narrowed to type FeatureA
 *   }
 */ function isFeatureType(feature, toTestType) {
    if (toTestType == undefined) return false;
    if (feature == undefined) return false;
    return feature.featureName == toTestType;
}
/**
 * React hook to get both the impression and the on/off flags associated with a feature
 */ function useImpression(query, impressionId, session) {
    const _sessionContext = useSession();
    session = session ?? _sessionContext;
    if (session == undefined) {
        throw new Error("No session conext (SessionProvider), and no session passed in");
    }
    // _session is recognized as constant through, whereas TS doesn't
    // know session will be non-null inside nested functions
    const _session = session;
    // putting into a ref so hook always returns the same loading impression when loading
    const _loadingImpression = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(loadingImpression(session));
    const wireArgs = query?._.wireArgs;
    const { 1: forceUpdate  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)((x)=>x + 1
    , 0);
    const errorState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const impressionState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
        state: "none",
        impression: _loadingImpression.current
    });
    const firstTime = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(true);
    const requestFinishTS = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const wireArgsJson = JSON.stringify(wireArgs ? wireArgs : undefined);
    const prevSession = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(_session);
    const prevWireArgsJson = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(wireArgsJson);
    const prevFlushCount = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(_flushCount);
    const prevImpressionId = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(impressionId);
    let hasChange = false;
    // re-request as frequently as the cache expires
    // or if cache is busted
    // or if the session args change
    // or if the query changes
    // of it the impression id changes
    let nextCycle = undefined;
    const now = new Date();
    if (requestFinishTS.current != undefined && _session._.cache.outputExpirySeconds) nextCycle = addSeconds(requestFinishTS.current, _session._.cache.outputExpirySeconds);
    const sessionChanged = !sessionArgsMatch(prevSession.current._.args, _session._.args);
    if (sessionChanged || nextCycle != undefined && nextCycle < now || prevWireArgsJson.current != wireArgsJson || prevFlushCount.current != _flushCount || prevImpressionId.current != impressionId) {
        // not using useEffect / dependency array for this b/c want
        // this code to reset the state in the same render cycle,
        // the rest of the non effect code in the hook can further update it
        hasChange = true;
        // update impression state
        impressionState.current = {
            state: "none",
            impression: _loadingImpression.current
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
        const { cachedImpression , metadata  } = getCachedImpression(session, wireArgs);
        if (cachedImpression != undefined && impressionState.current.state == "none") {
            hasChange = true;
            const newImpressionId = impressionId ?? uuidv4();
            let useLoadingImpression = false;
            if (session._.hydrating) {
                // We did a cache transfer and are potentially hydrating an SSR render.
                // We need to take care and make sure that the SSR and the hydration render identically,
                // otherwise we will get a hydration error from react
                // we do this by delaying the render of things that were not transferred for this render
                let allHydratable = true;
                for (const v of metadata.values()){
                    if (!v.hydratable) {
                        allHydratable = false;
                        break;
                    }
                }
                useLoadingImpression = !allHydratable;
            }
            updateSessionVariants(_session, undefined, newImpressionId, cachedImpression);
            if (useLoadingImpression) {
                impressionState.current = {
                    state: "loadingCached",
                    newImpressionId,
                    impression: _loadingImpression.current,
                    cachedImpression,
                    metadata
                };
            } else {
                impressionState.current = {
                    state: "cached",
                    newImpressionId,
                    impression: updateImpressionIds(cachedImpression, newImpressionId, wireArgs),
                    cachedImpression,
                    metadata
                };
            }
        }
    }
    // fetch results
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        log.debug(1, "useImpression fetch results effect");
        async function request() {
            if (query != undefined) {
                log.debug(1, "useImpression fetch results effect: request()");
                log.debug(1, "request");
                const { impression , error  } = await _session.requestImpression(query, impressionId);
                requestFinishTS.current = new Date();
                impressionState.current = {
                    state: "done",
                    impression: impression
                };
                errorState.current = error;
                forceUpdate();
            }
        }
        if (query != undefined && impressionState.current.state == "none") {
            impressionState.current = {
                state: "loading",
                impression: _loadingImpression.current
            };
            request();
            forceUpdate();
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (query != undefined && impressionState.current.state == "loadingCached") {
            const newImpressionId = impressionState.current.newImpressionId;
            const cachedImpression = impressionState.current.cachedImpression;
            const metadata = impressionState.current.metadata;
            impressionState.current = {
                state: "cached",
                newImpressionId,
                impression: updateImpressionIds(cachedImpression, newImpressionId, wireArgs),
                cachedImpression,
                metadata
            };
            forceUpdate();
        }
    });
    // send beacons for cached impressions
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        log.debug(1, "useImpression useEffect: cached");
        if (impressionState.current.state == "cached") {
            sendImpressionBeacon(_session, impressionState.current.cachedImpression, impressionState.current.newImpressionId);
            impressionState.current = {
                state: "done",
                impression: impressionState.current.impression
            };
        }
    });
    // return current values
    const loading = impressionState.current.state == "none" || impressionState.current.state == "loading" || impressionState.current.state == "loadingCached";
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
        flags: flags,
        error: errorState.current
    };
}
function useFeature(featureReq, impressionId, session) {
    let featureName;
    let query;
    if (featureReq == undefined) {
        featureName = undefined;
        query = undefined;
    } else if (typeof featureReq == "string") {
        featureName = featureReq;
        const queryArgs = {};
        queryArgs[featureName] = {};
        query = createQuery(queryArgs);
    } else {
        query = featureReq;
        const keys = [
            ...Object.keys(query._.wireArgs ?? {})
        ];
        featureName = keys[0];
        if (keys.length == 0) log.warn("no feature requested for useFeature");
        if (keys.length > 1) {
            log.warn(`More than on feature requested from useFeature, using ${featureName}. (all = ${keys}) `);
        }
    }
    const { impression  } = useImpression(query, impressionId, session);
    const impressionImpl = impression;
    if (impression == undefined) return undefined;
    const feature = impression[featureName];
    if (feature == undefined) return undefined;
    const featureOutputs = impressionImpl._.json.wireOutputs[featureName];
    const actualImpresionId = featureOutputs == "OFF" ? undefined : featureOutputs?._impressionId;
    return {
        ...feature,
        featureName,
        impressionId: actualImpresionId,
        impression
    };
}
//#endregion
//#region utility
const maxDate = new Date(8640000000000000);
function makeFutureDate(secondsFromNow) {
    return new Date(Date.now() + secondsFromNow * 1000);
}
function addSeconds(date, seconds) {
    return new Date(date.valueOf() + seconds * 1000);
} //#endregion


/***/ }),

/***/ 165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ RatingWidget)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function RatingWidget({ curRating , onSetRating  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "rating",
        children: [
            1,
            2,
            3,
            4,
            5
        ].map((rating)=>{
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                onClick: ()=>{
                    onSetRating(rating);
                },
                children: rating <= curRating ? "\u2605" : "\u2606"
            }, rating);
        })
    });
}


/***/ })

};
;