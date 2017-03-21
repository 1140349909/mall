import Vue from 'vue';
import {
    Popup,
    Group,
    Cell,
    XButton,
} from 'vux';
import './index.less';
import {browser} from 'common/util/detect';
export default Vue.extend({
    props: {

        show: {
            type: Boolean,
            default: false,
        },

        // 支付方式
        payType: String,

        // 账户余额
        balance: Number,

        // 需要支付的金额
        money: Number,

        leftTime: Number,

        loading: {
            type: Boolean,
            default: false,
        },
        limitMoney: {
            type: Number,
            default: 3000 * 100
        }
    },

    components: {
        Popup,
        Group,
        Cell,
        XButton,
    },

    template: __inline('./index.tpl'),

    computed: {
        isEnoughBalance(){
            return this.money / 100 <= this.balance;
        },
        // 超出支付范围
        isOverFulfilled(){
            return !this.isEnoughBalance && this.money > this.limitMoney;
        },
        isWechat(){
            return browser.wechat;
        },
    },

    methods: {

        selectPayType(payType){
            this.payType = payType;
        },

        // 提交数据回调
        onSubmit(){
            this.$emit('on-submit');
        },

        onCharge(){
            this.$emit('on-charge');
        },

        onClose(){
            this.show = false;
        },
    },

    watch: {
        payType(payType){
            this.$emit('on-change', payType);
        },

        show(){
            if (this.payType == '') {
                if (this.isEnoughBalance) {
                    this.payType = 'balance';
                } else {
                    if (browser.wechat) {
                        this.payType = 'wechat';
                    } else {
                        this.payType = 'alipay';
                    }
                }
            }
        }
    },

    ready(){

    }
});
