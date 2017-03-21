import Vue from 'vue';
import {
    Dialog,
    Tab,
    TabItem,
    XButton,
} from 'vux';
import store from '../../store';
import {getProduct, getProductIssueResType} from '../../store/product/action';
import {addToCart, getTradeAmount} from '../../store/trade/action';
import {integral, isTker} from '../../store/getters';
import Banner from '../../component/banner';
import Distribution from '../../component/distribution';
import ProductLabel from '../../component/product-label';
import ProductPrice from '../../component/product-price';
import LkShare from 'common/lk-share';
import {getMediaUrl, getMallProductShowUrl} from '../../util/url';
import {contentParse} from '../../util/media/content';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Banner,
        Dialog,
        Tab,
        TabItem,
        Distribution,
        XButton,
        ProductLabel,
        ProductPrice,
    },
    store: store,
    data: function () {
        return {
            id: '',
            swiperHeight: (window.innerWidth / 2) + 'px',
            tabIndex: 'product',
            // 是否显示分销
            isShowDistribution: false,
            // 当前分销商品
            distributionItem: null,
            shareUin: ''
        };
    },
    vuex: {
        getters: {
            uin: ({vsite}) => vsite.uin,
            item: ({product}) => product.item,
            integral,
            isLogined: ({member}) => member.isLogined,
            limit: ({trade}) => trade.limit,
            isTker
        },
        actions: {
            getProduct,
            addToCart,
            getTradeAmount,
            getProductIssueResType,
        }
    },

    watch: {
        item(val) {
            if (!val) return;
            if (val.mallCfg.limit > 0) {
                this.getTradeAmount({
                    buyType: 'mall',
                    id: val.id,
                });
            } else {
                this.$root.hidePageLoading();
            }
            this.shareUin = val.uin;
            //微信分享
            this.$root.setShare({
                title: val.name,
                desc: val.digest,
                link: getMallProductShowUrl(this.uid, val.id),
                imgId: val.mediaRes.coverImgId,
                isResolveLink: false
            });
            this.$root.setTitle(val.name);
            contentParse(this.$els.content);
        },
        limit(val) {
            if (val == null) return;
            this.$root.hidePageLoading();
        }
    },

    methods: {
        showDialog(){
            this.distributionItem = this.item;
            this.isShowDistribution = true;
        },
        purchase(item){
            this.$root.purchase(item);
        },
        showShare(){
            LkShare.show({
                title: this.item.name,
                desc: this.item.digest,
                link: getMallProductShowUrl(this.shareUin, this.item.id),
                imgUrl: getMediaUrl(this.item.mediaRes.coverImgId, false)
            });
        },
    },

    computed: {
        isShowProductLabel(){
            return (this.item.mallCfg.enableCash && this.item.mallCfg.enableIntegralOffset) || (this.item.mallCfg.enableCash && this.item.mallCfg.enableCoupon);
        },
        distribution(){
            return this.isTker && this.item.distribution;
        },
        // 是否超过限量
        disabledLimit(){
            return this.item.mallCfg.limit > 0 ? this.item.mallCfg.limit <= this.limit : false;
        },
        // 是否超过库存
        disabledStock(){
            return this.item.mallCfg.stock <= this.item.creditRecieved;
        }
    },

    created(){
        // 清空购物车
        this.addToCart({
            amount: 1,
            money: 0,
            integral: 0,
            userCoupon: null,
        });

        this.$root.showTopBar({backGo: 'mall'});
        this.$root.showPageLoading();
        this.id = this.$route.params.id;

        const {
            resId,
            resType,
        } = this.$route.query;

        if (!resId || !resType) {
            this.getProduct(this.id, 'mall', this.$route.query.type);
        } else {
            this.getProductIssueResType({
                buyType: 'mall',
                resType,
                resId,
                id: this.id,
            });
        }
    },
});
