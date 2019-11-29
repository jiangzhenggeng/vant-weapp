import { VantComponent } from '../common/component';
import utils from '../wxs-ts/utils';
VantComponent({
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
    created() {
        this.setData({
            bem: utils.bem('col', [this.data.span])
        });
    },
    methods: {
        setGutter(gutter) {
            const padding = `${gutter / 2}px`;
            const style = gutter ? `padding-left: ${padding}; padding-right: ${padding};` : '';
            if (style !== this.data.style) {
                this.set({ style });
            }
        }
    }
});
