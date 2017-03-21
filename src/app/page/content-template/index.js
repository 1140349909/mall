import Vue from 'vue';
import {Flexbox, FlexboxItem} from 'vux';
import './index.less';
import * as wechat from 'common/lk-wechat';
import store from '../../store';
import {getContentPreview} from '../../store/content/action';
import {getIlokaContentUrl} from '../../util/url';

export default Vue.extend({
    template: __inline('./index.tpl'),
    store,
    components: {
        Flexbox,
        FlexboxItem
    },
    data: function () {
        return {
            channel: this.$route.params.channel,
        };
    },
    vuex: {
        getters: {
            uin: ({vsite}) => vsite.uin,
            item: ({content}) => content.content.data,
        },
        actions: {
            getContentPreview,
            getIlokaContentUrl
        }
    },

    methods: {
        onLink(item){
            if (item.resType == 'h5') {
                location.href = getIlokaContentUrl({
                    id: item.resId,
                    uin: this.uin,
                });
            } else {
                this.$router.go({
                    name: 'content-preview',
                    params: {
                        id: item.id,
                        uin: this.uin,
                    }
                });
            }
        }
    },

    watch: {
        item(){
            this.$root.hidePageLoading();
        }
        /*item(val) {
         if (!val) return;
         this.$parent.setTitle(val.title);
         this.$root.hidePageLoading();
         //抽离处理函数(目前支持视频处理)
         contentParse(this.$els.content);
         }*/
    },

    created() {

        let channel = this.$route.params.channel;
        let id = this.$route.params.id;
        // 返回资讯列表
        this.$root.showTopBar({backGo: 'content'});

        if (channel && id) {
            this.getContentPreview(id);
            this.$root.showPageLoading();
            wechat.init();
        }
        // console.log(channel,id);
        /*this.getContentPreview(this.$route.params.id);
         this.$root.showPageLoading();
         wechat.init();*/
    },
});
