<span :class="calculateClass" v-if="mallCfg.enableCash && !mallCfg.enableIntegralOffset && !mallCfg.enableCoupon">{{mallCfg.price | moneyFormat '￥'}}</span>
<span :class="calculateClass" v-if="mallCfg.enableIntegral"><i class="iconfont icon-coins"></i>{{mallCfg.integral}}</span>
<span :class="calculateClass" v-if="mallCfg.enableIntegralCash">{{mallCfg.price | moneyFormat '￥'}} + <i class="iconfont icon-coins"></i>{{mallCfg.integral}}</span>
<span :class="calculateClass" v-if="mallCfg.enableCash && mallCfg.enableIntegralOffset">{{mallCfg.price | moneyFormat '￥'}}</span>
<span :class="calculateClass" v-if="mallCfg.enableCash && mallCfg.enableCoupon">{{mallCfg.price | moneyFormat '￥'}}</span>
