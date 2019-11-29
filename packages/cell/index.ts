import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';
import utils from '../wxs-ts/utils';

VantComponent({
  classes: [
    'title-class',
    'label-class',
    'value-class',
    'right-icon-class',
    'hover-class'
  ],

  mixins: [link],

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


  created() {
    let {
      size,
      center,
      required,
      border,
      isLink,
      clickable
    } = this.data
    this.setData({
      bemWrap: utils.bem('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable }])
    })
  },

  methods: {
    onClick(event: Weapp.Event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    }
  }
});
