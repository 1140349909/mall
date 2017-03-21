<div class="page page-sub hb-container">
    <div class="content">
        <div class="issue">
            <div class="issue-content">
                <figure class="issue-figure">
                    {{{item.mediaRes.coverImgId | media}}}
                </figure>
                <div class="issue-aside">
                   <h6 class="issue-name">{{item.name}}</h6>
                   <div class="issue-detail">
                       <span class="label label-primary">第{{item.yygCfg.issueNo}}期</span>
                   </div>
                   <div class="issue-fixed">总需币数:<span class="text-primary">{{cart.money | moneyFormat}}</span></div>
                </div>
            </div>
        </div>
        <group>
            <cell title="参与次数"><span class="text-primary">{{cart.amount}}</span></cell>
            <cell title="总需金额"><span class="text-primary">{{cart.money | moneyFormat}}</span></cell>
        </group>
        <order-pay-type :pay-type.sync="payType" :balance="asset.money * 100" :money="cart.money"></order-pay-type>
    </div>
    <footer class="footer">
        <div class="page-actions page-actions-fix">
            <x-button v-if="canPurchase" type="primary" @click="placeOrder()">{{btnPlaceOrderText}}</x-button>
            <x-button v-else type="primary" disabled>{{btnPlaceOrderText}}</x-button>
        </div>
    </footer>
</div>

