import Vue from 'vue';
import store from '../../store';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    data:function () {
        return {
            statusList:[
                {
                    'type':'topay',
                    'text':'待付款'
                },{
                    'type':'todelivery',
                    'text':'待发货'
                },{
                    'type':'shipped',
                    'text':'未收货'
                },{
                    'type':'received',
                    'text':'已收货'
                },{
                    'type':'show',
                    'text':'已晒单'
                }
            ],
            logistic:{},
            tradeStatus:''
        };
    },
    store: store,
    created:function () {
        this.getUrlParams();
    },
    vuex: {
        getters: {
            params: ({order}) => order.order.params,
            order: ({order}) => order.order.result,
            deleted: ({order}) => order.deleted.status
        },
        actions: {

        }
    },
    methods:{
        getUrlParams:function () {
            if(this.order.content.length != 0){
                for(let i = 0;i<this.order.content.length;i++){

                    let data = this.order.content[i];
                    if(data.id == this.$route.params.id){
                        this.logistic = data.logistic;
                        this.tradeStatus = data.status;
                        break;
                    }

                }
            }
        }
    }
});


