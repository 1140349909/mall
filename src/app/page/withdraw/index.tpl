<div class="page" style="background: #f3f3f3">
    <section class="content">


        <div class="withdraw-header-container">
            <!--提现记录-->
            <div class="withdraw-recode-container"
                 v-link="{name:'withdraw-list'}">
                <i class="iconfont icon-transactions withdraw-recode-icon"></i>
                <span class="withdraw-recode">提现记录</span>
            </div>
            <div class="withdraw-title-container">
                <p class="withdraw-title"><span>可提现</span></p>
                <p class="withdraw-total"><span v-text="summary.account.available | moneyFormat"></span></p>
                <p class="withdraw-money"><span>酬劳池：<span
                        v-text="summary.profit.dividend  | moneyFormat"></span>（元）</span></p>
            </div>
        </div>
        <div class="withdraw-tip-container">
            <i class="iconfont icon-exclamation withdraw-tip-icon"></i>
            <span class="withdraw-tip">提现金额最小为10元，不得超过可提现值</span>
        </div>

        <Group>
            <x-input :title="limit.title"
                     :placeholder="placeholder"
                     :value.sync="formData.money"
                     type="number"
                     name="money"
                     keyboard="number"
                     v-ref:money
                     :show-clear="false"
            ></x-input>
        </Group>

        <Group>

            <popup-picker
                    :title="payWay.title"
                    :columns="1"
                    :data="payWay.list"
                    show-name
                    :value.sync="formData.payType"
            ></popup-picker>


            <x-input v-if="formData.payType == 'alipay'"
                     title="支付宝账号"
                     placeholder="请填写支付宝账号"
                     :value.sync="formData.account"
                     :required="formData.payType == 'alipay'"
                     name="account"
                     v-ref:account
                     :show-clear="false"
            ></x-input>
            <x-input v-if="formData.payType == 'alipay'"
                     title="支付宝名称"
                     placeholder="请填写支付宝名称"
                     :value.sync="formData.name"
                     :required="formData.payType == 'alipay'"
                     name="name"
                     :max="20"
                     v-ref:name
                     :show-clear="false"
            ></x-input>
        </Group>

        <Group>

            <div class="withdraw-other-container">
            <span class="withdraw-other">
                提现申请后，将在1-3个工作日内完成转账！
            </span>
            </div>
        </Group>
    </section>

    <popup :show.sync="show">
        <div class="withdraw-popup-container">
            <div class="withdraw-popup">
                <span class="withdraw-popup-title">确定提现账号</span>
            </div>
            <span class="vux-close vux-close-fix" @click="show=false"></span>

            <div class="withdraw-cells">
                <Cell :title="limit.title">
                    <div slot="value">
                        ￥<span v-text="formData.money"></span>
                    </div>
                </Cell>
                <Cell :title="payWay.title">
                    <div slot="value">
                        <template v-for="item in payWay.list">
                        <span v-show="item.value == formData.payType"
                              v-text="item.name"></span>
                        </template>

                    </div>
                </Cell>
                <Cell v-show="formData.payType == 'alipay'"
                      title="支付宝账号">
                    <div slot="value">
                        <span v-text="formData.account"></span>
                    </div>
                </Cell>
                <Cell v-show="formData.payType == 'alipay'"
                      title="支付宝名称">
                    <div slot="value">
                        <span v-text="formData.name"></span>
                    </div>
                </Cell>
            </div>

            <div class="footer withdraw-footer">
                <flexbox>
                    <flexbox-item>
                        <x-button type="primary"
                                  @click="confirmWithDrawOrder()"
                        >确认申请
                        </x-button>
                    </flexbox-item>
                </flexbox>
            </div>


        </div>
    </popup>

    <footer class="footer withdraw-footer">
        <flexbox>
            <flexbox-item>
                <x-button type="primary"
                          :disabled="summary.account.available == 0"
                          @click="checkFormData()">提交
                </x-button>
            </flexbox-item>
        </flexbox>
    </footer>
</div>
