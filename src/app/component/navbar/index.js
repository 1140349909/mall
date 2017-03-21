import Vue from 'vue';
import './index.less';
import store from '../../store';
import {vsiteSettings} from '../../store/getters';

export default Vue.extend({
    template: __inline('./index.tpl'),
    store,
    vuex: {
        getters: {
            vsiteSettings
        }
    }
});
