import Vue from 'vue';
import './index.less';
import VueImg from '../vue-img';
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        VueImg
    },
    data(){
        return {
            img: __uri('./img/about.png')
        }
    }
});
