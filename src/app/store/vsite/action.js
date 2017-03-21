import * as apiVSite from '../../api/vsite';

// 获取当前商城信息
export const GET_VSITE_INFO = 'GET_VSITE_INFO';
export const GET_VSITE_INFO_PENDING = 'GET_VSITE_INFO_PENDING';
export const GET_VSITE_INFO_SUCCESS = 'GET_VSITE_INFO_SUCCESS';
export const GET_VSITE_INFO_FAILURE = 'GET_VSITE_INFO_FAILURE';

// 商城信息
export function getVSiteInfo({dispatch}, uin, channel) {
    return dispatch({
        type: GET_VSITE_INFO,
        payload: apiVSite.getVSiteInfo(uin, channel)
    });
}
