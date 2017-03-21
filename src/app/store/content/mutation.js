import {
    GET_CONTENT_LIST_SUCCESS,

    GET_CONTENT_SUCCESS,
    GET_CONTENT_FAILURE,

    GET_CONTENT_PREVIEW_SUCCESS,

    GET_CONTENT_PRAISE_PENDING,
    GET_CONTENT_PRAISE_SUCCESS,
    GET_CONTENT_PRAISE_FAILURE,

    UPDATE_CONTENT_AWARD_PENDING,
    UPDATE_CONTENT_AWARD_SUCCESS,
    UPDATE_CONTENT_AWARD_FAILURE,

    UPDATE_OPINION_SUCCESS,
    UPDATE_OPINION_PENDING,
    UPDATE_OPINION_FAILURE,

    GET_OPINION_LIST_SUCCESS,
    GET_OPINION_LIST_PENDING,
} from './action';
import {MEDIA_DEL_ID} from '../../config/media';

import _ from 'lodash';

const state = {
    list: null,
    item: null,

    banners: null,
    enableBanner: false,
    layout: '',

    praise: {
        status: ''
    },

    content: {
        errCode: 0,
        errText: '',
        data: null,
    },

    award: {
        result: {},
        status: ''
    },

    opinion: {
        list: null,
        status: '',
        errCode: 0,
        errText: '',
    }
};

const mutations = {

    // 获取资讯列表
    [GET_CONTENT_LIST_SUCCESS](state, {payload}){

        let list = payload.data;

        if (payload.params.page > 0) {
            list.content = state.list.content.concat(list.content);
        }

        state.list = list;
    },

    // 获取资讯
    [GET_CONTENT_SUCCESS](state, {payload}){
        if (_.has(payload, 'data')) {
            state.content.data = _contentDefault(payload.data);
        }
        state.content.errCode = payload.errCode;
    },

    [GET_CONTENT_FAILURE](state, {payload}) {
        state.content.errCode = payload.errCode;
    },

    // 获取资讯预览
    [GET_CONTENT_PREVIEW_SUCCESS](state, {payload}){
        if (_.has(payload, 'data')) {
            state.content.data = _contentDefault(payload.data);
        }
        state.content.errCode = payload.errCode;
    },

    [GET_CONTENT_PRAISE_PENDING](state){
        state.praise.status = 'pending';
    },
    [GET_CONTENT_PRAISE_SUCCESS](state, {payload}){
        if (payload.errCode == 0) {
            state.content.data.opdata.praise += 1;
            state.praise.status = 'success';
        } else {
            state.praise.status = 'unknown';
        }
    },
    [GET_CONTENT_PRAISE_FAILURE](state){
        state.praise.status = 'failure';
    },


    [UPDATE_CONTENT_AWARD_PENDING](state){
        state.award.status = 'pending';
    },

    [UPDATE_CONTENT_AWARD_SUCCESS](state, {payload}){
        state.award.result = payload.data;
        state.award.status = 'success';
    },

    [UPDATE_CONTENT_AWARD_FAILURE](state){
        state.award.status = 'failure';
    },

    // 留言成功
    [UPDATE_OPINION_SUCCESS](state) {
        state.opinion.status = 'update';
    },

    // 留言成功PENDING
    [UPDATE_OPINION_PENDING](state) {
        state.opinion.status = 'pending';
    },

    // 获取评论列表
    [GET_OPINION_LIST_SUCCESS](state, {payload}) {
        state.opinion.list = payload.data;
    },

    // 获取评论列表PENDING
    [GET_OPINION_LIST_PENDING](state) {
        state.opinion.list = null;
    },

    // 获取评论列表FAILURE
    [UPDATE_OPINION_FAILURE](state, {payload}) {
        if (payload.errCode == -1) {
            state.opinion.errText = '昵称不可为空';
        }
        state.opinion.status = 'failure';
        state.opinion.errCode = payload.errCode;
    },

};

function _contentDefault(_data) {
    let data = _data;

    let opdataDefault = {
        praise: 0,
        ptips: 0,
        pv: 0,
    };

    let actionsDefault = {
        enablePraise: false,
        enableTips: false,
    };

    _.forEach(data.mediaDelIds, (value) => {
        data.content = data.content.replace(new RegExp(value, 'g'), MEDIA_DEL_ID);
    });

    data.publishedDate = data.publishedDate || data.createdDate;
    data.opdata = _.assign(opdataDefault, data.opdata);
    data.actions = _.assign(actionsDefault, data.actions);

    return data;
}

export default {
    state,
    mutations
};
