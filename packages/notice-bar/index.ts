import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';
import utils from '../wxs-ts/utils';

const FONT_COLOR = '#ed6a0c';
const BG_COLOR = '#fffbe8';

VantComponent({
  props: {
    text: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    openType: {
      type: String,
      value: 'navigate'
    },
    delay: {
      type: Number,
      value: 1
    },
    speed: {
      type: Number,
      value: 50
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    leftIcon: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      value: BG_COLOR
    },
    wrapable: Boolean
  },

  data: {
    show: true
  },

  watch: {
    text() {
      this.set({}, this.init);
    }
  },

  created() {
    this.resetAnimation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear'
    });

    let {
      mode,
      wrapable
    } = this.data
    this.setData({
      bemWrap: utils.bem('notice-bar', { withicon: mode, wrapable })
    })

  },

  destroyed() {
    this.timer && clearTimeout(this.timer);
  },

  methods: {
    init() {
      Promise.all([
        this.getRect('.van-notice-bar__content'),
        this.getRect('.van-notice-bar__wrap')
      ]).then((rects: WechatMiniprogram.BoundingClientRectCallbackResult[]) => {
        const [contentRect, wrapRect] = rects;
        if (
          contentRect == null ||
          wrapRect == null ||
          !contentRect.width ||
          !wrapRect.width
        ) {
          return;
        }

        const { speed, scrollable, delay } = this.data;

        if (scrollable && wrapRect.width < contentRect.width) {
          const duration = (contentRect.width / speed) * 1000;

          this.wrapWidth = wrapRect.width;
          this.contentWidth = contentRect.width;
          this.duration = duration;
          this.animation = wx.createAnimation({
            duration,
            timingFunction: 'linear',
            delay
          });

          this.scroll();
        }
      });
    },

    scroll() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;

      this.set({
        animationData: this.resetAnimation
          .translateX(this.wrapWidth)
          .step()
          .export()
      });

      setTimeout(() => {
        this.set({
          animationData: this.animation
            .translateX(-this.contentWidth)
            .step()
            .export()
        });
      }, 20);

      this.timer = setTimeout(() => {
        this.scroll();
      }, this.duration);
    },

    onClickIcon() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;

      this.set({ show: false });
    },

    onClick(event: Weapp.Event) {
      this.$emit('click', event);
    }
  }
});
