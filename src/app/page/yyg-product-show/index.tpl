<div class="page page-sub">
    <div class="yyg-product-show-hd">
    <banner :list="item.mediaRes.bannerImgUrls"></banner>
        <div class="yyg-product-show">
            <h6 class="yyg-product-show-title">
                <em class="label label-primary">
                    第
                    <span v-text="item.yygCfg.issueNo"></span>
                    期
                </em>
                <span v-text="item.name"></span>
            </h6>
            <p class="yyg-product-show-digest" v-text="item.digest">提供了list快捷设置和swiper-item子组件方便定义。</p>
            <yyg-product-stat :percent="item.percent"
                          :credit="item.yygCfg.credit"
                          :surplus="item.yygCfg.credit-item.creditRecieved"
                          :num-of-owners="item.yygCfg.numOfOwners"></yyg-product-stat>
        </div>
    </div>
    <sticky>
        <tab active-color='#e84028'>
            <tab-item :selected="type == 'product'" @click="type='product'">产品详情</tab-item>
            <tab-item :selected="type == 'comment'" @click="type='comment'">晒单分享</tab-item>
            <tab-item :selected="type == 'trades'" @click="type='trades'">参与记录</tab-item>
        </tab>
    </sticky>
    <div class="yyg-product-extra">
        <div>
            <div class="yyg-product-content lk-content" v-show="type=='product'">
                {{{item.content}}}
            </div>
            <div class="hb-shaiList" v-show="type=='comment'">
                <div class="hb-buyerList hb-shareList" v-if="showResult.content.length != 0">
                    <template v-for="item in showResult.content">
                        <div class="hb-detail-row">
                            <div class="hb-detail-cell" v-if="item.headImg" >
                                <div class="fixImgContainer">
                                    {{{ item.headImg | media 'fixImg'}}}
                                </div>
                            </div>
                            <!--默认头像-->
                            <div class="hb-detail-cell" v-else>
                                <vue-img :src="imgs.headImg" class="product-userImg"/>
                            </div>
                            <div class="hb-detail-cell">
                                <em class="mobile"><span v-text="item.mobile"></span></em>
                                <em class="timer">
                                    <span v-text="item.lastModifiedDate | datetime"></span>
                                </em>
                                <p class="hb-userDesc clear">
                                    <span v-text="item.content"></span>
                                </p>
                                <div class="hb-sailImg">
                                    <template v-for="img in item.imgIds" track-by="$index">
                                        {{{ img | media}}}
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div v-else>
                    <x-result    icon="icon-norecord" >暂无相关数据 </x-result>
                </div>
            </div>
            <div class="hb-partList" v-show="type=='trades'">
                <div class="hb-buyerList" v-if="trades.length != 0">
                    <template v-for="trade in trades">
                        <div class="hb-detail-row">
                            <div class="hb-detail-cell" v-if="trade.headImg">
                                <div class="fixImgContainer">
                                    {{{ trade.headImg | media 'fixImg'}}}
                                </div>
                            </div>
                            <!--默认头像-->
                            <div class="hb-detail-cell" v-else>
                                <vue-img :src="imgs.headImg" class="product-userImg"/>
                            </div>
                            <div class="hb-detail-cell">
                                <em class="mobile"><span v-text="trade.mobile"></span></em>
                                <em class="address">
                                    <span v-text="trade.adr"></span>
                                    IP
                                    <span v-text="trade.ip"></span>
                                </em>
                                <em class="timer">
                                    <span v-text="trade.lastModifiedDate | dateFormat"></span>
                                </em>
                            </div>
                            <div class="hb-detail-cell">
                                <em class="hb-money">
                                    <span v-text="trade.yyg.credit"></span>幸运币
                                </em>
                            </div>
                        </div>
                    </template>
                </div>
                <div v-else>
                    <x-result    icon="icon-norecord"  >暂无相关数据 </x-result>
                </div>
            </div>
        </div>
    </div>

    <footer class="footer">
        <div class="page-actions page-actions-fix page-actions-flex">
            <div class="page-actions-item">
                <a class="product-tools-yyg" v-link="{name:'yyg'}"><i class="iconfont icon icon-oneyuan"></i>一元购</a>
            </div>
            <div class="page-actions-item">
                <a class="product-show-tools-share" href="javascript:;" @click="showShare()">
                    <i class="iconfont icon icon-share"></i>
                    <span v-if="!distribution">
                        我要分享
                    </span>
                </a>
            </div>
            <div class="page-actions-aside">
                <x-button v-if="item.yygCfg.credit>item.creditRecieved" @click="purchase(item)" type="primary">马上参与</x-button>
                <x-button v-if="item.creditRecieved>=item.yygCfg.credit" v-link="{name:'yyg-order',params:{id:item.id}}" type="primary" disabled>已结束</x-button>
            </div>
        </div>
    </footer>
</div>
