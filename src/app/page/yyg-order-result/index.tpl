<div class="page page-sub">
    <div class="content">
        <div class="yyg-order-result">
            <div class="yyg-order-result-info yyg-order-result-checking" v-if="payStatus=='checking'">
                <p>
                    <spinner type="ios-small"></spinner>
                    正在获取支付结果...
                </p>
            </div>

            <div class="yyg-order-result-info yyg-order-result-unknown" v-if="payStatus=='unknown'">
                <h6>支付结果未知</h6>
            </div>

            <div class="yyg-order-result-info yyg-order-result-failure" v-if="payStatus=='failure'">
                <i class="iconfont icon-buyfail"></i>
                <h6>参与失败 !</h6>
            </div>
            <div class="yyg-order-result-info yyg-order-result-success" v-if="payStatus=='success'">
                <i class="iconfont icon-buysuccess"></i>
                <h6>参与成功</h6>
                <p>请耐心等待结果揭晓!</p>
            </div>


            <template v-if="payStatus=='success'">
                <div class="issue">
                    <div class="issue-content">
                        <figure class="issue-figure">
                            {{{item.mediaRes.coverImgId | media}}}
                        </figure>
                        <div class="issue-aside">
                            <h6 class="issue-name"><span class="label label-primary">第{{item.issueNo}}
                                    期</span> {{item.productName}}</h6>
                            <div class="issue-fixed">参与次数:<span class="text-primary"
                                                                v-text="item.tickets.length"></span></div>
                        </div>
                    </div>
                    <div class="issue-footer">
                        <div class="issue-ticket">
                            <h6>抽奖码</h6>
                            <ul>
                                <li v-for="ticket in item.tickets">{{ticket}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </template>

            <div class="yyg-order-result-qr" v-if="payStatus!='checking' && weChat && weChat.name && weChat.imgId">
                {{{weChat.imgId | media}}}
                <p>关注公众号“{{weChat.name}}”，及时查询中奖结果</p>
            </div>
        </div>
    </div>
    <footer class="footer" v-if="payStatus!='checking'">
        <div class="page-actions page-actions-fix">
            <flexbox v-if="payStatus=='success'">
                <flexbox-item>
                    <x-button v-link="{ name: 'yyg' }" type="primary" plain>继续参与</x-button>
                </flexbox-item>
                <flexbox-item>
                    <x-button v-link="{name:'yyg-trade'}" type="primary" plain>查看详情
                    </x-button>
                </flexbox-item>
            </flexbox>

            <flexbox v-if="payStatus=='unknown' || payStatus == 'failure'">
                <flexbox-item>
                    <x-button v-link="{ name: 'yyg' }" type="primary" plain>重新参与</x-button>
                </flexbox-item>
                <flexbox-item>
                    <x-button v-link="{name:'yyg-trade'}" type="primary" plain>查看支付结果
                    </x-button>
                </flexbox-item>
            </flexbox>
        </div>
    </footer>
</div>
