import Vue from 'vue';
import {Group, Cell} from 'vux';
import store from '../../store';
import {getMemberEmployeeInfoDetail} from '../../store/employee/action';
import VueImg from '../../component/vue-img';
import './index.less';
Vue.filter('ranking', function (value) {
    return value - 1;
});

export default Vue.extend({

    template: __inline('./index.tpl'),

    data(){
        return {
            img: __uri('./img/qrcode.png')
        }
    },

    components: {
        Group,
        Cell,
        VueImg
    },

    store,

    vuex: {
        getters: {
            user: ({employee}) => employee.users,
            tkerData: ({employee}) => employee.tkerData,
            status: ({employee}) => employee.status,
        },

        actions: {
            getMemberEmployeeInfoDetail: getMemberEmployeeInfoDetail,
        }
    },

    methods: {},

    created() {
        this.getMemberEmployeeInfoDetail();
    },
});
