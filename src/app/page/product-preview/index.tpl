<div class="page page-product">
    <section class="content">
        <banner :list="item.mediaRes.bannerImgUrls"></banner>
        <div class="product-show-info">
            <div class="product-show-info-tits">
                <div class="product-show-info-tits-tit">{{item.name}}</div>
                <div class="product-show-info-tits-des">{{item.digest}}</div>
            </div>
            <div class="product-show-info-numbers">

                <!-- 显示现金 -->
                <div v-if="item.mallCfg.enableCash && !item.mallCfg.enableIntegralOffset && !item.mallCfg.enableCoupon" class="product-show-info-numbers-integral">
                    <span class="product-show-red product-show-red-em">{{item.mallCfg.price | moneyFormat '￥'}}</span>
                </div>

                <!-- 显示积分 -->
                <div v-if="item.mallCfg.enableIntegral" class="product-show-info-numbers-integral">
                    <i class="iconfont icon-coins"></i>
                    <span class="product-show-red product-show-red-em">{{item.mallCfg.integral}}</span>
                </div>

                <!-- 显示组合支付 -->
                <div v-if="item.mallCfg.enableIntegralCash" class="product-show-info-numbers-integral">
                    <i class="iconfont icon-coins"></i>
                    <span class="product-show-red product-show-red-em">{{item.mallCfg.integral}}</span>
                    <span class="product-show-black">+</span>
                    <span class="product-show-red product-show-red-em">{{item.mallCfg.price | moneyFormat '￥'}}</span>
                </div>

                <!-- 显示现金抵积分 -->
                <div v-if="item.mallCfg.enableCash && item.mallCfg.enableIntegralOffset" class="product-show-info-numbers-integral">
                    <span class="product-show-red product-show-red-em">{{item.mallCfg.price | moneyFormat '￥'}}</span>
                    &nbsp;
                    <product-label type="offset"></product-label>
                </div>

                <!-- 显示优惠券 -->
                <div v-if="item.mallCfg.enableCash && item.mallCfg.enableCoupon" class="product-show-info-numbers-integral">
                    <span class="product-show-red product-show-red-em">{{item.mallCfg.price | moneyFormat '￥'}}</span>
                    &nbsp;
                    <product-label type="coupon"></product-label>
                </div>

                <div class="product-show-info-numbers-allowance">
                    产品数量:&nbsp;&nbsp;<span class="product-show-red">{{item.mallCfg.stock-item.creditRecieved}}</span>&nbsp;/&nbsp;{{item.mallCfg.stock}}
                </div>
            </div>
        </div>
        <div>
            <ul class="product-show-nav">
                <li class="product-show-nav-li product-show-nav-li-active">
                    产品详情
                </li>
            </ul>
        </div>
        <div class="product-show-box">
            <div class="product-show-details lk-content" v-el:content>
                {{{item.content}}}
            </div>
        </div>

        <footer class="footer">
            <div class="page-actions page-actions-fix page-actions-flex">
                <div class="page-actions-item">
                    <a class="product-show-tools-yyg"><i class="iconfont icon icon-store"></i>爆款</a>
                </div>
                <div class="page-actions-aside">
                    <x-button v-if="item.mallCfg.stock<=item.creditRecieved" type="primary" disabled>已售罄</x-button>
                    <template v-else>
                        <!-- 现金购买 或 抵用购买 -->
                        <x-button
                            v-if="item.mallCfg.enableCash && !item.mallCfg.enableIntegralOffset || item.mallCfg.enableCash && item.mallCfg.enableIntegralOffset"
                            type="primary">马上购买</x-button>

                        <!-- 积分购买 或 组合购买 -->
                        <x-button
                            v-if="item.mallCfg.enableIntegral || item.mallCfg.enableIntegralCash"
                            :disabled="item.mallCfg.integral > integral? true: false"
                            type="primary">
                            <span v-if="item.mallCfg.integral > integral? true: false">积分不足</span>
                            <span v-else>马上兑换</span>
                        </x-button>
                    </template>
                </div>
            </div>
        </footer>
    </section>
</div>

