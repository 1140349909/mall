<popup  height="100%" :show.sync="show"  style="z-index: 109;">
    <div class="x-upload">
        <div class="imgContainer">
            <div class="showImg" @click="uploadImg">
                <vue-img :src="mediaUrl" alt=""  id="image">
            </div>
            <p class="desc">拖动 ,缩放图片进行裁剪</p>
        </div>
        <div class="buttonsList">
            <x-button @click="uploadImg">选择图片</x-button>
            <x-button type="primary" @click="onSave" :disabled="!mediaUrl">保存</x-button>
            <x-button type="warn" @click="onReset">重置</x-button>
            <x-button type="warn" @click="onHidePopup">关闭</x-button>
        </div>
    </div>
</popup>
