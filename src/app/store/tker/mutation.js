import {
    GET_TKER_MEMBER_FRIENDS_SUCCESS,

    GET_TKER_MEMBER_INFO_SUCCESS,
    GET_TKER_MEMBER_PRODUCT_DIVIDEND_SUCCESS,
    GET_TKER_MEMBER_PRODUCT_PROFIT_SUCCESS,

    UPDATE_TKER_SUCCESS,

    OPEN_TIKER_SELLER_SUCCESS,
    GET_TKER_MEMBER_PRODUCT_LIST_SUCCESS,
    GET_ENTRY_PRODUCT_LIST_SUCCESS
} from './action';
import _ from 'lodash';
import {TKER_TYPE} from '../../config/constants';
import {getSafeValue} from 'common/util';
import {getMallProductShowUrl, getHomeUrl, getTKerProductUrl} from '../../util/url';


// 默认统计数据
const _defaultSummary = {
    // 集客好友
    'members': 0,
    // 分销商品
    'products': 0,
    // lv1~lv3 间接红利
    'profit': {
        // 直接佣金
        'lv0': 0,
        'lv1': 0,
        'lv2': 0,
        // 历史总收益
        'total': 0,
        // 间接红利
        'dividend': 0
    },
    // 成交订单数
    'orders': {
        'lv0': 0,
        'lv1': 0,
        'lv2': 0,
        'total': 0
    },
    // 成交商品数
    'amount': {
        'lv0': 0,
        'lv1': 0,
        'lv2': 0,
        'total': 0
    },
    'account': {
        // 正在提现的金额
        'pending': 0,
        // 已提现金额
        'cleared': 0,
        // 可提现金额
        'available': 0,
        // 未提现金额
        'withdrawals': 0
    }
};

const state = {
    //推客任务
    tasks: {
        tkersite: {}, // 个人分销首页
        tker: {},
        product: {},  // 商品
        content: {},  // 资讯
        h5: {},       // H5
        site: {}      // 主站入口(商城)
    },
    // 是否开启推客
    isOpened: false,
    // 当前推客会员的推客数据
    summary: _.assign({}, _defaultSummary),
    // 集客好友列表
    friends: {},
    // 当前推客的商品列表
    memberProductList: {},
    // 推客入口的商品列表
    entryProductList: {},
    // 当前推客的佣金列表
    memberProductProfitList: {},
    // 当前推客的红利列表
    memberProductDividendList: {}

};

const mutations = {
    // 开启推客
    [OPEN_TIKER_SELLER_SUCCESS](state){
        state.isOpened = true;
    },

    // 当前推客会员的推客数据
    [GET_TKER_MEMBER_INFO_SUCCESS](state, {payload}){
        let summary = _.merge(_defaultSummary, payload.data);

        // 间接红利
        summary.profit.dividend = summary.profit.total - summary.profit.lv0;

        // 可提现金额
        summary.account.available = summary.account.withdrawals >= 10 ? summary.account.withdrawals : 0;

        state.summary = summary;
    },

    [GET_TKER_MEMBER_FRIENDS_SUCCESS](state, {payload}){
        state.friends = payload.data;
    },

    // 领取tker任务
    [UPDATE_TKER_SUCCESS](state, {payload}){
        const {params, data} = payload;
        const type = params.type;
        if (type) {
            //data = id, uin, url
            let originUrl = '';
            switch (type) {
                // 商品
                case TKER_TYPE.PRODUCT:
                    // pid: item.productId
                    // http://mall.sit.vveshow.com/dev/#!/product/show/57d252a40f93d51836b65b14?type=mall
                    originUrl = getMallProductShowUrl(data.uin, params.productDesc.pid, 'mall', true);
                    break;
                // 个人分销首页
                case TKER_TYPE.TKER_SITE:
                    originUrl = getTKerProductUrl(data.uin, true);
                    break;
                // 主站入口(商城)
                case TKER_TYPE.SITE:
                    originUrl = getHomeUrl(data.uin, true);
                    break;
            }

            let tkerUrl = data.url + (originUrl ? '?url=' + encodeURIComponent(originUrl) : '');
            state.tasks[payload.params.type] = {
                time: new Date().getTime(),
                url: tkerUrl,
                id: data.id
            };
        }
    },

    [GET_TKER_MEMBER_PRODUCT_PROFIT_SUCCESS](state, {payload}){
        state.memberProductProfitList = payload.data;
    },

    // 获取当前推客的商品列表
    [GET_TKER_MEMBER_PRODUCT_LIST_SUCCESS](state, {payload}){
        let list = payload.data.content;
        list.map((item)=> {
            item.opdata = _.merge({
                tkerData: {
                    amount: {},
                    orders: {},
                    profit: {}
                },
                tradeData: {}
            }, item.opdata);
            item.distribution = true;
            item.creditRecieved = getSafeValue(item.opdata.tkerData.amount.lv0, 0);
        });
        state.memberProductList = payload.data;
    },
    // 获取当前推客的商城商品列表
    [GET_ENTRY_PRODUCT_LIST_SUCCESS](state, {payload}){
        let list = payload.data.content;
        list.map((item)=> {
            item.opdata.tradeData = item.opdata.tradeData || {};
            item.opdata = _.merge({
                tradeData: {
                    amount: 0
                }
            }, item.opdata);
            item.distribution = true;
            item.creditRecieved = item.opdata.tradeData.amount;
        });
        state.entryProductList = payload.data;
    },
    // 获取当前推客的佣金列表
    [GET_TKER_MEMBER_PRODUCT_PROFIT_SUCCESS](state, {payload}){
        state.memberProductProfitList = payload.data;
    },
    // 获取当前推客的红利列表
    [GET_TKER_MEMBER_PRODUCT_DIVIDEND_SUCCESS](state, {payload}){
        let memberProductDividendList = [];

        if (payload.data) {
            payload.data.content.map((item)=> {

                let sales = '';

                item.opdata.tkerDataList.map((data)=> {

                    sales += data.totalAmount;

                });

                item.sales = sales;

                memberProductDividendList.push(item);

            });

            payload.data.content = memberProductDividendList;

            state.memberProductDividendList = payload.data;
        } else {
            state.memberProductDividendList = memberProductDividendList;
        }
    }


};

export default {
    state,
    mutations
};
