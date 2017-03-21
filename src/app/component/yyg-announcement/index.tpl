<div class="yyg-announcement" v-if="data.content.length>0">
    <swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
        <swiper-item v-for="item in data.content">
            <p><i class="iconfont icon-trumpet"></i>恭喜<strong> {{item.nickname}} </strong>获得
                <strong>{{item.productName}}</strong>
            </p>
        </swiper-item>
    </swiper>
</div>
