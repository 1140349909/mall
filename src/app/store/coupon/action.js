import * as apiCoupon from '../../api/coupon';
// 优惠券核销总金额
export const GET_COUPON_CASH = 'GET_COUPON_CASH';
export const GET_COUPON_CASH_SUCCESS = 'GET_COUPON_CASH_SUCCESS';
export const GET_COUPON_CASH_PENDING = 'GET_COUPON_CASH_PENDING';
export const GET_COUPON_CASH_FAILURE = 'GET_COUPON_CASH_FAILURE';
// 己失效的优惠券列表
export const GET_COUPON_LIST_INVALID = 'GET_COUPON_LIST_INVALID';
export const GET_COUPON_LIST_INVALID_SUCCESS = 'GET_COUPON_LIST_INVALID_SUCCESS';
export const GET_COUPON_LIST_INVALID_FAILURE = 'GET_COUPON_LIST_INVALID_FAILURE';
// 己使用的优惠券列表
export const GET_COUPON_LIST_USED = 'GET_COUPON_LIST_USED';
export const GET_COUPON_LIST_USED_SUCCESS = 'GET_COUPON_LIST_USED_SUCCESS';
export const GET_COUPON_LIST_USED_FAILURE = 'GET_COUPON_LIST_USED_FAILURE';
// 优惠券列表
export const GET_COUPON_LIST = 'GET_COUPON_LIST';
export const GET_COUPON_LIST_SUCCESS = 'GET_COUPON_LIST_SUCCESS';
export const GET_COUPON_LIST_PENDING = 'GET_COUPON_LIST_PENDING';
export const GET_COUPON_LIST_FAILURE = 'GET_COUPON_LIST_FAILURE';
// 获取可用的优惠券列表
export const GET_AVAILABLE_COUPON_LIST = 'GET_AVAILABLE_COUPON_LIST';
export const GET_AVAILABLE_COUPON_LIST_SUCCESS = 'GET_AVAILABLE_COUPON_LIST_SUCCESS';
export const GET_AVAILABLE_COUPON_LIST_PENDING = 'GET_AVAILABLE_COUPON_LIST_PENDING';
// 获取优惠券信息
export const GET_COUPON_INFO = 'GET_COUPON_INFO';
export const GET_COUPON_INFO_SUCCESS = 'GET_COUPON_INFO_SUCCESS';
export const GET_COUPON_INFO_PENDING = 'GET_COUPON_INFO_PENDING';
export const GET_COUPON_INFO_FAILURE = 'GET_COUPON_INFO_FAILURE';
// 领取优惠券
export const GET_COUPON_RECEIVE = 'GET_COUPON_RECEIVE';
export const GET_COUPON_RECEIVE_SUCCESS = 'GET_COUPON_RECEIVE_SUCCESS';
export const GET_COUPON_RECEIVE_PENDING = 'GET_COUPON_RECEIVE_PENDING';
export const GET_COUPON_RECEIVE_FAILURE = 'GET_COUPON_RECEIVE_FAILURE';

// 优惠券核销总金额
export function getCouponCash({dispatch}) {
    return dispatch({
        type: GET_COUPON_CASH,
        payload: apiCoupon.getCouponCash()
    });
}

// 己失效的优惠券列表
export function getCouponListInvalid({dispatch}, para) {
    return dispatch({
        type: GET_COUPON_LIST_INVALID,
        payload: apiCoupon.getCouponListInvalid(para)
    });
}

// 己使用的优惠券列表
export function getCouponListUsed({dispatch}, para) {
    return dispatch({
        type: GET_COUPON_LIST_USED,
        payload: apiCoupon.getCouponListUsed(para)
    });
}

// 领取优惠券
export function getCouponReceive({dispatch}, para) {
    return dispatch({
        type: GET_COUPON_RECEIVE,
        payload: apiCoupon.getCouponReceive(para)
    });
}

// 优惠券列表
export function getCouponList({dispatch}, para) {
    return dispatch({
        type: GET_COUPON_LIST,
        payload: apiCoupon.getCouponList(para)
    });
}

// 获取当前订单可用的优惠券列表
export function getAvailableCouponList({dispatch}, para, order) {
    return dispatch({
        type: GET_AVAILABLE_COUPON_LIST,
        payload: apiCoupon.getCouponList(para),
        meta: {
            order
        }
    });
}


// 获取优惠券信息
export function getCouponInfo({dispatch}, couponId) {
    return dispatch({
        type: GET_COUPON_INFO,
        payload: apiCoupon.getCouponInfo(couponId),
        meta: {
            token: false
        }
    });
}
