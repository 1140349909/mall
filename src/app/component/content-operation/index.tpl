<span class="user-setting" v-show="hasPraise || hasAward">


    <!--打赏-->
<!--     <span class="award-container" >
        <span class="award-style">
            <span @click="showContentAward()">
                <i class="iconfont" :class="{'icon-dashangnew-hou-copy': numberAward > 0, 'icon-dashangnew': numberAward <= 0}"></i>
            </span>
            <span v-text="numberAward">
        </span>
    </span> -->

    <div class="content-operation-tips" v-show="hasAward">
        <x-button @click="showContentAward" type="primary">打赏</x-button>
        <p class="content-operation-number"><span>{{numberAward}}</span>人打赏</p>
    </div>


    <div class="content-operation-text">
        <span class="content-operation-pvspan">阅读 {{item.opdata.pv}}</span>
            <!--点赞-->
        <span class="praise-container" v-show="hasPraise" :class="{'onlyOne-container':!hasAward}">
            <span class="praise-style">
                <span @click="getContentPraiseEntry()">
                    <i class="iconfont" :class="{'icon-dianzanhou': disabled, 'icon-dianzan': !disabled}"></i>
                </span>
                <span v-text="numberPraise"></span>
            </span>
        </span>
    </div>
    <tips :dialog-show.sync="dialogShow" :id="item.id"></tips>
</span>


