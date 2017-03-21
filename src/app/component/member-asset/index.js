import Vue from 'vue';
import './index.less';

export default Vue.extend({
    props: {
        money: Number,
        integral: Number,
        coupons: Number,
    },
    template: __inline('./index.tpl')
});
