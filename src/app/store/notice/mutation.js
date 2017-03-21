import {
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAILURE,
    GET_NOTIFICATION_PENDING,
} from './action';

const state = {
    item: null
};

const mutations = {
    [GET_NOTIFICATION_SUCCESS](state, {payload}){
        state.item = payload.data;
    },

    [GET_NOTIFICATION_PENDING](state){
        state.item = null;
    },

    [GET_NOTIFICATION_FAILURE](state){
        state.item = null;
    }
};
export default {
    state,
    mutations
};
