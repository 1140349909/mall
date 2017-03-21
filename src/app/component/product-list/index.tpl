<div class="product-wrap">
    <ul class="product-list">
        <li class="product-item"
            :class="name"
            v-for="item in list" data-id="{{item.id}}">
            <div class="product-item-i">
                <figure class="product-item-figure" v-link="{name:'product-show',params:{id:item.id},query:query}">
                    {{{item.mediaRes.coverImgId | media}}}
                </figure>
                <h6 class="product-item-name"
                    v-link="{name:'product-show',params:{id:item.id},query:query}">{{item.name}}</h6>

                <div class="product-item-integral">
                    <div class="product-item-labels">
                        <product-label :mall-cfg="item.mallCfg"></product-label>
                    </div>
                    <div class="product-item-money">
                        <product-price :mall-cfg="item.mallCfg"></product-price>
                    </div>
                </div>

                <div class="product-item-filed">
                    <div class="product-item-filed-l">
                        <span class="product-item-default">已售 {{item.creditRecieved}}</span>
                    </div>
                    <div v-if="canShare && item.distribution" class="product-item-filed-r">
                        <i @click="share(item)" class="product-item-share iconfont icon-share"></i>
                    </div>
                </div>
                <product-status :status="item.creditRecieved>=hotCount ? 'selling':''"></product-status>
                <product-status :status="item.creditRecieved>=item.mallCfg.stock ? 'soldout':''"></product-status>
            </div>
        </li>
    </ul>
    <distribution
        v-if="canShare"
        :show.sync="isShowDistribution"
        :item="distributionItem"
        title="我为品牌代言"
        desc="给梦想一个机会，万一实现了呢！">
    </distribution>
</div>
