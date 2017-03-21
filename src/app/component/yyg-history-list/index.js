/**
 * @Author:      Cold
 * @DateTime:    2016-08-18 15:33:33
 */

import Vue from 'vue';
import { XButton } from 'vux';
import './index.less';
import YygWinning from '../yyg-winning';

export default Vue.extend({
    props: {
        list: Array
    },
    components: {
        XButton,
        YygWinning,
    },
    template: __inline('./index.tpl'),
    methods: {

    },

});
