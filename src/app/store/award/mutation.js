import {
    UPDATE_YYG_AWARD_INFO_SUCCESS,
    UPDATE_YYG_AWARD_INFO_PENDING,
    UPDATE_YYG_AWARD_INFO_FAILURE
} from './action';

const state = {
    award: {
        status: '',
        result: {},
        params: {}
    }
};

const mutations = {

    [UPDATE_YYG_AWARD_INFO_SUCCESS](state, {payload}){

        if (payload.errCode == 0) {
            state.award.status = 'success';
        } else {
            state.award.status = 'unknown';
        }
    },

    [UPDATE_YYG_AWARD_INFO_PENDING](state){
        state.award.status = 'pending';
    },

    [UPDATE_YYG_AWARD_INFO_FAILURE](state){
        state.award.status = 'failure';
    }
};
export default {
    state,
    mutations
};

