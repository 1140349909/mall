import Vue from 'vue';
import { XButton } from 'vux';
import YygProductStat from '../yyg-product-stat';
import './index.less';
export default Vue.extend({
    props: {
        list: Array
    },
    components: {
        XButton,
        YygProductStat
    },
    template: __inline('./index.tpl'),
    watch: {
        /*list(val){
        }*/
    },
    methods: {
        purchase: function (item) {
            this.$root.yygPurchase(item);
        }
    }
});
