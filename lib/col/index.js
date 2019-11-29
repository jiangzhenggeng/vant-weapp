"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = __importDefault(require("../wxs-ts/utils"));
component_1.VantComponent({
    relation: {
        name: 'row',
        type: 'ancestor'
    },
    props: {
        span: Number,
        offset: Number
    },
    data: {
        style: ''
    },
    created: function () {
        this.setData({
            bem: utils_1.default.bem('col', [this.data.span])
        });
    },
    methods: {
        setGutter: function (gutter) {
            var padding = gutter / 2 + "px";
            var style = gutter ? "padding-left: " + padding + "; padding-right: " + padding + ";" : '';
            if (style !== this.data.style) {
                this.set({ style: style });
            }
        }
    }
});
