<div class="yyg-product-stat">
    <div class="yyg-product-stat-info">
        <progress :percent.sync="percent"></progress>
        <div class="yyg-product-stat-nums">
            <em class="yyg-product-stat-credit">{{creditText}} <i>{{credit | numberFormat}}</i></em>
            <em class="yyg-product-stat-surplus">{{surplusText}} <i>{{surplus | numberFormat}}</i></em>
        </div>
    </div>
    <div class="yyg-product-stat-numOfOwners" v-if="!hideNumOfOwners">
        <p class="yyg-product-stat-h2">开奖数</p>
        <p class="yyg-product-stat-number" :class="{'yyg-product-stat-min': numOfOwners >= 10 }">{{numOfOwners}}</p>
        <div class="yyg-product-stat-triangle"></div>
    </div>
</div>



