import Vue from 'vue';
import './index.less';
import store from '../../store';
import * as payment from 'common/lk-payment';
import {updateContentAward} from '../../store/content/action';
import {browser} from 'common/util/detect';
import {Dialog, Group, Cell, Flexbox, FlexboxItem, XButton} from 'vux';
import {getIlokaContentUrl} from '../../util/url';
import VueImg from '../../component/vue-img';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Dialog,
        Group,
        Cell,
        Flexbox,
        FlexboxItem,
        XButton,
        VueImg
    },
    store: store,
    props: {},
    data: function () {

        return {
            imgs: {
                payAward: __uri('./img/payAward.png')
            },

            resId: '',
            resType: '',

            //默认值给一个5
            award: 5,
            alertShow: false,
            index: undefined,
            awardList: [5, 10, 15, 20],
            awardData: {
                money: 0,
                payType: '',
                resBindType: 'content'
            }

            /*awardData: {
             money: 0,
             payType: 'wechat',
             resBindType: 'content'
             }*/
        };
    },

    vuex: {
        getters: {
            uin: ({vsite}) => vsite.uin,
            result: ({content})=>content.award.result
        },

        actions: {
            updateContentAward: updateContentAward
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
                        color: '#41AE37'
                    }
                ];
            } else {
                return [
                    {
                        id: 'alipay',
                        text: '支付宝支付',
                        payType: 'alipay',
                        icon: 'icon-alipay',
                        color: '#22A7E1'
                    }
                ];
            }
        },
    },

    methods: {
        setAward: function (item, index) {
            this.index = index;
            this.award = item;
        },
        selectChargeType: function (data) {
            this.awardData.payType = data;
        },
        submitAwardResult: function () {

            //校验
            if (this.award == '') {
                return;
            }

            //化分为元
            this.awardData.money = this.award * 100;

            this.awardData.resBindType = this.resType;

            //添加打赏的回调地址
            this.awardData.callBackPage = getIlokaContentUrl({
                id: this.resId,
                uin: this.uin,
            });

            //提交
            this.updateContentAward(this.resId, this.awardData);

        }
    },
    watch: {
        'award': function (val) {

            this.alertShow = val == '';

        },
        'result': function (val) {

            switch (this.awardData.payType) {
                case payment.PAY_TYPE.WECHAT:

                    // 艾乐卡：微信打赏
                    let redirectUrl = getIlokaContentUrl({
                        id: this.resId,
                        uin: this.uin,
                    });

                    let platformParams = {
                        uin: this.uin,
                        page: 'tips'
                    };

                    payment.pay(this.awardData.payType, {
                        platformParams,
                        payParams: val.wxcfg,
                        redirectUrl
                    });
                    break;
                case payment.PAY_TYPE.ALIPAY:
                    //支付宝打赏
                    payment.pay(this.awardData.payType, {
                        payParams: val.payUrl,
                        cancel: ()=> {
                            this.$router.replace({
                                name: 'tips'
                            });
                        }
                    });
                    break;
            }
        }
    },

    created(){
        this.resId = this.$route.query.resId;
        this.resType = this.$route.query.resType;
    },
    ready(){
        if (browser.wechat) {
            this.awardData.payType = 'wechat';
        } else {
            this.awardData.payType = 'alipay';

        }
    }
});
