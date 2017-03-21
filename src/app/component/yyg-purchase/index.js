import Vue from 'vue';
import { Popup, XButton, XNumber, Checker, CheckerItem } from 'vux';
import './index.less';
export default Vue.extend({
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        data: Object,
        amount: {
            type: Number,
            default: 1
        },
        step: {
            type: Number,
            default: 1
        },
        max: Number,
    },
    components: {
        Popup,
        XButton,
        XNumber,
        Checker,
        CheckerItem
    },
    computed: {
        checkerData(){
            return [5, 10, 15, 20];
        }
    },
    template: __inline('./index.tpl'),
    watch: {
        value(){
            this.$emit('on-change');
        },
    },
    methods: {
        onClose(){
            this.isVisible = false;
            this.$emit('on-close');
        },
        onSubmit(){
            this.isVisible = false;
            this.$emit('on-submit', {
                id: this.data.id,
                amount: this.amount
            });
        }
    }
});
