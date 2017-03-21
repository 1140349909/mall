<div class="page page-service">
    <section class="content">
        <group>
            <cell title="系统消息" :link="{name:'service-show',params:{id:'info'}}"></cell>
            <cell title="帮助中心" :link="{name:'service-show',params:{id:'help'}}"></cell>
            <cell title="用户协议" :link="{name:'service-show',params:{id:'agreement'}}"></cell>
            <cell title="关于我们" :link="{name:'service-show',params:{id:'about'}}"></cell>
        </group>
        <div v-if="isShowLogout" style="margin: 30px;">
            <x-button @click="logout()" type="primary">退出</x-button>
        </div>
    </section>
</div>
