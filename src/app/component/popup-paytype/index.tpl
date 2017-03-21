<popup class="popup-paytype" :show.sync="show">
    <div class="popup-hd">
        <div class="popup-title">
            付款详情
            <span class="vux-close" @click="onClose"></span>
        </div>
        <div class="popup-money">
            <p v-if="leftTime">
                请在{{leftTime}}内完成支付
            </p>
            <p>应付金额
                <span class="popup-money-em">
                    <span class="popup-money-small">￥</span>
                    <span class="popup-money-big">{{money | moneyFormat}}</span>
                </span>
            </p>
        </div>
    </div>
    <group v-if="!isOverFulfilled" class="order-paytype">
        <cell v-if="isEnoughBalance" title="余额支付" :inline-desc="balance * 100 | moneyFormat '￥' "
              @click="selectPayType('balance')">
            <span class="order-paytype-slot iconfont icon-balance" slot="icon"></span>
            <span class="iconfont"
                  :class="{'icon-selected':payType=='balance','icon-notselected':payType!='balance'}"></span>
        </cell>
        <cell v-else title="余额支付" :inline-desc="balance | moneyFormat">
            <span class="order-paytype-slot iconfont icon-balance" slot="icon"></span>
            <span v-cloak v-if="!isEnoughBalance">余额不足</span>
        </cell>
        <cell v-if="money < limitMoney && isWechat" title="微信支付" inline-desc='3000以上金额，建议您先将钱分批充值到微信钱包再支付' @click="selectPayType('wechat')">
            <span class="order-paytype-slot iconfont icon-wechat" slot="icon"></span>
                    <span class="iconfont"
                          :class="{'icon-selected':payType=='wechat','icon-notselected':payType!='wechat'}"></span>
        </cell>
        <cell v-if="money < limitMoney && !isWechat" title="支付宝支付" inline-desc='推荐有支付宝的用户使用，支付宝余额支付无限额，网银支付有限额' @click="selectPayType('alipay')">
            <span class="order-paytype-slot iconfont icon-alipay" slot="icon"></span>
                    <span class="iconfont"
                          :class="{'icon-selected':payType=='alipay','icon-notselected':payType!='alipay'}"></span>
        </cell>
    </group>

    <group v-if="isOverFulfilled">
        <cell title="支付超额" inline-desc='对不起,您的订单金额已经超出单笔在线支付限额,请先充值到余额后再来下单'></cell>
    </group>

    <div v-if="isOverFulfilled" class="popup-submit">
        <x-button type="primary" @click="onCharge()">马上充值</x-button>
    </div>
    <div v-else class="popup-submit">
        <x-button type="primary" @click="onSubmit()">确认支付</x-button>
    </div>
</popup>
