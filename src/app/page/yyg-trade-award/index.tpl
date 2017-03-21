<div class="page page-order">
    <section class="content">
        <div class="issue">
            <div class="issue-content">
                <figure class="issue-figure">
                    {{{item.coverImgId | media}}}
                </figure>
                <div class="issue-aside">
                    <h6 class="issue-name"><span class="label label-primary">第{{item.issueNo}}期</span> {{item.name}}
                    </h6>
                    <div class="issue-detail">
                        <p>中奖编号:{{item.ticket}}</p>
                        <p>参与次数:{{item.number}}</p>
                        <p>揭晓日期:{{item.date | dateFormat}}</p>
                    </div>
                </div>
            </div>
        </div>

        <!--选择收货地址-->
        <div class="weui_cells weui_cells_access">
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>选择收货地址</p>
                </div>
            </div>
            <a class="weui_cell"
               href="javascript:;"
               v-link="{name:'member-address', query:{ type:'yyg', issueId: issueId, id: id}}">
                <div class="weui_cell_bd weui_cell_primary size12">
                    <p>
                        <span>联系人：</span>
                        <span v-text="currentAddress.name"></span>
                        <span>
                            联系电话：
                            <span v-text="currentAddress.mobile"></span>
                        </span>
                    </p>
                    <br>
                    <p>
                        <span>收货地址：</span>
                        <span v-text="currentAddress.prov"></span>
                        <span v-text="currentAddress.city"></span>
                        <span v-text="currentAddress.region"></span>
                        <span v-text="currentAddress.street"></span>
                    </p>
                </div>
                <div class="weui_cell_ft">

                </div>
            </a>
        </div>
    </section>

    <footer class="footer award-footer"
            style="border-top: 1px solid #BBBBBC;
            background: white;
            padding: 10px 0;">
        <!--单独的按钮-->
        <div class="button_sp_area ">
            <a href="javascript:;"
               class="weui_btn weui_btn_warn award-ms50"
               style="margin: 0 50px"
               @click="submitAward()">提交领奖</a>
        </div>
    </footer>
</div>
