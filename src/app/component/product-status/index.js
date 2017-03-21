import Vue from 'vue';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {},
    props: {
        // 标签的类型
        // soldout  已售罄
        // selling  热卖中
        // finished 已下架
        status: {
            type: String,
            default: 'selling'
        }
    },

    computed: {
        calculateClass(){
            return 'product-status-' + this.status;
        }
    }
});
