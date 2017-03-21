import * as apiMember from '../../api/member';

export const UPDATE_YYG_AWARD_INFO = 'UPDATE_YYG_AWARD_INFO';
export const UPDATE_YYG_AWARD_INFO_SUCCESS = 'UPDATE_YYG_AWARD_INFO_SUCCESS';
export const UPDATE_YYG_AWARD_INFO_PENDING = 'UPDATE_YYG_AWARD_INFO_PENDING';
export const UPDATE_YYG_AWARD_INFO_FAILURE = 'UPDATE_YYG_AWARD_INFO_FAILURE';

export function updateYYGAwardInfo({dispatch}, params) {
    return dispatch({
        type: UPDATE_YYG_AWARD_INFO,
        payload: apiMember.updateYYGAwardInfo(params)
    });
}
