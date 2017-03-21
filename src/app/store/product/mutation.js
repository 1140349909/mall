import {
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_ISSUE_RESTYPE_SUCCESS,

    GET_PRODUCT_PREVIEW_SUCCESS,
    GET_PRODUCT_PREVIEW_PENDING,

    GET_PRODUCT_YYG_PREVIEW_SUCCESS,
    GET_PRODUCT_YYG_PREVIEW_PENDING,

    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTTRADES_SUCCESS,

    UPDATE_BASE64_SUCCESS,
    UPDATE_BASE64_PENDING,
    UPDATE_BASE64_FAILURE,

    GET_SHOW_LIST_SUCCESS,
    GET_SHOW_LIST_FAILURE,

    GET_PRODUCT_ISSUE_YYG_HISTORY_LIST_SUCCESS,
    GET_PRODUCT_ISSUE_TKER_LIST_SUCCESS,

} from './action';

import {getMediaUrl} from '../../util/url';

const state = {
    list: {},
    itemPreview: null,
    itemYYgview: null,
    item: null,
    trades: {},

    base64: {
        result: {},
        status: '',
        params: {}
    },

    show: {
        result: {},
        status: '',
        params: {}
    },

    status: '',

    // 己开通推客分销的商品列表
    productIssueTkerList: null,

    // 一元购在售商品往期列表
    historyList: null,
};

const mutations = {

    [GET_PRODUCT_SUCCESS](state, {payload}){
        state.item = resolveItem(payload.data, true);
    },

    [GET_PRODUCT_ISSUE_RESTYPE_SUCCESS](state, {payload}){
        state.item = resolveItem(payload.data, true);
    },

    // 获取商品列表数据
    [GET_PRODUCTS_SUCCESS](state, {payload}){
        let list = payload.data;

        // let {page} = payload.params;

        payload.data.content.forEach(item => {
            list.content[item] = resolveItem(item);
        });

        if (payload.params.page > 0) {
            list.content = state.list.content.concat(list.content);
        }


        state.list = list;
    },

    // 商城商品预览
    [GET_PRODUCT_PREVIEW_SUCCESS](state, {payload}){
        state.itemPreview = resolveItem(payload.data, true);
    },

    // 商城商品预览PENDING
    [GET_PRODUCT_PREVIEW_PENDING](state){
        state.itemPreview = null;
    },

    // 一元购商品预览
    [GET_PRODUCT_YYG_PREVIEW_SUCCESS](state, {payload}){
        state.itemYYgview = resolveItem(payload.data, true);
    },

    // 一元购商品预览PENDING
    [GET_PRODUCT_YYG_PREVIEW_PENDING](state){
        state.itemYYgview = null;
    },

    [GET_PRODUCTTRADES_SUCCESS](state, {payload}){
        state.trades = payload.data;
    },

    [UPDATE_BASE64_SUCCESS](state, {payload}){

        if (payload.data) {
            state.base64.status = 'success';
            state.base64.result = payload.data;
            state.base64.params = payload.params;
        } else {
            state.base64.status = 'unknown';
        }

    },
    [UPDATE_BASE64_PENDING](state){
        state.base64.status = 'pending';
    },
    [UPDATE_BASE64_FAILURE](state){
        state.base64.status = 'failure';
    },

    [GET_SHOW_LIST_SUCCESS](state, {payload}){

        if (payload.data) {
            state.show.result = payload.data;
            state.show.status = 'success';

            state.show.params = payload.params;
        } else {
            state.show.status = 'unknown';
        }
    },
    [GET_SHOW_LIST_FAILURE](state){
        state.show.status = 'failure';
    },

    // 己开通推客分销的商品列表
    [GET_PRODUCT_ISSUE_TKER_LIST_SUCCESS](state, {payload}){
        let list = payload.data;

        payload.data.content.forEach(item => {
            list.content[item] = resolveItem(item);
        });

        state.productIssueTkerList = list;
    },

    // 一元购在售商品往期列表
    [GET_PRODUCT_ISSUE_YYG_HISTORY_LIST_SUCCESS](state, {payload}){
        let list = payload.data;

        payload.data.content.map(item => {
            list.content[item] = resolveItem(item);
        });
        state.historyList = list;
    },
};

function resolveItem(item, isParseMedia) {
    if (item.yygCfg) {
        item.percent = item.creditRecieved / item.yygCfg.credit * 100;
    }

    //bannerImgUrls
    if (isParseMedia) {
        let bannerImgUrls = [];
        item.mediaRes.bannerImgs.forEach(mediaId=> bannerImgUrls.push({
            img: getMediaUrl(mediaId)
        }));
        item.mediaRes.bannerImgUrls = bannerImgUrls;
    }
    return item;
}

export default {
    state,
    mutations
};

