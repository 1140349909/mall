import Vue from 'vue';
import {Group, Cell, XButton, Flexbox, FlexboxItem} from 'vux';
import store from '../../store';
import {getTkerMemberProductDividend} from '../../store/tker/action';
import ProductStatus from '../../component/product-status';
import ProductLabel from '../../component/product-label';
import Unit from '../../component/unit';
import XResult from '../../component/x-result';
import config from '../../config';
import './index.less';
import '../tker/tker.less';

// 分销红利
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XButton,
        Flexbox,
        FlexboxItem,
        Group, Cell, ProductStatus, ProductLabel, Unit,
        XResult
    },
    props: {
        hotCount: {
            type: Number,
            default: config.HOT_LIMIT_COUNT
        }
    },
    store: store,
    vuex: {
        getters: {
            summary: ({tker})=>tker.summary,
            list: ({tker})=>tker.memberProductDividendList
        },
        actions: {
            getTkerMemberProductDividend: getTkerMemberProductDividend
        }
    },
    data: function () {
        return {};
    },
    created(){
        this.$root.showTopBar({
            backGo: 'tker'
        });
        this.getTkerMemberProductDividend();
    }
});
