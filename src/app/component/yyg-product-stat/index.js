import Vue from 'vue';
import { Progress } from 'vux';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Progress
    },
    props: {
        mini: {
            type: Boolean,
            default: false
        },
        hideNumOfOwners: {
            type: Boolean,
            default: false
        },
        percent: Number,
        credit: Number,
        surplus: Number,
        numOfOwners: Number
    },
    computed: {
        creditText(){
            return this.mini ? '总' : '总需次数';
        },
        surplusText(){
            return this.mini ? '余' : '剩余次数';
        }
    }
});
