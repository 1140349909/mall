import Vue from 'vue';
import {XButton} from 'vux';
import store from '../../store';
import {register, getMemberInfo, sendCaptcha} from '../../store/member/action';
import {isValid} from 'common/util/validator';
import './index.less';
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XButton,
    },
    store,
    data() {
        return {
            mobile: '',
            code: '',
            // 是否能获取验证码的时间
            canSendCaptchaTime: 0,
            timer: null
        };
    },
    vuex: {
        getters: {
            token: ({member})=>member.token,
            captcha: ({member})=>member.captcha,
            err: ({member})=>member.err,
        },
        actions: {
            sendCaptcha,
            register,
            getMemberInfo
        }
    },
    watch: {
        token (val) {
            if (val) {
                if (val.tkerUser) {
                    this.$root.alert({
                        content: '恭喜你加入成功',
                        onOk: ()=> {
                            this.redirect();
                        }
                    });
                } else {
                    if (this.$route.query.origid) {
                        this.$root.alert({
                            content: '你已经是会员,登陆成功',
                            onOk: ()=> {
                                this.redirect();
                            }
                        });
                    } else {
                        this.redirect();
                    }
                }
            }
            this.getMemberInfo();
        },
        captcha(val){
            if (val.status == 'failure') {
                this.stopCountdown();
            }
        },

        err(val){
            if (val.errCode !== 0) {
                this.$root.showToast({
                    type: 'text',
                    content: val.errMsg
                });
            }
        },
    },
    computed: {
        // 是否能发送验证码
        canSendCaptcha(){
            return this.canSendCaptchaTime <= 0;
        },
        btnCaptchaText(){
            if (this.captcha.status == 'failure') {
                return '重新获取';
            } else if (this.canSendCaptchaTime > 0) {
                return this.canSendCaptchaTime + '秒';
            } else {
                return '获取验证码';
            }
        }
    },
    route: {
        activate(transition) {
            this.token ? this.redirect() : transition.next();
        }
    },
    methods: {

        // 清空输入框文字
        onClearText(){
            this.mobile = '';
        },

        submit() {
            if (!isValid('mobile', this.mobile)) {
                this.$root.showToast({
                    content: '请填写正确的手机号'
                });
                this.$els.mobile.focus();
                return;
            }

            if (!this.code) {
                this.$root.showToast({
                    content: '验证码不得为空'
                });
                this.$els.code.focus();
                return;
            }

            this.register(this.mobile, this.code);
        },
        startCountdown(){
            this.canSendCaptchaTime = 60;
            this.timer = setInterval(()=> {
                if (--this.canSendCaptchaTime < 1) {
                    this.stopCountdown();
                }
            }, 1000);
        },
        stopCountdown(){
            clearInterval(this.timer);
            this.canSendCaptchaTime = 0;
        },
        handleSendCaptcha () {
            if (this.canSendCaptcha && isValid('mobile', this.mobile)) {
                this.startCountdown();
                this.sendCaptcha(this.mobile, 'register');
            } else {
                this.$root.showToast({
                    content: '请填写正确的手机号'
                });
                this.$els.mobile.focus();
            }
        },
        redirect(){
            var url = this.$route.query.redirect || '/';
            this.$router.replace(decodeURIComponent(url));
        }
    },
    ready(){
    }
});


