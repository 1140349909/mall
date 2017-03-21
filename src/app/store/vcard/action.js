import * as apiMember from '../../api/member';
import * as apiCommon from '../../api/common';

// 获取微名片
export const GET_MEMBER_VCARD = 'GET_MEMBER_VCARD';
export const GET_MEMBER_VCARD_PENDING = 'GET_MEMBER_VCARD_PENDING';
export const GET_MEMBER_VCARD_SUCCESS = 'GET_MEMBER_VCARD_SUCCESS';
export const GET_MEMBER_VCARD_FAILURE = 'GET_MEMBER_VCARD_FAILURE';
// 新建/修改微名片
export const UPDATE_MEMBER_VCARD = 'UPDATE_MEMBER_VCARD';
export const UPDATE_MEMBER_VCARD_PENDING = 'UPDATE_MEMBER_VCARD_PENDING';
export const UPDATE_MEMBER_VCARD_SUCCESS = 'UPDATE_MEMBER_VCARD_SUCCESS';
export const UPDATE_MEMBER_VCARD_FAILURE = 'UPDATE_MEMBER_VCARD_FAILURE';
// 获取指定会员的微名片
export const GET_MEMBER_VCARD_BY_ID = 'GET_MEMBER_VCARD_BY_ID';
export const GET_MEMBER_VCARD_BY_ID_PENDING = 'GET_MEMBER_VCARD_BY_ID_PENDING';
export const GET_MEMBER_VCARD_BY_ID_SUCCESS = 'GET_MEMBER_VCARD_BY_ID_SUCCESS';
export const GET_MEMBER_VCARD_BY_ID_FAILURE = 'GET_MEMBER_VCARD_BY_ID_FAILURE';

// 获取微名片
export function getMemberVcard({dispatch}) {
    return dispatch({
        type: GET_MEMBER_VCARD,
        payload: apiMember.getMemberVcard()
    });
}

// 新建/修改微名片
export function updateMemberVcard({dispatch}, data) {
    return dispatch({
        type: UPDATE_MEMBER_VCARD,
        payload: apiMember.updateMemberVcard(data)
    });
}

// 获取微名片
export function getMemberVcardById({dispatch}, id) {
    return dispatch({
        type: GET_MEMBER_VCARD_BY_ID,
        payload: apiCommon.getMemberVcardById(id)
    });
}
