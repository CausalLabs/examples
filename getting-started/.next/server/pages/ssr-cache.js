"use strict";
(() => {
var exports = {};
exports.id = 303;
exports.ids = [303,765];
exports.modules = {

/***/ 340:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Index),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _causal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(921);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(221);
/* harmony import */ var _react_example__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(955);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils__WEBPACK_IMPORTED_MODULE_2__, _react_example__WEBPACK_IMPORTED_MODULE_3__]);
([_utils__WEBPACK_IMPORTED_MODULE_2__, _react_example__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




async function getServerSideProps(context) {
    const product = _utils__WEBPACK_IMPORTED_MODULE_2__/* .products */ .RB[context.query.pid] ?? _utils__WEBPACK_IMPORTED_MODULE_2__/* .products.iphone */ .RB.iphone;
    const deviceId = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .getOrGenDeviceId */ .a2)(context);
    const session = _causal__WEBPACK_IMPORTED_MODULE_1__/* .Session.fromDeviceId */ .z_.fromDeviceId(deviceId, context.req);
    await session.requestCacheFill((0,_causal__WEBPACK_IMPORTED_MODULE_1__.qb)().getRatingBox({
        product: product.name
    }));
    return {
        props: {
            sessionJson: session.toJSON(),
            product
        }
    };
}
function Index(props) {
    const session = (0,_causal__WEBPACK_IMPORTED_MODULE_1__/* .useSessionJSON */ .N$)(props.sessionJson);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_causal__WEBPACK_IMPORTED_MODULE_1__/* .SessionContext.Provider */ .B3.Provider, {
        value: session,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_react_example__WEBPACK_IMPORTED_MODULE_3__.ProductInfo, {
            product: props.product
        })
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 640:
/***/ ((module) => {

module.exports = require("cookies");

/***/ }),

/***/ 31:
/***/ ((module) => {

module.exports = require("cross-fetch");

/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 542:
/***/ ((module) => {

module.exports = require("react-cookies");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 555:
/***/ ((module) => {

module.exports = import("uuid");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [221,507,955], () => (__webpack_exec__(340)));
module.exports = __webpack_exports__;

})();