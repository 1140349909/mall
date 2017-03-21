<div class="page page-sub">
    <section class="content">
        <envelope
                v-if='isfaceValue'
                :state.sync='state'
                :receive-type='isReceiveType'
                :is-logined='isLogined'
                :coupon-info='couponInfo'
                :face-value='faceValue'
                :err-code="errCode"
                :res-type="resType"
                :id="couponId || integralId"
                :receive-loading.sync="receiveLoading"
                @on-receive='onReceive'>
            </envelope>
    </section>
</div>