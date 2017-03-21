<div class="page page-product">
    <section class="content">
        <div class="product-show-banner">
            <banner :list="item.mediaRes.bannerImgUrls"></banner>
        </div>
        <div class="product-show-info">
            <div class="product-show-info-tits">
                <div class="product-show-info-tits-tit">{{item.name}}</div>
                <div class="product-show-info-tits-des">{{item.digest}}</div>
            </div>
            <div class="product-show-info-numbers">
                <product-price :mall-cfg="item.mallCfg"></product-price>

                <product-label v-if="isShowProductLabel" :mall-cfg="item.mallCfg"></product-label>

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

        <distribution
                :show.sync="isShowDistribution"
                :item="distributionItem"
                title="我为品牌代言"
                desc="给梦想一个机会，万一实现了呢！">
        </distribution>

        <footer class="footer">
            <div class="page-actions page-actions-fix page-actions-flex">
                <div class="page-actions-item">
                    <a class="product-show-tools-yyg" v-link="{name:'mall'}"><i class="iconfont icon icon-store"></i>爆款</a>
                </div>
                <div class="page-actions-sp"></div>
                <div class="page-actions-item">
                    <a v-if="distribution" class="product-show-tools-share" href="javascript:;" @click="showDialog()">
                        <i class="iconfont icon icon-share"></i>
                        <span>
                            我要代言
                        </span>
                    </a>
                    <a v-if="!distribution" class="product-show-tools-share" href="javascript:;" @click="showShare()">
                        <i class="iconfont icon icon-share"></i>
                        <span>
                            我要分享
                        </span>
                    </a>
                </div>
                <div class="page-actions-aside">
                    <template v-if="disabledStock || disabledLimit">
                        <x-button  type="primary" disabled>
                            <template v-if="disabledStock">
                                已售罄
                            </template>
                            <template v-if="disabledLimit && !disabledStock">
                                限购{{item.mallCfg.limit}}件，已购{{limit}}件
                            </template>
                        </x-button>
                    </template>

                    <template v-else>
                        <!-- 现金购买 或 抵用购买 -->
                        <x-button
                            v-if="item.mallCfg.enableCash && !item.mallCfg.enableIntegralOffset || item.mallCfg.enableCash && item.mallCfg.enableIntegralOffset"
                            @click="purchase(item)"
                            type="primary">马上购买</x-button>

                        <!-- 积分购买 或 组合购买 -->
                        <x-button
                            v-if="item.mallCfg.enableIntegral || item.mallCfg.enableIntegralCash"
                            @click="purchase(item)"
                            :disabled="item.mallCfg.integral > integral"
                            type="primary">
                            <span v-if="item.mallCfg.integral > integral">积分不足</span>
                            <span v-else>{{item.mallCfg.enableIntegralCash ? '马上购买':'马上兑换'}}</span>
                        </x-button>
                    </template>
                </div>
            </div>
        </footer>
    </section>
</div>

