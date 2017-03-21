<div class="page page-trade-show">
    <section class="content">
        <div class="lis-container">
            <div class="lis-info">
                <em>物流状态</em>
                <em class="status">
                    <template v-for="item in statusList">
                        <span v-show="item.type == tradeStatus" v-text="item.text"></span>
                    </template>

                </em>
            </div>
            <div class="lis-info">
                <em>物流公司</em>
                <em class="company"><span v-text="logistic.vendor"></span></em>
            </div>
            <div class="lis-info">
                <em>物流状态</em>
                <em class="orderno"><span v-text="logistic.code"></span></em>
            </div>
        </div>
    </section>
</div>
