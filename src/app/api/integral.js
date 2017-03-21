/**
 * Created by Asoiso on 16/8/16.
 */
import http from '../util/http';

// 领取积分
export function getIntegralReceive(params) {
    return http.get('integral/receive/{resId}/{integralId}', params);
}

// 获取优惠券面值
export function getIntegralFaceValue(integralId) {
    return http.get('integral/facevalue/{integralId}', {
        integralId
    });
}
