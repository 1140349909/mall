/**
 * Created by Asoiso on 16/8/16.
 */
import http from '../util/http';
import config from '../config';

//获取当前站点的基本信息
export function getVSiteInfo(uin, channel = config.CHANNEL) {
    return http.get(config.API_ILOKA_URL + '/vsite/info', {
        uin,
        channel
    });
}

// 获取资讯列表
export function getContentList({
    page = 0,
    size = config.SIZE,
    sort,
    order,
}) {
    return http.get(config.API_ILOKA_URL + '/vsite/content/list', {
        page,
        size,
        sort,
        order,
    });
}

// 获取资讯
export function getContent(id) {
    return http.get(config.API_ILOKA_URL + '/vsite/content/{id}', {
        id
    });
}

// 资讯预览
export function getContentPreview(id) {
    return http.get(config.API_ILOKA_URL + '/content/preview/{id}', {
        id
    });
}

// 点赞
export function getContentPraise(id) {
    return http.get(config.API_ILOKA_URL + '/vsite/content/praise/{id}', {
        id
    });
}

// 资讯评论
export function updateOpinion(id, resType, para) {
    return http.post(config.API_ILOKA_URL + '/vsite/{resType}/opinion/{id}', para, {
        params: {
            resType,
            id,
        }
    });
}

// 获取资讯评论列表
export function getOpinionList(id, {
    page = 0,
    size = config.SIZE,
    sort,
    order,
}) {
    return http.get(config.API_ILOKA_URL + '/vsite/content/opinion/list/{id}', {
        id,
        page,
        size,
        sort,
        order,
    });
}
