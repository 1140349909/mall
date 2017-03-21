<div class="container">
    <div class="img-container" v-show="isShowResetBtn">
        <img :src="mediaUrl" alt="Picture" id="image">
    </div>

    <div class="img-upload-container" v-show="!isShowResetBtn" @click="uploadImg">
        <div class="weui_uploader_input_wrp upload-text">
        </div>
    </div>
    <div class="pic-handle-btns">
        <div class="pic-handle-wrap">
            <flexbox>
                <flexbox-item v-show="isShowResetBtn">
                    <x-button plain @click="onReset">重置</x-button>
                </flexbox-item>
                <flexbox-item>
                    <x-button type="primary" @click="uploadImg">上传图片</x-button>
                </flexbox-item>
                <flexbox-item>
                    <x-button type="warn" @click="onSave" :disabled="!isShowResetBtn">保存</x-button>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</div>

