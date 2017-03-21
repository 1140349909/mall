<div class="page page-sub">
    <section class="content">
        <div class="product-wrap" v-if="list.length>0">
            <ul class="product-list product-list-tker-mall">
                <li class="product-item"
                    v-for="item in list" data-id="{{item.id}}">
                    <div class="product-item-i">
                        <figure class="product-item-figure" v-link="{name:'product-show',params:{id:item.id}}">
                            {{{item.mediaRes.coverImgId | media}}}
                        </figure>
                        <h6 class="product-item-name" v-link="{name:'product-show',params:{id:item.id}}">{{item.name}}</h6>

                        <!--v-if-->
                        <div class="product-item-sp"></div>
                        <!--佣金-->
                        <div class="product-item-filed">
                            <span class="product-item-primary">最高酬劳{{item.tkerProfit.lv0 | moneyFormat '￥'}}</span>
                        </div>

                        <!--售价+已售-->
                        <div class="product-item-filed">
                            <div class="product-item-filed-l">
                                <span class="product-item-default">售价{{item.mallCfg.price | moneyFormat '￥'}}</span>
                            </div>
                            <div class="product-item-filed-r">
                                <span class="product-item-default">已售 {{item.creditRecieved}}</span>
                            </div>
                        </div>

                        <div class="product-item-actions">
                            <x-button type="primary" plain :disabled="item.tked" @click="addTkerProduct(item)">{{item.tked ? '已代言':'我要代言'}}</x-button>
                        </div>
                        <product-status :status="item.creditRecieved>=hotCount ? 'selling':''"></product-status>
                        <product-status :status="item.creditRecieved>=item.mallCfg.stock ? 'soldout':''"></product-status>
                    </div>
                </li>
            </ul>
        </div>
        <x-result  v-else   icon="icon-norecord" position="vertical">暂无商家货源 </x-result>
    </section>
    <footer class="footer">
        <div class="page-actions page-actions-fix">
            <x-button type="primary" v-link="{name:'tker-mine'}">
                <span>我的代言商城</span>
            </x-button>
        </div>
    </footer>
</div>
