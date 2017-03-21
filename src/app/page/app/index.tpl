<div class="app">

    <top-bar
        v-show="topBarOpts.show"
        :cur-text="topBarOpts.curText"
        :back-text="topBarOpts.backText"
        :back-go="topBarOpts.backGo">
        <span slot="right" v-if="topBarOpts.slotRight">{{{topBarOpts.slotRight}}}</span>
        <span slot="center" v-if="topBarOpts.slotCenter">{{{topBarOpts.slotCenter}}}</span>
    </top-bar>

    <x-header v-if="false" class="app-header" :left-options="headerOpts.leftOptions"
              :right-options="headerOpts.rightOptions">{{headerOpts.title}}
    </x-header>

    <router-view v-ref:page v-if="appLoaded" v-show="!isPageLoading"
                 :class="{'router-top-bar': topBarOpts.show == true}"></router-view>

    <div v-if="vsite.status=='FAILURE'" class="app-error">对不起，您访问的商铺已被删除或不存在。</div>

    <div v-if="loadMoreOpts.show" class="app-loading-more">
        <spinner :type="loadMoreOpts.spinner"></spinner>
        {{loadMoreOpts.content}}
    </div>

    <page-loading v-if="isPageLoading"></page-loading>

    <loading :show="loadingOpts.show" :text="loadingOpts.content"></loading>

    <alert
        :show.sync="alertOpts.show"
        :title="alertOpts.title"
        button-text="确认"
        @on-hide="$emit('on-alert-ok')">
        {{alertOpts.content}}
    </alert>

    <confirm
        :show.sync="confirmOpts.show"
        :title="confirmOpts.title"
        confirm-text="确认"
        cancel-text="取消"
        @on-confirm="$emit('on-confirm-ok')"
        @on-cancel="$emit('on-confirm-cancel')">
        <p style="text-align:center;">{{confirmOpts.content}}</p>
    </confirm>
    <toast
        :show.sync="toastOpts.show"
        :type="toastOpts.type"
        :time="toastOpts.time"
        :width="toastOpts.width">{{toastOpts.content}}
    </toast>

    <yyg-purchase
        :is-visible.sync="isPurchaseVisible"
        :data="curPurchaseItem"
        :max="curPurchaseItem.max"
        @on-close="purchaseClose"
        :amount.sync="curPurchaseItem.amount"
        @on-submit="onYygPurchaseSubmit"></yyg-purchase>
</div>
