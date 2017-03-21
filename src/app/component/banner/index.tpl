<swipe class="swipe" v-show="list.length > 0">
  <swipe-item class="slide" v-for="item in list">
      <a :href="item.url"><img :src="item.img"></a>
  </swipe-item>
</swipe>