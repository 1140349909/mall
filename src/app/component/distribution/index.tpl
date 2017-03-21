<dialog :show.sync="show" class="dialog-demo">

    <div class="product-dialog-top" @click="show=false">
        <span class="vux-close"></span>
    </div>

    <!--如果引用了html2canvas的话，直接渲染整个div即可-->
    <div id="canvas" class="product-distribution"></div>
    <div class="product-distribution-button" id="product-share" style="display: none">
        <div class="product-distribution-button-style"
        @click="showShareMask()">
            直接分享
        </div>
    </div>
</dialog>
