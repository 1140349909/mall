import Vue from 'vue';
import {Group, Cell, XButton} from 'vux';
import store from '../../store';
import {logout} from '../../store/member/action';
import './index.less';
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Group,
        Cell,
        XButton
    },
    store,
    vuex: {
        getters: {
            isLogouted: ({member})=>member.isLogouted
        },
        actions: {
            logout
        }
    },
    computed: {
        isShowLogout(){
            return this.isLogouted;
        }
    },
    methods: {
        logout(){
            this.logout();
        }
    },
    watch: {
        isLogouted(){
            this.$router.go('member');
        }
    },
    created(){
        this.$root.showTopBar({
            backGo: 'member'
        });
    }
});
