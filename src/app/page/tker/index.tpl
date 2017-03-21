<div class="page page-sub">
    <section v-if="viewType=='help'" class="content">
        <tker-info/>
    </section>
    <section v-if="viewType=='guide'" class="content">
        <div class="tker-guide">
            <figure>
                <vue-img :src="imgs.guide"/>
            </figure>
            <p>
                恭喜您已经成为我们的代言人!
            </p>
            <x-button type="primary" @click="goTkerMall">
                    <span>
                        马上寻找货源
                    </span>
            </x-button>
        </div>
    </section>
    <section v-if="viewType=='index'" v-if="viewType=='help'" class="content">
        <header class="tker-header tker-index-header">
            <div class="tker-header-items">
                <div class="tker-header-item">
                    <span class="tker-header-dt">酬劳池</span>
                    <span class="tker-header-dd"><unit type="money" :value="summary.profit.total"></unit></span>
                </div>
                <div class="tker-header-item">
                    <span class="tker-header-dt">已提现</span>
                    <span class="tker-header-dd"><unit type="money" :value="summary.account.cleared"></unit></span>
                </div>
            </div>
            <div class="tker-header-bar">
                <div class="tker-header-bar-l">
                    可提现
                    <unit type="money" :value="summary.account.available"></unit>
                    </strong>
                </div>
                <div class="tker-header-bar-r">
                    <x-button type="primary" plain mini v-link="{name:'withdraw'}">我要提现</x-button>
                </div>
            </div>
            <div class="tker-header-qk">
                <a v-link="{name:'tker-help'}">
                    <i class='iconfont icon-info'></i>如何代言
                </a>
            </div>
        </header>
        <div class="tker-menu">
            <div class="tker-menu-group">
                <header class="tker-menu-header">
                    <span class="tker-menu-qk">
                        <a v-link="{name:'tker-profile'}">
                            粉丝拓展
                        </a>
                    </span>
                    <span class="tker-menu-title">粉丝</span>
                </header>
                <div class="tker-menu-content">
                    <div class="tker-menu-item">
                        <figure class="tker-menu-item-figure">
                            <i class="tker-menu-item-friends"></i>
                        </figure>
                        <div class="tker-menu-item-stat">
                            <h6 class="tker-menu-item-stat-title">我的粉丝</h6>
                            <p class="tker-menu-item-stat-value">
                                <unit :value="summary.members" unit="个"></unit>
                            </p>
                        </div>
                        <div class="tker-menu-item-action">
                            <x-button type="primary" plain mini v-link="{name:'tker-friends'}">粉丝列表</x-button>
                        </div>
                    </div>

                    <div class="tker-menu-item">
                        <figure class="tker-menu-item-figure">
                            <i class="tker-menu-item-dividend"></i>
                        </figure>
                        <div class="tker-menu-item-stat">
                            <div class="tker-menu-item-stat-i">
                                <h6 class="tker-menu-item-stat-title">粉丝提成</h6>
                                <p class="tker-menu-item-stat-value">
                                    <unit type="money" :value="summary.profit.dividend"></unit>
                                </p>
                            </div>
                        </div>
                        <div class="tker-menu-item-action">
                            <x-button type="primary" plain mini v-link="{name:'tker-dividend'}">提成明细</x-button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tker-menu-group">
                <header class="tker-menu-header">
                    <span class="tker-menu-qk">
                        <a v-link="{name:'tker-mall'}">
                            商家货源
                        </a>
                    </span>
                    <span class="tker-menu-title">商品</span>
                </header>
                <div class="tker-menu-content">
                    <div class="tker-menu-item">
                        <figure class="tker-menu-item-figure">
                            <i class="tker-menu-item-product"></i>
                        </figure>
                        <div class="tker-menu-item-stat">
                            <h6 class="tker-menu-item-stat-title">代言商品</h6>
                            <p class="tker-menu-item-stat-value">
                                <unit :value="summary.products" unit="件"></unit>
                            </p>
                        </div>
                        <div class="tker-menu-item-action">
                            <x-button type="primary" plain mini v-link="{name:'tker-mine'}">代言商城</x-button>
                        </div>
                    </div>
                    <div class="tker-menu-item">
                        <figure class="tker-menu-item-figure">
                            <i class="tker-menu-item-profit"></i>
                        </figure>
                        <div class="tker-menu-item-stat">
                            <h6 class="tker-menu-item-stat-title">我的酬劳</h6>
                            <p class="tker-menu-item-stat-value">
                                <unit type="money" :value="summary.profit.lv0"></unit>
                            </p>
                        </div>
                        <div class="tker-menu-item-action">
                            <x-button type="primary" plain mini v-link="{name:'tker-profit'}">酬劳明细</x-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="page-actions page-actions-fix" v-if="viewType=='help'">
            <x-button type="primary" @click="seller()">
                    <span>
                        我来代言
                    </span>
            </x-button>
        </div>
    </footer>

</div>
