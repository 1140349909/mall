import {
    GET_BANNER_BUY_SUCCESS,
    GET_BANNER_BUY_PENDING,
} from './action';
import {getMediaUrl} from '../../util/url';

const state = {

    // 商城banner
    banners: null,
};

const mutations = {

    // 获取banner
    [GET_BANNER_BUY_SUCCESS](state, {payload}){

        let banners = [];

        if (payload.data) {

            payload.data.banners.forEach(item => {
                banners.push({
                    img: getMediaUrl(item.mediaId),
                    url: item.url,
                });
            });
            state.banners = banners;
        } else {
            state.banners = [];
        }
    },

    // 获取bannerPADING
    [GET_BANNER_BUY_PENDING](state){
        state.banners = null;
    },
};

export default {
    state,
    mutations
};
