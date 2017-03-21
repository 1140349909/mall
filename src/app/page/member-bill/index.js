import Vue from 'vue';
import store from '../../store';
import {getAssetFlow, getBalance} from '../../store/member/action';
import {Tab, TabItem, Scroller} from 'vux';
import XResult from '../../component/x-result';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Tab,
        TabItem,
        Scroller,
        XResult
    },
    store: store,
    data: function () {
        return {
            pullupConfig: {
                content: '下拉刷新',
                downContent: '下拉刷新',
                upContent: '释放刷新',
                loadingContent: '加载中'
            },
            type: 'all',
            types: [
                {
                    'name': '全部',
                    'id': 'all',
                    'content': 'allData'
                }, {
                    'name': '来源',
                    'id': 'in',
                    'content': 'inData'
                }, {
                    'name': '消费',
                    'id': 'out',
                    'content': 'outData'
                }
            ],
            payTypeList: [
                {
                    'type': 'alipay',
                    'text': '支付宝充值'
                }, {
                    'type': 'wechat',
                    'text': '微信充值'
                }
            ],
        };
    },
    vuex: {
        getters: {
            status: ({member}) => member.flow.status,
            money: ({member}) => member.asset.money,
            list: ({member}) => member.flow.content
        },
        actions: {
            getBalance: getBalance,
            getAssetFlow: getAssetFlow
        }
    },
    watch: {
        'status': function (val) {
            if (val == 'success') {
                this.$root.hideLoading();
            }
        }
    },
    created: function () {
        this.$root.showTopBar({backGo: 'member'});
        this.getBalance({});
        this.getAssetFlowEntry('all');
    },
    methods: {
        getAssetFlowEntry: function (type) {
            this.type = type;
            this.getAssetFlow({
                vatype: 'cash',
                type: type == 'all' ? '' : type
            });

        }

    }
});


