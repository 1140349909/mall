import Vue from 'vue';
import {XButton} from 'vux';
import ProductStatus from '../../component/product-status';
import XResult from '../../component/x-result';
import {TKER_TYPE} from '../../config/constants';
import store from '../../store';
import {getProductIssueTkerList} from '../../store/product/action';
import {updateTker} from '../../store/tker/action';
import './index.less';
import '../../component/product-list/index.less';

const TKER_TYPE_PRODUCT = TKER_TYPE.PRODUCT;
// 商家货源
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XButton,
        ProductStatus,
        XResult
    },
    store: store,
    vuex: {
        getters: {
            list: ({product}) => product.productIssueTkerList.content,
            taskId: ({tker}) => tker.tasks[TKER_TYPE_PRODUCT].id
        },
        actions: {
            getProductIssueTkerList,
            updateTker
        }
    },
    methods: {
        addTkerProduct(item){
            this.updateTker({
                type: TKER_TYPE_PRODUCT,
                productDesc: {
                    pid: item.productId,
                    name: item.name
                }
            });
        }
    },
    watch: {
        taskId(){
            this.getProductIssueTkerList({
                page: 0
            });
        }
    },
    created(){
        this.$root.showTopBar({
            backGo: 'tker-mine'
        });
        this.getProductIssueTkerList({
            page: 0
        });
    }
});
