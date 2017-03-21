<div class="page page-trade-show">
    <section class="content">
        <div class="weui_panel weui_panel_access">
            <div class="weui_panel_bd">
                <div class="weui_media_box weui_media_appmsg">
                    <div class="weui_media_hd tr-fixed">
                        {{{coverImgId | media 'tr_media_appmsg_thumb'}}}
                    </div>
                    <div class="weui_media_bd">
                        <h4 class="weui_media_title tr-text"><span v-text="tradeStatus"></span></h4>
                        <div class="tr-mt30">
                            <p class="weui_media_desc">快递公司：<span v-text="logistic.vendor"></span></p>
                            <p class="weui_media_desc">运单编号：<span v-text="logistic.code"></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
