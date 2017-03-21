import Vue from 'vue';
import {
    XButton
} from 'vux';
import store from '../../store';
import CouponItem from '../../component/coupon-item';
import XResult from '../../component/x-result';
import {addToCart} from '../../store/trade/action';
import {getAvailableCouponList} from '../../store/coupon/action';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        CouponItem,
        XButton,
        XResult,
    },
    store,
    data(){
        return {
            selectedItem: null,
        };
    },
    vuex: {
        getters: {
            list: ({coupon}) => coupon.availableList,
            cart: ({trade}) => trade.cart
        },
        actions: {
            getAvailableCouponList,
            addToCart
        }
    },
    created(){
        this.getAvailableCouponList({}, {
            // 商品id
            id: this.cart.id,

            // 商品数量
            amount: this.cart.amount,

            // 总价
            money: this.cart.money
        });

        this.selectedItem = this.cart.userCoupon;
    },
    methods: {
        selectCoupon(item){

            if (item == null) {
                this.selectedItem = null;
                this.addToCart({
                    userCoupon: this.selectedItem
                });

                // 跳转到下单页面
                this.$router.replace({
                    name: 'order'
                });
            }
            if (item.available) {
                // 选择优惠券
                this.selectedItem = {
                    faceValue: item.faceValue,
                    discount: item.discount,
                    couponType: item.couponType,
                    pid: item.id
                };

                this.addToCart({
                    userCoupon: this.selectedItem
                });

                // 跳转到下单页面
                this.$router.replace({
                    name: 'order'
                });
            }
        }
    },
});


