<div class="page content-show" :class="{'content-show-specialeffects' : this.isSpecialEffects()}">
    <section class="content" v-if="contentErrCode == 0" :style="{minHeight:minContentHeight+'px' }">
        <div class="content-show-box">

            <div class="content-show-head">
                <h1 class="content-show-title">{{item.vsite.title}}</h1>
                <p class="content-show-p2">
                    <span class="content-date">{{item.publishedDate | dateFormat}}</span>
                    <span class="content-author">{{item.vsite.author}}</span>
                </p>
            </div>

            <div class="envelope-trigger" v-if="item.style.position == 'top' && isCoupon" @click="onOpen">
                <vue-img :src="getIconMediaId('top')"/>
            </div>

            <div class="envelope-trigger envelope-trigger-fixed"
                 v-if="item.style.position == 'fixed' && isCoupon" @click="onOpen">
                <vue-img :src="getIconMediaId('fixed')">
            </div>

            <div class="content-show-content lk-content" @click="openAuto($event)" v-el:content>
                {{{item.content}}}
            </div>

            <div class="envelope-trigger" v-if="item.style.position == 'bottom' && isCoupon" @click="onOpen">
                <vue-img :src="getIconMediaId('bottom')"/>
            </div>
        </div>
        <content-operation :item="item"></content-operation>

        <opinion-list
            v-if="getEnableOpinion()"
            :list="opinionList.content"></opinion-list>

    </section>

    <div class="content-show-tip" v-if="contentErrCode == 41005">
        <vue-img src="./img/empty.png">
        <p>文章去火星了！不见了</p>
    </div>

    <div v-el:footer v-show="contentErrCode == 0 && isWechatr" class="page-actions page-actions-fix">
        <x-button @click="goMall" type="primary" @click="submit">返回首页</x-button>
    </div>
</div>

