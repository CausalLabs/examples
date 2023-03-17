"use strict";
exports.id = 955;
exports.ids = [955];
exports.modules = {

/***/ 955:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductInfo": () => (/* binding */ ProductInfo),
/* harmony export */   "default": () => (/* binding */ Page)
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






function Page() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const session = new _causal__WEBPACK_IMPORTED_MODULE_3__/* .Session */ .z_({
        deviceId: (0,_utils__WEBPACK_IMPORTED_MODULE_5__/* .getOrGenDeviceId */ .a2)(router)
    });
    const product = _utils__WEBPACK_IMPORTED_MODULE_5__/* .products */ .RB[router.query.pid];
    if (product == undefined) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}); // Product not found
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_causal__WEBPACK_IMPORTED_MODULE_3__/* .SessionContext.Provider */ .B3.Provider, {
        value: session,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProductInfo, {
            product: product
        })
    });
};
function ProductInfo({ product  }) {
    const { 0: rating , 1: setRating  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const query = (0,_causal__WEBPACK_IMPORTED_MODULE_3__/* .queryBuilder */ .kB)().getRatingBox({
        product: product.name
    });
    const { impression , flags , error  } = (0,_causal__WEBPACK_IMPORTED_MODULE_3__/* .useImpression */ .on)(query);
    // check for errors
    if (error) {
        console.log("There is no impression server running yet, but it still works! " + "Causal is resilient to network and backend outages " + "because the defaults are compiled in \uD83D\uDE03.");
    }
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
            flags?.RatingBox && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        children: impression.RatingBox?.callToAction
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_RatingWidget__WEBPACK_IMPORTED_MODULE_4__/* .RatingWidget */ .u, {
                        curRating: rating,
                        onSetRating: (newRating)=>{
                            setRating(newRating);
                            // wire up events
                            impression.RatingBox?.signalRating({
                                stars: newRating
                            });
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
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;