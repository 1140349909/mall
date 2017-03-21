<div class="order-setting">
    <div class="order-setting-item">
        <div class="order-setting-item-tit">选择产品数量<em v-if="limit>0">(限购{{limit}}件)</em></div>
        <div class="order-setting-item-box order-x-number">
            <x-number :min="1" :max="max" :value="amount" :fillable="false"
                      @on-change="handlerAmount"></x-number>
        </div>
    </div>
    <div class="order-setting-item">

        <!-- 现金支付 -->
        <div v-if="type == 'cash'">
            <div class="order-setting-item-tit">所需现金</div>
            <div class="order-setting-item-integral">
                {{price/100 * amount | currency '￥'}}
            </div>
        </div>

        <!-- 积分支付 -->
        <div v-if="type == 'integral'">
            <div class="order-setting-item-tit">所需积分</div>
            <div class="order-setting-item-integral">
                 <i class="iconfont icon-coins"></i>
                {{(integral * amount)}}
            </div>
        </div>

        <!-- 组合支付 -->
        <div v-if="type == 'integralCash'" class="order-setting-item-min">
            <div class="order-setting-item-clear">
                <div class="order-setting-item-tit">所需现金</div>
                <div class="order-setting-item-integral">
                    {{price/100 * amount | currency '￥'}}
                </div>
            </div>
            <div class="order-setting-item-clear">
                <div class="order-setting-item-tit">所需积分</div>
                <div class="order-setting-item-integral">
                     <i class="iconfont icon-coins"></i>
                    {{integral * amount}}
                </div>
            </div>
            <div>
                <span class="order-setting-item-p">我的积分：{{mintegral}}</span>
            </div>
            <div class="order-setting-pdt"></div>
        </div>

        <!-- 现金抵积分 -->
        <div v-if="type == 'offset'">
            <div class="order-setting-item-clear order-setting-item-borb">
                <div class="order-setting-item-tit">所需现金</div>
                <div class="order-setting-item-integral">
                    {{price/100 * amount | currency '￥'}}
                </div>
            </div>
            <div class="order-setting-item-clear">
                <switch title="积分抵现" :value=false @on-change="switchChange"></switch>
                <div class="order-setting-item-p">
                    我的积分：{{mintegral}}
                </div>
                <div v-if="isSwitch" class="order-setting-item-p">
                    最多使用：{{userVal}}
                    <div class="order-setting-item-integral2">
                        - {{touse | currency '￥'}}
                    </div>
                </div>

                <div class="order-setting-pdt2"></div>
            </div>
        </div>
    </div>
</div>
