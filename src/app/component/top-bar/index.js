/**
 * @Author:      Cold
 * @DateTime:    2016-10-10 15:01:37
 */

import Vue from 'vue';
import './index.less';
import _ from 'lodash';
export default Vue.extend ({
    template: __inline ('./index.tpl'),

    props: {

        // 返回文本
        backText: {
            type: String,
            default: '返回',
        },

        // 当前页面标题
        curText: String,

        // 返回
        backGo: {}
    },

    methods: {
        onPress(){
            if (this.backGo) {
                if (_.isObject(this.backGo)) {
                    this.$router.go(this.backGo);
                } else {
                    this.$router.go({
                        name: this.backGo
                    });
                }
            } else {
                window.history.go(-1);
            }
        },
    },
});
