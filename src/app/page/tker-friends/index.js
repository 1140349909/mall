import Vue from 'vue';
import store from '../../store';
import {getTkerMemberFriends} from '../../store/tker/action';
import Unit from '../../component/unit';
import XResult from '../../component/x-result';
import './index.less';
import '../tker/tker.less';
// 集客列表
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Unit,
        XResult
    },
    store: store,
    vuex: {
        getters: {
            summary: ({tker}) =>tker.summary,
            list: ({tker})=>tker.friends.content
        },
        actions: {
            getTkerMemberFriends
        }
    },
    created(){
        this.$root.showTopBar({
            backGo: 'tker'
        });
        this.getTkerMemberFriends({page: 0});
    }
});
