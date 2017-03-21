<div class="envelope">
    <div class="envelope-cover">
        <div class="envelope-receive">
            <!-- 标题部分 -->
            <div class="envelope-title" >

                <!--未领取显示标题 -->
                <span v-if="state == 'open'">
                    <span v-if="!isfaceValue">
                        红包已被领完<br/>
                        您来晚了
                    </span>

                    <span v-else>
                        恭喜您<br/>
                        可获取一个红包
                    </span>
                </span>

                <!--已未领取显示标题 -->
                <span v-else>

                    <!-- 超过领取限制 -->
                    <span v-if="errCode == 9033000">
                        你已领取过了！
                    </span>

                    <!-- 红包领完了 -->
                    <span v-if="errCode == 9033001">
                        手慢了，红包领完了！
                    </span>

                    <!-- 红包过期 -->
                    <span v-if="errCode == 9033102">
                        您来晚了，红包已过期！
                    </span>

                    <!-- 红包过期 -->
                    <span v-if="errCode == 9035000">
                        您来晚了，红包已过期！
                    </span>

                    <span v-if="errCode == 0">
                        您已成功领取
                    </span>
                </span>
            </div>

            <template v-if="isfaceValue">
                <!-- 面值显示部分  -->
                <div class="envelope-facevalue">
                    <span class="envelope-facevalue-em"></span>

                    <span v-if="receiveType == 'integral'">
                        <span class="envelope-facevalue-em">{{calculateFaceValue}}</span>积分
                    </span>

                    <span v-else>
                        <span v-if="couponInfo.couponType == 'quota'">
                           <span class="envelope-facevalue-em">{{calculateFaceValue | moneyFormat '' -1}}</span>元
                        </span>

                        <span v-if="couponInfo.couponType == 'discount'">
                            <span class="envelope-facevalue-em">{{calculateFaceValue}}</span>折
                        </span>
                    </span>
                </div>

                <div class="envelope-form" :class="!isLogined && state=='open' ? 'envelope-form-no': ''">
                    <div class="envelope-form-box" v-show="state=='open' && !isLogined">
                        <div class="envelope-form-item">
                            <input v-el:mobile v-model="loginData.mobile" class="envelope-form-mobile" type="number"
                                   placeholder="输入手机号码，立即领取">
                        </div>
                        <div class="envelope-form-item">
                            <input v-el:code v-model="loginData.code" class="envelope-form-code" type="text"
                                   placeholder="输入验证码">
                            <button :disabled="countdown.show || countdown.loading" class="envelope-form-getcode"
                                    @click="handelCode">
                                <countdown :time="countdown.time" :start="countdown.state" @on-finish="finish"
                                           v-show="countdown.show">秒后重新获取
                                </countdown>
                                {{countdown.value}}
                                <spinner v-show="countdown.loading" type="android"></spinner>
                            </button>
                        </div>
                    </div>
                </div>
                <button v-show="state=='open'" :disabled="receiveLoading" class="envelope-submit" @click="onReceive">
                    <span v-show="receiveLoading">
                        正在领取中
                    </span>
                    <span v-show="!receiveLoading">
                        立刻领取
                    </span>
                </button>
                <button v-show="state=='receive' || state=='receiveErr'" class="envelope-submit" @click="envelopeView">
                    <span v-show="!logined">
                        去商城
                    </span>
                    <span v-show="receiveType == 'integral' || logined">
                        立即查看
                    </span>
                </button>
            </template>
        </div>
    </div>
</div>
