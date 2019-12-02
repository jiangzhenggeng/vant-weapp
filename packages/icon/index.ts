import { VantComponent } from '../common/component';
import utils from '../wxs-ts/utils';

VantComponent({
  props: {
    info: null,
    name: String,
    size: String,
    color: String,
    isSrc: Boolean,
    customStyle: String,
    classPrefix: {
      type: String,
      value: 'van-icon'
    }
  },

  created() {
    this.setData({
      isSrc: this.data.isSrc || utils.isSrc(this.data.name)
    })
  },

  methods: {
    onClick() {
      this.$emit('click');
    }
  }
});
