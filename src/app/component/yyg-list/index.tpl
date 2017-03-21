<div class="yyg-list">
    <div class="yyg-list-i">
        <div class="yyg-item" v-for="item in list" data-id="{{item.id}}">
            <div v-link="{name:'yyg-product-show',params:{id:item.id}}"
                 class="yyg-item-figure">{{{item.mediaRes.coverImgId | media}}}</div>
            <h4 v-link="{name:'yyg-product-show',params:{id:item.id}}" class="yyg-item-name">{{item.name}}</h4>
            <yyg-product-stat :percent="item.percent"
                          :credit="item.yygCfg.credit"
                          :surplus="item.yygCfg.credit-item.creditRecieved"
                          :num-of-owners="item.yygCfg.numOfOwners" mini hide></yyg-product-stat>
            <div class="yyg-item-actions">
                <x-button type="primary"
                          :disabled="item.yygCfg.credit == item.creditRecieved"
                          @click="purchase(item)">马上参与</x-button>
            </div>
        </div>
    </div>
</div>
