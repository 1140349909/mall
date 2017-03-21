import Vue from 'vue';
import store from '../../store';
import {getProductPreview} from '../../store/product/action';
import ProductLabel from '../../component/product-label';
import Banner from '../../component/banner';
import {contentParse} from '../../util/media/content';
import {integral} from '../../store/getters';
import {
    Dialog,
    Tab,
    TabItem,
    XButton
} from 'vux';
import '../product-show/index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Banner,
        Dialog,
        Tab,
        TabItem,
        XButton,
        ProductLabel
    },
    store,
    data: function () {
        return {
            id: '',
            swiperHeight: (window.innerWidth / 2) + 'px',
            show: false,
            tabIndex: 'product',
        };
    },
    vuex: {
        getters: {
            item: ({product}) => product.itemPreview,
            integral,
        },
        actions: {
            getProductPreview,
        }
    },
    watch: {
        item(val) {
            if (!val) return;
            contentParse(this.$els.content);
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.getProductPreview(this.id);
    },
});
