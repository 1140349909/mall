import Vue from 'vue';
import {XNumber} from 'vux';
import store from '../../store';
import {getProduct} from '../../store/product/action';
import {getAddresses, getAsset} from '../../store/member/action';
import {addToCart, purchase} from '../../store/trade/action';
import {updateYYGAwardInfo} from '../../store/award/action';
import {getOrderList} from '../../store/order/action';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XNumber
    },
    store: store,
    data: function () {
        return {
            item: {},
            value: false,
            id: '',
            issueId: '',
            amount: 1,
            btnPlaceOrderText: '确认下单',
            // 当前地址项
            currentAddress: null,
        };
    },
    vuex: {
        getters: {
            item: ({product}) => product.item,

            // 默认地址
            oftenAddress: ({member}) => member.oftenAddress,

            addressList: ({member}) => member.address.list,

            // 提交成功返回结果
            status: ({award}) => award.award.status,

            order: ({order}) =>order.order.result,
            orderStatus: ({order}) =>order.order.status
        },
        actions: {
            addToCart,
            purchase,
            getProduct,
            getAddresses,
            getAsset,
            updateYYGAwardInfo,
            getOrderList

        }
    },
    computed: {},
    methods: {
        submitAward: function () {

            if (this.oftenAddress == null) {

                this.$root.showToast({
                    content: '请选择默认地址！'
                });
                return;
            }

            let submitData = {};
            submitData.id = this.id;
            submitData.address = this.oftenAddress;
            submitData.address.often = true;
            this.updateYYGAwardInfo(submitData);
        }
    },
    watch: {
        'status': function (val) {

            if (val == 'success') {
                this.$root.alert({
                    title: '恭喜',
                    content: '领取成功！',
                    onOk: function () {
                        //跳转一元购
                        this.$router.replace({
                            name: 'yyg-trade'
                        });
                    }
                });
            }
        },

        'orderStatus': function (val) {

            if (val == 'success') {

                for (let i = 0; i < this.order.content.length; i++) {

                    let data = this.order.content[i];

                    if (data.id == this.id) {
                        this.item = data;
                        break;
                    }
                }

            }
        },

        // 设置列表选中地址
        addressList(list){
            if (!list) return;
            let addressId = this.$route.query.addressId || '';
            if (addressId == '') {
                this.currentAddress = this.oftenAddress;
            } else {
                list.map(item => {
                    if (addressId == item.id) {
                        this.currentAddress = item;
                    }
                });
            }
        },
    },
    created(){
        this.$root.showTopBar();
        this.getOrderList({
            buyType: 'yyg'
        });

        this.issueId = this.$route.params.issueId;
        this.id = this.$route.params.id;

        if (this.order.content != undefined) {
            for (let i = 0; i < this.order.content.length; i++) {

                let data = this.order.content[i];

                if (data.id == this.id) {
                    this.item = data;
                    break;
                }
            }
        }

        this.getProduct(this.issueId, 'yyg');
        this.getAddresses();
    }
});
