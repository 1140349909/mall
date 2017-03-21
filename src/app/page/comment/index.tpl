<div class="page">
    <!--<header class="header">

    </header>-->
    <section class="content">

        <div class="weui_panel">
            <div class="weui_panel_bd">
                <div class="weui_media_box weui_media_appmsg">
                    <div class="weui_media_hd comment-media-box">
                        {{{item.coverImgId | media 'weui_media_appmsg_thumb'}}}
                    </div>
                    <div class="weui_media_bd comment-height">
                        <!--第12121期-->
                        <div class="comment-media-title">
                            <span>第</span>
                            <span v-text="item.issueNo"></span>
                            <span>期</span>
                        </div>
                        <h4 class="weui_media_title" style="font-weight: bold">
                            <!--产品名称-->
                            <span v-text="item.name"></span>
                        </h4>
                        <div class="comment-mt20">
                            <p class="weui_media_desc" v-show="item.ticket">
                                <span>中奖编号：</span><span v-text="item.ticket"></span>
                            </p>
                            <p class="weui_media_desc">
                                <span>参与次数：</span><span v-text="item.number"></span>
                            </p>
                            <p class="weui_media_desc">
                                <span>揭晓时间：</span><span v-text="item.date | dateFormat"></span>
                            </p>
                        </div>

                    </div>
                    </a>
                </div>
                <div class="weui_panel_ft">
                    <x-textarea :max="100"
                                :value.sync="submitData.content"
                                :rows="4"
                                :cols="30"></x-textarea>
                </div>
            </div>

            <div class="weui_cell_warn" style="background: #f7f7f8;">
                <div class="weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">
                        <div class="weui_uploader">
                            <div class="weui_uploader_bd">
                                <ul class="weui_uploader_files">
                                    <template v-for="image in submitData.imgIds" track-by="$index">
                                        <li class="weui_uploader_file">
                                            {{{image | media 'comment-inherit'}}}
                                        </li>
                                    </template>
                                </ul>
                                <div class="weui_uploader_input_wrp" v-show="submitData.imgIds.length<6">
                                    <button class="weui_uploader_input" @click="submitImages()"></button>
                                </div>
                                <div class="weui_uploader_file" v-show="submitData.imgIds.length<5" style="text-align: center">
                                    <i class="iconfont size64 icon-photo"></i>
                                    <p class="comment-mtm15">最多添加6张</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
    <footer class="footer comment-footer">
        <!--单独的按钮-->
        <div class="button_sp_area">
            <a href="javascript:;"
               class="weui_btn weui_btn_warn comment-ms100"
               @click="submitShowData()">确定</a>
        </div>
    </footer>
    <x-upload   :show.sync="showUpload"
                width ="200"
                height ='100'
                :upload-img-id.sync=""
                :uin="vsite.uin"
                owner="wechat"
                type="show"
                :xupload-url.sync="xuploadMediaUrl"></x-upload>
</div>
