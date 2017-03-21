import Vue from 'vue';
import { XButton } from 'vux';
import './index.less';

// 在整张页面中组织插画、图标、文字等内容，向用户反馈操作结果。
/*
 http://mobile.ant.design/components/result/#components-result-demo-success
 支付成功 -- 0
 验证成功  --1
 支付失败  --2
 等待处理  --3
 操作失败  --4
 断线   --5
 其他自定义样式

 // 全局业务错误提示

 // 空数据提示统一
 */
export default Vue.extend ({
    template: __inline ('./index.tpl'),
    components: {
        XButton
    },
    props: {
        // 提示icon地址
        icon: String,
        // 提示标题
        title: String,
        //是否水平垂直居中显示
        //vertical(垂直居中) horizontal(水平居中)
        position: {
            type: String,
            default: 'horizontal'
        },
        //按钮样式 \ 文本 \ 事件
        buttonText: '',
        buttonType: ''
    }
});
