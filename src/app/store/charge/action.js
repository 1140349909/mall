import * as apiMember from '../../api/member';

//会员充值
export const UPDATE_CHARGE = 'UPDATE_CHARGE';
export const UPDATE_CHARGE_SUCCESS = 'UPDATE_CHARGE_SUCCESS';
export const UPDATE_CHARGE_PENDING = 'UPDATE_CHARGE_PENDING';
export const UPDATE_CHARGE_FAILURE = 'UPDATE_CHARGE_FAILURE';

// 会员充值
export function memberCharge({dispatch}, params) {
    return dispatch({
        type: UPDATE_CHARGE,
        payload: apiMember.memberCharge(params)
    });
}
