<div class="page content-post" v-show="load">
    <section class="content">
        <group :title="item.title">
            <x-input
                v-el:name
                v-show="!isLogined || !info.name"
                placeholder="输入昵称"
                :show-clear="false"
                text-align="left"
                :value.sync="form.name"
                 ></x-input>
            <x-textarea
                v-el:content
                :value.sync="form.content"
                :max="100"
                placeholder="输入留言（留言将有公众号筛选后显示)"></x-textarea>
        </group>
        <div class="content-post-submit">
            <x-button type="primary" @click="submit">提交</x-button>
        </div>
    </section>
</div>
