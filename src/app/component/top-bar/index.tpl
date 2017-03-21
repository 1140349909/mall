<header class="top-bar">
    <!-- left -->
    <div class="top-bar-back" v-touch:tap="onPress">
        <div class="iconfont icon-weixinjiangzuofanhui">
            <span class="top-bar-backtext">{{backText}}</span>
        </div>
    </div>

    <!-- center -->
    <div class="top-bar-title">
        <slot name="center">
            <span v-text="curText"></span>
        </slot>
    </div>

    <!-- right -->
    <div class="top-bar-other">
        <slot name="right"></slot>
    </div>
</header>