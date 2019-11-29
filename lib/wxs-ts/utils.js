"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bem_1 = __importDefault(require("./bem"));
var memoize_1 = __importDefault(require("./memoize"));
function isSrc(url) {
    return url.indexOf('http') === 0 || url.indexOf('data:image') === 0 || url.indexOf('//') === 0;
}
exports.default = {
    bem: bem_1.default,
    isSrc: isSrc,
    memoize: memoize_1.default
};
