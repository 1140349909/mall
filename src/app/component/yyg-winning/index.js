/**
 * @Author:      Cold
 * @DateTime:    2016-08-18 16:53:04
 */
import Vue from 'vue';
import './index.less';
export default Vue.extend({
    props: {
        list: Array,
    },
    data() {
        return {

            // 查看全部状态
            isLook: false,

            // 查看全部文案
            lookText:'查看全部 ▼',
        };
    },

    components: {},

    template: __inline('./index.tpl'),

    methods: {

        // 查看全部处理
        onLook(){

            this.isLook = !this.isLook;

            if (this.isLook) {
                this.lookText = '收起列表 ▲';
            } else {
                this.lookText = '查看全部 ▼';
            }
        }
    },

});
