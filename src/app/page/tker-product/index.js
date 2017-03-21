import Vue from 'vue';
import {XButton} from 'vux';
import store from '../../store';
import {getEntryProductList} from '../../store/tker/action';
import {isTker} from '../../store/getters';
import ProductList from '../../component/product-list';
import XResult from '../../component/x-result';
import './index.less';
import Navbar from '../../component/navbar';
// 我的分销商城 => 管理查看
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XButton,
        ProductList,
        XResult,
        Navbar
    },
    store: store,
    vuex: {
        getters: {
            isTker,
            list: ({tker}) => tker.entryProductList.content,
            total: ({tker}) => tker.entryProductList.totalElements
        },
        actions: {
            getEntryProductList
        }
    },
    created(){
        this.getEntryProductList({
            page: 0
        });
    }
});
