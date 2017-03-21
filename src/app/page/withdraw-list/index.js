import Vue from 'vue';
import {Group, Cell} from 'vux';
import store from '../../store';
import {getMemberWithdrawList} from '../../store/withdraw/action';
import XResult from '../../component/x-result';
import './index.less';

// 提现记录
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Group,
        Cell,
        XResult
    },
    store: store,
    vuex: {
        getters: {
            cusMobile: ({vsite}) => vsite.cusMobile,
            list: ({withdraw}) => withdraw.memberWithdrawList,
        },
        actions: {
            getMemberWithdrawList
        }
    },
    data: function () {
        return {};
    },
    created(){
        this.$root.showTopBar({
            backGo: 'withdraw'
        });
        this.getMemberWithdrawList({});
    }
});
