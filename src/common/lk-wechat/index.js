/**
 * @module wechat
 */
import _ from 'lodash';
const JWEIXIN = 'http://res.wx.qq.com/open/js/jweixin-1.1.0.js';
let isInit = false;
let isLoaded = false;
let callbacks = [];

// 通过config接口注入权限验证配置
export function init(opts) {
    if (isInit) {
        return;
    }
    // 引入JS文件
    if (!window.wx) {
        var script = document.createElement('script');
        script.src = JWEIXIN;
        script.onload = function () {
            config(opts);
            isLoaded = true;
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    } else {
        config(opts);
    }
    isInit = true;
}


// 通过error接口处理失败验证
function config(opts) {
    opts = _.assign({
        debug: false,  // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '',     // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '',  // 必填，生成签名的随机串
        signature: '', // 必填，签名，见附录1
        jsApiList: [   // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        ]
    }, opts);

    wx.config(opts);

    if (callbacks.length > 0) {
        for (let i = 0; i < callbacks.length; i++) {
            wx.ready(callbacks[i]);
        }
        callbacks.length = 0;
    }

    //wx.error(function (res) {
    //    alert("微信配置错误:" + res.errMsg);
    //});
}

// 通过ready接口处理成功验证
export function ready(callback) {
    if (!isLoaded) {
        callbacks.push(callback);
    } else {
        wx.ready(callback);
    }
}

// 设置微信分享信息
export function wxShare(opts) {
    opts = _.assign({
        title: '', //分享标题
        desc: '', //分享内容
        link: '', //分享连接
        imgUrl: '', //分享图片地址
        success: function () {

        }
    }, opts);

    // opts.imgUrl = 'http://img.hoop8.com/1608D/k90r62Uf.jpg';
    //分享给朋友
    wx.onMenuShareAppMessage(opts);

    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: (opts.title ? '【' + opts.title + '】' : '') + opts.desc,
        link: opts.link,
        imgUrl: opts.imgUrl,
        success: opts.success,
    });

    //分享到QQ
    wx.onMenuShareQQ(opts);

    //分享到微博
    wx.onMenuShareWeibo(opts);

}

function noop() {
}


// 设置微信支付
export function wxPay(opts) {
    opts = _.assign({
        timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: '', // 支付签名随机串，不长于 32 位
        package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: '', // 支付签名
        success: noop, // 支付成功后的回调函数
        fail: noop,   // 支付失败后的回调函数
        cancel: noop // 支付取消后的回调函数
    }, opts);

    //微信支付
    wx.chooseWXPay(opts);
}


// 微信拍照上传图片
export function wxChooseImage(opts) {
    // 上传图片配置
    opts = _.assign({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        successCallback: noop
    }, opts);
    wx.chooseImage({
        count: opts.count,
        sizeType: opts.sizeType,
        sourceType: opts.sourceType,
        success: function (res) {
            uploadimage(res.localIds[0]);
        },
    });

    function uploadimage(img) {
        wx.uploadImage({
            localId: img,
            success: function (res) {
                opts.successCallback(res.serverId);
            }
        });
    }
}
