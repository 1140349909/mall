import * as apiMember from '../../api/member';

//获取订单列表
export const GET_ORDER_LIST = 'GET_ORDER_LIST';
export const GET_ORDER_LIST_PENDING = 'GET_ORDER_LIST_PENDING';
export const GET_ORDER_LIST_SUCCESS = 'GET_ORDER_LIST_SUCCESS';
export const GET_ORDER_LIST_FAILURE = 'GET_ORDER_LIST_FAILURE';

//获取未支付订单列表
export const GET_UNPAID_ORDER_LIST = 'GET_UNPAID_ORDER_LIST';
export const GET_UNPAID_ORDER_LIST_PENDING = 'GET_UNPAID_ORDER_LIST_PENDING';
export const GET_UNPAID_ORDER_LIST_SUCCESS = 'GET_UNPAID_ORDER_LIST_SUCCESS';
export const GET_UNPAID_ORDER_LIST_FAILURE = 'GET_UNPAID_ORDER_LIST_FAILURE';

//删除订单
export const DEL_FINISHED_ORDER = 'DEL_FINISHED_ORDER';
export const DEL_FINISHED_ORDER_SUCCESS = 'DEL_FINISHED_ORDER_SUCCESS';
export const DEL_FINISHED_ORDER_FAILURE = 'DEL_FINISHED_ORDER_FAILURE';

//晒图
export const UPDATE_SHOW_ORDER = 'UPDATE_SHOW_ORDER';
export const UPDATE_SHOW_ORDER_SUCCESS = 'UPDATE_SHOW_ORDER_SUCCESS';
export const UPDATE_SHOW_ORDER_PENDING = 'UPDATE_SHOW_ORDER_PENDING';
export const UPDATE_SHOW_ORDER_FAILURE = 'UPDATE_SHOW_ORDER_FAILURE';

export const UPDATE_UNPAID_ORDER = 'UPDATE_UNPAID_ORDER';
export const UPDATE_UNPAID_ORDER_PENDING = 'UPDATE_UNPAID_ORDER_PENDING';
export const UPDATE_UNPAID_ORDER_SUCCESS = 'UPDATE_UNPAID_ORDER_SUCCESS';
export const UPDATE_UNPAID_ORDER_FAILURE = 'UPDATE_UNPAID_ORDER_FAILURE';

export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const UPDATE_ORDER_STATUS_PENDING = 'UPDATE_ORDER_STATUS_PENDING';
export const UPDATE_ORDER_STATUS_FAILURE = 'UPDATE_ORDER_STATUS_FAILURE';

export function getOrderList({dispatch}, params) {
    return dispatch({
        type: GET_ORDER_LIST,
        payload: apiMember.getOrderList(params)
    });
}

export function getUnpaidOrderList({dispatch}, params) {
    return dispatch({
        type: GET_UNPAID_ORDER_LIST,
        payload: apiMember.getUnpaidOrderList(params)
    });
}

export function delFinishedOrder({dispatch}, params) {
    return dispatch({
        type: DEL_FINISHED_ORDER,
        payload: apiMember.delFinishedOrder(params)
    });
}

// 一元购领奖
export function updateShowOrder({dispatch}, params) {
    return dispatch({
        type: UPDATE_SHOW_ORDER,
        payload: apiMember.updateShowOrder(params)
    });
}

// 更新地址
export function updateUnpaidOrder({dispatch}, params) {
    return dispatch({
        type: UPDATE_UNPAID_ORDER,
        payload: apiMember.updateUnpaidOrder(params)
    });
}

export function updateOrderStatus({dispatch}, params) {
    return dispatch({
        type: UPDATE_ORDER_STATUS,
        payload: apiMember.updateOrderStatus(params)
    });
}
