<div class="page">
    <section class="content">

        <header class="tker-header">
            <div class="tker-header-items">
                <div class="tker-header-item">
                    <span class="tker-header-dt">粉丝提成</span>
                    <span class="tker-header-dd">
                        <unit type="money" :value="summary.profit.dividend"></unit>
                    </span>
                </div>
            </div>
        </header>
        <div class="tker-dividend">
            <div v-if="list.content.length != 0">
                <template v-for="item in list.content">
                    <group>
                        <Cell :primary="'content'">
                            <div slot="icon" class="tker-dividend-img">
                                {{{item.mediaRes.coverImgId | media}}}
                            </div>


                            <div slot="value">
                                <flexbox>
                                    <flexbox-item :span="9">
                                        <div class="tker-dividend-title">
                                            <span v-text="item.name"></span>
                                        </div>
                                        <product-label
                                                :mall-cfg="item.mallCfg"
                                        ></product-label>
                                    </flexbox-item>
                                    <flexbox-item>
                                        <product-status :status="item.sales>=hotCount ? 'selling':''"></product-status>
                                        <product-status
                                                :status="item.sales>=item.mallCfg.stock ? 'soldout':''"></product-status>
                                    </flexbox-item>
                                </flexbox>
                            </div>
                        </Cell>

                        <template v-for="data in item.opdata.tkerDataList">
                            <Cell :primary="'content'">
                                <flexbox slot="value" class="tker-dividend-bottom">
                                    <flexbox-item id="left">
                                        <p>
                                            <span v-if="data.lv==1">钻石代言</span>
                                            <span v-if="data.lv==2">金牌代言</span>
                                            <!--<span v-if="data.lv==3">铜牌代言</span>-->
                                        </p>
                                    </flexbox-item>
                                    <flexbox-item id="center">
                                        <p><span>次数</span><span v-text="data.totalAmount"></span></p>
                                    </flexbox-item>
                                    <flexbox-item id="right">
                                        <p><span>总额￥</span><span v-text="data.money | moneyFormat"></span></p>
                                    </flexbox-item>
                                </flexbox>
                            </Cell>
                        </template>


                    </group>

                </template>
            </div>
            <div v-else>
                <x-result icon="icon-share" position="vertical">您还没有提成记录</x-result>
            </div>
        </div>

    </section>
</div>
