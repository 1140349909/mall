import Vue from 'vue';
import {
    Group,
    Cell,
} from 'vux';
import store from '../../store';
import {
    getMemberInfo,
    getAsset,
    getcardStyle
} from '../../store/member/action';
import MemberAsset from '../../component/member-asset';
import Card from '../../component/card';
import './index.less';
import config from '../../config';
import {vsiteSettings} from '../../store/getters';
import Navbar from '../../component/navbar';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        MemberAsset,
        Navbar,
        Group,
        Cell,
        Card,
    },
    data(){
        return {
            version: config.RELEASED ? '' : ' - ' + config.VERSION,
            loadNumber: 0,
        };
    },
    store,
    vuex: {
        getters: {
            asset: ({member}) => member.asset,
            info: ({member}) => member.info.data,
            isLogined: ({member}) => member.isLogined,
            card: ({member}) => member.card,
            vsiteSettings,
            tkerConfigured: ({vsite}) => vsite.tkerConfigured
        },
        actions: {
            getMemberInfo,
            getAsset,
            getcardStyle,
        },
    },
    methods: {
        goTker(){
            this.$router.go({
                name: 'tker'
            });
        },
        isLoad(){
            this.loadNumber++;
            if (this.loadNumber == 2) this.$root.hidePageLoading();
        },
    },
    watch: {
        card(val){
            if (!val) return;
            this.isLoad();
        },
        info(val){
            if (!val) return;
            this.isLoad();
        }
    },
    created(){
        this.getMemberInfo();
        this.getcardStyle();
        this.$root.showPageLoading();
    }
});

