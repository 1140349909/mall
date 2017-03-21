<div class="page">

    <section class="withdraw-list-content">
        <div v-if="list.length != 0">
            <template v-for="item in list">
                <Group>
                    <cell :title="item.title"
                          :inline-desc="item.date | dateFormat"
                          is-link>
                    <span slot="after-title">
                        <span v-text="item.money | moneyFormat"></span>元
                    </span>
                        <span slot="value">
                        <span v-text="item.status"
                              :style="{color:item.color}"></span>
                    </span>
                    </cell>
                </Group>
            </template>
        </div>
        <div v-else>
            <x-result icon="icon-norecord" position="vertical">您还没有提现记录</x-result>
        </div>
    </section>

    <footer class="footer withdraw-list-footer" v-if="cusMobile">
        <div>
            <p class="withdraw-list-footer-contact">
                <i class="iconfont icon-customerservice withdraw-list-icon-info"></i>
                <span id="title">商家客服</span>
                <span id="tel">{{cusMobile}}</span>
            </p>
            <p class="withdraw-list-footer-time">
                <span style="float: left">工作日09:00-21:00</span>
                <span style="float: right">节假日09:00-18:00</span>
            </p>
        </div>

    </footer>
</div>
