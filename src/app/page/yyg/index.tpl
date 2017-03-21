<div class="page page-home">
    <section class="content">
        <banner :list="banners"></banner>
        <yyg-announcement :data="notice"></yyg-announcement>
        <tab active-color="#ff3a1e">
            <tab-item :selected="tabIndex === 'online'" @click="tabIndex = 'online'">在线一元购</tab-item>
            <tab-item :selected="tabIndex === 'history'" @click="tabIndex = 'history'">往期精彩</tab-item>
        </tab>
        <div class="yyg-home-list">
            <yyg-list v-if="tabIndex == 'online' && !isListLoad"
                :list="list.content"></yyg-list>
            <yyg-history-list v-if="tabIndex == 'history' && !isListLoad"
                :list="historyList.content"></yyg-history-list>
            <x-result  v-if="tabIndex == 'online' && list.content.length == 0 || tabIndex == 'history' && historyList.content.length == 0"   icon="icon-norecord"  >暂无商品 </x-result>
        </div>
    </section>
    <footer class="footer">
        <navbar></navbar>
    </footer>
</div>
