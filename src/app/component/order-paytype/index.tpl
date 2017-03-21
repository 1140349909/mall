<group class="order-paytype" title="选择支付方式">
    <cell v-if="isEnoughBalance" title="余额支付" :inline-desc="balance | moneyFormat"
          @click="selectPayType('balance')">
        <span class="order-paytype-slot iconfont icon-balance" slot="icon"></span>
                <span class="iconfont" :class="{'icon-selected':payType=='balance','icon-notselected':payType!='balance'}"></span>
    </cell>
    <cell v-else title="余额支付" :inline-desc="balance | moneyFormat">
        <span class="order-paytype-slot iconfont icon-balance" slot="icon"></span>
        <span v-cloak v-if="!isEnoughBalance">余额不足,无法购买</span>
    </cell>
    <cell title="微信支付" v-if="isWechat" inline-desc='3000以上金额，建议您先将钱分批充值到微信钱包再支付' @click="selectPayType('wechat')">
        <span class="order-paytype-slot iconfont icon-wechat" slot="icon"></span>
                <span class="iconfont"
                      :class="{'icon-selected':payType=='wechat','icon-notselected':payType!='wechat'}"></span>
    </cell>
    <cell title="支付宝支付" v-if="!isWechat" inline-desc='推荐有支付宝的用户使用，支付宝余额支付无限额，网银支付有限额' @click="selectPayType('alipay')">
        <span class="order-paytype-slot iconfont icon-alipay" slot="icon"></span>
                <span class="iconfont"
                      :class="{'icon-selected':payType=='alipay','icon-notselected':payType!='alipay'}"></span>
    </cell>
</group>
