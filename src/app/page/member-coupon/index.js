import Vue from 'vue';
import {
    Tab,
    TabItem,
    Spinner,
    XButton,
} from 'vux';
import store from '../../store';
import {
    getCouponCash,
    getCouponListInvalid,
    getCouponListUsed,
    getCouponList,
} from '../../store/coupon/action';
import CouponItem from '../../component/coupon-item';
import XResult from  '../../component/x-result';
import {browser} from  'common/util/detect';
import {vsiteSettings} from '../../store/getters';
import './index.less';

export default Vue.extend({

    template: __inline('./index.tpl'),

    components: {
        Tab,
        TabItem,
        CouponItem,
        Spinner,
        XButton,
        XResult,
    },

    data(){
        return {
            // 当前tab索引
            tabIndex: 'notused',

            // 列表数据
            list: [],

            currentItem: {},
        };
    },

    store: store,

    vuex: {
        getters: {
            vsiteSettings,
            cash: ({coupon}) => coupon.cash,
            couponList: ({coupon}) => coupon.list,
            usedList: ({coupon}) => coupon.usedList,
            invalidList: ({coupon}) => coupon.invalidList,
            status: ({coupon}) => coupon.status,
        },
        actions: {
            getCouponCash,
            getCouponListInvalid,
            getCouponListUsed,
            getCouponList,
        }
    },

    watch: {
        tabIndex(val){
            switch (val) {
                case 'notused':
                    this.getCouponList({});
                    break;

                case 'use':
                    this.getCouponListUsed({});
                    break;

                case 'invalid':
                    this.getCouponListInvalid({});
            }
            this.$root.showLoading('正在加载...');
        },
        status(val){
            switch (val) {
                case 'failure':
                    this.$root.hideLoading();
                    this.$root.showToast({
                        content: '列表获取失败'
                    });
                    break;
            }
        },

        couponList(val) {
            this.$root.hideLoading();
            this.list = val;
        },

        usedList(val) {
            this.$root.hideLoading();
            this.list = val;
        },

        invalidList(val) {
            this.$root.hideLoading();
            this.list = val;
        },
    },

    computed: {
        tabChange(status){
            this.tabIndex = status;
            this.list = null;
        },
        notDataText(){
            switch (this.tabIndex) {
                case 'notused':
                    return '你还没有可用优惠券';

                case 'use':
                    return '你还没有已使用优惠券';

                case 'invalid':
                    return '你还没有已失效优惠券';
            }
        },

        classWechat(){
            if (!browser.wechat) {
                return 'member-coupon-notwechat';
            } else {
                return '';
            }
        }

    },

    created() {
        this.$root.showTopBar({backGo: 'member'});
        this.getCouponCash();
        this.getCouponList({});
    },

    methods: {
        goUse(){
            this.$router.go({
                name: 'mall'
            });
        }
    }
});


