<div class="yyg-history-list">
    <div class="yyg-history-item" v-for="item in list">
        <div class="yyg-history-item-i">
            <div class="yyg-history-item-hd">
                <div class="yyg-history-item-l">
                    <div class="yyg-history-item-img">
                        {{{item.mediaRes.coverImgId | media }}}
                    </div>
                </div>
                <div class="yyg-history-item-r">
                    <div class="yyg-history-item-title">
                        <span class="yyg-history-item-label">第{{item.yygCfg.issueNo}}期</span>
                        {{item.name}}
                    </div>
                    <div class="yyg-history-item-date">
                      揭晓时间：{{item.lastModifiedDate | dateFormat 'yyyy-MM-dd hh:mm:ss'}}
                    </div>
                </div>
            </div>
            <yyg-winning :list="item.luckys"></yyg-winning>
        </div>
    </div>
</div>
