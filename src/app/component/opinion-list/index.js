import Vue from 'vue';
import { Spinner } from 'vux';
import './index.less';
import OpinionItem from '../opinion-item';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        OpinionItem,
        Spinner,
    },
    props: {
        list: Array,
    },

    methods: {
    },

    computed: {
    },

    created(){
        // console.log('list', this.list);
    }
});
