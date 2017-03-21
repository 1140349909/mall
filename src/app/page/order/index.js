import Vue from 'vue';
import store from '../../store';
import {getProduct} from '../../store/product/action';
import {addToCart, purchase} from '../../store/trade/action';
import {getAddresses, getAsset} from '../../store/member/action';
import {getAvailableCouponList} from '../../store/coupon/action';
import {integral, money} from '../../store/getters';
import Setting from '../../component/order-setting';
import PopupPaytype from '../../component/popup-paytype';
import ProductLabel from '../../component/product-label';
import ProductPrice from '../../component/product-price';
import * as payment from 'common/lk-payment';
import {getWechatPayUrl} from '../../util/url';

import {
    XNumber,
    XButton,
    Group,
    Cell,
    XTextarea
} from 'vux';

import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XNumber,
        Setting,
        XButton,
        Group,
        Cell,
        PopupPaytype,
        ProductLabel,
        ProductPrice,
        XTextarea
    },
    store: store,
    data: function () {
        return {
            payshow: false,
            pupshow: false,
            id: '',
            amount: 1,
            btnPlaceOrderText: '确认下单',
            payType: '',
            touse: 0,
            memo: '',
            loading: false,
            // 当前选择地址
            currentAddress: null,

            // 交易成功返回的id
            businessId: '',
        };
    },
    vuex: {
        getters: {
            item: ({product}) => product.item,
            payInfo: ({trade}) => trade.payInfo,
            orderStatus: ({trade})=>trade.order.status,
            errMsg: ({trade})=>trade.order.errMsg,
            integralExchange: ({vsite}) => vsite.integralExchange.integral,
            limit: ({trade})=>trade.limit,
            cart: ({trade}) => trade.cart,
            integral,
            money,

            // 地址列表
            addressList: ({member}) => member.address.list,

            // 默认地址
            oftenAddress: ({member}) => member.oftenAddress,

            // 可用的优惠券数量
            availableCount: ({coupon}) => coupon.availableCount,
        },
        actions: {
            addToCart,
            purchase,
            getProduct,
            getAddresses,
            getAsset,
            getAvailableCouponList,
        }
    },
    computed: {

        paramsDefault(){
            this.addToCart({
                selectedAddress: this.currentAddress
            });

            let order = {
                mall: {
                    address: this.currentAddress,
                    amount: this.amount,
                    integral: this.total + this.touse * this.integralExchange,
                }
            };

            return order;
        },

        // 总共需要的积分数额
        total(){
            return this.amount * this.item.mallCfg.integral;
        },

        totalCash(){
            return this.amount * this.item.mallCfg.price;
        },

        isEnough(){
            return this.total <= this.integral;
        },

        // 最大数量
        maxAmount(){
            let surplus = this.item.mallCfg.stock - this.item.creditRecieved;

            if (this.item.mallCfg.limit > 0) {
                // 限购,取剩余库存与限购额最小值
                return Math.min(this.item.mallCfg.limit - this.limit, surplus);
            } else {
                //非限购,取剩余库存
                return surplus;
            }
        },

        canPurchase(){
            if (!this.isEnough) {
                return false;
            }

            if (this.orderStatus == 'pending') {
                return false;
            }

            if (!this.id) {
                return false;
            }

            return true;
        },
        isShowType() {
            if (this.item.mallCfg.enableCash && !this.item.mallCfg.enableIntegralOffset) {
                return 'cash';
            } else if (this.item.mallCfg.enableIntegral) {
                return 'integral';
            } else if (this.item.mallCfg.enableIntegralCash) {
                return 'integralCash';
            } else if (this.item.mallCfg.enableCash && this.item.mallCfg.enableIntegralOffset) {
                return 'offset';
            }
        },
    },
    methods: {

        handelConfirm(type){
            if (type == 'no') {
                this.amount = this.amount + 1;
            } else {
                // 添加购物车
                this.addToCart({
                    amount: this.amount,
                    money: this.amount * this.item.mallCfg.price,
                    integral: this.amount * this.item.mallCfg.integral,
                    userCoupon: null,
                });
            }
        },

        payPup(){
            let params = this.paramsDefault;

            if (this.memo) {
                params.mall.sku = {
                    memo: this.memo
                };
            }

            if (this.canPurchase) {

                let limit = this.item.mallCfg.limit == 0 ? 99999 : this.item.mallCfg.limit;

                if (this.amount > limit) {
                    this.$root.showToast({
                        type: 'cancel',
                        content: '已超过购买限制'
                    });
                    return false;
                }

                if (!this.currentAddress || !this.currentAddress.name || !this.currentAddress.mobile || !this.currentAddress.street) {
                    this.$root.showToast({
                        type: 'cancel',
                        content: '请选择地址'
                    });
                    return false;
                }

                // 优惠券支付
                if (this.item.mallCfg.enableCash && this.item.mallCfg.enableCoupon) {
                    params.mall.userCoupon = this.cart.userCoupon;
                    delete params.mall.integral;
                }

                if (this.spending() > 0) {
                    this.pupshow = true;

                } else {

                    this.loading = true;
                    // 积分抵用0消费
                    if (this.totalCash / 100 == this.touse) {
                        if (this.item.mallCfg.enableCash && this.item.mallCfg.enableIntegralOffset) {
                            params.mall.integral = this.totalCash / 100 * this.integralExchange;
                            params.mall.money = 0;
                            params.mall.payType = 'integraloffset';
                        } else if (this.item.mallCfg.enableCash && this.item.mallCfg.enableCoupon) {
                            params.mall.integral = this.totalCash / 100 * this.integralExchange;
                            params.mall.payType = 'balance';
                        } else if (this.item.mallCfg.enableIntegral) {
                            params.mall.payType = 'balance';
                        }
                    }
                    this.$root.showLoading('正在支付');
                    this.purchase(this.cart.id, params);
                }
            }
        },
        placeOrder() {
            let params = this.paramsDefault;

            if (this.memo) {
                params.mall.sku = {
                    memo: this.memo
                };
            }

            // 调用第三方支付
            if (this.payType == 'balance') {
                params.mall.balance = this.spending();
                params.mall.payType = 'balance';

            } else {
                params.mall.money = this.spending();
                if (this.payType == 'alipay') {
                    params.mall.payType = 'alipay';
                    params.callBackPage = '#!/order/result';

                } else if (this.payType == 'wechat') {
                    params.mall.payType = 'wechat';
                    params.callBackPage = '#!/order/result';
                }
            }
            this.$root.showLoading('正在支付');
            this.purchase(this.cart.id, params);
        },

        // 在线充值
        charge(){
            this.$router.replace({
                name: 'member-charge'
            });
        },

        // 判断消耗钱数
        spending() {
            // 是否优惠券模式
            if (this.item.mallCfg.enableCash && this.item.mallCfg.enableCoupon) {
                let money = this.cart.money - this.touse * 100;
                // 优惠券不为空时
                if (this.cart.userCoupon !== null) {

                    let userCoupon = this.cart.userCoupon;

                    // 减免对应的值
                    if (this.cart.userCoupon.couponType == 'quota') {
                        money = money - userCoupon.faceValue;
                    } else {
                        money = money * userCoupon.discount / 10;
                    }
                }
                return money;
            } else {
                return this.cart.money - this.touse * 100;
            }

        },

        // 获取优惠券
        refreshCoupon(){

            this.getAvailableCouponList({}, {

                // 商品id
                id: this.cart.id,

                // 商品数量
                amount: this.cart.amount,

                // 总价
                money: this.cart.money
            });
        }
    },

    watch: {
        orderStatus(val){
            this.loading = false;
            if (val == 'pending') {
                this.btnPlaceOrderText = '下单中';

            } else if (val == 'failure') {
                this.$root.hideLoading();
                this.$root.showToast({
                    type: 'cancel',
                    content: this.errMsg || '网络不给力，暂时无法获取付款结果，或者重新尝试网络连接'
                });
                this.btnPlaceOrderText = '重新下单';

            } else if (val == 'success') {
                this.$root.hideLoading();
                this.btnPlaceOrderText = '下单成功';
            } else {
                this.$root.hideLoading();
                this.btnPlaceOrderText = '确认下单';
            }
        },
        payInfo(payInfo) {
            if (this.spending() > 0) {
                switch (this.payType) {
                    case payment.PAY_TYPE.BALANCE:
                        this.$router.replace({
                            name: 'order-result',
                            query: {
                                businessId: payInfo.businessId,
                            }
                        });
                        break;

                    case payment.PAY_TYPE.WECHAT:
                        let self = this;
                        let redirectUrl = getWechatPayUrl(self.item.uin, payInfo.businessId);
                        let platformParams = {
                            uin: self.item.uin,
                            page: 'order'
                        };

                        let payParams = payInfo.wxcfg;

                        payment.pay(this.payType, {
                            platformParams,
                            payParams,
                            redirectUrl,
                        });
                        break;

                    case payment.PAY_TYPE.ALIPAY:
                        payment.pay(this.payType, {
                            payParams: payInfo.payUrl,
                            cancel: ()=> {
                                this.$router.replace({
                                    name: 'order-result',
                                    query: {
                                        status: 'failure',
                                        businessId: payInfo.businessId,
                                    }
                                });
                            }
                        });
                        break;
                }
            } else {
                if (payInfo.businessId) {
                    this.$router.replace({
                        name: 'order-result',
                        query: {
                            businessId: payInfo.businessId,
                            status: 'success',
                        }
                    });
                    this.getAsset({
                        vatype: 'integral'
                    });
                }
            }
        },

        item(val){
            // 添加购物车
            this.addToCart({
                amount: this.amount,
                money: this.amount * val.mallCfg.price,
                integral: this.amount * val.mallCfg.integral,
            });

            if (this.item.mallCfg.enableCoupon) {
                this.refreshCoupon();
            }
        },

        amount(val){
            if (this.cart.userCoupon != null) {
                if (this.cart.userCoupon.faceValue >= this.item.mallCfg.price * val) {
                    this.$root.confirm({
                        title: '提示',
                        content: '更改数量，会无法使用优惠券？',
                        onOk: () => {
                            this.handelConfirm('yes');
                        },
                        onCancel: () => {
                            this.handelConfirm('no');
                        }
                    });
                    return false;
                }
            }

            // 添加购物车
            this.addToCart({
                amount: this.amount,
                money: this.amount * this.item.mallCfg.price,
                integral: this.amount * this.item.mallCfg.integral,
            });
        },

        // 设置列表选中地址
        addressList(list){
            if (!list) return;

            let addressId = this.$route.query.addressId || '';
            if (addressId == '') {
                this.currentAddress = this.oftenAddress;
            } else {
                list.map(item => {
                    if (addressId == item.id) {
                        this.currentAddress = item;
                    }
                });
            }
        },
    },
    created(){
        if (!this.cart || !this.cart.id) {
            return this.$router.replace({
                name: 'mall'
            });
        }
        this.amount = this.cart.amount;

        this.id = this.cart.id;
        this.getProduct(this.id, 'mall');
        this.getAddresses();
    }
});
