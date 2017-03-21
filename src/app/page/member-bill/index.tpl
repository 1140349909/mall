<div class="page page-user-bill">
    <!--<header class="header">
    </header>-->
    <section class="content">
        <div class="weui_cells">
            <div class="weui_cell bill-top-padding1">
                <div class="weui_cell_bd weui_cell_primary">
                    <div style="float: left">
                        <p class="bill-currentIntegral">
                            当前余额：
                        </p>

                        <p><span class="bill-text size37" v-text="money"></span><span> 元</span></p>
                    </div>
                    <div style="float: right" class="bill-text size20"
                         v-link="{name: 'service-show',params:{id:'bill'}}">
                        <p>
                            <i class="iconfont size32 icon-info"></i>
                            <span>余额说明</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="weui_cell bill-top-padding2">
                <div class="weui_cell_bd weui_cell_primary bill-pr0">
                    <div class="weui_btn_area bill-mr22-24">
                        <a class="weui_btn weui_btn_warn size26" v-link="{name:'member-charge'}">
                            马上充值
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="weui_cells_title">
            <span class="bill-title">最近30天收支明细：</span>
        </div>

        <tab active-color='#E84027' :line-width=2>
            <template v-for="data in types">
                <tab-item :selected="type == data.id" @click="getAssetFlowEntry(data.id)">
                    <span v-text="data.name"></span>
                </tab-item>
            </template>
        </tab>
        <!--<Scroller lock-x scrollbar-y use-pullup height="400px" :pullup-config="pullupConfig">-->
        <div v-show="status == 'success'">
            <div v-if="list.length!=0" style="overflow-x: hidden;">
                <div class="weui_panel weui_panel_access">
                    <!--<div class="weui_panel_hd">图文组合列表</div>-->
                    <div class="weui_panel_bd">
                        <template v-for="data in list">
                            <a href="javascript:void(0);" class="weui_media_box weui_media_appmsg bill-media-box">
                                <!--图片-->
                                <div class="weui_media_hd" style="margin-right: 0 !important;">
                                    <i v-if="data.score>=0"
                                       class="iconfont icon-wallet weui_media_appmsg_thumb bill-text size60"></i>
                                    <i v-else class="iconfont icon-wallet weui_media_appmsg_thumb size60"
                                       style="color: #898989"></i>
                                </div>
                                <!--名称，日期-->
                                <div class="weui_media_bd">
                                    <p class="weui_media_title size22"
                                       :class="{'bill-text':data.score>=0,'bill-text2':data.score<0}">
                                        <span v-text="data.name"></span>
                                    </p>
                                    <p class="weui_media_desc size18" style="color: #B5B5B6">
                                        <span v-text="data.date | dateFormat"></span>
                                    </p>
                                </div>
                                <!--现金-->
                                <div class="weui_media_ft size22"
                                     style="margin-right: 10px;"
                                     :class="{'bill-text':data.score>=0,'bill-text2':data.score<0}">
                                    <!--<span v-if="data.score>=0">+</span>-->
                                    <span v-text="data.score"></span><span>元</span>
                                </div>
                            </a>
                        </template>
                    </div>
                </div>
            </div>
            <div v-else>
                <x-result    icon="icon-norecord"  >暂无收支明细 </x-result>
            </div>
        </div>
    </section>
</div>







