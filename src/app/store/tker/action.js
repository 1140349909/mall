import * as apiTker from  '../../api/tker';

export const GET_TKER_MEMBER_PRODUCT_LIST = 'GET_TKER_MEMBER_PRODUCT_LIST';
export const GET_TKER_MEMBER_PRODUCT_LIST_PENDING = 'GET_TKER_MEMBER_PRODUCT_LIST_PENDING';
export const GET_TKER_MEMBER_PRODUCT_LIST_SUCCESS = 'GET_TKER_MEMBER_PRODUCT_LIST_SUCCESS';
export const GET_TKER_MEMBER_PRODUCT_LIST_FAILURE = 'GET_TKER_MEMBER_PRODUCT_LIST_FAILURE';

// 获取推客入口的商品列表
export const GET_ENTRY_PRODUCT_LIST = 'GET_ENTRY_PRODUCT_LIST';
export const GET_ENTRY_PRODUCT_LIST_PENDING = 'GET_ENTRY_PRODUCT_LIST_PENDING';
export const GET_ENTRY_PRODUCT_LIST_SUCCESS = 'GET_ENTRY_PRODUCT_LIST_SUCCESS';
export const GET_ENTRY_PRODUCT_LIST_FAILURE = 'GET_ENTRY_PRODUCT_LIST_FAILURE';

// 获取当前推客会员的推客数据
export const GET_TKER_MEMBER_INFO = 'GET_TKER_MEMBER_INFO';
export const GET_TKER_MEMBER_INFO_PENDING = 'GET_TKER_MEMBER_INFO_PENDING';
export const GET_TKER_MEMBER_INFO_SUCCESS = 'GET_TKER_MEMBER_INFO_SUCCESS';
export const GET_TKER_MEMBER_INFO_FAILURE = 'GET_TKER_MEMBER_INFO_FAILURE';

export const GET_TKER_MEMBER_FRIENDS = 'GET_TKER_MEMBER_FRIENDS';
export const GET_TKER_MEMBER_FRIENDS_PENDING = 'GET_TKER_MEMBER_FRIENDS_PENDING';
export const GET_TKER_MEMBER_FRIENDS_SUCCESS = 'GET_TKER_MEMBER_FRIENDS_SUCCESS';
export const GET_TKER_MEMBER_FRIENDS_FAILURE = 'GET_TKER_MEMBER_FRIENDS_FAILURE';

// 开通分销
export const OPEN_TIKER_SELLER = 'OPEN_TIKER_SELLER';
export const OPEN_TIKER_SELLER_PENDING = 'OPEN_TIKER_SELLER_PENDING';
export const OPEN_TIKER_SELLER_SUCCESS = 'OPEN_TIKER_SELLER_SUCCESS';
export const OPEN_TIKER_SELLER_FAILURE = 'OPEN_TIKER_SELLER_FAILURE';

// 获取当前推客的商品佣金明细
export const GET_TKER_MEMBER_PRODUCT_PROFIT = 'GET_TKER_MEMBER_PRODUCT_PROFIT';
export const GET_TKER_MEMBER_PRODUCT_PROFIT_PENDING = 'GET_TKER_MEMBER_PRODUCT_PROFIT_PENDING';
export const GET_TKER_MEMBER_PRODUCT_PROFIT_SUCCESS = 'GET_TKER_MEMBER_PRODUCT_PROFIT_SUCCESS';
export const GET_TKER_MEMBER_PRODUCT_PROFIT_FAILURE = 'GET_TKER_MEMBER_PRODUCT_PROFIT_FAILURE';

// 获取当前推客的红利明细
export const GET_TKER_MEMBER_PRODUCT_DIVIDEND = 'GET_TKER_MEMBER_PRODUCT_DIVIDEND';
export const GET_TKER_MEMBER_PRODUCT_DIVIDEND_PENDING = 'GET_TKER_MEMBER_PRODUCT_DIVIDEND_PENDING';
export const GET_TKER_MEMBER_PRODUCT_DIVIDEND_SUCCESS = 'GET_TKER_MEMBER_PRODUCT_DIVIDEND_SUCCESS';
export const GET_TKER_MEMBER_PRODUCT_DIVIDEND_FAILURE = 'GET_TKER_MEMBER_PRODUCT_DIVIDEND_FAILURE';

export const UPDATE_TKER = 'UPDATE_TKER';
export const UPDATE_TKER_SUCCESS = 'UPDATE_TKER_SUCCESS';
export const UPDATE_TKER_PENDING = 'UPDATE_TKER_PENDING';
export const UPDATE_TKER_FAILURE = 'UPDATE_TKER_FAILURE';

// 获取当前推客的商品列表
export function getTkerMemberProductList({dispatch}, params) {
    return dispatch({
        type: GET_TKER_MEMBER_PRODUCT_LIST,
        payload: apiTker.getTkerMemberProductList(params)
    });
}

// 获取推客入口的商品列表
export function getEntryProductList({dispatch}, params) {
    return dispatch({
        type: GET_ENTRY_PRODUCT_LIST,
        payload: apiTker.getEntryProductList(params)
    });
}

// 获取当前推客会员的推客数据
export function getTkerMemberInfo({dispatch}) {
    return dispatch({
        type: GET_TKER_MEMBER_INFO,
        payload: apiTker.getTkerMemberInfo()
    });
}

// 获取当前推客会员的好友
export function getTkerMemberFriends({dispatch}, params) {
    return dispatch({
        type: GET_TKER_MEMBER_FRIENDS,
        payload: apiTker.getTkerMemberFriends(params)
    });
}

// 开通分销
export function openTkerSeller({dispatch}) {
    return dispatch({
        type: OPEN_TIKER_SELLER,
        payload: apiTker.openTkerSeller()
    });
}


// 获取当前推客的商品佣金明细
export function getTkerMemberProductProfit({dispatch}, params) {
    return dispatch({
        type: GET_TKER_MEMBER_PRODUCT_PROFIT,
        payload: apiTker.getTkerMemberProductProfit(params)
    });
}

// 获取当前推客的红利明细
export function getTkerMemberProductDividend({dispatch}) {
    return dispatch({
        type: GET_TKER_MEMBER_PRODUCT_DIVIDEND,
        payload: apiTker.getTkerMemberProductDividend()
    });
}


// 领取推客服务
export function updateTker({dispatch}, params) {
    return dispatch({
        type: UPDATE_TKER,
        payload: apiTker.updateTker(params)
    });
}
