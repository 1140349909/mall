import {
    UPDATE_CHARGE_SUCCESS,
    UPDATE_CHARGE_PENDING,
    UPDATE_CHARGE_FAILURE
} from './action';

const state = {
    charge: {
        status: '',
        result: {},
        url:'',
        params: {}
    }
};

const mutations = {

    [UPDATE_CHARGE_SUCCESS](state, {payload}){

        if (payload.data) {
            state.charge.status = 'success';

            state.charge.result = payload.data;

            /*if(payload.params.payType == 'alipay'){
                state.charge.url = payload.data;
            }else{
                state.charge.result = payload.data;
            }*/


        } else {
            state.charge.status = 'unknown';
        }
    },

    [UPDATE_CHARGE_PENDING](state){
        state.charge.status = 'pending';
    },

    [UPDATE_CHARGE_FAILURE](state){
        state.charge.status = 'failure';
    }
};
export default {
    state,
    mutations
};

