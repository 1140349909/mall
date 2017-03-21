import Vue from 'vue';
import {
    Tab,
    TabItem,
    Scroller,
} from 'vux';

import store from '../../store';
import {
    getMemberEmployeeInfoTop,
} from '../../store/employee/action';

import dateFormat from 'common/filter/dateFormat';
import './index.less';

Vue.filter('isUndefined', function (value) {
    return value == undefined ? 0 : value;
});

export default Vue.extend({

    template: __inline('./index.tpl'),

    components: {
        Tab,
        TabItem,
        Scroller,
    },

    data: function () {
        return {
            myDate: dateFormat(new Date()),
            topType: 'all',
            data: {
                avg: 0,
                name: '',
                headImg: '',
                tkerData: {
                    members: 0,
                    memberSeq: 0,
                },
                store: {
                    name: '',
                },
            },
            lists: [],
        };
    },

    store,

    vuex: {
        getters: {
            list: ({employee}) => employee.list,
            status: ({employee}) => employee.status,
        },

        actions: {
            getMemberEmployeeInfoTop,
        }
    },

    methods: {},

    watch: {
        status(val) {
            switch (val) {
                case 'top':
                    this.data = this.list;
                    this.lists = this.list.tops.content;
                    this.$nextTick(() => {
                        this.$refs.scroller.reset();
                    });
                    break;
            }
        },
        topType(val) {
            switch (val) {
                case 'all':
                    this.getMemberEmployeeInfoTop({
                        dataType: 'member',
                        topType: 'all',
                        size: 100,
                    });
                    break;

                case 'store':
                    this.getMemberEmployeeInfoTop({
                        dataType: 'member',
                        topType: 'store',
                        size: 100,
                    });
                    break;

            }
        }
    },

    created() {
        this.getMemberEmployeeInfoTop({
            dataType: 'member',
            topType: 'all',
            size: 100,
        });
    },
});
