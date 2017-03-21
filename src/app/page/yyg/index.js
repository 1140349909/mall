import Vue from 'vue';
import {Tab, TabItem} from 'vux';
import store from '../../store';
import {getProducts, getProductIssueYygHistoryList} from '../../store/product/action';
import {getNotification} from '../../store/notice/action';
import {getBannerBuy} from '../../store/banner/action';
import navbar from '../../component/navbar';
import YygAnnouncement from '../../component/yyg-announcement';
import YygList from '../../component/yyg-list';
import YygHistoryList from '../../component/yyg-history-list';
import Banner from '../../component/banner';
import XResult from '../../component/x-result';
import './index.less';
import config from '../../config';
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Banner,
        YygAnnouncement,
        navbar,
        YygList,
        Tab,
        TabItem,
        YygHistoryList,
        XResult
    },
    data: function () {
        return {
            noticeCount: 5,
            swiperHeight: (window.innerWidth / 2) + 'px',
            tabIndex: 'online',
            timer: null,
            loadNumber: 0,
            banners: [null],
            notice: null,
        };
    },
    store: store,
    route: {
        // 页面切换，清除中奖滚动中奖信息
        canDeactivate: function (transition) {
            clearInterval(this.timer);
            transition.next();
        },
    },
    vuex: {
        actions: {
            getProducts,
            getNotification,
            getBannerBuy,
            getProductIssueYygHistoryList,
        },
        getters: {

            // 平台客户UIN
            uin: ({vsite}) => vsite.uin,

            // 商品列表
            list: ({product}) => product.list,

            // 往期精彩商品列表
            historyList: ({product}) => product.historyList,

            // 一元购通知
            noticex: ({notice}) => notice.item,

            // banners列表
            bannersx: ({banner}) => banner.banners,
        }
    },

    methods: {
        autoCheckNotice: function () {
            this.getNotification();
            this.timer = setInterval(()=> {
                if (--this.noticeCount <= 0) {
                    return clearInterval(this.timer);
                }
                this.getNotification();
            }, 60 * 1000);
        },
        purchase: function (item) {
            this.$root.yygPurchase(item);
        },

        isLoad(){
            this.loadNumber++;
            if (this.loadNumber == 3) {
                this.$root.hidePageLoading();
                this.banners = this.bannersx;
                this.notice = this.noticex;
            }
        },
    },

    watch: {
        tabIndex(val) {
            if (val == 'online') {
                this.getProducts({
                    buyType: 'yyg'
                });
            } else if (val == 'history') {
                this.getProductIssueYygHistoryList({});
            }
            this.$root.showLoading();
        },

        historyList(val){
            if (!val) return;
            this.$root.hideLoading();
        },

        list(val){
            if (!val) return;
            this.isLoad();
            this.$root.hideLoading();
            this.autoCheckNotice();
        },

        bannersx(val){
            if (!val) return;
            this.isLoad();
        },

        noticex(val){
            if (!val) return;
            this.isLoad();
        },

        uin(){
            this.$root.setTitle(config.NAME, false);
        }
    },

    created(){
        // this.$root.showLoading();
        if (this.$root.authRedirect('yyg')) {
            this.getProducts({
                buyType: 'yyg'
            });
            this.getBannerBuy('yyg');
            this.$root.showPageLoading();
        }
    }
});
