"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _axios=_interopRequireDefault(require("axios"));var api=_axios["default"].create({baseURI:'http://192.168.1.89:3333'});var _default=api;exports["default"]=_default;