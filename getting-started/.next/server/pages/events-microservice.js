"use strict";
(() => {
var exports = {};
exports.id = 261;
exports.ids = [261,765];
exports.modules = {

/***/ 72:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductInfo),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _causal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(921);
/* harmony import */ var _components_RatingWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(165);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(221);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils__WEBPACK_IMPORTED_MODULE_5__]);
_utils__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






async function getServerSideProps(context) {
    const deviceId = (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .getOrGenDeviceId */ .a2)(context);
    const product = _utils__WEBPACK_IMPORTED_MODULE_5__/* .products */ .RB[context.query.pid] ?? _utils__WEBPACK_IMPORTED_MODULE_5__/* .products.iphone */ .RB.iphone;
    const session = new _causal__WEBPACK_IMPORTED_MODULE_3__/* .Session */ .z_({
        deviceId
    }, context.req);
    const { impression , flags , error  } = await session.requestImpression((0,_causal__WEBPACK_IMPORTED_MODULE_3__.qb)().getRatingBox({
        product: product.name
    }), "imp-1234");
    if (error) {
        console.log("There is no impression server running yet, but it still works! " + "Causal is resilient to network and backend outages because the defaults are compiled in \uD83D\uDE03.");
    }
    return {
        props: {
            showRatingBox: flags.RatingBox,
            product,
            CTA: impression.RatingBox?.callToAction ?? ""
        }
    };
}
function ProductInfo({ showRatingBox , product , CTA  }) {
    const { 0: rating , 1: setRating  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "center",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                children: product.name
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                src: product.url,
                alt: "product image"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                children: CTA
            }),
            showRatingBox && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_RatingWidget__WEBPACK_IMPORTED_MODULE_4__/* .RatingWidget */ .u, {
                        curRating: rating,
                        onSetRating: (newRating)=>{
                            setRating(newRating);
                            _causal__WEBPACK_IMPORTED_MODULE_3__/* .RatingBox.signalRating */ .br.signalRating({
                                deviceId: (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .getOrGenDeviceId */ .a2)(router)
                            }, "imp-1234", {
                                stars: rating
                            });
                        // For autocomplete convenience, you can also reference the feature
                        // classes through the allFeatureTypes variable.
                        //
                        // allFeatureTypes.RatingBox.signalRating(deviceId, impressionId, {
                        //   stars: rating,
                        // });
                        }
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        href: router.route + "?pid=" + product.next,
                        children: "Rate Another"
                    })
                ]
            })
        ]
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
var __webpack_exports__ = __webpack_require__.X(0, [221,507], () => (__webpack_exec__(72)));
module.exports = __webpack_exports__;

})();