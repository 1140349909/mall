import {
    GET_MEMBER_EMPLOYEE_INFO_DETAIL_SUCCESS,
    GET_MEMBER_EMPLOYEE_INFO_DETAIL_PENDING,
    GET_MEMBER_EMPLOYEE_INFO_TOP_SUCCESS,
    GET_MEMBER_EMPLOYEE_INFO_TOP_PENDING,
    GET_MEMBER_EXCITATION_SUCCESS
} from './action';

const state = {
    users: {
        jobNo: '',
        name: '',
        store: {
            name: '',
        }
    },
    tkerData: {
        members: 0,
        memberSeq: 3,
        credit: 0,
        creditSeq: 1
    },
    status: '',
    list: [],
    tkerUrl: '',
    excitation: '',
};

const mutations = {

    [GET_MEMBER_EMPLOYEE_INFO_DETAIL_SUCCESS](state, {payload}){
        const data = payload.data;
        state.users = data;
        if (payload.data.tkerData) {
            state.tkerData = data.tkerData;
        }
        state.status = 'detail';
    },

    [GET_MEMBER_EMPLOYEE_INFO_DETAIL_PENDING](state){
        state.status = 'pending';
    },

    // [UPDATE_TKER_SUCCESS](state, {payload}){
    //     const data = payload.data;
    //     state.status = 'tker';
    //     state.tkerUrl = data;
    // },

    [GET_MEMBER_EMPLOYEE_INFO_TOP_SUCCESS](state, {payload}){
        const data = payload.data;
        state.status = 'top';
        state.list = data;
    },

    [GET_MEMBER_EMPLOYEE_INFO_TOP_PENDING](state){
        state.status = 'pending';
    },

    [GET_MEMBER_EXCITATION_SUCCESS](state, {payload}){
        state.excitation = payload.data.content;
        state.status = 'pending';
    },

};
export default {
    state,
    mutations
};

