import Vue from 'vue';
import {Group, Cell, XInput, PopupPicker, Popup, XButton, Flexbox, FlexboxItem} from 'vux';
import store from '../../store';
import {updateManagerWithdraw} from '../../store/withdraw/action';
import './index.less';

// 我要提现
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Group,
        XInput,
        Cell,
        Popup,
        XButton,
        Flexbox,
        FlexboxItem,
        PopupPicker
    },
    data: function () {
        return {

            show: false,

            limit: {
                title: '提现额度',
                placeholder: '最多可提现金额'
            },

            payWay: {
                title: '提现方式',
                list: [
                    {
                        name: '账户余额',
                        value: 'balance'
                    }, {
                        name: '微信钱包',
                        value: 'wechat'
                    }, {
                        name: '支付宝钱包',
                        value: 'alipay'
                    }]
            },

            formData: {
                money: '',
                payType: ['balance'],
                name: '',
                account: ''
            },
            title: '',
            content: ''
        };
    },
    store: store,
    vuex: {
        getters: {
            summary: ({tker}) => tker.summary,

            withdrawStatus: ({withdraw})=>withdraw.withdraw.status


        },
        actions: {
            updateManagerWithdraw: updateManagerWithdraw
        }
    },
    computed: {
        placeholder: function () {
            return this.limit.placeholder + (this.summary.account.available / 100).toFixed(2) + '元';
        }
    },
    methods: {
        checkFormData: function () {

            let checkList = {
                money: '金额',
                account: '账户名',
                name: '名称'
            };

            //注意：此处去除了最低提现额度的限制，正式发布时需恢复10元额度
            if (this.$refs['money'].value != '' && 10 <= this.$refs['money'].value && this.$refs['money'].value <= this.summary.account.available / 100) {
                // 空
            } else {
                this.$root.showToast({
                    type: 'cancel',
                    content: '无效或为空的' + checkList['money']
                });
                return;
            }


            if (this.formData.payType == 'alipay' && this.$refs['account'].value == '') {
                this.$root.showToast({
                    type: 'cancel',
                    content: '无效或为空的' + checkList['account']
                });
                return;
            }

            if (this.formData.payType == 'alipay' && this.$refs['name'].value == '') {
                this.$root.showToast({
                    type: 'cancel',
                    content: '无效或为空的' + checkList['name']
                });
                return;
            }

            this.show = true;

        },
        confirmWithDrawOrder: function () {

            let submitData = {
                cashType: 'tker',
                money: this.formData.money * 100,
                payType: this.formData.payType.toString(),
                account: this.formData.account,
                name: this.formData.name,
            };

            this.updateManagerWithdraw(submitData);
        },
        onHide: function () {
            if (this.content == '提交申请成功') {
                this.$router.go({
                    name: 'tker'
                });
            }
        }
    },
    watch: {
        'withdrawStatus': function (val) {

            switch (val) {

                case 'withdraw':
                    this.$root.showToast({
                        type: 'success',
                        content: '提交申请成功'
                    });
                    break;
                case 'failure':
                    this.$root.showToast({
                        type: 'cancel',
                        content: '提现处理中，不能重复提现'
                    });
                    break;
            }

        }

    },
    created(){
        this.$root.showTopBar({
            backGo: 'tker'
        });
    }
});
