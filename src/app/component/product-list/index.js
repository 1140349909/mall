import Vue from 'vue';
import './index.less';
import config from '../../config';
import ProductLabel from '../product-label';
import ProductStatus from '../product-status';
import ProductPrice from '../product-price';
import Distribution from '../distribution';

export default Vue.extend({
    components: {
        ProductLabel,
        ProductStatus,
        ProductPrice,
        Distribution
    },
    props: {
        list: Array,
        // 热销数字
        hotCount: {
            type: Number,
            default: config.HOT_LIMIT_COUNT
        },
        canShare: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            // 是否显示分销
            isShowDistribution: false,
            // 当前分销商品
            distributionItem: null
        };
    },
    computed: {
        query(){
            return this.type ? {type: this.type} : {};
        }
    },
    template: __inline('./index.tpl'),
    methods: {
        share(item){
            this.distributionItem = item;
            this.isShowDistribution = true;
        }
    }
});
