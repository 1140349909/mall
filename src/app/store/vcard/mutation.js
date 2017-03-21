import {
    GET_MEMBER_VCARD_PENDING,
    GET_MEMBER_VCARD_SUCCESS,
    UPDATE_MEMBER_VCARD_PENDING,
    UPDATE_MEMBER_VCARD_SUCCESS,
    UPDATE_MEMBER_VCARD_FAILURE,
    GET_MEMBER_VCARD_BY_ID_PENDING,
    GET_MEMBER_VCARD_BY_ID_SUCCESS,
} from './action';

const state = {

    vcard: {
        qrcode: {},
        params: {},
        result: {},
        status: ''
    }

};

const mutations = {

    // 获取微名片
    [GET_MEMBER_VCARD_SUCCESS](state, {payload}){

        function isEmptyObject(obj) {
            for (var key in obj) {
                return false;
            }
            return true;
        }

        if (isEmptyObject(payload.data)) {
            state.vcard.result = {};
            state.vcard.status = 'getMemberVcardFailure';
        } else {
            state.vcard.result = payload.data;
            state.vcard.status = 'getMemberVcardSuccess';

        }
    },

    // 获取微名片进行中
    [GET_MEMBER_VCARD_PENDING](state){

        state.vcard.status = 'getMemberVcardPending';
    },

    // 获取微名片
    [GET_MEMBER_VCARD_BY_ID_SUCCESS](state, {payload}){

        if (payload.data) {
            state.vcard.result = payload.data;
            state.vcard.status = 'getMemberVcardByIdSuccess';
        } else {
            state.vcard.result = {};
            state.vcard.status = 'getMemberVcardByIdFailure';
        }
    },

    // 获取微名片进行中
    [GET_MEMBER_VCARD_BY_ID_PENDING](state){

        state.vcard.status = 'getMemberVcardByIdPending';
    },

    // 更新微名片
    [UPDATE_MEMBER_VCARD_SUCCESS](state){
        state.vcard.status = 'success';
    },

    // 更新微名片进行中
    [UPDATE_MEMBER_VCARD_PENDING](state){
        state.vcard.status = 'pending';
    },

    // 更新微名片失败
    [UPDATE_MEMBER_VCARD_FAILURE](state){
        state.vcard.status = 'failure';
    }


};

export default {
    state,
    mutations
};
