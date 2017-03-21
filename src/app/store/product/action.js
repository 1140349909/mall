import * as apiProduct from '../../api/product';
import * as apiTrade from '../../api/trade';
import * as apiCommon from '../../api/common';
import * as apiIssue from '../../api/issue';



export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_PENDING = 'GET_PRODUCT_PENDING';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

// 商品商品预览
export const GET_PRODUCT_PREVIEW = 'GET_PRODUCT_PREVIEW';
export const GET_PRODUCT_PREVIEW_SUCCESS = 'GET_PRODUCT_PREVIEW_SUCCESS';
export const GET_PRODUCT_PREVIEW_PENDING = 'GET_PRODUCT_PREVIEW_PENDING';
export const GET_PRODUCT_PREVIEW_FAILURE = 'GET_PRODUCT_PREVIEW_FAILURE';

// 一元购商品预览
export const GET_PRODUCT_YYG_PREVIEW = 'GET_PRODUCT_YYG_PREVIEW';
export const GET_PRODUCT_YYG_PREVIEW_SUCCESS = 'GET_PRODUCT_YYG_PREVIEW_SUCCESS';
export const GET_PRODUCT_YYG_PREVIEW_PENDING = 'GET_PRODUCT_YYG_PREVIEW_PENDING';
export const GET_PRODUCT_YYG_PREVIEW_FAILURE = 'GET_PRODUCT_YYG_PREVIEW_FAILURE';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_PENDING = 'GET_PRODUCTS_PENDING';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

export const GET_PRODUCTTRADES = 'GET_PRODUCTTRADES';
export const GET_PRODUCTTRADES_SUCCESS = 'GET_PRODUCTTRADES_SUCCESS';
export const GET_PRODUCTTRADES_FAILURE = 'GET_PRODUCTTRADES_FAILURE';

export const UPDATE_BASE64 = 'UPDATE_BASE64';
export const UPDATE_BASE64_SUCCESS = 'UPDATE_BASE64_SUCCESS';
export const UPDATE_BASE64_PENDING = 'UPDATE_BASE64_PENDING';
export const UPDATE_BASE64_FAILURE = 'UPDATE_BASE64_FAILURE';

export const GET_SHOW_LIST = 'GET_SHOW_LIST';
export const GET_SHOW_LIST_SUCCESS = 'GET_SHOW_LIST_SUCCESS';
export const GET_SHOW_LIST_FAILURE = 'GET_SHOW_LIST_FAILURE';


export const GET_PRODUCT_ISSUE_YYG_HISTORY_LIST = 'GET_PRODUCT_ISSUE_YYG_HISTORY_LIST';
export const GET_PRODUCT_ISSUE_YYG_HISTORY_LIST_SUCCESS = 'GET_PRODUCT_ISSUE_YYG_HISTORY_LIST_SUCCESS';
export const GET_PRODUCT_ISSUE_YYG_HISTORY_LIST_PENDING = 'GET_PRODUCT_ISSUE_YYG_HISTORY_LIST_PENDING';
export const GET_PRODUCT_ISSUE_YYG_HISTORY_LIST_FAILURE = 'GET_PRODUCT_ISSUE_YYG_HISTORY_LIST_FAILURE';

// 己开通推客分销的商品列表
export const GET_PRODUCT_ISSUE_TKER_LIST = 'GET_PRODUCT_ISSUE_TKER_LIST';
export const GET_PRODUCT_ISSUE_TKER_LIST_PENDING = 'GET_PRODUCT_ISSUE_TKER_LIST_PENDING';
export const GET_PRODUCT_ISSUE_TKER_LIST_SUCCESS = 'GET_PRODUCT_ISSUE_TKER_LIST_SUCCESS';
export const GET_PRODUCT_ISSUE_TKER_LIST_FAILURE = 'GET_PRODUCT_ISSUE_TKER_LIST_FAILURE';

export const GET_PRODUCT_ISSUE_RESTYPE = 'GET_PRODUCT_ISSUE_RESTYPE';
export const GET_PRODUCT_ISSUE_RESTYPE_PENDING = 'GET_PRODUCT_ISSUE_RESTYPE_PENDING';
export const GET_PRODUCT_ISSUE_RESTYPE_SUCCESS = 'GET_PRODUCT_ISSUE_RESTYPE_SUCCESS';
export const GET_PRODUCT_ISSUE_RESTYPE_FAILURE = 'GET_PRODUCT_ISSUE_RESTYPE_FAILURE';

export function getProducts({dispatch}, params) {
    return dispatch({
        type: GET_PRODUCTS,
        payload: apiProduct.getProducts(params)
    });
}

export function getProduct({dispatch}, id, buyType, idType) {
    return dispatch({
        type: GET_PRODUCT,
        payload: apiProduct.getProduct(id, buyType, idType)
    });
}

export function getProductIssueResType({dispatch}, params) {
    return dispatch({
        type: GET_PRODUCT_ISSUE_RESTYPE,
        payload: apiIssue.getProductIssueResType(params)
    });
}


// 商品商品预览
export function getProductPreview({dispatch}, id) {
    return dispatch({
        type: GET_PRODUCT_PREVIEW,
        payload: apiProduct.getProductPreview(id)
    });
}

// 一元购商品预览
export function getProductYygPreview({dispatch}, id, buyChannel) {
    return dispatch({
        type: GET_PRODUCT_YYG_PREVIEW,
        payload: apiProduct.getProductYygPreview(id, buyChannel)
    });
}

export function getProductTrades({dispatch}, params) {
    return dispatch({
        type: GET_PRODUCTTRADES,
        payload: apiTrade.getProductTrades(params)
    });
}

export function updateBase64({dispatch}, params) {
    return dispatch({
        type: UPDATE_BASE64,
        payload: apiCommon.updateBase64(params)
    });
}

export function getShowList({dispatch}, params) {
    return dispatch({
        type: GET_SHOW_LIST,
        payload: apiProduct.getShowList(params)
    });
}


export function getProductIssueYygHistoryList({dispatch}, params) {
    return dispatch({
        type: GET_PRODUCT_ISSUE_YYG_HISTORY_LIST,
        payload: apiProduct.getProductIssueYygHistoryList(params)
    });
}

// 己开通推客分销的商品列表
export function getProductIssueTkerList({dispatch}, params) {
    return dispatch({
        type: GET_PRODUCT_ISSUE_TKER_LIST,
        payload: apiProduct.getProductIssueTkerList(params)
    });
}
