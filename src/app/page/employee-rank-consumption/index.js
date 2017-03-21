import Vue from 'vue';
import {
    Tab,
    TabItem,
    Scroller,
} from 'vux';

import store from '../../store';
import {getMemberEmployeeInfoTop} from '../../store/employee/action';
import dateFormat from 'common/filter/dateFormat';
import './index.less';

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
            pullupConfig: {
                content: 'Pull Up To Refresh',
                pullUpHeight: 60,
                height: 40,
                autoRefresh: false,
                downContent: 'Release To Refresh',
                upContent: 'Pull Up To Refresh',
                clsPrefix: 'xs-plugin-pullup-'
            },
            data: {
                avg: 0,
                name: '',
                headImg: '',
                tkerData: {
                    credit: 0,
                    creditSeq: 0,
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
                        dataType: 'credit',
                        topType: 'all',
                        size: 100,
                    });
                    break;

                case 'store':
                    this.getMemberEmployeeInfoTop({
                        dataType: 'credit',
                        topType: 'store',
                        size: 100,
                    });
                    break;
            }
        }
    },

    created() {

        this.getMemberEmployeeInfoTop({
            dataType: 'credit',
            topType: 'all',
            size: 100,
        });
    },

    ready () {
        this.$nextTick(() => {
            this.$refs.scroller.reset();
        });
    }
});
