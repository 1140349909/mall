import Vue from 'vue';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {},

    props: {
        type: String,
        mallCfg: Object,

        // 标签的大小
        // 大: big
        // 小: small
        // 正常: normal
        size: {
            type: String,
            default: 'normal'
        }
    },

    computed: {

        showType(){
            let type = this.type;

            // 标签的类型
            if (!type) {
                if (this.mallCfg.enableCash && !this.mallCfg.enableIntegralOffset && !this.mallCfg.enableCoupon) {
                    // cash: 现金支付
                    type = 'cash';
                } else if (this.mallCfg.enableCash && this.mallCfg.enableCoupon) {
                    // coupon: 优惠券
                    type = 'coupon';
                } else if (this.mallCfg.enableIntegral) {
                    // integral: 积分兑换
                    type = 'integral';
                } else if (this.mallCfg.enableIntegralCash) {
                    // integralCash: 积分优惠
                    type = 'integralCash';
                } else if (this.mallCfg.enableCash && this.mallCfg.enableIntegralOffset) {
                    // offset: 积分抵现
                    type = 'offset';
                } else {
                    type = 'normal';
                }
            }

            return type;
        },

        calculateClass(){
            let className;
            let classSize;

            // 标签样式
            switch (this.showType) {
                case 'cash':
                    className = 'product-label-case';
                    break;

                case 'coupon':
                    className = 'product-label-coupon';
                    break;

                case 'integral':
                    className = 'product-label-integral';
                    break;

                case 'integralCash':
                    className = 'product-label-integralCash';
                    break;

                case 'offset':
                    className = 'product-label-offset';
                    break;
            }

            // 标签大小
            switch (this.size) {
                case 'small':
                    classSize = 'product-label-small';
                    break;

                case 'normal':
                    classSize = 'product-label-normal';
                    break;

                case 'big':
                    classSize = 'product-label-big';
                    break;
            }

            return className + ' ' + classSize;
        },
        text(){
            var text = '';
            // 标签样式
            switch (this.showType) {
                case 'cash':
                    text = '爆款';
                    break;

                case 'coupon':
                    text = '优惠券';
                    break;

                case 'integral':
                    text = '积分兑换';
                    break;

                case 'integralCash':
                    text = '积分优惠';
                    break;

                case 'offset':
                    text = '积分抵现';
                    break;
            }
            return text;
        }
    }
});
