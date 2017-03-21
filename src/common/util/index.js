import dom from './dom';

export function noop() {
}
export function isEmptyObject(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}

export function setDocTitle(title) {
    document.title = title;
    // 部分手机不能动态设置title，需要通过hack的手段处理~~
    if ((/iphone|ipad/gi).test(window.navigator.appVersion)) {
        let iframe = document.createElement('iframe');
        iframe.src = '/favicon.ico';
        iframe.frameBorder = 'no';
        iframe.style.width = '0';
        iframe.style.height = '0';
        let $iframe = dom(iframe);
        let fn = function () {
            setTimeout(() => {
                $iframe.off('load', fn).remove();
            }, 0);
        };
        $iframe.on('load', fn);
        document.body.appendChild(iframe);
    }
}

/**
 * @description 占位符格式化
 * @param {String} str 需要替换的模板
 * @param {Object} params 参数
 * @param {Boolean} isEncode 是否编码
 * @eg demo("http://www.baidu.com?name={name}&age={age}&chanelid={chanelid}",{name:"demo",age:23,chanelid:100},false)
 * @return {String} str 返回结果 http://www.baidu.com?name=demo&age=23&chanelid=100
 */
export function format(str, params, isEncode) {
    if (typeof params == 'object') {
        for (var key in params) {
            if (!exists(params[key]) || params[key] == 'undefined' || params[key] == 'null') {
                params[key] = '';
            }

            str = str.replace(new RegExp('\\{' + key + '\\}', 'ig'), isEncode ? encodeURIComponent(params[key]) : params[key]);
        }
    }
    return str;
}

// 页面底部位置
export function reachBottom(inHeight) {
    if (window.scrollY > 0 && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - (inHeight || 0)) {
        return true;
    }
    return false;
}

/**
 * @description 判断变量是否存在,或者是否以某种类型存在
 * @param {object} o  判断变量是否存在
 * @param {object} type 数据类型  Number,Boolean等
 * @return {Boolean} nResult 返回结果 true或者false
 */
export function exists(o, type) {
    return o != undefined && o !== null && (type ? o.constructor == type : true);
}


/**
 * @hasClass 判断dom是否存在对应的class
 * @dom {dom} element
 * @className {String}  class名称
 * @return {Boolean}
 */
export function hasClass(dom, className) {
    className = className.replace(/^\s|\s$/g, '');
    return (
            ' ' + ((dom || {}).className || '').replace(/\s/g, ' ') + ' '
        ).indexOf(' ' + className + ' ') >= 0;
}

/**
 * @closest 从元素本身开始，在DOM 树上逐级向上级元素匹配，并返回最先匹配的祖先元素。以数组的形式返回与选择器相匹配的所有元素，从当前元素开始，在 DOM 树中向上遍历。
 * @return {ele}
 */
export function closest(el, selector) {
    var matchesFn;

    // find vendor prefix
    ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] == 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    });

    var parent;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }

    return null;
}

/**
 * @description 把任意类型转成Boolean
 * @param {object} o  任意对象
 * @return {Boolean} nResult 返回结果 true或者false
 */
export function parseBoolean(o) {
    var flag = !!o;
    return (flag && typeof(o) == 'string' && (o
        .toLowerCase() == 'false' || o.toLowerCase() == 'null' || o.toLowerCase() == 'undefined' || o == '0')) ? false : flag;
}

export function booleanToString(value, caseType) {
    return parseBoolean(value).toString()[caseType == 'upper' ? 'toUpperCase' : 'toLowerCase']();
}

/**
 * @description 把字符串自动转换成它原来的类型
 * @param val o  任意对象
 * @return val any
 */
export function parseAny(val) {
    if (typeof val == 'string') {
        if (val != '' && !isNaN(val) && val < 2147483647) {
            val = val - 0;
        } else if (val.toLowerCase() == 'true') {
            val = true;
        } else if (val.toLowerCase() == 'false') {
            val = false;
        }
    }
    return val;
}

/**
 * @description 将?key1=value1&key2=value2&...转换成一个对象{key1:value1,key2:value2....}
 * @param {String} string  String字符串
 * @return {Object} obj 返回结果 {key1:value1,key2:value2....}
 */
export function parseParam(str) {
    var obj = {};
    if (str == undefined || str == null) {
        return obj;
    }

    if (typeof str == 'object') {
        return str;
    }

    if (typeof str == 'string') {
        str = decodeURIComponent(str);
    }

    //踢出前缀#或者？
    str = str.replace(/^[\?\#]/, '');
    //分割参数
    var params = str.split('&');

    for (var i = 0; i < params.length; i++) {
        var item = params[i].split('=');
        var key = item[0];
        var val = item[1];

        if (!key) {
            continue;
        }

        //类型转换
        if (val == undefined) {
            val = true;
        } else {
            val = parseAny(val);
        }
        obj[key] = val;
    }
    return obj;
}

// 获取安全的数据
export function getSafeValue(val, defaultVal) {
    defaultVal = exists(defaultVal) ? defaultVal : '';
    return exists(val) ? val : defaultVal;
}


/**
 * 将url链接进行序列化
 */

export function urlSerialization(data) {
    let arr = [];
    let str = '';
    for (var i in data) {
        if (!data[i] === '' || data[i]) {
            arr.push(i + '=' + data[i]);
        }
    }
    str = arr.join('&');
    return str;
}


export * from './dom';
export * from './snabbt';

