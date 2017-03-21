/**
 * Created by Asoiso on 16/8/16.
 */
import http from '../util/http';

// 优惠券核销总金额
export function getCouponCash() {
    return http.get('coupon/cash');
}
// 己失效的优惠券列表
export function getCouponListInvalid({
    page = 0,
    size = 100,
    sort,
}) {
    return http.get('coupon/list/invalid', {
        page,
        size,
        sort,
    });
}

// 己使用的优惠券列表
export function getCouponListUsed({
    page = 0,
    size = 100,
    sort,
}) {
    return http.get('coupon/list/used', {
        page,
        size,
        sort,
    });
}

// 领取优惠券
export function getCouponReceive(params) {
    return http.get('coupon/receive/{resId}/{couponId}', params);
}

// 优惠券列表
export function getCouponList({
    page = 0,
    size = 100,
    sort,
}) {
    return http.get('coupon/list', {
        page,
        size,
        sort,
    });
}

// 获取优惠券信息
export function getCouponInfo(couponId) {
    return http.get('coupon/info/{couponId}', {
        couponId
    });
    // return http.get('coupon/info/{couponId}', {
    //     params: {
    //         couponId
    //     },
    //     meta: {
    //         token: false
    //     }
    // });
}

