<div class="page">
    <section class="content">

        <div class="tips">

            <div class="award-dialog-body">

                <div class="tips-dialog-body-img-container">
                    <vue-img :src="imgs.payAward" alt="" >
                </div>
                <div class="tips-dialog-body-text">
                    <span>好文章要打赏！</span>
                </div>

                <div class="tips-dialog-body-payment">

                    <div class="tips-dialog-body-formTitle">
                        <label for="payment">打赏金额/元</label>
                        <span style="color: red;" v-show="alertShow">打赏金额不能为空</span>
                    </div>

                    <div>
                        <input type="number" id="payment" placeholder="请输入或选择金额"
                               v-model="award"
                               class="tips-dialog-body-formInput">
                    </div>
                    <!--type="{'warn':$index==index,'default':$index!=index}"-->
                    <div class="tips-dialog-body-formButton">
                        <flexbox>
                            <flexbox-item v-for="item in awardList">
                                <x-button plain
                                          class="tips-button"
                                          type="default"
                                          @click="setAward(item,$index)">
                                    <span v-text="item"></span>
                                </x-button>
                            </flexbox-item>
                        </flexbox>
                    </div>
                    <!--<div style="text-align: left;margin-left: -15px;">
                        <cell title="微信支付">
                            <i slot="icon" class="iconfont icon-wechat" style="font-size: 28px;margin-right: 15px;"></i>
                        </cell>
                        <cell title="支付宝支付">
                            <i slot="icon" class="iconfont icon-alipay" style="font-size: 28px;margin-right: 15px;"></i>
                        </cell>
                    </div>-->
                </div>

                <div class="tips-dialog-select">
                    <template v-for="item in radioList">
                        <label class="weui_cell weui_check_label" :for="item.id">
                            <div class="weui_cell_hd">
                                <i class="iconfont weui_media_appmsg_thumb icon-fix"
                                   :class="item.icon"
                                   :style="{color:item.color}">
                                </i>
                            </div>
                            <div class="weui_cell_bd weui_cell_primary" style="text-align: left">
                                <p v-text="item.text" style="font-size: 13px"></p>
                            </div>
                            <div class="weui_cell_ft">
                                <input type="radio"
                                       class="weui_check"
                                       name="selectPayType"
                                       :id="item.id"
                                       @click="selectChargeType(item.payType)">
                                <!--<span class="weui_icon_checked"></span>-->
                                <span class="iconfont"
                                      style="color: #ff3a1e;"
                                      :class="{'icon-selected':awardData.payType==item.payType,'icon-notselected':awardData.payType!=item.payType}"></span>
                            </div>
                        </label>
                    </template>
                </div>

                <div class="tips-dialog-body-confirm">

                    <x-button type="primary"
                              @click="submitAwardResult()"
                              style="border-radius:6px;">
                        确认打赏
                    </x-button>
                </div>
            </div>
        </div>
    </section>

</div>
