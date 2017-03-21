<div class="page page-order">
    <section class="content">
        <div class="order-info">
            <div class="order-info-img">
                {{{item.mediaRes.coverImgId | media}}}
            </div>
            <div class="order-info-tits">
                <div class="order-info-tits-tit">{{item.name}}</div>

                <product-price :mall-cfg="item.mallCfg"></product-price>

                <product-label v-if="isShowProductLabel" :mall-cfg="item.mallCfg"></product-label>
            </div>
        </div>

        <group v-if="!currentAddress">
            <cell title="添加收货地址" :link="{name:'member-address',query: { type: 'mall' } }" is-link>
            </cell>
        </group>

        <div class="order-goods" v-if="currentAddress">
            <div class="order-goods-tit">
                选择收货地址
            </div>
            <div class="order-goods-info" v-link="{name:'member-address', query:{ type:'mall' } }">
                <div class="order-goods-info-p">
                    <div class="order-goods-info-p-span">联系人:{{currentAddress.name}}</div>
                    <div class="order-goods-info-p-span">联系电话:{{currentAddress.mobile}}</div>
                </div>
                <div class="order-goods-info-p">
                    收货地址:{{currentAddress.prov}}{{currentAddress.city}}{{currentAddress.region}}{{currentAddress.street}}
                </div>
            </div>
        </div>

        <div class="order-setting-box">
            <setting :type="isShowType"
                     :recieved.sync='item.creditRecieved'
                     :touse.sync='touse'
                     :payshow.sync='payshow'
                     :amount.sync='amount'
                     :mintegral='integral'
                     :eintegral='integralExchange'
                     :limit='item.mallCfg.limit'
                     :max='maxAmount'
                     :price='item.mallCfg.price'
                     :integral='item.mallCfg.integral'></setting>
        </div>

        <!-- 积分支付 -->
        <div v-if="item.mallCfg.enableIntegral" class="order-using">
            <div class="order-using-box">
                <div class="order-using-tits">
                    <div class="order-using-tits-tit">
                        使用积分支付
                    </div>
                    <div class="order-using-tits-integral">
                        我的积分:{{integral}}
                    </div>
                </div>
                <i class="order-radio iconfont icon-selected"
                   :class="isEnough? 'order-radio-on': 'order-radio-off'"></i>
                <div v-show="!isEnough" class="order-using-radio">积分不足,无法兑换 &nbsp;&nbsp;</div>
            </div>
        </div>

        <popup-paytype
            @on-submit="placeOrder"
            @on-charge="charge"
            :loading.sync='loading'
            :show.sync="pupshow"
            :pay-type.sync="payType"
            :balance="money"
            :money="spending()"></popup-paytype>

        <group v-if="item.mallCfg.enableCash && item.mallCfg.enableCoupon">
            <cell title="优惠券" :link="{name:'order-coupon'}" is-link>
                <span class="order-coupon-tips order-coupon-tips-none" v-if="availableCount==0">无可用优惠券</span>
                <div class="order-info-conpon" v-else>
                    <span class="order-coupon-tips order-coupon-tips-seleted" v-if="cart.userCoupon"><i
                            class="iconfont icon-coupon"></i>

                        <span v-if="cart.userCoupon.couponType == 'quota'"
                              class="order-coupon-font">{{cart.userCoupon.faceValue/100}}元优惠券</span>

                        <span v-if="cart.userCoupon.couponType == 'discount'"
                              class="order-coupon-font">{{cart.userCoupon.discount}}折优惠券</span>
                    </span>
                    <span class="order-coupon-tips order-coupon-tips-has" v-else>
                    <span class="order-coupon-font"></span>使用优惠券</span>
                </div>
            </cell>
        </group>

        <group title="买家留言">
            <x-textarea :value.sync="memo" :max="30" placeholder="选填：给商家留言，备注商品的颜色、尺寸等信息"></x-textarea>
        </group>
    </section>
    <footer class="footer">
        <div class="page-actions page-actions-fix page-actions-flex" :class="{disabled:!canPurchase}">
            <div class="page-actions-item">
                <div class="order-info-money-wrap">
                    实付款：<span class="order-info-money">￥<span
                            class="order-info-money-em">{{spending() | moneyFormat}}</span></span>
                </div>
            </div>
            <div class="page-actions-aside">
                <x-button v-if="!isEnough || item.mallCfg.stock >= item.creditRecieved + amount" :disabled="loading"
                          @click="payPup()"
                          type="primary">
                <span>
                    {{btnPlaceOrderText}}
                </span>
                </x-button>
                <x-button v-else type="primary" disabled>
                    <span>
                        库存不足
                    </span>
                </x-button>
            </div>
        </div>
    </footer>
</div>
