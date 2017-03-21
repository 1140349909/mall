<div class="container">
    <x-button @click="showActionSheet" type="primary" mini plain>分享测试</x-button>

    <!--<x-button @clic
    k="uploadTest" type="primary" mini plain  id="uploadBtn">上传测试</x-button>-->

    <x-button @click="testLkUpload" type="primary" mini plain  id="uploadBtn">LKUload Test</x-button>

    <vue-img :src="newImg" style="width:100%"/>

    <x-button @click="testXupload" type="primary" mini plain   >x-upload Test</x-button>
    <x-upload    :show.sync="showUpload"   width="200"  :upload-img-url.sync="mediaId"  :uin="dev" owner="users"  type="vcard"></x-upload>
    <vue-img :src="mediaUrl"/>
</div>


