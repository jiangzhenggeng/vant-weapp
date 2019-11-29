import { VantComponent } from '../common/component';
import { transition } from '../mixins/transition';
import { safeArea } from '../mixins/safe-area';
import utils from '../wxs-ts/utils';
VantComponent({
    classes: [
        'enter-class',
        'enter-active-class',
        'enter-to-class',
        'leave-class',
        'leave-active-class',
        'leave-to-class'
    ],
    mixins: [transition(false), safeArea()],
    props: {
        transition: {
            type: String,
            observer: 'observeClass'
        },
        customStyle: String,
        overlayStyle: String,
        zIndex: {
            type: Number,
            value: 100
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        position: {
            type: String,
            value: 'center',
            observer: 'observeClass'
        }
    },
    created() {
        let { position, isIPhoneX, safeAreaInsetBottom } = this.data;
        this.setData({
            bemWrap: utils.bem('popup', [position, { safe: isIPhoneX && safeAreaInsetBottom }])
        });
        this.observeClass();
    },
    methods: {
        onClickOverlay() {
            this.$emit('click-overlay');
            if (this.data.closeOnClickOverlay) {
                this.$emit('close');
            }
        },
        observeClass() {
            const { transition, position } = this.data;
            const updateData = {
                name: transition || position
            };
            if (transition === 'none') {
                updateData.duration = 0;
            }
            this.set(updateData);
        }
    }
});
