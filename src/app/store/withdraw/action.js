import * as apiWithdraw from '../../api/withdraw';

export const GET_MEMBER_WITHDRAW_LIST = 'GET_MEMBER_WITHDRAW_LIST';
export const GET_MEMBER_WITHDRAW_LIST_PENDING = 'GET_MEMBER_WITHDRAW_LIST_PENDING';
export const GET_MEMBER_WITHDRAW_LIST_SUCCESS = 'GET_MEMBER_WITHDRAW_LIST_SUCCESS';
export const GET_MEMBER_WITHDRAW_LIST_FAILURE = 'GET_MEMBER_WITHDRAW_LIST_FAILURE';

/*平台现金*/

export const UPDATE_MANAGER_WITHDRAW = 'UPDATE_MANAGER_WITHDRAW';
export const UPDATE_MANAGER_WITHDRAW_PENDING = 'UPDATE_MANAGER_WITHDRAW_PENDING';
export const UPDATE_MANAGER_WITHDRAW_SUCCESS = 'UPDATE_MANAGER_WITHDRAW_SUCCESS';
export const UPDATE_MANAGER_WITHDRAW_FAILURE = 'UPDATE_MANAGER_WITHDRAW_FAILURE';

// 返回当前会员提现列表
export function getMemberWithdrawList({dispatch}, params) {
    return dispatch({
        type: GET_MEMBER_WITHDRAW_LIST,
        payload: apiWithdraw.getMemberWithdrawList(params)
    });
}


// 提供会员提现自己的现金服务
export function updateManagerWithdraw({dispatch}, data) {
    return dispatch({
        type: UPDATE_MANAGER_WITHDRAW,
        payload: apiWithdraw.updateManagerWithdraw(data)
    });
}
