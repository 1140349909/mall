import * as apiIntegral from '../../api/integral';

// 领取积分
export const GET_INTEGRAL_RECEIVE = 'GET_INTEGRAL_RECEIVE';
export const GET_INTEGRAL_RECEIVE_SUCCESS = 'GET_INTEGRAL_RECEIVE_SUCCESS';
export const GET_INTEGRAL_RECEIVE_PENDING = 'GET_INTEGRAL_RECEIVE_PENDING';
export const GET_INTEGRAL_RECEIVE_FAILURE = 'GET_INTEGRAL_RECEIVE_FAILURE';

// 获取积分值
export const GET_INTEGRAL_FACEVALUE = 'GET_INTEGRAL_FACEVALUE';
export const GET_INTEGRAL_FACEVALUE_SUCCESS = 'GET_INTEGRAL_FACEVALUE_SUCCESS';
export const GET_INTEGRAL_FACEVALUE_PENDING = 'GET_INTEGRAL_FACEVALUE_PENDING';
export const GET_INTEGRAL_FACEVALUE_FAILURE = 'GET_INTEGRAL_FACEVALUE_FAILURE';

// 领取积分
export function getIntegralReceive({dispatch}, para) {
    return dispatch({
        type: GET_INTEGRAL_RECEIVE,
        payload: apiIntegral.getIntegralReceive(para),
        meta: {
            token: false
        }
    });
}

// 获取积分值
export function getIntegralFaceValue({dispatch}, id) {
    return dispatch({
        type: GET_INTEGRAL_FACEVALUE,
        payload: apiIntegral.getIntegralFaceValue(id)
    });
}
