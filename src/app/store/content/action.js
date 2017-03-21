import * as apiVSite from '../../api/vsite';
import * as apiTips from '../../api/tips';
import * as apiCountly from '../../api/countly';

// 获取资讯列表服务
export const GET_CONTENT_LIST = 'GET_CONTENT_LIST';
export const GET_CONTENT_LIST_SUCCESS = 'GET_CONTENT_LIST_SUCCESS';
export const GET_CONTENT_LIST_PENDING = 'GET_CONTENT_LIST_PENDING';
export const GET_CONTENT_LIST_FAILURE = 'GET_CONTENT_LIST_FAILURE';

// 获取资讯
export const GET_CONTENT = 'GET_CONTENT';
export const GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS';
export const GET_CONTENT_PENDING = 'GET_CONTENT_PENDING';
export const GET_CONTENT_FAILURE = 'GET_CONTENT_FAILURE';

//获取资讯预览
export const GET_CONTENT_PREVIEW = 'GET_CONTENT_PREVIEW';
export const GET_CONTENT_PREVIEW_SUCCESS = 'GET_CONTENT_PREVIEW_SUCCESS';
export const GET_CONTENT_PREVIEW_PENDING = 'GET_CONTENT_PREVIEW_PENDING';
export const GET_CONTENT_PREVIEW_FAILURE = 'GET_CONTENT_PREVIEW_FAILURE';

// 点赞
export const GET_CONTENT_PRAISE = 'GET_CONTENT_PRAISE';
export const GET_CONTENT_PRAISE_SUCCESS = 'GET_CONTENT_PRAISE_SUCCESS';
export const GET_CONTENT_PRAISE_PENDING = 'GET_CONTENT_PRAISE_PENDING';
export const GET_CONTENT_PRAISE_FAILURE = 'GET_CONTENT_PRAISE_FAILURE';

// 打赏
export const UPDATE_CONTENT_AWARD = 'UPDATE_CONTENT_AWARD';
export const UPDATE_CONTENT_AWARD_PENDING = 'UPDATE_CONTENT_AWARD_PENDING';
export const UPDATE_CONTENT_AWARD_SUCCESS = 'UPDATE_CONTENT_AWARD_SUCCESS';
export const UPDATE_CONTENT_AWARD_FAILURE = 'UPDATE_CONTENT_AWARD_FAILURE';

// 资讯评论
export const UPDATE_OPINION = 'UPDATE_OPINION';
export const UPDATE_OPINION_SUCCESS = 'UPDATE_OPINION_SUCCESS';
export const UPDATE_OPINION_PENDING = 'UPDATE_OPINION_PENDING';
export const UPDATE_OPINION_FAILURE = 'UPDATE_OPINION_FAILURE';

// 获取资讯列表
export const GET_OPINION_LIST = 'GET_OPINION_LIST';
export const GET_OPINION_LIST_SUCCESS = 'GET_OPINION_LIST_SUCCESS';
export const GET_OPINION_LIST_PENDING = 'GET_OPINION_LIST_PENDING';
export const GET_OPINION_LIST_FAILURE = 'GET_OPINION_LIST_FAILURE';

// 通用计数请求
export const GET_COUNTLY = 'GET_COUNTLY';
export const GET_COUNTLY_SUCCESS = 'GET_COUNTLY_SUCCESS';
export const GET_COUNTLY_PENDING = 'GET_COUNTLY_PENDING';
export const GET_COUNTLY_FAILURE = 'GET_COUNTLY_FAILURE';

// 通用跳转计数请求
export const GET_COUNTLY_REDIRECT = 'GET_COUNTLY_REDIRECT';
export const GET_COUNTLY_REDIRECT_SUCCESS = 'GET_COUNTLY_REDIRECT_SUCCESS';
export const GET_COUNTLY_REDIRECT_PENDING = 'GET_COUNTLY_REDIRECT_PENDING';
export const GET_COUNTLY_REDIRECT_FAILURE = 'GET_COUNTLY_REDIRECT_FAILURE';


// 获取咨询列表
export function getContentList({dispatch}, params) {
    return dispatch({
        type: GET_CONTENT_LIST,
        payload: apiVSite.getContentList(params)
    });
}

// 获取咨询详情
export function getContent({dispatch}, id) {
    return dispatch({
        type: GET_CONTENT,
        payload: apiVSite.getContent(id)
    });
}

// 获取资讯预览
export function getContentPreview({dispatch}, id) {
    return dispatch({
        type: GET_CONTENT_PREVIEW,
        payload: apiVSite.getContentPreview(id)
    });
}

// 获取点赞
export function getContentPraise({dispatch}, id) {
    return dispatch({
        type: GET_CONTENT_PRAISE,
        payload: apiVSite.getContentPraise(id)
    });
}

// 打赏
export function updateContentAward({dispatch}, id, data) {
    return dispatch({
        type: UPDATE_CONTENT_AWARD,
        payload: apiTips.updateContentAward(id, data)
    });
}

// 资讯评论
export function updateOpinion({dispatch}, id, resType, para) {
    return dispatch({
        type: UPDATE_OPINION,
        payload: apiVSite.updateOpinion(id, resType, para)
    });
}

// 获取资讯评论列表
export function getOpinionList({dispatch}, id, para) {
    return dispatch({
        type: GET_OPINION_LIST,
        payload: apiVSite.getOpinionList(id, para)
    });
}

// 通用计数请求
export function getCountly({dispatch}, params) {
    return dispatch({
        type: GET_COUNTLY,
        payload: apiCountly.getCountly(params)
    });
}

// 通用计数跳转请求
export function getCountlyRedirect({dispatch}, params) {
    return dispatch({
        type: GET_COUNTLY_REDIRECT,
        payload: apiCountly.getCountlyRedirect(params)
    });
}
