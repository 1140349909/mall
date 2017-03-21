<div class="page page-member-setting">
    <section class="content" :style="{minHeight:minContentHeight+'px' }">
        <div class="member-setting-uploadgroup" @click="uploadImg">
            <div class="member-setting-uploadgroup-l">
                <div class="member-setting-img">
                    {{{form.headImg | media '' 'avatar1'}}}
                </div>
            </div>
            <div class="member-setting-uploadgroup-r">
                头像如此帅,怎能不晒
            </div>
        </div>
        <group>
            <div class="weui_cell">
                <div class="weui_cell_hd"><label class="weui_label">姓名</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input
                        class="weui_input"
                        type="text"
                        v-model="form.name"
                        placeholder="请输入姓名"
                        v-input-fix>
                </div>
            </div>

            <popup-picker title="性别" :data="sexList" :value.sync="sexValue"></popup-picker>

            <datetime
                :min-year=1945
                @change="datetimeChange"
                confirm-text="确认"
                cancel-text="取消"
                :value.sync="form.birthday"
                title="出生日期"
                :max-year="maxYear-1"
                year-row="{value}年"
                month-row="{value}月"
                day-row="{value}日"
                hour-row="{value}点"
                minute-row="{value}分"></datetime>
        </group>
    </section>
    <footer v-el:footer class="footer">
        <div class="page-actions page-actions-fix">
            <x-button type="primary" @click="submit">提交</x-button>
        </div>
    </footer>

    <x-upload   :show.sync="showUpload"
                width="200"
                height ='200'
                :upload-img-id.sync="item.headImg"
                :uin="vsite.uin"
                owner="users"
                type="headimg"
                :xupload-url.sync="xuploadMediaUrl"></x-upload>
</div>
