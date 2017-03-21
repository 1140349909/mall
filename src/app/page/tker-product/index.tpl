<div class="page page-sub">
    <section class="content">
        <product-list v-if="list && list.length>0" :list="list" :can-share="isTker" type="product"></product-list>
        <x-result  v-else   icon="icon-norecord"  position="vertical">暂无分销商品 </x-result>
    </section>
    <footer class="footer">
        <navbar></navbar>
    </footer>
</div>
