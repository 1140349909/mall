<div class="page">
    <section class="content">
        <header class="tker-header">
            <div class="tker-header-items">
                <div class="tker-header-item">
                    <span class="tker-header-dt">我的粉丝</span>
                    <span class="tker-header-dd"><unit :value="summary.members" unit="个"></unit></span>
                </div>
                <!-- <div class="tker-header-item">
                    <span class="tker-header-dt">贡献提成</span>
                    <span class="tker-header-dd"><unit type="money" :value="summary.profit.dividend"></unit></span>
                </div> -->
                <div class="tker-header-action">
                    <a class="tker-header-link" v-link="{name:'tker-profile'}">粉丝拓展</a>
                </div>
            </div>
        </header>
        <ul class="tker-user-list" v-if="list.length>0">
            <li v-for="item in list">
                <figure class="tker-user-figure">
                    {{{item.userInfo.headImg | media}}}
                </figure>
                <h6 class="tker-user-name">{{item.userInfo.nickName | nickname}}</h6>
                <div class="tker-user-extra">
                    <span class="tker-user-money"><unit type="money" :value="item.opdata.tkerData.money"></unit></span>
                    <span class="tker-user-desc">贡献提成</span>
                </div>
            </li>
        </ul>
        <x-result  v-else    icon="icon-norecord"  position="vertical">暂无粉丝 </x-result>
    </section>
</div>

