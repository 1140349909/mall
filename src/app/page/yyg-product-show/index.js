import Vue from 'vue';
import {
    Dialog,
    Tab,
    TabItem,
    XButton,
} from 'vux';
import store from '../../store';
import {getProduct, getProductTrades, getShowList, getProductIssueResType} from '../../store/product/action';
import YygProductStat from '../../component/yyg-product-stat';
import Banner from '../../component/banner';
import Sticky from '../../component/sticky';
import LkShare from 'common/lk-share';
import {getMediaUrl, getYygProductShowUrl} from '../../util/url';
import './index.less';
import XResult from '../../component/x-result';
import VueImg from '../../component/vue-img';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Banner,
        Dialog,
        Tab,
        TabItem,
        YygProductStat,
        XButton,
        Sticky,
        XResult,
        VueImg
    },
    store: store,
    data: function () {
        return {
            imgs: {
                headImg: __uri('./img/headImg.png')
            },
            id: '',
            type: 'product',
            swiperHeight: (window.innerWidth / 2) + 'px',
            buyType: 'yyg'
        };
    },
    vuex: {
        getters: {
            uin: ({vsite}) => vsite.uin,
            item: ({product}) => product.item,
            trades: ({product}) => product.trades.content,
            showResult: ({product}) => product.show.result,
            showStatus: ({product}) => product.show.status,
            showParams: ({product}) => product.show.params

        },
        actions: {
            getProduct,
            getProductTrades,
            getShowList,
            getProductIssueResType
        }
    },
    watch: {
        type: function (val) {
            switch (val) {
                case 'comment':
                    this.getShowList({
                        buyType: this.buyType,
                        productId: this.item.productId
                    });
                    break;
                case 'trades':
                    this.getProductTrades({
                        issueId: this.id
                    });
                    break;
            }
        },
        item(val) {
            if (!val) return;
            this.$root.setShare({
                title: val.name,
                desc: val.digest,
                link: getYygProductShowUrl(this.uin, val.id),
                imgId: val.mediaRes.coverImgId,
                isResolveLink: false
            });
            this.$root.setTitle(val.name);
            this.$root.hidePageLoading();
        }
    },

    methods: {
        purchase (item) {
            this.$root.yygPurchase(item);
        },

        showShare(){
            // TODO:分享产生的链接要从tker获取
            LkShare.show({
                title: this.item.name,
                desc: this.item.digest,
                link: getYygProductShowUrl(this.uin, this.item.id),
                imgUrl: getMediaUrl(this.item.mediaRes.coverImgId, false)
            });
        },
    },

    created(){
        this.$root.showTopBar();
        this.id = this.$route.params.id;

        const {
            resId,
            resType,
        } = this.$route.query;

        if (!resId || !resType) {
            this.getProduct(this.id, this.buyType);
        } else {
            this.getProductIssueResType({
                buyType: this.buyType,
                resType,
                resId,
                id: this.id,
            });
        }
        this.$root.showPageLoading();
    }
});
