import Vue from 'vue';
import {Dialog, Group, Cell, Flexbox, FlexboxItem, XButton} from 'vux';
import store from '../../store';
import {getContentPraise} from '../../store/content/action';
import Tips from '../tips';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Dialog,
        Group,
        Cell,
        Flexbox,
        FlexboxItem,
        XButton,
        Tips
    },
    store,
    props: {
        item: {
            type: Object,
            default: {}
        },
        // 添加判断预览用参数
        preview: {
            type: Boolean,
            default: false
        },
    },

    data: function () {

        return {
            //提示不允许频繁点赞
            show: false,
            disabled: false,
            //支付对话框
            dialogShow: false,
        };
    },
    vuex: {
        getters: {
            numberPraise: ({content}) => content.content.data.opdata && content.content.data.opdata.praise ? content.content.data.opdata.praise : 0,
            //ptips：次数，tips:总钱数，utips：人数
            numberAward: ({content}) => content.content.data.opdata && content.content.data.opdata.ptips ? content.content.data.opdata.ptips : 0,
            praise: ({content})=>content.praise.status
        },

        actions: {
            getContentPraise: getContentPraise
        }
    },

    methods: {
        getContentPraiseEntry: function () {

            if (!this.preview) {
                if (!this.disabled) {
                    this.getContentPraise(this.item.id);
                } else {
                    // this.show = true;
                }
            }


        },
        showContentAward: function () {
            if (!this.preview) {
                this.dialogShow = true;
            }
        }
    },

    computed: {
        hasPraise(){
            return this.item.actions.enablePraise;
        },

        hasAward(){
            return this.item.actions.enableTips;
        }
    },

    watch: {
        'praise': function (val) {
            // 今天已经点过赞啦！
            switch (val) {
                case 'success':
                    // this.item.opdata.praise += 1;
                    /*this.disabled = true;
                    let storage = window.localStorage;
                    storage.disabled = 'true';*/
                    break;
                case 'failure':
                    this.$root.showToast({
                        content: '今天已经点过赞啦！'
                    });
                    break;
                case 'unknown':
                    this.$root.showToast({
                        content: '今天已经点过赞啦！'
                    });
                    break;
            }
        }
    },

    created(){
    },
    ready(){
        /*let storage = window.localStorage;

        if (storage.disabled == 'true') {
            this.disabled = true;
        }*/
    }
});
