import Vue from 'vue';
import './index.less';
import { updateOpinion, getContent} from '../../store/content/action';

import store from '../../store';
import {
    Group,
    Cell,
    XInput,
    XTextarea,
    XButton,
} from 'vux';

export default Vue.extend({
    template: __inline('./index.tpl'),
    store,

    data: function () {
        return {
            id: '',
            form: {
                name: '',
                content: '',
            },
            load: false,
        };
    },

    components: {
        Group,
        Cell,
        XInput,
        XTextarea,
        XButton,
    },

    vuex: {
        getters: {
            info: ({member}) => member.info.data,
            item: ({content}) => content.content.data,
            opinionStatus: ({content}) => content.opinion.status,
            opinionErrText: ({content}) => content.opinion.errText,
            isLogined: ({member}) => member.isLogined,
        },
        actions: {
            updateOpinion,
            getContent,
        }
    },

    methods: {

        // 提交留言
        submit() {
            if (!this.isLogined) {
                if (this.form.name == '') {
                    this.$els.name.querySelector('input').focus();
                    this.$root.showToast({
                        content: '昵称不可为空'
                    });
                    return;
                }

                if (this.form.name.length >= 20) {
                    this.$els.name.querySelector('input').focus();
                    this.$root.showToast({
                        content: '昵称不可超过20个字符'
                    });
                    return;
                }
            } else {
                if (this.info.name) {
                    this.form.name = this.info.name;
                }
            }

            if (this.form.content == '') {
                this.$els.content.querySelector('textarea').focus();
                this.$root.showToast({
                    content: '留言内容不可为空',
                });
                return;
            }
            this.updateOpinion(this.id, 'content', this.form);
            this.$root.showLoading('提交留言中');
        },
    },

    watch: {

        // 提交留言状态返回
        opinionStatus(val){
            if (val == 'update') {
                this.$root.showToast({
                    type: 'success',
                    content: '留言成功'
                });
                this.$root.hideLoading();
                setTimeout(()=>{
                    this.$router.replace({
                        name: 'content-show',
                        params: {
                            id: this.id
                        },
                    });
                },1000);
            } else if (val == 'failure') {
                this.$root.hideLoading();
                this.$root.showToast({
                    content: this.opinionErrText,
                });
            }
        },

        // 咨迅数据
        item() {
            this.load = true;
            this.$root.hidePageLoading();
        }
    },

    created() {
        this.id = this.$route.query.id || '';
        this.$root.showTopBar();
        this.getContent(this.id);
        this.$root.showPageLoading();
    },
});
