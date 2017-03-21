import Vue from 'vue';
import {Tab, TabItem} from 'vux';
import store from '../../store';
import {getAssetFlow, getAsset} from '../../store/member/action';
import {vsiteSettings} from '../../store/getters';
import XResult from  '../../component/x-result';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Tab,
        TabItem,
        XResult
    },
    store: store,
    data: function () {
        return {
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
        };
    },
    vuex: {
        getters: {
            vsiteSettings,
            status: ({member}) => member.flow.status,
            integral: ({member}) => member.asset.integral,
            list: ({member}) => member.flow.content
        },
        actions: {
            getAsset: getAsset,
            getAssetFlow: getAssetFlow
        }
    },
    created: function () {
        this.$root.showTopBar({backGo: 'member'});
        this.getAsset({
            vatype: 'integral'
        });

        this.getAssetFlowEntry('all');
    },
    watch: {
        'status': function (val) {
            switch (val) {
                case 'success':
                    this.$root.hideLoading();
                    break;
                default:
                    this.$root.showLoading();
                    break;
            }
        }
    },
    methods: {
        getAssetFlowEntry: function (type) {
            this.type = type;
            this.getAssetFlow({
                vatype: 'integral',
                type: type == 'all' ? '' : type
            });
        },

        jumpMall(){
            this.$router.go({
                name: 'mall'
            });
        }

    },
});


