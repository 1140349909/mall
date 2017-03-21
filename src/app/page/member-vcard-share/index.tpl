<div class="page page-vcard">
    <section class="vcard">


        <div class="vcard-bg">

            <div class="vcard-header"
                 :style="styleObject">
                <div class="vcard-header-text"
                     :style="style21">
                    <p class="vcard-title-name" v-show="vcard.name!=''"><span v-text="vcard.name"></span></p>
                    <p class="vcard-title-position"><span v-show="vcard.org!=''" v-text="vcard.org"></span></p>
                    <p class="vcard-title-position"><span v-show="vcard.title!=''" v-text="vcard.title"></span></p>
                </div>
                <div class="vcard-header-qrcode">
                    <vue-img :src="qrcode" alt="" v-if="qrcode != ''">
                    <vue-img v-else :src="imgs.qrcode" alt="">
                    <div class="vcard-header-qrcode-div">
                        <p>长按二维码</p>
                        <p>保存至通讯录</p>
                    </div>
                </div>
            </div>
            <div class="vcard-body-bg">
                <div class="vcard-body" :style="style22">
                    <div class="vcard-body-logo">
                        {{{vcard.logo | media}}}
                    </div>
                    <div class="vcard-body-text">
                        <p v-show="vcard.wechat!=''">
                            <i class='iconfont icon-wechatnumber'></i>
                            微信：<span v-text="vcard.wechat"></span>
                        </p>
                        <p v-show="vcard.mobile!=''">
                            <i class='iconfont icon-telephone'></i>
                            手机：<span v-text="vcard.mobile"></span>
                        </p>
                        <p v-show="vcard.email!=''">
                            <i class='iconfont icon-email'></i>
                            邮箱：<span v-text="vcard.email"></span>
                        </p>
                        <p v-show="vcard.adr!=''">
                            <i class='iconfont icon-address'></i>
                            地址：
                            <span v-text="vcard.adr"></span></p>
                    </div>
                </div>
                <div class="vcard-footer">
                    <div class="vcard-footer-text">
                        <a href="http://www.iloka.me"><p style="color: #4285be">www.iloka.me</p></a>
                        <p>艾乐卡-企业营销管家</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer class="footer vcard-button-footer">
        <flexbox>
            <flexbox-item>
                <x-button type='primary'
                          @click="gotoIndex()"
                          class="size26 vcard-button">
                    制作我的名片
                </x-button>
            </flexbox-item>
        </flexbox>
    </footer>
</div>
