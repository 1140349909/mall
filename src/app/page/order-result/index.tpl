<div class="page page-order-result">
    <section class="content">
        <div class="order-result-loading order-result-checking" v-if="payStatus=='checking'">
            <p>
                <spinner type="ios-small"></spinner>
                正在获取支付结果...
            </p>
        </div>
        <div class="order-result-show" v-if="payStatus !=='checking'">
            <div class="order-result-show-img" v-if="payStatus=='success'">
                <i class="iconfont icon-buysuccess"></i>
                <p class="order-result-show-p">购买成功</p>
            </div>

            <div class="order-result-show-img" v-if="payStatus=='failure'">
                <i class="iconfont icon-buyfail order-result-show-fail"></i>
                <p class="order-result-show-p order-result-show-fail">支付失败</p>
            </div>

            <div class="order-result-show-img" v-if="payStatus=='unknown'">
                <i class="iconfont icon-buyfail order-result-show-fail"></i>
                <p class="order-result-show-p order-result-show-fail">暂未获取到支付结果</p>
            </div>
        </div>

        <div class="order-result-info" v-if="payStatus=='success'">
            <div class="order-result-goods">
                <div class="order-result-goods-img">
                    {{{item.mediaRes.coverImgId | media}}}
                </div>
                <div class="order-result-goods-tits">
                    <div class="order-result-goods-tits-tit">{{item.name}}</div>
                    <div class="order-result-goods-tits-des">{{item.digest}}</div>
                </div>
                <div class="order-result-goods-number">
                </div>
            </div>
        </div>

        <div v-if="payStatus == 'success'" class="order-result-address">
            <div class="order-result-address-p">
                <div class="order-result-address-p-span">
                    联系人:&nbsp;&nbsp;{{address.name}}
                </div>
                <div class="order-result-address-p-span">
                    联系电话:&nbsp;&nbsp;{{address.mobile}}
                </div>
            </div>

            <div class="order-result-address-p">
                收货地址:&nbsp;&nbsp;{{address.prov}} {{address.city}} {{address.region}} {{address.street}}
            </div>
        </div>
    </section>
    <footer class="footer" v-if="payStatus=='success' || payStatus=='unknown' || payStatus == 'failure'">
        <div class="page-actions page-actions-fix">
            <flexbox v-if="payStatus=='success'">
                <flexbox-item>
                    <x-button v-link="{name:'mall'}" type="primary" plain>继续购买</x-button>
                </flexbox-item>
                <flexbox-item>
                    <x-button v-link="{name:'trade'}" type="primary" plain>查看详情</x-button>
                </flexbox-item>
            </flexbox>

            <flexbox v-if="payStatus=='unknown' || payStatus == 'failure'">
                <flexbox-item>
                    <x-button v-link="{name:'trade'}" type="primary" plain>查看支付结果</x-button>
                </flexbox-item>
            </flexbox>
        </div>
    </footer>
</div>
