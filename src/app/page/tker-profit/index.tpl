<div class="page">
    <section class="content">

        <header class="tker-header">
            <div class="tker-header-items">
                <div class="tker-header-item">
                    <span class="tker-header-dt">代言商品数</span>
                    <span class="tker-header-dd">
                        <unit :value="summary.products" unit="件"></unit>
                    </span>
                </div>
                <div class="tker-header-item">
                    <span class="tker-header-dt">酬劳池</span>
                    <span class="tker-header-dd">
                        <unit type="money" :value="summary.profit.lv0"></unit>
                    </span>
                </div>
                <div class="tker-header-action">
                    <a class="tker-header-link" v-link="{name:'tker-mine'}">代言商城</a>
                </div>
            </div>
        </header>

        <div class="tker-profit">
            <div v-if="list.content.length != 0">
                <template v-for="item in list.content">
                    <group>
                        <Cell :primary="'content'">
                            <div slot="icon" class="tker-profit-img">
                                {{{item.mediaRes.coverImgId | media}}}
                            </div>


                            <div slot="value">
                                <flexbox>
                                    <flexbox-item :span="6">
                                        <div class="tker-profit-title">
                                            <span v-text="item.name"></span>
                                        </div>
                                        <product-label
                                                :mall-cfg="item.mallCfg"
                                        ></product-label>

                                    </flexbox-item>
                                    <flexbox-item>

                                        <product-status :status="item.opdata.tkerData.amount.total>=hotCount ? 'selling':''"></product-status>
                                        <product-status :status="item.opdata.tkerData.amount.total>=item.mallCfg.stock ? 'soldout':''"></product-status>
                                        <div class="tker-profit-price">
                                            <p>售价
                                                ￥<span v-text="item.mallCfg.price | moneyFormat"></span>
                                            </p>
                                        </div>
                                    </flexbox-item>
                                </flexbox>
                            </div>
                        </Cell>
                        <Cell :primary="'content'">
                            <flexbox slot="value" class="tker-profit-bottom">
                                <flexbox-item id="left">
                                    <p>酬劳￥<span v-text="item.opdata?item.opdata.tkerData.profit.lv0:0  | moneyFormat"></span></p>
                                </flexbox-item>
                                <flexbox-item id="center">
                                    <p>已售量<span v-text="item.opdata?item.opdata.tkerData.amount.lv0:0"></span></p>
                                </flexbox-item>
                                <flexbox-item id="right">
                                    <p>总收益￥<span v-text="item.opdata?item.opdata.tkerData.profit.total:0  | moneyFormat"></span></p>
                                </flexbox-item>
                            </flexbox>
                        </Cell>

                    </group>
                </template>
            </div>
            <div v-else>
                <x-result    icon="icon-share"  position="vertical">您还没有代言酬劳记录 </x-result>
            </div>
        </div>

    </section>
</div>
