import Vue from 'vue';
import {
    XButton,
    Flexbox,
    FlexboxItem,
    Spinner,
} from 'vux';
import store from '../../store';
import {getProduct} from '../../store/product/action';
import {getTradeCallback} from '../../store/trade/action';
import './index.less';
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XButton,
        Flexbox,
        FlexboxItem,
        Spinner,
    },
    data: function () {
        return {
            id: '',
            count: 4
        };
    },
    store,
    vuex: {
        getters: {
            item: ({product}) => product.item,
            status: ({trade}) => trade.result.status,
            address: ({trade}) => trade.result.address,
            issueId: ({trade}) => trade.result.issueId,
        },
        actions: {
            getTradeCallback,
            getProduct,
        },
    },
    watch: {
        address(){
            this.getProduct(this.issueId, 'mall');
        },
        item(val){
            if (val) {
                this.$root.hidePageLoading();
            }
        },

        id() {
            if (this.id) {
                this.getTradeCallback(this.id, 'mall');
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
                this.getTradeCallback(this.id, 'mall');
            }, 5 * 1000);
        }
    },
    created(){
        this.count = 3;
        this.id = this.$route.query.businessId;
    }
});


