import Vue from 'vue';
import {Tab, TabItem, Progress, XButton, Flexbox, FlexboxItem, Scroller} from 'vux';
import store from '../../store';
import YygProductStat from '../../component/yyg-product-stat';
import {getOrderList, delFinishedOrder} from '../../store/order/action';
import XResult from '../../component/x-result';
import YygWinning from '../../component/yyg-winning';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Tab,
        TabItem,
        Progress,
        XButton,
        Flexbox,
        FlexboxItem,
        Scroller,
        YygProductStat,
        XResult,
        YygWinning,
    },
    store: store,
    data: function () {
        return {
            index: 0,
            type: 'all',
            types: [
                {
                    'name': '全部参与',
                    'id': 'all',
                    'content': 'allData'
                }, {
                    'name': '正在参与',
                    'id': 'todraw',
                    'content': 'todrawData'
                }, {
                    'name': '中奖记录',
                    'id': ['toaccept', 'todelivery', 'shipped', 'received', 'show'].toString(),
                    'content': 'recordData'
                }
            ],
            payTypeList: [
                {
                    'type': 'score',
                    'text': '积分支付'
                }, {
                    'type': 'cash',
                    'text': '现金支付'
                }, {
                    'type': 'both',
                    'text': '现金支付+积分支付'
                }
            ],
            statusList: [
                {
                    'type': 'todraw',
                    'text': '进行中'
                }, {
                    'type': 'noluck',
                    'text': '未中奖'
                }, {
                    'type': 'toaccept',
                    'text': '未领取'
                }, {
                    'type': 'todelivery',
                    'text': '待发货'
                }, {
                    'type': 'shipped',
                    'text': '待收货'
                }, {
                    'type': 'received',
                    'text': '待晒单'
                }, {
                    'type': 'show',
                    'text': '已晒单'
                }
            ],
            checkIds: [],
        };
    },
    vuex: {
        getters: {
            status: ({order}) => order.order.status,
            params: ({order}) => order.order.params,
            order: ({order}) => order.order.result,
        },
        actions: {
            getOrderList: getOrderList,
            delFinishedOrder: delFinishedOrder
        }
    },
    watch: {
        'status': function (val) {
            switch (val) {
                case 'success':
                    this.$root.hideLoading();
                    break;

                case 'pending':
                    this.$root.showLoading();
                    break;
            }
        },
    },
    created: function () {
        this.$root.showTopBar({
            backGo: 'member'
        });
        this.getOrderList({
            buyType: 'yyg'
        });
    },
    computed: {
        percent: function () {
            return (this.order.creditRecieved / this.order.stock) * 100;

        }
    },
    methods: {
        getOrderListEntry: function (index, type) {

            this.index = index;

            this.type = type;

            if (type == 'all') {
                this.getOrderList({
                    buyType: 'yyg'
                });
            } else {
                this.getOrderList({
                    buyType: 'yyg',
                    status: type
                });
            }

        },

        viewLogistics: function (data) {

            if (this.checkIds.indexOf(data.id) == -1) {
                this.checkIds.push(data.id);
            } else {
                this.checkIds.splice(this.checkIds.indexOf(data.id), 1);
            }
        },

        delFinishedOrderEntry: function (id) {

            this.delFinishedOrder({id});
        }


    }
});


