<div v-if="vsiteSettings.mall || vsiteSettings.yyg || vsiteSettings.content" class="navbar weui_tabbar clear">
    <a v-if="vsiteSettings.mall" v-link="{ name: 'mall', activeClass: 'weui_bar_item_on'}"
       class="navbar-mall weui_tabbar_item ">
        <div class="weui_tabbar_icon">
            <i class="iconfont icon icon-store"></i>
        </div>
        <p class="weui_tabbar_label">爆款</p>
    </a>

    <a v-if="vsiteSettings.yyg" v-link="{ name: 'yyg', activeClass: 'weui_bar_item_on'}"
       class="navbar-yyg weui_tabbar_item weui_bar_item_on">
        <div class="weui_tabbar_icon">
            <i class="iconfont icon icon-oneyuan"></i>
        </div>
        <p class="weui_tabbar_label">一元购</p>
    </a>

    <a v-if="vsiteSettings.content" v-link="{ name: 'content',activeClass: 'weui_bar_item_on'}" class="weui_tabbar_item">
        <div class="weui_tabbar_icon">
            <i class="iconfont icon icon-content"></i>
        </div>
        <p class="weui_tabbar_label">热点</p>
    </a>

    <a v-link="{ name: 'member',activeClass: 'weui_bar_item_on'}" class="weui_tabbar_item">
        <div class="weui_tabbar_icon">
            <i class="iconfont icon icon-me"></i>
        </div>
        <p class="weui_tabbar_label">我</p>
    </a>
</div>
