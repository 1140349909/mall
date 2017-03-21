<div class="page page-trade">
    <section class="content">

        <tab active-color='#E84027' :line-width=2>
            <template v-for="data in types">
                <tab-item :selected="type == data.id" @click="getOrderListEntry(data.id)">
                    <span v-text="data.name"></span>
                    <badge v-show="data.id == 'topay' && parseInt(checkedValue) > 0"
                           :text="parseInt(checkedValue) > 99?'99+':checkedValue"
                           style="float: right;margin: 2px 0;"></badge>
                </tab-item>
            </template>
        </tab>

        <div v-show="status == 'success'">
            <div v-if="order.content.length!=0">
                <template v-for="data in order.content">

                    <div class="weui_panel weui_panel_access">
                        <div class="weui_cells size26" style="margin-top: 0 !important;">
                            <div class="weui_cell">
                                <div class="weui_cell_bd weui_cell_primary" style="color: #888">

                                    <span v-if="data.cancelDate != 'undefined'">
                                        <span v-if="data.cancelDate != '0分0秒' && data.payStatus=='s0'">
                                    <i class="iconfont icon-time" style="color: #E84027"></i>
                                    剩<span v-text="data.cancelDate"></span>自动取消
                                </span>
                                    <span v-else v-text="data.date | dateFormat"></span>
                                    </span>


                                </div>
                                <div class="weui_cell_ft">
                                    <span class="tr-text">
                                        <!--支付状态-->
                                        <div v-if="data.payStatus!='s1'">
                                            <template v-for="item in payStatusList">
                                                <span v-show="data.payStatus==item.type" v-text="item.text">

                                            </span>
                                            </template>
                                        </div>
                                        <div v-else>
                                            <!--物流状态-->
                                            <template v-for="item in statusList">
                                                <span v-show="data.status==item.type" v-text="item.text"></span>
                                            </template>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="weui_panel_bd size26 tr-panel-height tr-background">
                            <a v-link="{name:'product-show',params:{id:data.issueId}}"
                               class="weui_media_box weui_media_appmsg tr-media-box">
                                <div class="weui_media_hd tr-fixed">
                                    {{{data.coverImgId | media 'tr_media_appmsg_thumb'}}}
                                </div>
                                <div class="weui_media_bd">
                                    <h4 class="weui_media_desc size26 tr-title">
                                        <span v-text="data.name"></span>
                                    </h4>
                                    <product-label :mall-cfg="data.cfg"></product-label>
                                </div>
                                <div class="weui_media_ft tr-ft-height" style="color: #595757">

                                    <product-price :mall-cfg="data.cfg"></product-price>

                                    <p style="text-align: right;color: #888">
                                        <span>x</span>
                                        <span v-text="data.number"></span>
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div class="weui_cells size26" style="margin-top: 0 !important;">
                            <div class="weui_cell">
                                <div class="weui_cell_bd weui_cell_primary">
                                    <span>合计支付：</span>
                                </div>
                                <div class="weui_cell_ft">
                                    <!--积分支付-->
                                    <span v-show="data.payType=='score'">
                                    <i class="iconfont icon-coins"></i><span v-text="data.score"></span>
                                </span>
                                    <!--现金支付-->
                                    <span v-show="data.payType=='cash'">
                                    ￥<span v-text="data.cash.toFixed(2)"></span>
                                </span>
                                    <!--组合支付-->
                                    <span v-show="data.payType=='both'">
                                    ￥<span v-text="data.cash.toFixed(2)"></span>
                                    +
                                    <i class="iconfont icon-coins"></i><span v-text="data.score"></span>
                                </span>
                                    <!--需要添加：积分抵现-->
                                    <span v-show="data.payType=='other'">
                                    ￥<span v-text="data.cash.toFixed(2)"></span>
                                    +
                                    <i class="iconfont icon-coins"></i><span v-text="data.score"></span>
                                </span>
                                </div>
                            </div>

                            <div class="weui_cell" v-if="data.status!='todelivery'">
                                <div class="weui_cell_bd weui_cell_primary">

                                </div>
                                <div class="weui_cell_ft trade-btns">
                                    <flexbox>
                                        <flexbox-item class="tr-flexitem"
                                                      v-if="data.status=='shipped' || data.status=='received'">
                                            <x-button plain

                                                      class="size26 tr-button"
                                                      v-link="{name:'trade-logistic', params:{ id:data.id } }">
                                                查看物流
                                            </x-button>
                                        </flexbox-item>

                                        <flexbox-item class="tr-flexitem"
                                                      v-if="data.payStatus=='s0' || data.payStatus=='s2'">
                                            <x-button plain
                                                      @click="updateOrderStatusEntry(data.id)"
                                                      class="size26">
                                                取消订单
                                            </x-button>
                                        </flexbox-item>

                                        <!--v-if="data.payStatus=='s0' || data.payStatus=='s2'"-->
                                        <flexbox-item class="tr-flexitem"
                                                      v-if="data.payStatus=='s0' || data.payStatus=='s2'">
                                            <x-button plain
                                                      @click="gotoPayEntry(data)"
                                                      class="size26 tr-button">
                                                继续支付
                                            </x-button>
                                        </flexbox-item>

                                        <flexbox-item class="tr-flexitem"
                                                      v-if="data.payStatus=='s3' || data.payStatus=='s4'">
                                            <x-button plain
                                                      class="size26"
                                                      v-link="{name:'product-show',params:{id:data.issueId}}">
                                                重新购买
                                            </x-button>
                                        </flexbox-item>

                                        <!--<flexbox-item class="tr-flexitem" v-if="data.status=='received'">
                                            <x-button plain
                                                      class="size26 tr-button"
                                                      v-link="{name:'comment', params:{ issueId:data.issueId,id:data.id } }">
                                                晒单
                                            </x-button>
                                        </flexbox-item>-->
                                    </flexbox>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div v-else>
                <x-result  icon="icon-mystore"  position="vertical">您还没有相关订单 </x-result>
            </div>
        </div>
        <!--继续支付弹框-->
        <popup-paytype
            @on-charge="charge"
            @on-submit="updateUnpaidOrderEntry(orderData.id,orderData.payWay)"
            :show.sync="goValue"
            :pay-type.sync="orderData.payWay"
            :balance="asset.money"
            :money="orderData.cash*100"></popup-paytype>

    </section>


</div>
