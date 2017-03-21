import * as apiTrade from '../../api/trade';

export const GET_TRADECALLBACK = 'GET_TRADECALLBACK';
export const GET_TRADECALLBACK_PENDING = 'GET_TRADECALLBACK_PENDING';
export const GET_TRADECALLBACK_SUCCESS = 'GET_TRADECALLBACK_SUCCESS';
export const GET_TRADECALLBACK_FAILURE = 'GET_TRADECALLBACK_FAILURE';

export const ADD_TO_CART = 'ADD_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const PURCHASE = 'PURCHASE';
export const PURCHASE_PENDING = 'PURCHASE_PENDING';
export const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
export const PURCHASE_FAILURE = 'PURCHASE_FAILURE';


// 在售商品己成功交易的数量
export const GET_TRADE_AMOUNT = 'GET_TRADE_AMOUNT';
export const GET_TRADE_AMOUNT_SUCCESS = 'GET_TRADE_AMOUNT_SUCCESS';
export const GET_TRADE_AMOUNT_PENDING = 'GET_TRADE_AMOUNT_PENDING';
export const GET_TRADE_AMOUNT_FAILURE = 'GET_TRADE_AMOUNT_FAILURE';

export function getTradeCallback({dispatch}, businessId, buyType) {
    return dispatch({
        type: GET_TRADECALLBACK,
        payload: apiTrade.getTradeCallback(businessId, buyType)
    });
}

export function addToCart({dispatch}, order) {
    return dispatch({
        type: ADD_TO_CART,
        payload: order
    });
}

export function clearCart({dispatch}) {
    return dispatch(CLEAR_CART);
}

export function purchase({dispatch}, id, order) {
    return dispatch({
        type: PURCHASE,
        payload: apiTrade.purchase(id, order)
    });
}


// 在售商品己成功交易的数量
export function getTradeAmount({dispatch}, params) {
    return dispatch({
        type: GET_TRADE_AMOUNT,
        payload: apiTrade.getTradeAmount(params)
    });
}
