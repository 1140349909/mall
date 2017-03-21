import {
    GET_VSITE_INFO_PENDING,
    GET_VSITE_INFO_SUCCESS,
    GET_VSITE_INFO_FAILURE
} from './action';
import {getMediaUrl, getHomeUrl} from '../../util/url';
import share from '../../config/share';
import _ from 'lodash';

const DEFAULT_STATE = {
    // 当前商城基本信息
    id: '',
    uin: '',
    name: '',

    // 授权
    siteAuth: {
        yygAuth: 'FALSE',
        mallAuth: 'FALSE',
        contentAuth: 'FALSE'
    },

    // 积分兑换比例 "integralExchange": {"integral": 0}
    integralExchange: {
        integral: 0
    },

    // 是否开通分销
    tkerConfigured: false,

    // 商家客服
    cusMobile: null,

    // 联系方式 {"name": "联系人-李健", "mobile": "18221453942"}
    contact: null,

    // 关注公众号 {"name": "AsoisoX", "imgId": "586cb96f0f93d53b85d89156"}
    weChat: null,

    // 站点分享信息 {"title": "标题", "desc": "描述", "imgId": "587058280f93d554ef5d06de"}
    share: share,

    // 资讯页面设置

    // 是否启用banner
    banner: false,

    // banner条
    banners: [],

    // 资讯列表布局
    layout: 'listCoverLeft',

    status: 'INIT'
};

const state = _.cloneDeep(DEFAULT_STATE);

const mutations = {

    [GET_VSITE_INFO_PENDING](state){
        state.status = 'PENDING';
    },
    [GET_VSITE_INFO_SUCCESS](state, {payload}){

        let {data} = payload;

        _.defaultsDeep(data, DEFAULT_STATE);

        // 站点分享信息
        data.share.link = getHomeUrl(data.uin);
        if (_.has(data, 'share.imgId')) {
            data.share.imgUrl = getMediaUrl(data.share.imgId);
        }

        // 资讯页面banner
        data.banners.forEach(item => {
            item.img = getMediaUrl(item.mediaId);
        });

        data.status = 'SUCCESS';

        _resolveState(state, data);
    },

    [GET_VSITE_INFO_FAILURE](state, {payload}){

        let data = _.defaultsDeep({
            status: payload.errCode == 49002 ? 'UNAUTHORIZED' : 'FAILURE'
        }, DEFAULT_STATE);

        _resolveState(state, data);
    }
};

function _resolveState(state, data) {
    state.id = data.id;
    state.uin = data.uin;
    state.name = data.name;
    state.siteAuth = data.siteAuth;
    state.integralExchange = data.integralExchange;
    state.tkerConfigured = data.tkerConfigured;
    state.cusMobile = data.cusMobile;
    state.contact = data.contact;
    state.weChat = data.weChat;
    state.share = data.share;
    state.banner = data.banner;
    state.banners = data.banners;
    state.layout = data.layout;
    state.status = data.status;
}

export default {
    state,
    mutations
};

