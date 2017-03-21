import './index.less';
import _ from 'lodash';

let OPTIONS = {
    env: 'prd',
    site: 'm'
};

export const PAY_TYPE = {
    // 微信支付
    WECHAT: 'wechat',
    // 支付宝支付
    ALIPAY: 'alipay',
    // 银联支付
    UNIONPAY: 'unionpay',
    // 余额支付
    BALANCE: 'balance'
};

const PAY_URL = {
    PRODUCTION: {
        WECHAT: 'http://common.iloka.me/payment/wechat.html',
        ALIPAY: ''
    },
    TESTING: {
        WECHAT: 'http://common.vveshow.com/payment/wechat.html',
        //WECHAT: 'http://127.0.0.1:8063/payment/wechat.html',
        ALIPAY: ''
    }
};


function _getPayUrl(type, params) {
    let payUrl = (OPTIONS.env == 'prd' ? PAY_URL['PRODUCTION'] : PAY_URL['TESTING'])[type];

    var mapParams = [];
    for (var key in params) {
        if (params.hasOwnProperty(key) && params[key]) {
            mapParams.push(key + '=' + encodeURIComponent(params[key]));
        }
    }

    return payUrl + '?' + mapParams.join('&');
}

export function setOptions(key, val) {
    var obj = {};
    if (_.isString(key)) {
        obj[key] = val;
    } else {
        obj = key;
    }
    return _.merge(OPTIONS, obj);
}

export function getOptions(key) {
    return OPTIONS[key];
}

/**
 * opts.type
 * opts.url
 * opts.success
 * opts.error
 * @param opts
 */
export function pay(type, opts) {
    switch (type) {
        case PAY_TYPE.WECHAT:
            wechat(opts);
            break;
        case PAY_TYPE.ALIPAY:
            // 支付宝支付
            alipay(opts);
            break;
        case PAY_TYPE.UNIONPAY:
            unionpay(opts);
            break;
        case PAY_TYPE.BALANCE:
            // 微信支付
            balance(opts);
            break;
        default:
            throw new Error('缺少支付方式');
    }
}

// 微信支付 platformParams={page,uin}
export function wechat({redirectUrl = location.href, platformParams, payParams}) {

    let params = _.merge({
        url: redirectUrl,
        payParams: JSON.stringify(payParams),
        origin: `${OPTIONS.env}.${OPTIONS.site}.${platformParams.page}.${platformParams.uin}`
    });

    var payUrl = _getPayUrl('WECHAT', params);

    // /payment/wechat.html?origin={env}.{site}.{page}.{uin}&payParams={payParams}&url={url}
    return location.replace(payUrl);

    /*
     // POST提交
     function setFiled(key, val) {
     var input = document.createElement('input');
     input.type = 'hidden';
     input.name = key;
     input.value = val;
     form.appendChild(input);
     }
     var form = document.createElement('form');
     form.action = payUrl;
     form.method = 'POST';
     setFiled('payParams', JSON.stringify(payParams));
     setFiled('redirectUrl', redirectUrl);
     document.body.appendChild(form);
     try {form.submit();} catch (ex) {}
     */
}

// 支付宝支付
export function alipay(opts) {
    // 动态创建iframe,链接到支付宝
    var payUrl = opts.payParams;
    let iframeContainer = document.createElement('div');
    document.documentElement.className += ' lk-payment-lock';
    iframeContainer.className = 'lk-payment-alipay lk-payment-alipay-loading';
    iframeContainer.innerHTML = '<span class="lk-payment-alipay-cancel"><i>取消支付</i></span><div class="lk-payment-alipay-tips">支付宝加载中...</div>';

    let iframe = document.createElement('iframe');
    iframe.src = payUrl;
    iframe.frameBorder = 'no';
    iframe.width = '100%';
    iframe.height = '100%';

    // 支付宝加载后,关闭加载状态
    iframe.addEventListener('load', function () {
        iframeContainer.className = 'lk-payment-alipay';
    }, false);

    iframeContainer.appendChild(iframe);
    document.body.appendChild(iframeContainer);

    // 取消支付按钮事件
    let alipayCancel = iframeContainer.querySelector('.lk-payment-alipay-cancel');
    alipayCancel.addEventListener('click', function () {
        cleanPayer();
        if (typeof opts.cancel == 'function') {
            opts.cancel();
        }
    }, false);

    // 清理支付对象
    function cleanPayer() {
        iframeContainer.style.display = 'none';
        window.removeEventListener('popstate', cleanPayer);
        document.body.removeChild(iframeContainer);
        document.documentElement.className = document.documentElement.className.replace(/lk-payment-lock/g, '');
    }

    // hash改变的时候,清理支付对象
    window.addEventListener('popstate', cleanPayer);
}

// 银联支付
export function unionpay(opts) {
    return opts;
}

// 余额支付
export function balance(opts) {
    return opts;
}
