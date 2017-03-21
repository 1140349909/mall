window.__uri = function (path) {
    return path;
};
// 所属平台
const PLATFORM = 'buy';

const ILOKA = 'iloka';

// 来源
const ORIGID = (location.search.match(new RegExp('(?:\\?|&)origid=(.*?)(?=&|$)')) || ['', ''])[1];

// 所属客户端
const CLIENT = (location.search.match(new RegExp('(?:\\?|&)client=(.*?)(?=&|$)')) || ['', 'w1'])[1];

// 所属渠道
const queryChannel = (location.search.match(new RegExp('(?:\\?|&)channel=(.*?)(?=&|$)')) || ['', 'link'])[1];

const CHANNEL = (location.hash.match(new RegExp('channel=(.*?)(?=&|$)')) || ['', queryChannel])[1];

// http://mall.iloka.me/?uin=dev
const queryUin = (location.search.match(new RegExp('(?:\\?|&)uin=(.*?)(?=&|$)')) || [])[1];
// http://mall.iloka.me/dev

// 先取地址中的uin,再取query中的
const UIN = (location.pathname.match(/^\/(\w+)\/?$/) || ['', queryUin])[1];


let ENV = '@ENV@';

let API_ORIGIN = '';
let ILOKA_URL = '';
let MALL_ORIGIN = '';
switch (ENV) {
    default:
        ENV = 'dev';
        MALL_ORIGIN = location.origin;
        API_ORIGIN = 'http://api.dev.vveshow.com';
        ILOKA_URL = 'http://iloka.dev.vveshow.com';
        break;
    case 'sit':
        ENV = 'sit';
        MALL_ORIGIN = 'http://m.sit.vveshow.com';
        API_ORIGIN = 'http://api.sit.vveshow.com';
        ILOKA_URL = 'http://iloka.sit.vveshow.com';
        break;
    case 'uat':
        MALL_ORIGIN = 'http://m.uat.vveshow.com';
        API_ORIGIN = 'http://api.uat.vveshow.com';
        ILOKA_URL = 'http://iloka.uat.vveshow.com';
        break;
    case 'prd':
        MALL_ORIGIN = 'http://m.iloka.me';
        API_ORIGIN = 'http://api.linkin.mobi';
        ILOKA_URL = 'http://www.iloka.me';
        break;
}

const API_ROOT = API_ORIGIN + '/' + PLATFORM;  // http://api.sit.vveshow.com/buy
const API_BASE_PATH = '/api/v1/' + CLIENT + '/' + CHANNEL; //api/v1/{client}/{channel}
const API_BASE_URL = API_ROOT + API_BASE_PATH;  //http://api.sit.vveshow.com/buy/api/v1/{client}/{channel}

const API_ILOKA_ROOT = API_ORIGIN + '/iloka'; // http://api.sit.vveshow.com/iloka
const API_ILOKA_URL = API_ILOKA_ROOT + API_BASE_PATH;

const CND_ORIGIN = 'http://cdn.vveshow.com';
// 商城
const MEDIA_BASE_URL = ENV == 'prd' ? CND_ORIGIN + API_BASE_PATH : API_BASE_URL;

/*const path = location.pathname;

 let site,name;
 if (path.indexOf('/yyg') > -1) {
 site = 'yyg';
 name = '一元购';
 } else if (path.indexOf('/mall') > -1) {
 site = 'mall';
 name = '商城';
 }*/

export default {
    //站点标识
    SITE: 'm',

    UIN,

    NAME: '我的艾乐卡微站',

    // 分页加载数量
    SIZE: 20,

    ORDER: 'desc',

    // 所属平台
    PLATFORM,

    ILOKA,

    // 来源
    ORIGID,

    // 所属客户端
    CLIENT,

    // 所属频道
    CHANNEL,

    // 当前所在的环境 sit|uat|prd
    ENV,

    RELEASED: ENV == 'prd',

    // 版本号
    VERSION: '@VERSION@',

    // 默认首页地址
    HOME: 'index',

    MALL_ORIGIN,

    API_ORIGIN,

    API_ROOT,

    API_BASE_PATH,

    API_BASE_URL,

    CND_ORIGIN,

    MEDIA_BASE_URL,

    ILOKA_URL,

    API_ILOKA_ROOT,

    API_ILOKA_URL,

    // 热销产品数
    HOT_LIMIT_COUNT: 10,

    // dev调试openid,仅在非微信环境生效,用此用户登陆,每次修改递增最后一位,登陆账号手机号为末尾11位数字
    // DEBUG_OPENID: 'LINKIN0123456789M17000000005'  LINKIN0123456789M17082101120
    DEBUG_OPENID: 'LINKIN0123456789M17000000005'
};
