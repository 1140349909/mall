import Vue from 'vue';
import store from '../../store';
import {
    sendCaptcha,
    register,
} from '../../store/member/action';
import {isValid} from 'common/util/validator';
import './index.less';
import {
    Countdown,
    Spinner,
} from 'vux';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Countdown,
        Spinner,
    },
    store,
    props: {

        // 领取类型
        receiveType: {
            type: String,
            required: true,
        },

        // 登录状态
        isLogined: {
            required: true,
        },

        // 积分面值
        faceValue: {
            required: true,
        },

        // 优惠券信息
        couponInfo: {
            required: true,
        },

        // 状态
        state: {
            type: String,
            required: true,
        },

        // 状态码
        errCode: {
            type: Number,
        },

        // 领取动画
        receiveLoading: {
            type: Boolean,
            default: false,
        },

        resType: {},

        id: {},

    },

    data() {
        return {

            // 注册登录所需数据
            loginData: {
                mobile: '',
                code: '',
            },

            // 验证码计数器
            countdown: {
                show: false,
                state: false,
                value: '获取验证码',
                time: 60,
                loading: false,
            },
            // 赋值是否为登录状态，最后在查看红包做为跳转依据
            logined: '',
        };
    },

    vuex: {
        getters: {
            captcha: ({member})=>member.captcha,
            token: ({member})=>member.token,
            err: ({member})=>member.err,
        },

        actions: {
            sendCaptcha,
            register,
        }
    },


    computed: {

        // 红包
        couponFormat() {
            return new Number(this.faceValue / 100).toFixed(1);
        },

        // 计算红包面值
        calculateFaceValue() {
            let faceValue = 0;
            if (this.receiveType == 'coupon') {

                // 固定金额
                if (this.couponInfo.couponType == 'quota') {
                    faceValue = this.couponInfo.faceValue;
                } else if (this.couponInfo.couponType == 'discount') {
                    faceValue = this.couponInfo.discount;
                }
            } else {
                faceValue = this.faceValue;
            }

            return faceValue;
        },

        isfaceValue(){
            return this.faceValue || this.couponInfo;
        }
    },

    methods: {

        // 拆开红包
        onOpen() {
            this.$emit('on-open');
        },

        // 领取红包
        onReceive() {
            if (this.isLogined) {
                this.receiveLoading = true;
                this.$emit('on-receive');
            } else {

                let data = {
                    marketingTool: {
                        resType: this.resType,
                    }
                };

                if (!isValid('mobile', this.loginData.mobile)) {
                    this.$root.showToast ({
                        content: '亲！您输入手机号不正确哦!'
                    });
                    return false;
                }

                if (this.loginData.code == '') {
                    this.$root.showToast ({
                        content: '亲！验证码不得为空哦!'
                    });
                    return false;
                }

                data.marketingTool[this.receiveType + 'Id'] = this.id;

                this.register(this.loginData.mobile, this.loginData.code, data);
            }
        },

        // 获取验证码
        handelCode() {
            if (!isValid('mobile', this.loginData.mobile)) {
                this.$root.showToast ({
                    content: '亲！您输入手机号不正确哦!'
                });
                return false;
            } else {
                this.countdown.value = '';
                this.countdown.loading = true;
                this.sendCaptcha(this.loginData.mobile);
            }
        },

        // 计数器处理
        finish() {

            // 重置计数器
            this.countdown.value = '重新获取';
            this.countdown.state = false;
            this.countdown.show = false;
            this.countdown.time = 60;
        },

        // 点击查看红包
        envelopeView(){
            if (this.receiveType == 'integral') {
                this.$router.go({
                    name: 'member-integral',
                });
            } else {
                if (this.logined) {
                    this.$router.go({
                        name: 'member-coupon',
                    });
                } else {
                    this.$router.go({
                        name: 'mall',
                    });
                }
            }
        },
    },

    watch: {

        captcha(val) {
            if (val.status == 'success') {
                // 开始倒数
                this.countdown.show = true;
                this.countdown.state = true;
                this.countdown.value = '';
                this.countdown.loading = false;

            } else if (val.status == 'failure') {
                this.$root.showToast({
                    content: '获取验证码失败'
                });

                this.countdown.value = '重新获取';
                this.countdown.loading = false;
            }
        },

        err(val){
            if (val.errCode !== 0) {
                this.$root.showToast({
                    content: val.errMsg
                });
            }
        },

        token(val) {
            if (val) {
                this.receiveLoading = true;
                this.$emit('on-receive');
            }
        },
    },

    created(){
        this.logined = this.isLogined;
    }
});
