<div class="page page-member-address" :class="classAddressAdd">
    <section class="content">
        <address-item
            v-show="list.length > 0"
            v-for="item in list"
            :checked="item.often"
            :item="item"
            @on-edit="onEdit"
            @on-delete="onDelete"
            @on-set-address="onSetAddress"
            @on-link="onLink">
        </address-item>
        <x-result  v-show="list.length == 0 && !addressAddShow" icon="icon-address"  center-show="x-result-centered">你还没有收货地址 </x-result>
    </section>

    <address-add
        :form-data="formData"
        :show.sync="addressAddShow"
        @on-save="onSave"></address-add>
</div>
