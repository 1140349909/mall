import Vue from 'vue';
import TkerInfo from '../../component/tker-info';
import './index.less';
// 如何分销
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        TkerInfo
    },
    created(){
        this.$root.showTopBar({
            backGo: 'tker'
        });
    }
});
