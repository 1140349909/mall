/**
 * Created by Asoiso on 16/8/25.
 */
import config from '../config';
import {urlSerialization} from 'common/util';
import {ENTRY_CODE} from '../config/constants';
import _ from 'lodash';

// 获取OSS地址
export function getOSSUrl(path) {
    // http://cdn.vveshow.com/cloud/oss/
    return config.CND_ORIGIN + '/cloud/oss/' + path;
}

export function getMainUrl(path) {
    // http://cdn.vveshow.com/cloud/oss/
    return config.MALL_ORIGIN + path;
}

// state: true  prd环境启用CDN
// state: false prd环境不启用CDN
export function getMediaUrl(mediaId, cdn = true) {
    if (mediaId) {
        if (cdn) {
            return config.MEDIA_BASE_URL + '/media/image/' + mediaId;
        } else {
            return config.API_BASE_URL + '/media/image/' + mediaId;
        }
    } else {
        return '';
    }

}

export function getAssetUrl(path) {
    if (path) {
        if (!/^http/.test(path)) {
            return location.origin + path;
        }
        return path;
    } else {
        return '';
    }
}

// 获取商城原始地址
// http://m.sit.vveshow.com/dev/#!/tker/product
export function getOriginUrl(uin, path) {

    return config.MALL_ORIGIN + '/' + uin + '/#!' + path;
}

// 获取入口地址
export function getEntryUrl({
    uin,
    code,
    channel,
    url,
    ...params
}){
    let link = `${config.API_ILOKA_ROOT}/entry/${uin}/${code}/${channel || config.CHANNEL}`;
    let _url;

    if (url) {
        _url = `url=${encodeURIComponent(cleanWxStatParams(url))}`;
    }

    if (!_.isEmpty(params)) {
        link += `?${urlSerialization(params)}`;
        if (_url) {
            link += `&${_url}`;
        }
    } else if (_.isEmpty(params) && _url){
        link += `?${_url}`;
    }
    return link;
}


// 清理微信的统计参数
function cleanWxStatParams(value) {
    if (value.match('from=') || value.match('isappinstalled=')) {
        var arr = value.split('&');
        var arr1 = [];
        var i;
        for (i = 0; i < arr.length; i++) {
            var obj = arr[i];
            obj = obj.replace(/from=\w*|isappinstalled=\w*/, '');
            arr1.push(obj);
        }

        value = arr1[0];

        for (i = 1; i < arr1.length; i++) {
            if (/\?$/g.test(value)) {
                value += arr1[i];
            } else {
                if (arr1[i] != '') {
                    value += '&' + arr1[i];
                } else {
                    value += arr1[i];
                }
            }
        }

        if (/\w*\?$/g.test(value)) {
            value = value.replace(/\?$/g, '');
        }
    }
    return value;
}

// 获取C端主页地址
export function getHomeUrl(uin, isOrigin) {
    if (isOrigin) {
        return getOriginUrl(uin, '/home');
    } else {
        return getEntryUrl({
            uin: uin,
            code: ENTRY_CODE.HOME
        });
    }
}

// 获取商城入口
// http://api.sit.vveshow.com/buy/entry/dev/mall/linkin
export function getMallIndexUrl(uin, isOrigin) {
    if (isOrigin) {
        return getOriginUrl(uin, '/mall');
    } else {
        return getEntryUrl({
            uin: uin,
            code: ENTRY_CODE.MALL
        });
    }
}

// 获取一元购入口
// http://api.sit.vveshow.com/buy/entry/dev/yyg/linkin
export function getYygIndexUrl(uin, isOrigin) {
    if (isOrigin) {
        return getOriginUrl(uin, '/yyg');
    } else {
        return getEntryUrl({
            uin: uin,
            code: ENTRY_CODE.YYG
        });
    }
}

// 获取用户推客商城首页
// #!/tker/product
export function getTKerProductUrl(uin, isOrigin) {
    var url = '/tker/product';
    if (isOrigin) {
        return getOriginUrl(uin, url);
    } else {
        return getEntryUrl({
            uin: uin,
            code: ENTRY_CODE.CUSTOMIZE,
            url: '#!' + url
        });
    }
}

