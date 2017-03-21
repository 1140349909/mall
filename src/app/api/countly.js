import http from '../util/http';
import config from '../config';

// 通用计数请求
export function getCountly({
    type,
    code,
    id,
    shareKey,
}) {
    return http.get(config.API_ILOKA_URL + '/countly/{type}/{code}/{id}', {
        type,
        code,
        id,
        shareKey
    });
}

// 通用跳转计数请求
export function getCountlyRedirect({
    from,
    url,
    name,
}) {
    return http.get(config.API_ILOKA_URL + '/countly/redirect/{from}', {
        from,
        url,
        name
    });
}