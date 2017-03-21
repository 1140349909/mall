<div class="page page-employee-rank">
    <section class="content">
        <div class="employee-rank">
            <div class="employee-rank-box">
            <div class="employee-rank-summary">
                <div class="employee-rank-summary-label">
                    <i class="iconfont icon-user"></i>
                    <p class="employee-rank-summary-tiem">截至 {{myDate}}</p>
                    <p class="employee-rank-summary-mp"><em>{{data.tkerData.members | isUndefined}}</em>&nbsp;人</p>
                    <p class="employee-rank-summary-p">扩展人数</p>
                </div>

                 <div class="employee-rank-summary-label2">
                    <i class="iconfont icon-ranking"></i>
                    <p class="employee-rank-summary-em">{{data.tkerData.memberSeq | isUndefined}}</p>
                    <p class="employee-rank-summary-p">名次</p>
                </div>

                <div class="employee-rank-summary-label3">
                    <i class="iconfont icon-share"></i>
                    <p class="employee-rank-summary-em">{{data.avg | isUndefined}}</p>
                    <p class="employee-rank-summary-p">平均</p>
                </div>
            </div>
            <div class="employee-rank-tabs">
                <tab active-color='#e84028'>
                  <tab-item :selected="topType === 'all'" @click="topType = 'all'">所有员工</tab-item>
                  <tab-item :selected="topType === 'store'" @click="topType = 'store'">门店员工</tab-item>
                </tab>
                <div class="employee-rank-item employee-rank-itemfixed">
                     <span class="employee-rank-item-numfixed">{{data.tkerData.memberSeq | isUndefined}}</span>
                    <div class="employee-rank-item-headimg">
                        {{{data.headImg | media '' 'avatar1'}}}
                    </div>
                    <em class="employee-rank-item-name">{{data.name}}</em>
                    <em class="employee-rank-item-company">{{data.store.name}}&nbsp;</em>
                    <div class="employee-rank-item-sum">
                        <em class="employee-rank-item-count">{{data.tkerData.members | isUndefined}}人</em>
                    </div>
                </div>
            </div>
            </div>
            <div class="employee-rank-scroller">
            <scroller lock-x :scrollbar-y=false v-ref:scroller height="-200px">
            <div class="employee-rank-tabs-scroll">
                    <div v-if="topType === 'all'">
                        <div class="employee-rank-tabs-content">
                                <div class="employee-rank-list">
                                    <div class="employee-rank-item" v-for='(index, item) in lists'>
                                        <span class="employee-rank-item-num">{{index + 1}}</span>
                                        <div class="employee-rank-item-headimg">
                                            {{{item.headImg | media '' 'avatar1'}}}
                                        </div>
                                        <em class="employee-rank-item-name">{{item.name}}</em>
                                        <em class="employee-rank-item-company">{{item.store.name}}</em>
                                        <div class="employee-rank-item-sum">
                                            <em class="employee-rank-item-count">{{item.opdata.tkerData.members | isUndefined}}人</em>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div v-else>
                        <div class="employee-rank-tabs-content">
                            <div class="employee-rank-list">
                                 <div class="employee-rank-item" v-for='(index, item) in lists'>
                                    <span class="employee-rank-item-num">{{index + 1}}</span>
                                     <div class="employee-rank-item-headimg">
                                         {{{item.headImg | media '' 'avatar1'}}}
                                    </div>
                                    <em class="employee-rank-item-name">{{item.name}}</em>
                                    <em class="employee-rank-item-company">{{item.store.name}}</em>
                                    <div class="employee-rank-item-sum">
                                        <em class="employee-rank-item-count">{{item.opdata.tkerData.members | isUndefined}}人</em>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </scroller>
            </div>
    </section>
</div>
