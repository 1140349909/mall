import * as apiBanner from '../../api/banner';

export const GET_BANNER_BUY = 'GET_BANNER_BUY';
export const GET_BANNER_BUY_SUCCESS = 'GET_BANNER_BUY_SUCCESS';
export const GET_BANNER_BUY_PENDING = 'GET_BANNER_BUY_PENDING';
export const GET_BANNER_BUY_FAILURE = 'GET_BANNER_BUY_FAILURE';

// 获取商城广告条
export function getBannerBuy({dispatch}, buyType) {
    return dispatch({
        type: GET_BANNER_BUY,
        payload: apiBanner.getBannerBuy(buyType)
    });
}
