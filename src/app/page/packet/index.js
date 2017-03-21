import Vue from 'vue';
import Envelope from '../../component/envelope';
import store from '../../store';
import _ from 'lodash';
import {getCouponReceive, getCouponInfo} from '../../store/coupon/action';
import {getIntegralReceive, getIntegralFaceValue} from '../../store/integral/action';
import './index.less';
// 红包页面
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Envelope
    },
    data(){
        return {
            state: 'open',

            // 优惠券加载动态
            receiveLoading: false,

            // 列表加载loading
            loading: {
                show: true,
                text: '正在加载...'
            },

            // 资源ID
            resId: null,

            // 积分红包ID
            integralId: null,

            // 优惠券ID
            couponId: null,

            // 错误码
            errCode: 0,

            resType: null,
        };
    },
    store: store,
    vuex: {
        getters: {
            isLogined: ({member}) => member.isLogined,

            couponInfo: ({coupon}) => coupon.couponInfo,
            faceValue: ({integral}) => integral.faceValue,

            couponCode: ({coupon}) => coupon.errCode,
            integralCode: ({integral}) => integral.errCode,

            couponFaceStatus: ({coupon}) => coupon.status,
            integralStatus: ({integral}) => integral.status,
        },
        actions: {
            getCouponInfo,
            getIntegralFaceValue,
            getIntegralReceive,
            getCouponReceive,
        },
    },

    computed: {
        // 判断红包类型
        isReceiveType(){
            return this.couponId ? 'coupon' : 'integral';
        },

        // 判断红包是否存在
        isfaceValue(){
            return _.isEmpty(this.faceValue) || _.isEmpty(this.couponInfo);
        },
    },

    methods: {
        onReceive(){
            // 领取红包积分
            if (this.couponId) {
                this.getCouponReceive({
                    resId: this.resId,
                    couponId: this.couponId,
                });
            } else if (this.integralId) {
                this.getIntegralReceive({
                    resId: this.resId,
                    integralId: this.integralId,
                });
            }
        }
    },

    watch: {

        // 优惠券返回处理
        couponFaceStatus(val) {
            switch (val) {
                case 'receive':
                    this.state = 'receive';
                    this.receiveLoading = false;
                    break;

                case 'receiveErr':
                    this.state = 'receiveErr';
                    this.receiveLoading = false;
                    break;
            }
        },

        // 积分返回处理
        integralStatus(val) {
            switch (val) {
                case 'receive':
                    this.state = 'receive';
                    this.receiveLoading = false;
                    break;

                case 'receiveErr':
                    this.state = 'receiveErr';
                    this.receiveLoading = false;
                    break;
            }
        },

        // 红包errCode
        couponCode(val){
            this.errCode = val;
        },

        // 积分errCode
        integralCode(val){
            this.errCode = val;
        },
    },

    created(){

        let {resId, couponId, integralId, resType} = this.$route.query;
        this.resId = resId;
        this.resType = resType;

        // 获取优惠券信息
        if (couponId) {
            this.couponId = couponId;
            this.getCouponInfo(couponId);

            // 获取积分面值
        } else if (integralId) {
            this.integralId = integralId;
            this.getIntegralFaceValue(integralId);
        }
    }
});
