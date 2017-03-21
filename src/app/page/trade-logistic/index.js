import Vue from 'vue';
import store from '../../store';
import {getOrderList} from '../../store/order/action';
import {Cell, Group} from 'vux';


export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Cell,
        Group

    },
    data: function () {
        return {
            statusList: [
                {
                    'type': 'topay',
                    'text': '待付款'
                }, {
                    'type': 'todelivery',
                    'text': '待发货'
                }, {
                    'type': 'shipped',
                    'text': '未收货'
                }, {
                    'type': 'received',
                    'text': '已收货'
                }, {
                    'type': 'show',
                    'text': '已晒单'
                }
            ],
            logistic: {},
            coverImgId: '',
            tradeStatus: ''
        };
    },
    store: store,
    watch: {
        'status': function (val) {
            switch (val) {
                case 'success':
                    this.getUrlParams();
                    break;
            }
        }
    },
    created: function () {
        this.$root.showTopBar();
        this.getOrderList({
            buyType: 'mall'
        });

        this.getUrlParams();
    },
    vuex: {
        getters: {
            params: ({order}) => order.order.params,
            status: ({order}) => order.order.status,
            order: ({order}) => order.order.result,
            deleted: ({order}) => order.deleted.status
        },
        actions: {
            getOrderList: getOrderList
        }
    },
    methods: {
        getUrlParams: function () {

            if (this.order.content != undefined && this.order.content.length != 0) {
                for (let i = 0; i < this.order.content.length; i++) {

                    let data = this.order.content[i];
                    if (data.id == this.$route.params.id) {
                        this.logistic = data.logistic;
                        this.coverImgId = data.coverImgId;

                        for (let j = 0; j < this.statusList.length; j++) {
                            if (data.status == this.statusList[j].type) {
                                this.tradeStatus = this.statusList[j].text;
                                break;
                            }
                        }

                        break;
                    }

                }
            }
        }
    }
});


