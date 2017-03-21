import Vue from 'vue';
import {Panel, XNumber, Checker, CheckerItem} from 'vux';
import store from '../../store';
import {memberCharge} from '../../store/charge/action';
import * as payment from 'common/lk-payment';
import './index.less';
import {browser} from 'common/util/detect';
import {getWechatChargeUrl} from '../../util/url';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Panel,
        XNumber,
        Checker,
        CheckerItem
    },
    store: store,
    data: function () {
        return {

            index: undefined,

            error: {
                name: '警告',
                data: {
                    payType: {
                        text: '请选择充值方式！',
                        value: false
                    },
                    money: {
                        text: '请选择充值金额！',
                        value: false
                    }
                }
            },

            payment: 'payment',

            setting: [
                {
                    cash: 5
                }, {
                    cash: 50
                }, {
                    cash: 100
                }, {
                    cash: 1000
                }, {
                    cash: 2000
                }, {
                    cash: 3000
                }
            ],

            chargeData: {
                money: 5,
                payType: '',
                callBackPage: ''
            }
        };
    },
    vuex: {
        getters: {
            status: ({charge}) => charge.charge.status,
            result: ({charge}) => charge.charge.result,
            url: ({charge}) => charge.charge.url,
            vsite: ({vsite}) => vsite
        },
        actions: {
            memberCharge: memberCharge
        }
    },
    computed: {
        radioList: function () {

            if (browser.wechat) {
                return [
                    {
                        id: 'weixin',
                        text: '微信支付',
                        payType: 'wechat',
                        icon: 'icon-wechat',
                        color: '#41AE37',
                        desc: '推荐已安装微信客户端的用户使用'
                    }
                ];
            } else {
                return [
                    {
                        id: 'alipay',
                        text: '支付宝支付',
                        payType: 'alipay',
                        icon: 'icon-alipay',
                        color: '#22A7E1',
                        desc: '推荐已安装支付宝客户端的用户使用'
                    }
                ];
            }
        }
    },
    //得到链接就跳转得了
    watch: {
        'result': function (val) {

            switch (this.chargeData.payType) {
                case payment.PAY_TYPE.WECHAT:
                    //微信充值
                    //http://api.sit.vveshow.com/buy/entry/dev/member/linkin?url=%2Fbill%2F%3Fstatus%3D%7Bstatus%7D
                    // let redirectUrl = location.origin + location.pathname + '#!/member/bill/?status={status}';
                    let redirectUrl = getWechatChargeUrl(this.vsite.uin);
                    let platformParams = {
                        uin: this.vsite.uin,
                        page: 'member-charge'
                    };
                    payment.pay(this.chargeData.payType, {
                        platformParams,
                        payParams: val.wxcfg,
                        redirectUrl
                    });
                    break;
                case payment.PAY_TYPE.ALIPAY:
                    //支付宝充值
                    payment.pay(this.chargeData.payType, {
                        payParams: val.payUrl,
                        cancel: ()=> {
                            this.$router.replace({
                                name: 'member-charge'
                            });
                        }
                    });
                    break;
            }
        }
    },
    created: function () {
        this.$root.showTopBar({backGo: 'member-bill'});
    },
    ready: function () {
        if (browser.wechat) {
            this.chargeData.payType = 'wechat';
        } else {
            this.chargeData.payType = 'alipay';
        }
    },
    methods: {
        selectCharge: function (data, index) {

            this.index = index;

            //实际上还需要乘以100
            this.chargeData.money = data.cash;

        },
        selectChargeType: function (data) {

            this.chargeData.payType = data;

        },

        submitCharge: function () {

            this.chargeData.callBackPage = '#!/member/bill';

            if (this.chargeData.money == 0) {
                this.$root.showToast({
                    content: this.error.data.money.text
                });
                return;
            }

            if (this.chargeData.payType == '') {
                this.$root.showToast({
                    content: this.error.data.payType.text
                });
                return;
            }

            this.memberCharge({
                ...this.chargeData,
                money: this.chargeData.money * 100
            });
        }
    }
});


