import Vue from 'vue';
import sticky from './sticky';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    ready () {
        sticky(this.$el);
    }
});