<div class="page page-employee-show">
    <div class="content">
        <div class="employee-show">
            <div class="employee-show-table">
                <div class="employee-show-cell">
                    <div class="employee-show-img">
                        {{{user.headImg | media '' 'avatar1'}}}
                    </div>
                </div>
                <div class="employee-show-cell">
                    <em class="employee-show-name">{{user.name}}</em>
                    <em class="employee-show-number">工号：<i>{{user.jobNo}}</i></em>
                </div>
            </div>
            <vue-img :src="src | qrcodeSrc" class="employee-show-qrcode">
            <p class="employee-show-desc">扫一扫查看惊喜，好朋友当然要一起分享</p>
        </div>
    </div>
</div>
