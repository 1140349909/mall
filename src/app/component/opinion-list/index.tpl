<div class="opinion-list">
<div class="opinion-list-post opinion-list-pdr10" v-if="list.length == 0">
        <span v-link="{name: 'content-post', query:{id: $route.params.id}}">写留言<i class="iconfont icon-leavingamessage" ></i></span>
    </div>
    <div class="opinion-list-box" v-if="list.length !== 0">
        <div class="opinion-list-title">
            <div class="opinion-list-lline"></div>
                精选留言
            <div class="opinion-list-rline"></div>
        </div>
        <div class="opinion-list-post">
            <span v-link="{name: 'content-post', query:{id: $route.params.id}}">写留言<i class="iconfont icon-leavingamessage" ></i></span>
        </div>
        <opinion-item v-for="item in list" :item="item"></opinion-item>
    </div>

</div>

