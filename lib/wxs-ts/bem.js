"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var array_1 = __importDefault(require("./array"));
var object_1 = __importDefault(require("./object"));
var PREFIX = 'van-';
function join(name, mods) {
    name = PREFIX + name;
    mods = mods.map(function (mod) {
        return name + '--' + mod;
    });
    mods.unshift(name);
    return mods.join(' ');
}
function traversing(mods, conf) {
    if (!conf) {
        return;
    }
    if (typeof conf === 'string' || typeof conf === 'number') {
        mods.push(conf);
    }
    else if (array_1.default(conf)) {
        conf.forEach(function (item) {
            traversing(mods, item);
        });
    }
    else if (typeof conf === 'object') {
        object_1.default(conf).forEach(function (key) {
            conf[key] && mods.push(key);
        });
    }
}
function bem(name, conf) {
    var mods = [];
    traversing(mods, conf);
    return join(name, mods);
}
exports.default = bem;
