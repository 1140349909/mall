import Vue from 'vue';
import './index.less';
import {
    XNumber,
    Group,
    Cell,
    Switch,
} from 'vux';

export default Vue.extend({
    props: {
        type: String,

        integral: Number,
        price: Number,
        limit: Number,
        max: Number,
        amount: Number,

        // 已有积分
        mintegral: Number,

        // 兑换积分比 eintegral = 1元
        eintegral: '',

        payshow: '',

        // 所打折钱数
        touse: Number,

        recieved: Number,
    },

    data: function () {
        return {
            isSwitch: '',
            userVal: 0,
        };
    },

    components: {
        XNumber,
        Group,
        Cell,
        Switch,
    },

    computed: {},

    template: __inline('./index.tpl'),
    methods: {
        handlerAmount(val) {
            this.amount = val;
            this.switchChange();
        },

        switchChange(val) {

            if (val !== undefined) {
                this.isSwitch = val;
            }

            if (this.isSwitch) {
                var use = parseInt(this.mintegral / this.eintegral) * this.amount;

                if (use >= parseInt(this.price / 100) * this.amount) {
                    this.userVal = parseInt(this.price / 100) * this.eintegral * this.amount;
                    this.touse = parseInt(this.price / 100) * this.amount;
                    this.payshow = false;
                } else {
                    this.userVal = use * this.eintegral * this.amount;
                    this.touse = use;
                    this.payshow = true;
                }

            } else {
                this.touse = 0;
                this.payshow = true;
            }

            this.$dispatch('is-switch', val);
        },
    },
});