// 获取商城商品详情
// http://api.sit.vveshow.com/buy/entry/dev/customize/linkin?url=#!/product/show/57b41bc20f93d5223998d52f
export function getMallProductShowUrl(uin, id, idType, isOrigin) {
    if (!id) {
        return '';
    }
    var url = '/product/show/' + id + (idType ? '?type=' + idType : '');
    if (isOrigin) {
        return getOriginUrl(uin, url);
    } else {
        return getEntryUrl({
            uin: uin,
            code: ENTRY_CODE.CUSTOMIZE,
            url: '#!' + url
        });
    }
}

// 获取一元购商品详情
// http://api.sit.vveshow.com/buy/entry/dev/yyg/linkin?url=/product/show/57c14f380f93d52c67612b01
export function getYygProductShowUrl(uin, id, isOrigin) {
    if (!id) {
        return '';
    }
    var url = '/product/show/' + id;
    if (isOrigin) {
        return getOriginUrl(uin, '/yyg' + url);
    } else {
        return getEntryUrl({
            uin: uin,
            code: ENTRY_CODE.YYG,
            url: url
        });
    }
}

// 获取资讯列表入口
// http://api.sit.vveshow.com/buy/entry/dev/content/linkin
export function getContentIndexUrl(uin, isOrigin) {
    if (isOrigin) {
        return getOriginUrl(uin, '/content');
    } else {
        return getEntryUrl({
            uin: uin,
            code: ENTRY_CODE.CONTENT
        });
    }
}

// 获取资讯详情
// http://api.sit.vveshow.com/buy/entry/dev/content/linkin?url=/show/57bbe82a0f93d55937bbe7b5
export function getContentShowUrl(uin, id, isOrigin) {
    if (!id) {
        return '';
    }
    var url = '/show/' + id;
    if (isOrigin) {
        return getOriginUrl(uin, '/content' + url);
    } else {
        return getEntryUrl({
            uin: uin,
            code: ENTRY_CODE.CONTENT,
            url: url
        });
    }
}

// 获取名片分享
export function getVcardShareUrl(uin, id, type, isOrigin) {
    if (!id) {
        return '';
    }
    var url = '/vcard/share?id=' + id + '&type=' + type;

    if (isOrigin) {
        return getOriginUrl(uin, '/member' + url);
    } else {
        return getEntryUrl({
            uin: uin,
            code: ENTRY_CODE.MEMBER,
            url: url
        });
    }
}


// 微信认证入口
export function getWechatEntry(uin, intercode, channel, url, params) {

    let _url = `${config.API_ILOKA_ROOT}/api/wechat/entry/${uin}/${intercode}/${channel}?url=${encodeURIComponent(url)}`;

    if (params) {
        _url += `&${urlSerialization(params)}`;
    }

    return _url;
}

// 获取微信充值回调地址
export function getWechatChargeUrl(uin, isOrigin) {
    if (!uin) {
        return '';
    }
    var url = '/bill/?status={status}';

    if (isOrigin) {
        return getOriginUrl(uin, '/member' + url);
    } else {
        return getEntryUrl({
            uin: uin,
            code: ENTRY_CODE.MEMBER,
            url: url
        });
    }
}

//TODO: 获取微信支付回调地址
export function getWechatPayUrl(uin, businessId) {
    if (!businessId) {
        return '';
    }
    var url = '#!/order/result/?businessId=' + businessId + '&status={status}';
    return getEntryUrl({
        uin: uin,
        code: ENTRY_CODE.CUSTOMIZE,
        url: url
    });
}

//TODO: 获取一元购下单回调地址
export function getYygOrderUrl(uin, businessId) {
    if (!businessId) {
        return '';
    }
    var url = '/order/result/?businessId=' + businessId + '&status={status}';
    return getEntryUrl({
        uin: uin,
        code: ENTRY_CODE.YYG,
        url: url
    });

}

// 获取二维码
export function geQrCodeUrl(width, height, content) {
    return config.API_BASE_URL + '/media/qrcode/' + width + '/' + height + '?content=' + content;
}

// 获取推客二维码
export function getTkerQrCodeUrl(size) {
    return config.API_BASE_URL + '/tker/qrcode/' + size;
}

// 获取名片二维码
export function getVcardQrCodeUrl(id, size) {
    // config.API_BASE_URL + '/vcard/qrcode/' + this.vcardResult.id + '/320';
    return config.API_BASE_URL + '/vcard/qrcode/' + id + '/' + size;
}

// 获取艾乐卡资讯地址，作为打赏与红包的回调地址
export function getIlokaContentUrl(params) {
    const query = urlSerialization(params);
    return config.ILOKA_URL + '/mobile.html?' + query;
}
