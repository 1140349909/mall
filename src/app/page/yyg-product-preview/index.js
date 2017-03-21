import Vue from 'vue';
import {
    Dialog,
    Tab,
    TabItem,
    XButton,
    Sticky,
} from 'vux';
import store from '../../store';
import {getProductYygPreview} from '../../store/product/action';
import YygProductStat from '../../component/yyg-product-stat';
import Banner from '../../component/banner';
import '../product-show/index.less';
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
        };
    },
    vuex: {
        getters: {
            item: ({product}) => product.itemYYgview,
        },
        actions: {
            getProductYygPreview,
        }
    },
    watch: {
        item() {
            this.$root.hideLoading();
        }
    },
    ready(){
        this.$root.showLoading();
        this.id = this.$route.params.id;

        //产品详情
        this.getProductYygPreview(this.id, 'yyg');
    }
});


