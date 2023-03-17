"use strict";
exports.id = 221;
exports.ids = [221];
exports.modules = {

/***/ 221:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RB": () => (/* binding */ products),
/* harmony export */   "a2": () => (/* binding */ getOrGenDeviceId),
/* harmony export */   "qx": () => (/* binding */ ClientOnly)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(640);
/* harmony import */ var cookies__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookies__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(542);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(555);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([uuid__WEBPACK_IMPORTED_MODULE_4__]);
uuid__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





/**
 * Get the device id stored in cookies. If not found, generate one and store it in cookies.
 *
 * @param routerOrContext
 * For SSR, the request context object, other wise a NextRouter
 * The router is needed to determine if Next.js is doing a static prerender, in which case the impresion is ignored
 *
 * @returns the found or generated device id
 */ function getOrGenDeviceId(routerOrContext) {
    const router = "req" in routerOrContext ? undefined : routerOrContext;
    const context = "req" in routerOrContext ? routerOrContext : undefined;
    if (context) {
        const cookies = new (cookies__WEBPACK_IMPORTED_MODULE_1___default())(context.req, context.res);
        const deviceId = cookies.get("deviceId");
        if (deviceId !== undefined) {
            return deviceId;
        }
        const id = (0,uuid__WEBPACK_IMPORTED_MODULE_4__.v4)();
        const date = new Date();
        date.setFullYear(2050);
        cookies.set("deviceId", id, {
            expires: date,
            httpOnly: false
        });
        return id;
    } else {
        if (true) {
            if (router && router.isReady) {
                console.error("SSR, but no context passed in");
                return "error-id";
            } else {
                // this is next.js doing a static prerender
                return "ignore-static-prerender-id";
            }
        }
        const device = react_cookies__WEBPACK_IMPORTED_MODULE_3___default().load("deviceId");
        if (device !== undefined) return device;
        const id = (0,uuid__WEBPACK_IMPORTED_MODULE_4__.v4)();
        const date = new Date();
        date.setFullYear(2050);
        react_cookies__WEBPACK_IMPORTED_MODULE_3___default().save("deviceId", id, {
            expires: date,
            httpOnly: false
        });
        return id;
    }
}
/**
 * A component that only renders child components on the client side
 */ function ClientOnly({ children  }) {
    const { 0: hasMounted , 1: setHasMounted  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
}
const products = {
    iphone: {
        name: "iPhone 13",
        url: "/iphone13.webp",
        next: "pixel"
    },
    pixel: {
        name: "Pixel 5",
        url: "/pixel5.webp",
        next: "fold"
    },
    fold: {
        name: "Samsung Galaxy Fold",
        url: "/galaxyfold.webp",
        next: "iphone"
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;