<div class="page page-yyg-trade">
    <section class="content">

        <tab active-color='#E84027'
             :line-width=2
             :index.sync="index">
            <template v-for="(index,data) in types">
                <tab-item :selected="type == data.id" @click="getOrderListEntry(index,data.id)">
                    <span v-text="data.name"></span>
                </tab-item>
            </template>
        </tab>

        <div v-show="status == 'success'">
            <div v-show="order.content.length!=0">
                <template v-for="data in order.content">


                    <div class="weui_panel weui_panel_access trade-item">
                        <div class="weui_cells size26 tr-mt0">
                            <div class="weui_cell">
                                <div class="weui_cell_bd weui_cell_primary tr-text2">
                                    <span v-text="data.date | dateFormat" v-show="params.buyType == 'mall'"></span>
                                    <span v-show="params.buyType == 'yyg'">
                                        第<span v-text="data.issueNo"></span>期
                                    </span>
                                    <!--{{data.date | dateFormat}}-->
                                </div>
                                <div class="weui_cell_ft">
                                    <span class="weui_text">
                                        <i class="iconfont icon-gift tr-text size26"
                                           v-show="data.status=='toaccept'">
                                        </i>
                                        <template v-for="item in statusList">
                                            <span v-show="data.status==item.type" v-text="item.text"
                                                  :class="{'tr-text':data.status !='noluck'}">

                                            </span>
                                        </template>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="weui_panel_bd size26 tr-background">
                            <a v-link="{name:'yyg-product-show',params:{id:data.issueId}}"
                               class="weui_media_box weui_media_appmsg tr-media-box">
                                <div class="weui_media_hd tr-fixed">
                                    {{{data.coverImgId | media 'tr_media_appmsg_thumb'}}}
                                </div>
                                <div class="weui_media_bd">
                                    <div class="weui_media_desc tr-desc">
                                        <span v-text="data.name"></span>
                                    </div>


                                    <div v-if="data.status=='todraw'">
                                        <yyg-product-stat :percent="data.percent"
                                                          :credit="data.stock"
                                                          :surplus="data.stock-data.creditRecieved"
                                                          mini
                                                          hide-num-of-owners>
                                        </yyg-product-stat>
                                    </div>
                                    <div v-else>
                                        <span class="tr-time">揭晓日期：
                                            <span v-text="data.date | dateFormat 'yyyy-MM-dd'"></span>
                                        </span>
                                    </div>
                                </div>
                                <div class="weui_media_ft tr-text tr-ft-height">
                                    <span v-show="data.payType=='score'">
                                            <span v-text="data.score/data.number"></span>
                                            <span>分</span>
                                        </span>
                                    <span v-show="data.payType=='cash'">
                                            ￥<span v-text="data.cash/data.number*100 | moneyFormat"></span>
                                        <!--<span>元</span>-->
                                        </span>
                                    <span v-show="data.payType=='both'">
                                        <p class="tr-tr">
                                            ￥<span v-text="data.cash/data.number*100 | moneyFormat"></span>
                                            <!--<span>元</span>-->
                                        </p>

                                            <p class="tr-tr">
                                                <span v-text="data.score/data.number"></span>
                                                <span>分</span>
                                            </p>
                                        </span>
                                    <p class="tr-tr tr-text2">
                                        <span>x</span><span v-text="data.number"></span>
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div class="weui_cells size26 tr-mt0">
                            <div class="weui_cell">
                                <div class="weui_cell_bd weui_cell_primary">
                                    合计支付：
                                </div>
                                <div class="weui_cell_ft">
                                    <span>
                                        <!--合计：-->
                                        <span class="tr-text">
                                            ￥<span v-text="data.cash*100 | moneyFormat"></span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <yyg-winning v-if="data.luckys.length !== 0" :list="data.luckys">
                            </yyg-winning>

                            <div class="weui_cell"
                                 v-if="data.status !='noluck' && data.status !='todelivery' && data.status !='show'">
                                <div class="weui_cell_bd weui_cell_primary">

                                </div>

                                <div class="weui_cell_ft">
                                    <flexbox>
                                        <flexbox-item class="tr-flexitem"
                                                      v-if="data.status=='todraw' && data.stock != data.creditRecieved">
                                            <x-button plain
                                                      class="size26 tr-button"
                                                      v-link="{name:'yyg-product-show', params:{ id:data.issueId } }">
                                                追买
                                            </x-button>
                                        </flexbox-item>
                                        <flexbox-item class="tr-flexitem"
                                                      v-if="data.status=='shipped' || data.status=='received'">
                                            <x-button plain
                                                      class="size26 tr-button"
                                                      v-link="{name:'yyg-trade-logistic', params:{ id:data.id } }">
                                                查看物流
                                            </x-button>
                                        </flexbox-item>
                                        <flexbox-item class="tr-flexitem" v-if="data.status=='toaccept'">
                                            <x-button plain
                                                      class="size26 tr-button"
                                                      v-link="{name:'yyg-trade-award', params:{ issueId:data.issueId,id:data.id } }">
                                                立即领取
                                            </x-button>
                                        </flexbox-item>
                                        <flexbox-item class="tr-flexitem" v-if="data.status=='received'">
                                            <x-button plain
                                                      class="size26 tr-button"
                                                      v-link="{name:'comment', params:{ issueId:data.issueId,id:data.id } }">
                                                晒单
                                            </x-button>
                                        </flexbox-item>
                                    </flexbox>
                                </div>
                            </div>
                            <div v-if="checkIds.indexOf(data.id) != -1">
                                <div class="weui_cell">
                                    <div class="weui_cell_bd weui_cell_primary">
                                        物流公司
                                    </div>
                                    <div class="weui_cell_ft">
                                        <span v-text="data.logistic.vendor"></span>
                                    </div>
                                </div>
                                <div class="weui_cell">
                                    <div class="weui_cell_bd weui_cell_primary">
                                        物流编号
                                    </div>
                                    <div class="weui_cell_ft">
                                        <span v-text="data.logistic.code"></span>
                                    </div>
                                </div>
                                <div class="weui_cell">
                                    <div class="weui_cell_bd weui_cell_primary">
                                        物流状态
                                    </div>
                                    <div class="weui_cell_ft">
                                        <template v-for="item in statusList">
                                            <span v-show="data.status==item.type" v-text="item.text">

                                            </span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </template>
            </div>
            <div v-show="order.content.length==0">
                <x-result   icon="icon-mystore"  position="vertical">您还没有相关订单 </x-result>
            </div>
        </div>

    </section>
</div>
