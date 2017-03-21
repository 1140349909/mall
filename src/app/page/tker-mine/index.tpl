<div class="page page-sub">
    <section class="content">
        <product-list v-if="list && list.length>0" :list="list" type="product" :can-share="true"></product-list>
        <x-result  v-else   icon="icon-norecord" position="vertical">暂无代言商品 </x-result>
    </section>
    <footer class="footer">
        <div class="page-actions page-actions-fix page-actions-flex page-actions-tker">
            <div class="page-actions-item">
                <div class="tker-product-num">商品数: <strong class="text-primary" v-text="total"></strong></div>
            </div>
            <div class="page-actions-sp"></div>
            <div class="page-actions-item">
                <a class="product-show-tools-share" href="javascript:;" @click="shareSite()">
                    <i class="iconfont icon icon-share"></i>分享代言
                </a>
            </div>
            <div class="page-actions-aside">
                <x-button type="primary" v-link="{name:'tker-mall'}">
                    <span>添加商品</span>
                </x-button>
            </div>
        </div>
    </footer>
</div>
