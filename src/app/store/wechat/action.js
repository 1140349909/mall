import * as apiCommon from '../../api/common';

// 获取微信ticket
export const GET_WECHAT_TICKET = 'GET_WECHAT_TICKET';
export const GET_WECHAT_TICKET_SUCCESS = 'GET_WECHAT_TICKET_SUCCESS';
export const GET_WECHAT_TICKET_FAILURE = 'GET_WECHAT_TICKET_FAILURE';

// 获取微信JsTicket
export function getWechatTicket({dispatch}, params) {
    return dispatch({
        type: GET_WECHAT_TICKET,
        payload: apiCommon.getWechatTicket(params)
    });
}
