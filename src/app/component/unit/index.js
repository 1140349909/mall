import Vue from 'vue';
import './index.less';
import moneyFormat from 'common/filter/moneyFormat';
//<unit type="money" value="18063"></unit>
//<unit value="180" unit="个"></unit>
export default Vue.extend({
    template: __inline('./index.tpl'),
    props: {
        // 类型
        type: {
            type: String,
            default: 'common' // common | money
        },
        // 单位
        unit: {
            type: String,
            default: '￥'
        },
        // 值
        value: null
    },
    computed: {
        text(){
            if (this.type == 'money') {
                let value = moneyFormat(this.value).split('.');
                return {
                    content: value[0],
                    suffix: '.' + value[1]
                };
            } else {
                return {
                    content: isNaN(this.value) ? 0 : this.value,
                    suffix: ''
                };
            }
        }
    }
});
