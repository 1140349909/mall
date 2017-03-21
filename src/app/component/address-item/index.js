/**
 * @Author:      Cold
 * @DateTime:    2016-08-19 17:45:50
 */

import Vue from 'vue';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    data() {
        return {};
    },

    props: {

        // 地址项
        item: Object,

        // 默认地址
        checked: Boolean,
    },

    computed: {},

    methods: {

        // 选中当前地址项
        onLink() {
            this.$emit('on-link', this.item.id);
        },

        // 显示编辑地址显示层
        onEdit() {
            this.$emit('on-edit', this.item.id);
        },

        // 删除地址
        onDelete() {
            let tempThis = this;
            this.$root.confirm({
                title: '温馨提醒',
                content: '是否确认删除地址',
                onOk: function () {
                    tempThis.$emit('on-delete', tempThis.item.id);
                },
                onCancel: function () {
                }
            });
        },

        // 设置默认地址
        onSetAddress() {
            this.$emit('on-set-address', this.item.id);
        },
    }

});
