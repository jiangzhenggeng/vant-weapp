"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = require("../mixins/link");
var component_1 = require("../common/component");
var utils_1 = __importDefault(require("../wxs-ts/utils"));
component_1.VantComponent({
    classes: [
        'title-class',
        'label-class',
        'value-class',
        'right-icon-class',
        'hover-class'
    ],
    mixins: [link_1.link],
    props: {
        title: null,
        value: null,
        icon: String,
        size: String,
        label: String,
        center: Boolean,
        isLink: Boolean,
        required: Boolean,
        clickable: Boolean,
        titleWidth: String,
        customStyle: String,
        arrowDirection: String,
        useLabelSlot: Boolean,
        border: {
            type: Boolean,
            value: true
        }
    },
    created: function () {
        var _a = this.data, size = _a.size, center = _a.center, required = _a.required, border = _a.border, isLink = _a.isLink, clickable = _a.clickable;
        this.setData({
            bemWrap: utils_1.default.bem('cell', [size, { center: center, required: required, borderless: !border, clickable: isLink || clickable }])
        });
    },
    methods: {
        onClick: function (event) {
            this.$emit('click', event.detail);
            this.jumpLink();
        }
    }
});
