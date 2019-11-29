"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = __importDefault(require("../wxs-ts/utils"));
function emit(target, value) {
    target.$emit('input', value);
    target.$emit('change', value);
}
component_1.VantComponent({
    field: true,
    relation: {
        name: 'checkbox-group',
        type: 'ancestor',
        linked: function (target) {
            this.parent = target;
        },
        unlinked: function () {
            this.parent = null;
        }
    },
    classes: ['icon-class', 'label-class'],
    props: {
        value: Boolean,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: String,
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: 'round'
        }
    },
    created: function () {
        var _a = this.data, shape = _a.shape, value = _a.value, labelPosition = _a.labelPosition, disabled = _a.disabled;
        this.setData({
            bemIcon: utils_1.default.bem('checkbox__icon', [shape, { disabled: disabled, checked: value }]),
            bemLabel: utils_1.default.bem('checkbox__label', [labelPosition, { disabled: disabled }])
        });
    },
    methods: {
        emitChange: function (value) {
            if (this.parent) {
                this.setParentValue(this.parent, value);
            }
            else {
                emit(this, value);
            }
        },
        toggle: function () {
            var _a = this.data, disabled = _a.disabled, value = _a.value;
            if (!disabled) {
                this.emitChange(!value);
            }
        },
        onClickLabel: function () {
            var _a = this.data, labelDisabled = _a.labelDisabled, disabled = _a.disabled, value = _a.value;
            if (!disabled && !labelDisabled) {
                this.emitChange(!value);
            }
        },
        setParentValue: function (parent, value) {
            var parentValue = parent.data.value.slice();
            var name = this.data.name;
            var max = parent.data.max;
            if (value) {
                if (max && parentValue.length >= max) {
                    return;
                }
                if (parentValue.indexOf(name) === -1) {
                    parentValue.push(name);
                    emit(parent, parentValue);
                }
            }
            else {
                var index = parentValue.indexOf(name);
                if (index !== -1) {
                    parentValue.splice(index, 1);
                    emit(parent, parentValue);
                }
            }
        }
    }
});
