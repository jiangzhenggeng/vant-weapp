"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = __importDefault(require("../wxs-ts/utils"));
component_1.VantComponent({
    props: {
        info: null,
        name: String,
        size: String,
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: 'van-icon'
        }
    },
    created: function () {
        this.setData({
            isSrc: utils_1.default.isSrc(this.data.name)
        });
    },
    methods: {
        onClick: function () {
            this.$emit('click');
        }
    }
});
