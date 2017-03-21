<div class="page content-content-list">
    <section class="content">
        <banner v-if="banner" :list="banners"></banner>
        <div class="content-listbox">
            <content-list v-if="list.content.length > 0" :list="list.content" :uin="uin"
                          :type="layout"></content-list>
            <x-result v-if="list.content.length == 0" icon="icon-norecord" position="vertical">暂无热点</x-result>
        </div>
    </section>
    <footer class="footer">
        <navbar></navbar>
    </footer>
</div>
