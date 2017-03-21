import {
    ADD_TO_CART,
    CLEAR_CART,
    PURCHASE_PENDING,
    PURCHASE_SUCCESS,
    PURCHASE_FAILURE,
    GET_TRADECALLBACK_PENDING,
    GET_TRADECALLBACK_SUCCESS,
    GET_TRADECALLBACK_FAILURE,
    GET_TRADE_AMOUNT_SUCCESS,
    GET_TRADE_AMOUNT_PENDING,
} from './action';

const state = {
    // 购物车
    cart: {

        // 商品id
        id: '',

        // 商品数量
        amount: 1,

        // 总价
        money: 0,

        // 积分
        integral: 0,

        // 优惠券
        userCoupon: null,

        // 红包类型
        couponType: '',
    },
    order: {
        status: '',
        errMsg: ''
    },

    payType: '',
    payInfo: {},       // 支付信息
    result: {
        status: '',      // 支付结果

        // 商品ID
        issueId: '',

        // 购买地址
        address: {},

        yygItem: {},
    },
    limit: null,
};

const mutations = {
    [ADD_TO_CART](state, {payload}){
        if (payload.replace) {
            state.cart = payload;
        } else {
            state.cart = {
                ...state.cart,
                ...payload
            };
        }
    },
    [CLEAR_CART](state){
        state.cart = {};
    },
    [PURCHASE_PENDING](state){
        state.order.status = 'pending';
    },
    [PURCHASE_SUCCESS](state, {payload}){
        state.order.status = 'success';
        state.payInfo = payload.data ? payload.data : payload.params.id;
        if (payload.params.yyg) {
            state.payType = payload.params.yyg.payType;
        } else if (payload.params.mall) {
            state.payType = payload.params.mall.payType;
        }
    },
    [PURCHASE_FAILURE](state, {payload}){
        state.order.status = 'failure';
        state.order.errMsg = payload.errMsg;
        // 49001
        if (payload.errCode == 40001) {
            location.hash = 'passport';
        }
    },
    [GET_TRADECALLBACK_PENDING](state){
        state.result.status = 'checking';
        state.result.item = null;
    },
    [GET_TRADECALLBACK_SUCCESS](state, {payload}){
        if (payload.data) {
            state.result.status = 'success';
            state.result.issueId = payload.data.issueId;
            state.result.address = payload.data.address;
            state.result.yygItem = payload.data;
        } else {
            state.result.status = 'unknown';
        }
    },
    [GET_TRADECALLBACK_FAILURE](state){
        state.result.status = 'failure';
    },

    [GET_TRADE_AMOUNT_SUCCESS](state, {payload}){
        state.limit = payload.data;
    },

    [GET_TRADE_AMOUNT_PENDING](state){
        state.limit = null;
    },
};
export default {
    state,
    mutations
};
