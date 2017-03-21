/**
 * Created by Asoiso on 16/8/16.
 */
import http from '../util/http';

// C端中奖消息通知
export function getNotification() {
    return http.get('notification/next');
}

// 发送短信验证码
export function sendCaptcha(mobile) {
    return http.get('sms/captcha/{mobile}', {
        mobile
    });
}

// 上传媒体图片
export function addMedia({
    mediaId,
    owner,
    restype,
    mediaChannel,
    uin,
    isLib = false,
}) {
    var addData = new FormData();
    return http.post('media/{owner}/{restype}', addData, {
        params: {
            owner,
            mediaId,
            restype,
            mediaChannel,
            uin,
            isLib,
        }
    });
}

// 获取微信jsTicket
export function getWechatTicket({
    channel,
    uin,
    intercode,
    url
}) {
    return http.get('/buy/api/wechat/jsapi/{channel}/{uin}/{intercode}', {
        channel,
        uin,
        intercode,
        url
    });
}

//base64图片接口
export function updateBase64({
    owner,
    restype,
    data
}) {
    return http.post('media/img/{owner}/{restype}', data, {
        params: {
            owner,
            restype
        }
    });
}

// 获取指定的会员微名片数据
export function getMemberVcardById(id) {
    return http.get('vcard/{id}', {
        id
    });
}

//获取二维码图片
export function getMediaQrcode({
    width,
    height,
    content
}) {
    return http.get('media/qrcode/{width}/{height}', {
        width,
        height,
        content
    });
}


// GET /api/v1/{client}/{channel}/countly/redirect/{from} 通用跳转计数请求
export function countlyRedirect({channel, from, url}) {
    return http.get('/iloka/api/v1/m/{channel}/countly/redirect/{from}', {
        channel,
        from,
        url
    });
}
