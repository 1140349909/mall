<div class="page page-sub">
    <section class="content">
        <div class="hb-mcCon">
            <card v-if="isLogined" :data='card' :info='info'></card>
            <div v-else class="hb-needLogin">
                <a class="hb-loginBtn" v-link="{name:'passport'}">登录</a>
            </div>
        </div>

        <member-asset v-if="isLogined" :money="asset.money" :coupons="asset.coupons"
                      :integral="asset.integral"></member-asset>
        <group>
            <cell  v-if="vsiteSettings.mall" title="商城订单" :link="{name:'trade'}" is-link>
                <div slot="icon" class="page-sub-iconfont">
                    <i class='iconfont icon-mystore'></i>
                </div>
            </cell>
            <cell v-if="vsiteSettings.yyg" title="一元购记录" :link="{name:'yyg-trade'}" is-link>
                <div slot="icon" class="page-sub-iconfont">
                    <i class='iconfont icon-oneyuan1'></i>
                </div>
            </cell>
        </group>
        <group>
            <cell title="个人信息" :link="{name:'member-setting'}" is-link>
                <div slot="icon" class="page-sub-iconfont">
                    <i class='iconfont icon-personalinfo'></i>
                </div>
            </cell>

            <cell title="我的代言" v-if="tkerConfigured" @click="goTker()" is-link>
                <div slot="icon" class="page-sub-iconfont">
                    <i class='iconfont icon-mysale'></i>
                </div>
            </cell>

            <cell title="我的名片" :link="{name:'member-vcard'}" is-link>
                <div slot="icon" class="page-sub-iconfont">
                    <i class='iconfont icon-businesscard'></i>
                </div>
            </cell>
        </group>
        <group>
            <cell title="地址管理" :link="{name:'member-address'}" is-link>
                <div slot="icon" class="page-sub-iconfont">
                    <i class='iconfont icon-address'></i>
                </div>
            </cell>
            <cell v-if="vsiteSettings.uin && vsiteSettings.uin=='uniqueway'" title="我要咨询"
                  link="http://www.uniqueway.com/contact_us?utm_source=苏州代理&utm_medium=返佣/代理&utm_campaign=日常&referral_type=offline">
                <div slot="icon" class="page-sub-iconfont">
                    <i class='iconfont icon-staff'></i>
                </div>
            </cell>
            <cell v-if="vsiteSettings.uin!='uniqueway'" title="系统设置" :link="{name:'service'}" is-link>
                <div slot="icon" class="page-sub-iconfont">
                    <i class='iconfont icon-settings'></i>
                </div>
            </cell>
        </group>
    </section>
    <footer class="footer">
        <navbar></navbar>
    </footer>
</div>
