/**
 * @Author:      Cold
 * @DateTime:    2016-09-03 10:47:50
 */

import Vue from 'vue';
import {
    Spinner,
} from 'vux';
import './index.less';
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Spinner,
    },
    props: {
        // page-loading class定义
        addClass: String,
        // 加载图标，更多图标在以下链接
        // https://vuxjs.gitbooks.io/vux/content/message/spinner.html
        icon: {
            type: String,
            default: 'bubbles'
        },

        // 加载文案
        content: {
            type: String,
            default: '正在加载中...'
        }
    }
});
