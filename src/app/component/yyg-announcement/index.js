import Vue from 'vue';
import { Swiper, SwiperItem } from 'vux';

import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        data: Object
    },
});
