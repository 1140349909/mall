<dialog :show.sync="show" class="dialog-canvas">

    <div class="vcard-dialog-top" @click="show=false">
        <span class="vux-close"></span>
    </div>
    <!--如果引用了html2canvas的话，直接渲染整个div即可-->
    <div id="canvas" class="vcard-canvas">

    </div>
</dialog>
