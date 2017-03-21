import * as apiMember from '../../api/member';

// 获取员工通道详细信息
export const GET_MEMBER_EMPLOYEE_INFO_DETAIL = 'GET_MEMBER_EMPLOYEE_INFO_DETAIL';
export const GET_MEMBER_EMPLOYEE_INFO_DETAIL_SUCCESS = 'GET_MEMBER_EMPLOYEE_INFO_DETAIL_SUCCESS';
export const GET_MEMBER_EMPLOYEE_INFO_DETAIL_PENDING = 'GET_MEMBER_EMPLOYEE_INFO_DETAIL_PENDING';
export const GET_MEMBER_EMPLOYEE_INFO_DETAIL_FAILURE = 'GET_MEMBER_EMPLOYEE_INFO_DETAIL_FAILURE';

// 获取员工通道排行榜
export const GET_MEMBER_EMPLOYEE_INFO_TOP = 'GET_MEMBER_EMPLOYEE_INFO_TOP';
export const GET_MEMBER_EMPLOYEE_INFO_TOP_SUCCESS = 'GET_MEMBER_EMPLOYEE_INFO_TOP_SUCCESS';
export const GET_MEMBER_EMPLOYEE_INFO_TOP_PENDING = 'GET_MEMBER_EMPLOYEE_INFO_TOP_PENDING';
export const GET_MEMBER_EMPLOYEE_INFO_TOP_FAILURE = 'GET_MEMBER_EMPLOYEE_INFO_TOP_FAILURE';

export const GET_MEMBER_EXCITATION = 'GET_MEMBER_EXCITATION';
export const GET_MEMBER_EXCITATION_SUCCESS = 'GET_MEMBER_EXCITATION_SUCCESS';


// 获取员工通道详细信息
export function getMemberEmployeeInfoDetail({dispatch}, params) {
    return dispatch({
        type: GET_MEMBER_EMPLOYEE_INFO_DETAIL,
        payload: apiMember.getMemberEmployeeInfoDetail(params)
    });
}

// 获取员工通道排行榜
export function getMemberEmployeeInfoTop({dispatch}, params) {
    return dispatch({
        type: GET_MEMBER_EMPLOYEE_INFO_TOP,
        payload: apiMember.getMemberEmployeeInfoTop(params)
    });
}

// 获取激励
export function getMemberexcitation({dispatch}) {
    return dispatch({
        type: GET_MEMBER_EXCITATION,
        payload: apiMember.getMemberexcitation()
    });
}
