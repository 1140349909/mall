import Vue from 'vue';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {},
    props: {
        mallCfg: Object,
        className: String
    },

    computed: {
        calculateClass(){
            return 'product-price ' + (this.className || '');
        }
    }
});
