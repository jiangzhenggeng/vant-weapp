import { VantComponent } from '../common/component';
import utils from '../wxs-ts/utils';

function emit(target: WechatMiniprogram.Component.TrivialInstance, value: boolean | any[]) {
  target.$emit('input', value);
  target.$emit('change', value);
}

VantComponent({
  field: true,

  relation: {
    name: 'checkbox-group',
    type: 'ancestor',
    linked(target) {
      this.parent = target;
    },
    unlinked() {
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

  created() {
    let {
      shape,
      value,
      labelPosition,
      disabled
    } = this.data
    this.setData({
      bemIcon: utils.bem('checkbox__icon', [shape, { disabled, checked: value }]),
      bemLabel: utils.bem('checkbox__label', [labelPosition, { disabled }])
    })
  },

  methods: {
    emitChange(value: boolean) {
      if (this.parent) {
        this.setParentValue(this.parent, value);
      } else {
        emit(this, value);
      }
    },

    toggle() {
      const { disabled, value } = this.data;
      if (!disabled) {
        this.emitChange(!value);
      }
    },

    onClickLabel() {
      const { labelDisabled, disabled, value } = this.data;
      if (!disabled && !labelDisabled) {
        this.emitChange(!value);
      }
    },

    setParentValue(parent: WechatMiniprogram.Component.TrivialInstance, value: boolean) {
      const parentValue = parent.data.value.slice();
      const { name } = this.data;
      const { max } = parent.data;

      if (value) {
        if (max && parentValue.length >= max) {
          return;
        }

        if (parentValue.indexOf(name) === -1) {
          parentValue.push(name);
          emit(parent, parentValue);
        }
      } else {
        const index = parentValue.indexOf(name);
        if (index !== -1) {
          parentValue.splice(index, 1);
          emit(parent, parentValue);
        }
      }
    }
  }
});
