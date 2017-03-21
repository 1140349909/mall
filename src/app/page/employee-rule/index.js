import Vue from 'vue';
import {
    Group,
    Cell,
} from 'vux';
import store from '../../store';
import {getMemberexcitation} from '../../store/employee/action';
import './index.less';
Vue.filter('ranking', function (value) {
    return value - 1;
});

// 默认值
const defaultData = {
    jobNo: '',
    name: '',
    store: {
        name: '',
        pid: '',
    },
    tkerData: {
        members: 0,
        memberSeq: 1,
        credit: 0,
        creditSeq: 1,
    },
};

export default Vue.extend({

    template: __inline('./index.tpl'),

    components: {
        Group,
        Cell
    },

    data: function () {
        return {};
    },

    store,

    vuex: {
        getters: {
            excitation: ({employee}) => employee.excitation,
            status: ({employee}) => employee.status,
        },

        actions: {
            getMemberexcitation,
        }
    },

    methods: {},

    watch: {
        status(val) {
            switch (val) {
                case 'detail':
                    this.user = Object.assign({}, defaultData, this.users);
                    break;
            }
        },
    },

    created() {
        this.getMemberexcitation();
    },
});
