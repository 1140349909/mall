import Vue from 'vue';
import './index.less';
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {},
    ready(){
        this.$root.goHome();
    }
});

