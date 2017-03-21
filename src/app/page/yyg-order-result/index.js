import Vue from 'vue';
import {XButton, Flexbox, FlexboxItem, Spinner} from 'vux';
import store from '../../store';
import {getTradeCallback} from '../../store/trade/action';
import YygProductStat from '../../component/yyg-product-stat';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {XButton, Flexbox, FlexboxItem, Spinner, YygProductStat},
    store,
    data: function () {
        return {
            id: '',
            count: 4
        };
    },
    vuex: {
        getters: {
            status: ({trade}) => trade.result.status,
            weChat: ({vsite}) => vsite.weChat,
            item: ({trade}) => trade.result.yygItem,
        },
        actions: {
            getTradeCallback
        }
    },
    watch: {
        id() {
            if (this.id) {
                this.getTradeCallback(this.id, 'yyg');
                this.autoCheck();
            }
        }
    },
    computed: {
        // 支付结果
        payStatus: function () {
            if (this.$route.query.status == 'failure') {
                return 'failure';
            } else if (this.status == 'unknown' && this.count > 0) {
                return 'checking';
            } else {
                return this.status;
            }
        }
    },
    methods: {
        autoCheck: function () {
            const timer = setInterval(()=> {
                if (--this.count <= 0 || this.status == 'success') {
                    return clearInterval(timer);
                }
                this.getTradeCallback(this.id, 'yyg');
            }, 5 * 1000);
        }
    },
    created(){
        this.count = 3;
        this.id = this.$route.query.businessId;
    }
});
