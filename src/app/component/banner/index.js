/**
 * @Author:      Cold
 * @DateTime:    2016-09-19 03:41:50
 */

import Vue from 'vue';
import { Swipe, SwipeItem } from 'vue-swipe';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Swipe,
        SwipeItem,
    },

    props: {
        list: Array,
    },
});
