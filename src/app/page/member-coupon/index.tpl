<div class="page page-member-coupon">
    <section class="content">
        <div class="member-coupon-fixed" :class="classWechat">
            <div class="member-coupon-hd">
                <div class="member-coupon-hd-l">
                    <div class="member-coupon-p">
                        已节省
                    </div>
                    <div class="member-coupon-cash">
                        <span class="">￥</span>
                        <span class="member-coupon-cashvalue">{{cash | moneyFormat '' -1}}</span>
                    </div>
                </div>
                 <div class="member-coupon-hd-r">
                    <div class="member-coupon-p" v-link="{name: 'service-show',params:{id:'coupon'}}">
                        <i class="iconfont icon-info"></i>
                        <span class="member-coupon-info">优惠券说明</span>
                    </div>
                </div>
             </div>
            <div class="member-coupon-tab">
                <tab active-color="#E84027" default-color="#b5b5b6">
                  <tab-item :selected="tabIndex === 'notused'" @click="tabIndex='notused'">未使用</tab-item>
                  <tab-item :selected="tabIndex === 'used'" @click="tabIndex='use'">已使用</tab-item>
                  <tab-item :selected="tabIndex === 'invalid'" @click="tabIndex='invalid'">已失效</tab-item>
                </tab>
            </div>
        </div>
        <div class="member-coupon-box">
            <coupon-item
                v-show="list.content.length > 0"
                v-for="item in list.content"
                :type="tabIndex == 'use' ? item.couponStatus : tabIndex"
                :item="item"></coupon-item>
            <x-result   v-if="list.content.length == 0"   icon="icon-coupon"  position="vertical">{{notDataText}} </x-result>
        </div>
    </section>
    <footer v-if="vsiteSettings.mall" class="footer">
        <div class="page-actions page-actions-fix">
            <x-button @click="goUse" type="primary">去使用</x-button>
        </div>
    </footer>
</div>


