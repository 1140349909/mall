<div class="page page-order-coupon">
    <section class="content">
        <coupon-item
                v-if="list.content.length > 0"
                v-show="!loading"
                v-for="item in list.content"
                :type="item.available ? 'selected':'disabled'"
                :selected="selectedItem && item.id==selectedItem.pid"
                @click="selectCoupon(item)"
                :item="item"></coupon-item>
        <x-result v-if="list.content.length < 0" icon="icon-coupon" position="vertical">你还没有可用优惠券 </x-result>
    </section>
    <footer class="footer">
        <div class="page-actions page-actions-fix">
            <x-button @click="selectCoupon(null)">
                不使用优惠券
            </x-button>
        </div>
    </footer>
</div>
