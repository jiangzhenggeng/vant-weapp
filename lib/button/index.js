"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var button_1 = require("../mixins/button");
var open_type_1 = require("../mixins/open-type");
var utils_1 = __importDefault(require("../wxs-ts/utils"));
component_1.VantComponent({
    mixins: [button_1.button, open_type_1.openType],
    classes: ['hover-class', 'loading-class'],
    props: {
        icon: String,
        color: String,
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        type: {
            type: String,
            value: 'default'
        },
        size: {
            type: String,
            value: 'normal'
        },
        loadingSize: {
            type: String,
            value: '20px'
        }
    },
    created: function () {
        var _a = this.data, type = _a.type, size = _a.size, block = _a.block, round = _a.round, plain = _a.plain, square = _a.square, loading = _a.loading, disabled = _a.disabled, hairline = _a.hairline;
        this.setData({
            bemWrap: utils_1.default.bem('button', [type, size, { block: block, round: round, plain: plain, square: square, loading: loading, disabled: disabled, hairline: hairline, unclickable: disabled || loading }])
        });
    },
    methods: {
        onClick: function () {
            if (!this.data.disabled && !this.data.loading) {
                this.$emit('click');
            }
        }
    }
});
