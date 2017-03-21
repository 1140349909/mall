import Vue from 'vue';
import './index.less';
import store from '../../store';
import {urlSerialization} from 'common/util';
import {browser} from 'common/util/detect';
import * as payment from 'common/lk-payment';
import {updateContentAward} from '../../store/content/action';
import {Dialog, Group, Cell, Flexbox, FlexboxItem, XButton} from 'vux';
import {getContentShowUrl} from '../../util/url';
import VueImg from '../vue-img';

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
    props: {
        dialogShow: {
            type: Boolean,
            default: false,
            twoWay: true
        },
        id: String
    },

    data: function () {

        return {
            //默认值给一个5
            award: 5,
            alertShow: false,
            index: undefined,
            awardList: [5, 10, 15, 20],
            awardData: {
                money: 0,
                payType: '',
                resBindType: 'content'
            },
            img: __uri('./img/payAward.png')
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

            let params = {
                channelUin: this.$route.query.channelUin,
                openChannel: this.$route.query.openChannel,
                pubId: this.$route.query.pubId,
                resType: this.$route.query.resType,
            };

            //化分为元
            this.awardData.money = this.award * 100;

            //添加打赏回调地址
            this.awardData.callBackPage = getContentShowUrl(this.uin, this.id) + window.encodeURIComponent('?' + urlSerialization(params));
            // this.awardData.callBackPage = location.href;
            // this.awardData.callBackPage = '#!/content/show/'+this.id;
            //提交
            this.updateContentAward(this.id, this.awardData);

        }
    },

    watch: {
        'award': function (val) {

            this.alertShow = val == '';

        },
        'result': function (val) {

            switch (this.awardData.payType) {
                case payment.PAY_TYPE.WECHAT:
                    let redirectUrl = location.href;

                    let platformParams = {
                        page: 'tips',
                        uin: this.uin
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
                            /*this.$router.replace({
                             name: 'order-result',
                             query: {
                             status: 'failure'
                             }
                             })*/
                        }
                    });
                    break;
            }
        }
    },


    created(){

    },
    ready(){
        if (browser.wechat) {
            this.awardData.payType = 'wechat';
        } else {
            this.awardData.payType = 'alipay';

        }
    }
});
