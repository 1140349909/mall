import Vue from 'vue';
import Vuex from 'lk-vuex';
import promiseMiddleware from  'common/middleware/promiseMiddleware';
import operation from './operation/mutation';
import product from './product/mutation';
import trade from './trade/mutation';
import notice from './notice/mutation';
import member from './member/mutation';
import order from './order/mutation';
import charge from './charge/mutation';
import wechat from './wechat/mutation';
import vsite from './vsite/mutation';
import award from './award/mutation';
import employee from './employee/mutation';
import content from './content/mutation';
import coupon from './coupon/mutation';
import integral from './integral/mutation';
import banner from './banner/mutation';
import tker from './tker/mutation';
import vcard from './vcard/mutation';
import withdraw from './withdraw/mutation';
import distributeEntry from './distributeEntry/mutation';

Vue.use(Vuex);

Vue.config.warnExpressionErrors = false;

const middlewares = [promiseMiddleware({debug: Vue.config.debug})];

const store = new Vuex.Store({
    strict: true,
    //state,
    //mutations,
    middlewares,
    modules: {
        operation,
        member,
        product,
        trade,
        notice,
        order,
        charge,
        wechat,
        vsite,
        award,
        employee,
        content,
        coupon,
        integral,
        banner,
        vcard,
        tker,
        withdraw,
        distributeEntry,
    }
});

export default store;
