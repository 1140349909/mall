import {
    GET_COUPON_CASH_SUCCESS,
    GET_COUPON_RECEIVE_SUCCESS,
    GET_COUPON_RECEIVE_PENDING,
    GET_COUPON_LIST_INVALID_SUCCESS,
    GET_COUPON_LIST_USED_SUCCESS,
    GET_COUPON_LIST_SUCCESS,
    GET_COUPON_LIST_FAILURE,
    GET_COUPON_LIST_USED_FAILURE,
    GET_COUPON_LIST_INVALID_FAILURE,
    GET_COUPON_RECEIVE_FAILURE,
    GET_AVAILABLE_COUPON_LIST_SUCCESS,
    GET_COUPON_INFO_SUCCESS,
    GET_COUPON_INFO_PENDING,
    GET_COUPON_INFO_FAILURE,
} from './action';

const state = {

    // 核销总金额
    cash: 0,

    // 优惠券列表
    list: [],

    // 失效列表
    invalidList: [],

    // 已使用列表
    usedList: [],

    // 可用的优惠券count
    availableCount: 0,

    // 订单可用的优惠券列表
    availableList: [],

    // 优惠券的信息
    couponInfo: null,

    // 领取返回
    receive: {},

    errCode: 0,

    status: 'init',
};

const mutations = {


    // 优惠券核销总金额
    [GET_COUPON_CASH_SUCCESS](state, {payload}){
        state.cash = payload.data;
    },

    // 领取优惠券
    [GET_COUPON_RECEIVE_SUCCESS](state, {payload}){
        state.receive = payload.data;
        state.errCode = payload.errCode;
        state.status = 'receive';
    },

    // 领取优惠券PENDING
    [GET_COUPON_RECEIVE_PENDING](state){
        state.status = 'pending';
        state.errCode = null;
    },

    // 领取优惠失败
    [GET_COUPON_RECEIVE_FAILURE](state, {payload}){
        state.receive = payload.data;
        state.errCode = payload.errCode;
        state.status = 'receiveErr';
    },

    // 优惠券信息
    [GET_COUPON_INFO_SUCCESS](state, {payload}){
        state.couponInfo = payload.data;
        state.status = 'couponInfo';
    },

    // 优惠券信息PENDING
    [GET_COUPON_INFO_PENDING](state){
        state.status = 'pending';
    },

    // 优惠券信息FAILURE
    [GET_COUPON_INFO_FAILURE](state){
        state.couponInfo = null;
        state.status = 'errCouponInfo';
    },

    // 己失效的优惠券列表FAILURE
    [GET_COUPON_LIST_INVALID_FAILURE](state){
        state.status = 'failure';
    },

    // 己失效的优惠券列表
    [GET_COUPON_LIST_INVALID_SUCCESS](state, {payload}){
        state.invalidList = payload.data;
    },

    // 己使用的优惠券列表
    [GET_COUPON_LIST_USED_SUCCESS](state, {payload}){
        state.usedList = payload.data;
    },

    // 己使用的优惠券列表FAILUR
    [GET_COUPON_LIST_USED_FAILURE](state){
        state.status = 'failure';
    },

    // 优惠券列表
    [GET_COUPON_LIST_SUCCESS](state, {payload}){
        state.list = payload.data;

    },

    // 优惠券列表PENDING
    [GET_COUPON_LIST_FAILURE](state){
        state.status = 'failure';
    },


    // 可用优惠券列表
    [GET_AVAILABLE_COUPON_LIST_SUCCESS](state, {payload, meta}){
        let list = payload.data.content;
        const order = meta.order;
        let availableCount = 0;
        let trueList = [],
            falseList = [];

        // 优惠券的可用判断
        for (var i = 0; i < list.length; i++) {
            let give = list[i].rule.give;
            let faceValue = list[i].faceValue;
            let newDate = new Date();
            // 开始时间
            let startDate = list[i].startDate;
            // 结束时间
            // let endDate = list[i].endDate;
            // 是否可用
            let available;
            // 红包类型
            let couponType = list[i].actValue !== 0 ? 'quota' : 'discount';

            // 满购买钱数
            if (order.money < give.charge.min && give.charge.enable) {
                available = false;

                // 面值大于钱数
            } else if (faceValue >= order.money) {
                available = false;
                // 在有效期内
            } else if (newDate <= startDate) {
                available = false;
            } else {
                //没有适用限制的优惠卡,就都可用
                available = true;
            }

            if (available) {
                availableCount++;
                trueList.push(list[i]);
            } else {
                falseList.push(list[i]);
            }

            list[i].available = available;
            list[i].couponType = couponType;
        }

        payload.data.content = trueList.concat(falseList);

        state.availableCount = availableCount;
        state.availableList = payload.data;
    }
};

export default {
    state,
    mutations
};
