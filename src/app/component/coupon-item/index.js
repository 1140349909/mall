import Vue from 'vue';
import './index.less';
import {Icon} from 'vux';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Icon,
    },

    props: {

        // 类型
        // notused 未使用（默认）
        // use: 已使用
        // invalid: 已失效
        // cash: 已核销
        // selected: 开启选择状态（支付环节）
        // disabled: 禁用
        type: {
            type: String,
            default: 'notused',
        },

        // 渲染数据
        item: {
            type: Object,
            required: true,
        },

        // 选中状态
        selected: {
            type: Boolean,
            default: false,
        }
    },

    computed: {
        // 不同状态样式
        typeClass(){
            return {
                'coupon-item-used': this.type == 'use',
                'coupon-item-invalid': this.type == 'invalid',
                'coupon-item-disabled': this.type == 'disabled',
                'coupon-item-cash': this.type == 'cash',
            };
        },

        // 选中非选中状态的class
        radioType() {
            return this.selected ? 'success_circle' : 'circle';
        }

    },

    methods: {}
});
