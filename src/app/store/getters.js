import {TKER_TYPE} from '../config/constants';
// 应用共享状态

export function vsiteSettings(state) {
    const vsite = state.vsite;
    const siteAuth = vsite.siteAuth;
    if (!vsite.uin) {
        return {};
    }
    return {
        uin: vsite.uin,
        yyg: siteAuth.yygAuth == 'TRUE',
        mall: siteAuth.mallAuth == 'TRUE',
        content: siteAuth.contentAuth == 'TRUE'
    };
}

// 获取用户当前积分
export function integral(state) {
    return state.member.asset.integral;
}

// 获取用户当前现金
export function money(state) {
    return state.member.asset.money;
}

// 判断用户是否是推客
export function isTker(state) {
    if (!state.member.info.data) {
        return false;
    }
    return state.vsite.tkerConfigured && state.member.info.data.uinSeller;
}

// 获取推客站点分销信息
export function tkerSiteShareInfo(state) {
    const url = state.tker.tasks[TKER_TYPE.TKER_SITE].url;
    const vsite = state.vsite;

    if (!url) {
        return null;
    }

    const data = {
        title: vsite.share.title,
        desc: vsite.share.desc,
        link: url,
        imgUrl: vsite.share.imgUrl,
        isResolveLink: false
    };

    return data;
}
