<div class="page content-template">
    <section class="">
        <div id="vsite" v-show="channel == 'vsite'">
            <div class="content-template-vsite-banner">
                <img src="./img/banner.png" alt="">
            </div>
            <div class="content-template-vsite-list" @click="onLink(item)">
                <div class="content-template-vsite-list-left">
                    {{{item.vsite.imgId | media 'content-template-vsite-img' 'upload'}}}
                </div>
                <div class="content-template-vsite-list-right">
                    <div class="content-template-vsite-list-title">
                        <span v-text="item.vsite.title?item.vsite.title:'标题未设置'"></span>
                    </div>
                    <div class="content-template-vsite-list-digest">
                        <span v-text="item.vsite.desc?item.vsite.desc:'摘要未设置'"></span>
                    </div>
                    <div class="content-template-vsite-list-other">
                        <span>{{{item.createdDate | dateFormat}}}</span>
                        <span style="float: right">
                            <i class="iconfont icon-pv"></i>
                            <span v-text="item.opdata?item.opdata.pv:'0'"></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="content-template-vsite-footer">
                <flexbox>
                    <flexbox-item>
                        <div class="content-template-vsite-flexitem">
                            <i class="iconfont icon icon-store"></i>
                            <p class="">爆款</p>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="content-template-vsite-flexitem">
                            <div class="">
                                <i class="iconfont icon icon-oneyuan"></i>
                            </div>
                            <p class="">一元购</p>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="content-template-vsite-flexitem" style="color: #FF5858;">
                            <div class="">
                                <i class="iconfont icon icon-content"></i>
                            </div>
                            <p class="">热点</p>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="content-template-vsite-flexitem">
                            <div class="">
                                <i class="iconfont icon icon-me"></i>
                            </div>
                            <p class="">我</p>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div id="wx" v-show="channel == 'wx'" class="content-template-wx">
            <div class="content-template-wx-body" @click="onLink(item)">
                <div class="content-template-wx-title">
                    <span v-text="item.wx.title?item.wx.title:'标题未设置'"></span>
                </div>
                <div class="content-template-wx-date">
                    {{{item.createdDate | dateFormat 'MM月dd日'}}}
                </div>
                <div class="content-template-wx-img">
                    {{{item.wx.imgId | media 'content-template-vsite-img' 'upload'}}}
                </div>
                <div class="content-template-wx-digest">
                    <span v-text="item.wx.desc?item.wx.desc:'摘要未设置'"></span>
                </div>
                <div class="content-template-wx-read">
                    <div style="float: left">
                        <span>阅读全文</span>
                    </div>
                    <div style="float: right;color: #999999;">
                        <i class="iconfont icon-arrow"></i>
                    </div>
                </div>
            </div>
        </div>
        <div id="wb" v-show="channel == 'wb'" class="content-template-wb">
            <div class="content-template-wb-search">
                <div class="content-template-wb-search-icon">
                    <i class="iconfont icon-info-copy"></i>
                </div>
                <div class="content-template-wb-search-input">
                    <span>搜我的微博</span>
                </div>
            </div>
            <div class="content-template-wb-main">
                <div class="content-template-wb-banner">
                    <div class="content-template-wb-banner-left">
                        <i class="iconfont icon-diqiu"></i>
                        <span>公开</span>
                    </div>
                    <div class="content-template-wb-banner-right">
                        <i class="iconfont icon-weiboxiala"></i>
                    </div>
                </div>
                <hr class="content-template-wb-hr">
                <div class="content-template-wb-header">
                    <div class="content-template-wb-header-img">
                        <i class="iconfont icon-defaultavatar"></i>
                    </div>
                    <div class="content-template-wb-header-container">
                        <div class="content-template-wb-header-title">
                            <span>微博号名称</span>
                            <!--<span v-text="item.title"></span>-->
                        </div>
                        <div class="content-template-wb-header-other">
                            <span>刚刚</span>
                            <span>来自iphone</span>
                            <span>6s</span>
                        </div>
                    </div>
                    <div class="content-template-wb-header-read">
                        <span>阅读</span>
                        <span v-text="item.opdata?item.opdata.pv:'0'"></span>
                    </div>
                </div>
                <div class="content-template-wb-body">
                    <div class="content-template-wb-digest">
                        <span v-text="item.wb.desc?item.wb.desc:'摘要未设置'"></span>
                        <a @click="onLink(item)" style="color: #eb7350">#网页链接</a>
                    </div>
                    <div>
                        {{{item.wb.imgId | media 'content-template-vsite-img' 'upload'}}}
                    </div>
                </div>
                <hr class="content-template-wb-hr">
                <div class="content-template-wb-footer">
                    <flexbox>
                        <flexbox-item>
                            <div class="content-template-wb-flexitem">
                                <i class="iconfont icon icon-weibofenxiang"></i><span class="">转发</span>
                            </div>
                        </flexbox-item>
                        <flexbox-item>
                            <div class="content-template-wb-flexitem">
                                <i class="iconfont icon icon-weibopinglun"></i><span class="">评论</span>
                            </div>
                        </flexbox-item>
                        <flexbox-item>
                            <div class="content-template-wb-flexitem">
                                <i class="iconfont icon icon-zan"></i><span class="">赞</span>
                            </div>
                        </flexbox-item>
                    </flexbox>
                </div>
            </div>
        </div>
    </section>
</div>

