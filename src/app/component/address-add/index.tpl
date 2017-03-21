<div class="address-add">
    <div class="address-add-form" v-show="show">
        <group>
           <x-input
                text-align="right"
                title="收货人姓名:"
                :show-clear="false"
                :value.sync="formData.name"
                placeholder="请输入姓名"></x-input>

            <x-input
                text-align="right"
                title="收货人联系电话"
                type="number"
                :show-clear="false"
                :value.sync="formData.mobile"
                placeholder="收货人联系电话"></x-input>

            <address
                title="收货地址"
                :value.sync="addressValue"
                :list="addressData"></address>

            <x-textarea
                :min="5"
                :max="30"
                placeholder="请输入详细地址"
                :value.sync="formData.street"></x-textarea>
        </group>

        <group v-show="isAdd">
           <switch title="设为默认地址" :value.sync="formData.often"></switch>
        </group>

    </div>
    <div class="address-add-btns">
        <div class="address-add-wrap">
            <x-button v-show="show" @click="onSave" type="primary">保存地址</x-button>
            <x-button v-show="!show" @click="onShow" type="primary">添加地址</x-button>
        </div>
    </div>
</div>
