<div class="page page-passport">
    <section class="content">
        <div class="passport-title">
            欢迎登录
        </div>
        <div class="passport-form">
            <div class="passport-item">
                <div class="passport-item-label">
                    <i class="iconfont icon-phone"></i>
                </div>
                <div class="passport-item-control">
                    <input v-el:mobile v-model="mobile" class="passport-item-input" placeholder="请输入手机号" pattern="[0-9]*">
                </div>
                <div v-show="mobile !== ''" @click="onClearText" class="passport-item-clear">
                    <i class="iconfont icon-close"></i>
                </div>
            </div>

            <div class="passport-item">
                <div class="passport-item-label">
                    <i class="iconfont icon-password"></i>
                </div>
                <div class="passport-item-control">
                    <input v-el:code v-model="code" type="text" class="passport-item-input passport-item-code"
                           placeholder="请输入验证码">
                </div>
                <div class="passport-item-codebtn">
                    <x-button
                        mini plain
                        type="primary"
                        :disabled="!canSendCaptcha"
                        @click="handleSendCaptcha()">{{btnCaptchaText}}
                    </x-button>
                </div>
            </div>
            <div class="passport-form-submit">
                <x-button type="primary" @click="submit()">登录</x-button>
            </div>
        </div>
    </section>
</div>
