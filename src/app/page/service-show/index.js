import Vue from 'vue';
import './index.less';
export default Vue.extend({
    template: __inline('./index.tpl'),
    data(){
        return {
            id: ''
        };
    },
    created(){
        this.id = this.$route.params.id;
        this.$root.showTopBar({
            backGo: 'service'
        });
    }
});
