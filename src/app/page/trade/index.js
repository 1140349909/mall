import Vue from 'vue';
import {Tab, TabItem, Flexbox, FlexboxItem, XButton, Scroller, Badge} from 'vux';
import store from '../../store';
import {
    getOrderList,
    getUnpaidOrderList,
    delFinishedOrder,
    updateOrderStatus,
    updateUnpaidOrder
} from '../../store/order/action';
import {getMemberInfo} from '../../store/member/action';
import PopupPaytype from '../../component/popup-paytype';
import * as payment from 'common/lk-payment';
import './index.less';
import XResult from '../../component/x-result';
import ProductLabel from '../../component/product-label';
import {getWechatPayUrl} from '../../util/url';
import ProductPrice from '../../component/product-price';


export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Tab,
        TabItem,
        Flexbox,
        FlexboxItem,
        XButton,
        Scroller,
        Badge,
        PopupPaytype,
        XResult,
        ProductLabel,
        ProductPrice
    },
    store: store,
    data: function () {
        return {
            //修改默认值为'topay'
            // type: 'all',
            type: 'topay',

            id: '',
            title: '成功',
            content: '成功',

            goValue: false,

            types: [
                {
                    'name': '全部',
                    'id': 'all',
                    'content': 'allData',
                    'totalElements': '0'
                }, {
                    'name': '未支付',
                    'id': 'topay',
                    'content': 'topayData',
                    'totalElements': '0'
                }, {
                    'name': '待发货',
                    'id': 'todelivery',
                    'content': 'todeliveryData',
                    'totalElements': '0'
                }, {
                    'name': '待收货',
                    'id': 'shipped',
                    'content': 'shippedData',

                    'totalElements': '0'
                }, {
                    'name': '已收货',
                    'id': 'received',
                    'content': 'receivedData',

                    'totalElements': '0'
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
                }, {
                    'type': 'other',
                    'text': '积分抵现'
                }
            ],
            statusList: [
                {
                    'type': 'topay',
                    'text': '未支付'
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
                }, {
                    'type:': 'cancel',
                    'text': '已取消'
                }
            ],
            payStatusList: [
                {
                    'type': 's0',
                    'text': '未支付'
                }, {
                    'type': 's1',
                    'text': '支付完成'
                }, {
                    'type': 's2',
                    'text': '支付失败'
                }, {
                    'type': 's3',
                    'text': '支付关闭'
                }, {
                    'type': 's4',
                    'text': '支付取消'
                }
            ],
            wayList: [
                {
                    'type': 'cash',
                    'text': '爆款',
                    'color': '#ff3a1e'
                }, {
                    'type': 'coupon',
                    'text': '优惠券',
                    'color': '#82bc00'
                }, {
                    'type': 'integral',
                    'text': '积分兑换',
                    'color': '#00bfd6'
                }, {
                    'type': 'both',
                    'text': '积分优惠',
                    'color': '#da3ab3'
                }, {
                    'type': 'offset',
                    'text': '积分抵现',
                    'color': '#ff9012'
                }, {
                    'type:': 'other',
                    'text': '其他',
                    'color': '#000000'
                }
            ],
            checkIds: [],

            orderData: {},
            checkedValue: undefined,
        };
    },
    vuex: {
        getters: {
            item: ({product}) => product.item,
            asset: ({member}) => member.asset,
            status: ({order}) => order.order.status,
            params: ({order}) => order.order.params,
            order: ({order}) => order.order.result,
            deleted: ({order}) => order.deleted.status,
            cancel: ({order}) => order.cancel.status,
            errMsg: ({order}) => order.cancel.errMsg,

            unpaid: ({order}) => order.unpaid.status,
            unpaidData: ({order}) => order.unpaid.result,
            payParams: ({order}) => order.unpaid.params
        },
        actions: {
            getOrderList: getOrderList,
            getUnpaidOrderList: getUnpaidOrderList,
            delFinishedOrder: delFinishedOrder,
            updateOrderStatus: updateOrderStatus,
            getMemberInfo: getMemberInfo,
            updateUnpaidOrder: updateUnpaidOrder
        }
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
        },
        'unpaidData': function (val) {

            switch (this.payParams.payType) {

                case payment.PAY_TYPE.BALANCE:
                    this.$router.replace({
                        name: 'order-result',
                        query: {
                            businessId: this.id,
                        }
                    });
                    break;

                case payment.PAY_TYPE.WECHAT:
                    let self = this;
                    //let redirectUrl = location.origin + location.pathname + '#!/order/result/?businessId=' + val.businessId + '&status={status}
                    let redirectUrl = getWechatPayUrl(self.item.uin, val.businessId);
                    let platformParams = {
                        uin: self.item.uin,
                        page: 'trade'
                    };

                    let payParams = val.wxcfg;

                    payment.pay(this.payParams.payType, {
                        platformParams,
                        payParams,
                        redirectUrl,
                    });
                    break;

                case payment.PAY_TYPE.ALIPAY:
                    payment.pay(this.payParams.payType, {
                        payParams: val.payUrl,
                        cancel: ()=> {
                            this.$router.replace({
                                name: 'order-result',
                                query: {
                                    status: 'failure'
                                }
                            });
                        }
                    });
                    break;
            }

        },

        'cancel': function (val) {
            //显示对话框
            switch (val) {
                case 'success':
                    this.$root.showToast({
                        type: 'success',
                        content: '订单取消成功'
                    });
                    //取消成功减1即可
                    this.checkedValue = (parseInt(this.checkedValue) - 1).toString();
                    //TODO：订单取消完后是否刷新
                    this.onHide();
                    break;
                case 'failure':
                    this.$root.showToast({
                        type: 'cancel',
                        content: '订单取消失败'
                    });
                    break;
            }

        },
        'params': function (val) {
            //第一次请求接口进行判断
            if (val.switchValue == 'on') {

                if (val.totalElements != undefined) {

                    if (val.totalElements == '0') {
                        this.getOrderList({
                            buyType: 'mall',
                            status: ''
                        });
                    } else {
                        this.type = val.status;
                        this.checkedValue = val.totalElements;
                    }

                }

            } else {

                //未经过详细测试
                if (val.status == 'topay') {
                    this.checkedValue = val.totalElements;
                }

                this.type = val.status;
            }


        }
    },
    created: function () {
        this.$root.showTopBar({
            backGo: 'member'
        });


        this.getMemberInfo();

        this.getUnpaidOrderList({
            buyType: 'mall',
            switchValue: 'on'
        });


    },
    methods: {

        onShow: function () {

        },
        onHide: function () {


            switch (this.type) {
                case 'topay':
                    this.getUnpaidOrderList({
                        buyType: 'mall',
                        switchValue: 'off'
                    });
                    break;
                default:
                    this.getOrderList({
                        buyType: 'mall',
                        status: this.type == 'all' ? '' : this.type
                    });
                    break;
            }
        },
        getOrderListEntry: function (type) {

            this.type = type;

            this.params.totalElements = '0';

            if (type == 'topay') {
                this.getUnpaidOrderList({
                    buyType: 'mall',
                    switchValue: 'off'
                });
            } else {
                this.getOrderList({
                    buyType: 'mall',
                    status: type == 'all' ? '' : type
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
        },

        updateOrderStatusEntry: function (id) {
            this.$root.confirm({
                title: '确认',
                content: '确定取消订单吗？',
                onOk: () => {
                    this.updateOrderStatus(this.id);
                }
            });
            this.id = id;
        },

        // 在线充值
        charge(){
            this.$router.replace({
                name: 'member-charge'
            });
        },

        gotoPayEntry: function (data) {
            this.goValue = true;
            this.orderData = data;
        },

        updateUnpaidOrderEntry: function (id, payType) {

            this.updateUnpaidOrder({
                id: id,
                payType: payType
            });
        }
    }
});


