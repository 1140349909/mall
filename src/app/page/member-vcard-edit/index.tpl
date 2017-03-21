<div class="page page-vcard-edit">
    <section class="vcard-edit">
        <div class="vcard-edit-container">

            <div class="vcard-edit-preview">


                <div class="vcard-edit-header"
                     :class="{'vcard-edit-bg-header':showBgUpload}"
                     :style="styleObject">

                    <!--没有存储bg时显示底色部分-->
                    <div v-if="!showBgUpload">

                        <div class="vcard-header-text">
                            <p class="vcard-title-name" v-text="vcard.name"></p>
                            <!--<p class="vcard-title-name" v-text="vcard.name" :style="{color:color}"></p>-->
                            <p class="vcard-title-position" v-text="vcard.org"></p>
                            <p class="vcard-title-position" v-text="vcard.title"></p>
                        </div>

                    </div>
                    <div v-else style="width: inherit;height: inherit;" @click="submitImage('bg')">

                        <div class="vcard-edit-header-text" >
                            <div>
                                <vue-img src="imgs.upload" alt="">
                            </div>
                            <div>
                                <p>点击上传背景图</p>
                                <p>推荐尺寸：588*202</p>
                            </div>
                        </div>

                    </div>


                    <div class="vcard-edit-header-qrcode">
                        <vue-img :src="qrcode" alt="" v-if="qrcode != ''">
                        <vue-img v-else :src="imgs.qrcode" alt="">
                    </div>
                </div>

                <div class="vcard-preview">
                    <flexbox>
                        <template v-for="item in colorList1">
                            <flexbox-item @click="selectBgColor(item,$index)">
                                <div class="flex-demo"
                                     :class="{'flex-demo-select':index==item.index}"
                                     :style="{'background':item.color,
                                     'borderStyle': 'solid',
                                     'borderWidth':'1px',
                                     'borderColor':item.color}">

                                    <div class="flex-demo-inside"
                                         :style="{'background':item.color}">

                                    </div>

                                </div>
                            </flexbox-item>
                        </template>
                        <flexbox-item @click="setHeaderBgColor()">
                            <div class="flex-demo">
                                <vue-img :src="imgs.photo"
                                     style="width: 100%;height: auto"
                                     alt="">
                            </div>
                        </flexbox-item>
                        <template v-for="item in colorList2">
                            <flexbox-item @click="selectBgColor(item,$index+3)">
                                <div class="flex-demo"
                                     :class="{'flex-demo-select':index==item.index}"
                                     :style="{'background':item.color,
                                     'borderStyle': 'solid',
                                     'borderWidth':'1px',
                                     'borderColor':item.color}">

                                    <div class="flex-demo-inside"
                                         :style="{'background':item.color}">

                                    </div>

                                </div>
                            </flexbox-item>
                        </template>
                    </flexbox>
                </div>
            </div>

            <!--字体颜色选择器-->
            <!--<group title="">
                <cell :title="'字体颜色'">
                    <color-picker slot="value" :colors="colors" :value.sync="color" size="small"></color-picker>
                </cell>
            </group>-->

            <group title="">
                <!--is-type="china-name"-->
                <x-input title="姓名"
                         id="name"
                         name="name"
                         :max="10"
                         placeholder="最多10个字符"
                         type="text"
                         :value.sync="vcard.name"
                         v-ref:name
                ></x-input>
                <x-input title="公司职务"
                         name="title"
                         :max="20"
                         placeholder="建议最多12个字符"
                         type="text"
                         :value.sync="vcard.title"
                         v-ref:title
                ></x-input>
                <x-input title="公司名称"
                         :max="20"
                         name="org"
                         placeholder="建议最多12个字符"
                         type="text"
                         :value.sync="vcard.org"
                         v-ref:org
                ></x-input>
            </group>

            <group title="">
                <cell title="上传logo"
                      inline-desc='建议尺寸100*100'>
                    <div slot="value">
                        <div v-if="this.vcard.logo != ''"
                             @click="submitImage('vcard')"
                             class="vcard-logo">
                            {{{ vcard.logo | media }}}
                        </div>
                        <div v-else class="weui_uploader_input_wrp" style="margin: 0">
                            <button class="weui_uploader_input"
                                    @click="submitImage('vcard')">
                            </button>
                        </div>
                    </div>
                </cell>
            </group>

            <group title="">
                <x-input title="微信号"
                         :max="20"
                         name="wechat"
                         :value.sync="vcard.wechat"
                         placeholder="请输入微信号"
                         type="text"
                         v-ref:wechat
                ></x-input>
                <x-input title="手机号码"
                         name="mobile"
                         placeholder="请输入手机号码"
                         keyboard="number"
                         is-type="china-mobile"
                         :value.sync="vcard.mobile"
                         v-ref:mobile
                ></x-input>
                <x-input title="电子邮箱"
                         :max="30"
                         name="email"
                         is-type="email"
                         placeholder="请输入邮箱地址"
                         :value.sync="vcard.email"
                         v-ref:email
                ></x-input>
                <!--<address :title="addressText"
                         :value.sync="address"
                         :list="addressData"
                         placeholder="请选择地址"></address>-->
                <x-input title="工作地址"
                         :max="50"
                         name="adr"
                         :value.sync="vcard.adr"
                         placeholder="请填写详细地址"
                         v-ref:adr
                ></x-input>
            </group>
        </div>
    </section>


    <footer class="footer vcard-button-footer">
        <flexbox>
            <flexbox-item>
                <x-button type='primary'
                          @click="updateMemberVcardEntry()"
                          class="size26 vcard-button">
                    保存
                </x-button>
            </flexbox-item>
        </flexbox>
    </footer>

    <x-upload   :show.sync="showUpload"
                :width="item.width"
                :height ='item.height'
                :upload-img-id.sync="item.id"
                :uin="item.uin"
                owner="users"
                :type="item.type"
                :xupload-url.sync="xuploadMediaUrl"></x-upload>

</div>
