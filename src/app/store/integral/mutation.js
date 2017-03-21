import {
    GET_INTEGRAL_RECEIVE_SUCCESS,
    GET_INTEGRAL_RECEIVE_PENDING,
    GET_INTEGRAL_FACEVALUE_SUCCESS,
    GET_INTEGRAL_RECEIVE_FAILURE,
    GET_INTEGRAL_FACEVALUE_PENDING,
    GET_INTEGRAL_FACEVALUE_FAILURE,
} from './action';

const state = {

    // 领取返回
    receive: {},

    // 积分值
    faceValue: 0,

    status: '',

    errCode: 0,
};

const mutations = {


    // 领取积分
    [GET_INTEGRAL_RECEIVE_SUCCESS](state, {payload}){
        state.receive = payload.data;
        state.errCode = payload.errCode;
        state.status = 'receive';
    },

    // 领取积分PENDING
    [GET_INTEGRAL_RECEIVE_PENDING](state){
        state.status = 'pending';
        state.errCode = null;
    },

    // 领取积分失败
    [GET_INTEGRAL_RECEIVE_FAILURE](state, {payload}){
        state.receive = payload.data;
        state.errCode = payload.errCode;
        state.status = 'receiveErr';
    },

    // 获取积分值
    [GET_INTEGRAL_FACEVALUE_SUCCESS](state, {payload}){
        state.faceValue = payload.data;
    },

    // 领取积分FAILURE
    [GET_INTEGRAL_FACEVALUE_FAILURE](state){
        state.status = 'errfaceValue';
    },

    // 获取积分值PENDING
    [GET_INTEGRAL_FACEVALUE_PENDING](state){
        state.status = 'pending';
    },


};

export default {
    state,
    mutations
};
