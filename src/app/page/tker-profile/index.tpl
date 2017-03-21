<div class="page">
    <section class="content">
        <div class="user-profile">
            <header class="user-profile-header">
                <h3 class="user-profile-title">代言专属二维码</h3>
            </header>
            <div class="user-profile-content">
                <div class="user-profile-info">
                    <figure class="user-profile-figure">
                        {{{info.headImg | media}}}
                    </figure>
                    {{info.name | nickname}}
                </div>
                <div class="user-profile-code">
                    <vue-img :src="qrcode"/>
                </div>
            </div>
            <div class="user-profile-footer">
                让好友扫一扫，加入我的代言团
            </div>
        </div>
    </section>
</div>
