import {
    GET_WECHAT_TICKET_SUCCESS,
    GET_WECHAT_TICKET_FAILURE
} from './action';

const state = {
    ticket: {
        debug: false
    }
};

const mutations = {
    [GET_WECHAT_TICKET_SUCCESS](state, {payload}){
        state.ticket = payload.data;
    },
    [GET_WECHAT_TICKET_FAILURE](state){
        state.ticket = {};
    }
};
export default {
    state,
    mutations
};
