<div class="page page-content-preview content-show" :class="{'content-show-specialeffects' : this.isSpecialEffects()}">
    <div v-if="showTips" class="content-show-tips">内容预览页,请勿分享传播,红包/优惠券/打赏功能不可使用<br />违规内容如谣言欺诈、转发集赞等将被屏蔽使用</div>
    <section class="content">
        <div class="content-show-box">
            <div class="content-show-head">
                <h1 class="content-show-title">{{item.vsite.title}}</h1>
                <p class="content-show-p2">
                    <span class="content-date">{{item.publishedDate | dateFormat}}</span>
                    <span class="content-author">{{item.vsite.author}}</span>
                </p>
            </div>

            <div class="envelope-trigger" v-if="item.style.position == 'top' && isCoupon">
                <vue-img :src="getIconMediaId('top')"/>
            </div>

            <div class="envelope-trigger envelope-trigger-fixed"
                 v-if="item.style.position == 'fixed' && isCoupon">
                <vue-img :src="getIconMediaId('fixed')"/>
            </div>

            <div class="content-show-content lk-content" v-el:content>
                {{{item.content}}}
            </div>
            <div class="envelope-trigger" v-if="item.style.position == 'bottom' && isCoupon">
                <vue-img :src="getIconMediaId('bottom')"/>
            </div>
        </div>
        <content-operation :item="item" :preview="true"></content-operation>
    </section>
</div>

