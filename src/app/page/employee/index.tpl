<div class="page">
    <section class="content">
        <div class="employee-main">
            <div class="employee-main-header">
                <div class="employee-main-figure">
                    {{{user.logo | media '' 'avatar1'}}}
                </div>
                <div class="employee-main-profile">
                    <em class="employee-main-company">{{user.store.name}}</em>
                    <em class="employee-main-name">{{user.name}}</em>
                    <em class="employee-main-gonghao">工号：<i class="employee-main-num">{{user.jobNo}}</i></em>
                </div>
                <div class="employee-main-ewm" v-link="{name:'employee-show'}">
                    <vue-img :src="img"/>
                    <p>查看员工二维码</p>
                </div>
            </div>
            <div class="employee-main-content">
                <a v-link="{name:'employee-rank-member'}">
                    <div class="employee-main-icon">
                        <i class="iconfont icon-user"></i>
                    </div>
                    <div class="employee-main-info">
                        <span class="employee-main-desc">累积扩展用户人数</span>
                        <span class="employee-main-count"><em>{{tkerData.members}}</em>人</span>
                        <span class="employee-main-pdy">
                            <span v-if="tkerData.memberSeq == 1">简直了！你就是冠军</span>
                            <span v-if="tkerData.memberSeq == 2">你已经是亚军了</span>
                            <span v-if="tkerData.memberSeq == 3">你已经是季军了</span>
                            <span v-if="tkerData.memberSeq > 3">离冠军还有{{tkerData.memberSeq - 1}}位店员</span>
                        </span>
                    </div>
                </a>
                <a v-link="{name:'employee-rank-consumption'}">
                    <div class="employee-main-icon">
                        <i class="iconfont icon-coins"></i>
                    </div>
                    <div class="employee-main-info">
                        <span class="employee-main-desc">累积扩展用户消费币数</span>
                        <span class="employee-main-count"><em>{{tkerData.credit}}</em>币</span>
                        <span class="employee-main-pdy">
                            <span v-if="tkerData.creditSeq == 1">简直了！你就是冠军</span>
                            <span v-if="tkerData.creditSeq == 2">你已经是亚军了</span>
                            <span v-if="tkerData.creditSeq == 3">你已经是季军了</span>
                            <span v-if="tkerData.creditSeq > 3">离冠军还有{{tkerData.creditSeq - 1}}位店员</span>
                        </span>
                    </div>
                </a>
            </div>
            <group>
                <cell title="员工激励规则" class="employee-main-jl" :link="{name:'employee-rule'}">
                    <div class="employee-main-icon">
                        <i class="iconfont icon-rules"></i>
                    </div>
                </cell>
            </group>
        </div>
    </section>
</div>
