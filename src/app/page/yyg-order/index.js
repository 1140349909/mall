import Vue from 'vue';
import {XButton, Group, Cell} from 'vux';
import OrderPayType from '../../component/order-paytype';
import store from '../../store';
import {getAsset} from '../../store/member/action';
import {getProduct} from '../../store/product/action';
import {purchase, addToCart} from '../../store/trade/action';
import * as payment from 'common/lk-payment';
import './index.less';
import {getYygOrderUrl} from '../../util/url';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XButton,
        Group,
        Cell,
        OrderPayType,
    },
    store: store,
    data: function () {
        return {
            payType: '',
            btnPlaceOrderText: '立即下单'
        };
    },
    vuex: {
        getters: {
            item: ({product}) => product.item,
            orderStatus: ({trade})=>trade.order.status,
            errMsg: ({trade})=>trade.order.errMsg,
            payInfo: ({trade}) => trade.payInfo,
            vsite: ({vsite}) => vsite,
            cart: ({trade}) => trade.cart,
            asset: ({member}) => member.asset
        },
        actions: {
            purchase,
            getProduct,
            addToCart,
            getAsset,
        }
    },
    methods: {
        placeOrder() {
            let params = {
                yyg: {
                    credit: this.cart.amount * this.item.yygCfg.bidStep,
                    payType: this.payType
                }
            };
            if (this.payType == 'balance') {
                params.yyg.balance = this.cart.money;
            } else {
                params.yyg.money = this.cart.money;
                if (this.payType == 'alipay') {
                    params.callBackPage = '#!/yyg/order/result';
                }
            }
            this.purchase(this.cart.id, params);
        },
    },
    computed: {

        canPurchase(){

            if (this.orderStatus == 'pending') {
                return false;
            }

            if (!this.cart.id) {
                return false;
            }
            return true;
        }
    },
    watch: {
        orderStatus(val){
            if (val == 'pending') {
                this.btnPlaceOrderText = '下单中';
            } else if (val == 'failure') {
                this.btnPlaceOrderText = '重新下单';
                this.$root.showToast({
                    type: 'warn',
                    content: this.errMsg || '网络不给力，暂时无法获取付款结果，或者重新尝试网络连接'
                });
            } else if (val == 'success') {
                this.btnPlaceOrderText = '下单成功';
            } else {
                this.btnPlaceOrderText = '确认下单';
            }
        },
        payInfo(payInfo) {
            switch (this.payType) {
                case payment.PAY_TYPE.BALANCE:
                    this.$router.replace({
                        name: 'yyg-order-result',
                        query: {
                            businessId: payInfo.businessId
                        }
                    });
                    break;
                case payment.PAY_TYPE.WECHAT:

                    // let redirectUrl = location.origin + location.pathname + '#!/yyg/order/result/?businessId=' + payInfo.businessId + '&status={status}';
                    let redirectUrl = getYygOrderUrl(this.vsite.uin, payInfo.businessId);
                    let platformParams = {
                        uin: this.vsite.uin,
                        page: 'yyg-order'
                    };
                    let payParams = payInfo.wxcfg;
                    payment.pay(this.payType, {
                        platformParams,
                        payParams,
                        redirectUrl
                    });
                    break;

                case payment.PAY_TYPE.ALIPAY:
                    payment.pay(this.payType, {
                        payParams: payInfo.payUrl,
                        cancel: ()=> {
                            this.$router.replace({
                                name: 'yyg-order-result',
                                query: {
                                    status: 'failure'
                                }
                            });
                        }
                    });
                    break;
            }
        }
    },
    created(){
        //this.addToCart({
        //    id: this.$route.params.id,
        //    amount: 1,
        //    money: 1 * 100
        //})

        if (!this.cart.id || !this.cart.amount) {
            return this.$router.replace({
                name: 'yyg'
            });
        }

        this.getProduct(this.cart.id, 'yyg');
    }
});
