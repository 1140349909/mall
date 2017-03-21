<div class="yyg-winning">
    <div class="winning-item"
         v-for="(index, item) in list"
         v-show="index < 1 || isLook">

        <div class="winning-item-name">获奖者:{{item.mobile}}</div>
        <div class="winning-item-code">中奖编号:{{item.ticket}}</div>
        <div class="winning-item-number">投币数:{{item.credit}}</div>
    </div>
    <div class="winning-item-look" v-if="list.length >= 2">
        <span class="winning-item-look-number">获奖人数（{{list.length}}人）</span>
        <span class="winning-item-look-all" @click="onLook">{{lookText}}</span>
    </div>
</div>
