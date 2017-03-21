import Vue from 'vue';
import { Group, Cell } from 'vux';
import './index.less';
import { browser } from 'common/util/detect';
export default Vue.extend({
    props: {
        // 支付方式
        payType: String,
        // 账户余额
        balance: Number,
        // 需要支付的金额
        money: Number
    },
    components: {
        Group, Cell
    },
    template: __inline('./index.tpl'),
    computed: {
        isEnoughBalance(){
            return this.money <= this.balance;
        },
        isWechat(){
            return browser.wechat;
        },
    },
    methods: {
        selectPayType(payType){
            this.payType = payType;
        }
    },
    watch: {
        payType(payType){
            this.$emit('on-change', payType);
        }
    },
    created(){
        if (this.payType == '') {
            if (this.isEnoughBalance) {
                this.payType = 'balance';
            } else {
                if(browser.wechat) {
                    this.payType = 'wechat';
                } else {
                    this.payType = 'alipay';
                }
            }

        }
    }
});
