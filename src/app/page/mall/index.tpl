<div class="page page-mall">
    <section class="content">
        <banner :list="banners"></banner>
         <product-list v-if="list.content.length > 0" name="product-item-x" :list="list.content" :can-share="isTker"></product-list>
        <x-result v-if="list.content.length <=0"   icon="icon-norecord" position="vertical">暂无商品 </x-result>
    </section>
    <footer class="footer">
        <navbar></navbar>
    </footer>
</div>
