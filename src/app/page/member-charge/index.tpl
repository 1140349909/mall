<div class="page page-user-charge">
    <!--<header class="header">
    </header>-->
    <!--:class="{'alipay-show':url}"-->
    <section class="content">

        <!--<panel header="图文组合列表" :footer="footer" :list="list" :type="type"></panel>-->

        <div class="weui_panel weui_panel_access">
            <div class="weui_panel_bd">
                <div class="weui_media_box weui_media_appmsg charge-title-box">
                    <div class="weui_media_hd" style="margin-right: 0 !important;">
                        <i class="iconfont icon-gift charge-color2 weui_media_appmsg_thumb" style="font-size: 60px;"></i>
                    </div>
                    <div class="weui_media_bd">
                        <h4 class="weui_media_title"></h4>
                        <div class="weui_media_desc charge-font1 charge-color1">
                            <p>一元=一个幸运币，充值的款项无法进行退回。</p>
                            <p>给梦想一个机会，万一实现了呢</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--选择充值金额-->
        <div class="weui_cells">
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <x-number title="选择充值金额" :min="1" :max="3000" :step="100" :value.sync="chargeData.money" :width="100"></x-number>
                    <div class="button_sp_area">
                        <template v-for="item in setting">
                            <a href="javascript:;"
                               class="weui_btn charge-button"
                               :class="{'weui_btn_warn':item.cash == chargeData.money,'weui_btn_plain_default':item.cash != chargeData.money}"
                               @click="selectCharge(item,$index)">
                                <span v-text="item.cash"></span>元
                            </a>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!--支付方式-->
        <div class="weui_cells weui_cells_radio">
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>选择支付方式</p>
                </div>
                <div class="weui_cell_ft charge-color2 charge-font2">
                    <span v-text="chargeData.money"></span>元
                </div>
            </div>
            <template v-for="item in radioList">
                <label class="weui_cell weui_check_label" :for="item.id">
                    <div class="weui_cell_hd">
                        <i class="iconfont weui_media_appmsg_thumb"
                           :class="item.icon"
                           style="font-size: 40px;margin-right: 15px" :style="{color:item.color}">
                            <!--{{{item.icon}}}-->
                        </i>
                    </div>
                    <div class="weui_cell_bd weui_cell_primary">
                        <p v-text="item.text" class="charge-title"></p>
                        <p v-text="item.desc" class="charge-desc"></p>
                    </div>
                    <div class="weui_cell_ft">
                        <input type="radio"
                               class="weui_check"
                               name="selectPayType"
                               :id="item.id"
                               @click="selectChargeType(item.payType)">
                        <span class="iconfont"
                              :class="{'icon-selected':chargeData.payType==item.payType,'icon-notselected':chargeData.payType!=item.payType}"></span>

                    </div>
                </label>
            </template>
        </div>

    </section>

    <footer class="footer charge-footer">
        <!--单独的按钮-->
        <div class="button_sp_area">
            <a href="javascript:;"
               class="weui_btn weui_btn_warn charge-ms50"
               @click="submitCharge()">立即支付</a>
        </div>
    </footer>
</div>
