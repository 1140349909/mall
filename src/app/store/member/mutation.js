import {
    CAPTCHA_PENDING,
    CAPTCHA_SUCCESS,
    CAPTCHA_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_PENDING,
    REGISTER_FAILURE,
    LOGOUT_SUCCESS,
    GET_MEMBER_INFO_SUCCESS,
    GET_MEMBER_INFO_PENDING,
    GET_MEMBER_INFO_FAILURE,
    GET_ASSET_SUCCESS,

    GET_ASSET_FLOW_PENDING,
    GET_ASSET_FLOW_SUCCESS,
    GET_BALANCE_SUCCESS,
    ADD_MEDIA_SUCCESS,
    ADD_MEDIA_PENDING,
    ADD_MEDIA_FAILURE,
    UPDATE_MEMBER_INFO_SUCCESS,
    UPDATE_MEMBER_INFO_PENDING,
    GET_CARD_STYLE_SUCCESS,
    GET_CARD_STYLE_PENDING,
    GET_CARD_STYLE_FAILURE,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_PENDING,
    DEL_ADDRESS_SUCCESS,
    DEL_ADDRESS_PENDING,
    UPDATE_ADDRESS_SUCCESS,
    GET_ADDRESS,
    GET_ADDRESSES_SUCCESS,
    GET_ADDRESSES_PENDING,
    UPDATE_ADDRESS_PENDING,
} from './action';
import _ from 'lodash';

const _defaultCard = {
    style: {
        bgColor: '#fff',
        alpha: 100,
        bgImg: '5874b03758963737b6304fdc',
        fontColor: '#fff',
        bgRadio: 'img',
        title: '卡券标题',
    },
    title: '卡券标题',
};

const state = {

    // 当前列表项
    items: {},

    // 当前项
    item: {},

    // 用户token
    token: null,

    // 用户信息
    info: {
        data: null,
        status: '',
    },

    // 是否登陆
    isLogined: false,

    // 是否注销
    isLogouted: false,

    isLoaded: false,

    // 验证码
    captcha: {
        type: '',  // 验证码业务类型
        status: '' // 验证码发送状态
    },

    // 虚拟资产
    asset: {
        // 积分
        integral: 0,
        // 余额
        money: 0,
        // 优惠券
        coupons: 0
    },

    // 会员卡
    card: _.assign({}, _defaultCard),

    flow: {
        content: [],
        status: ''
    },

    media: {
        data: null,
        status: '',
        params: ''
    },

    // 地址
    address: {
        list: null,
        status: '',
    },

    // 默认地址
    oftenAddress: null,
    err: {},

};

const mutations = {
    [CAPTCHA_PENDING](state, {meta}){
        state.captcha = {
            type: meta.type,
            status: 'pending'
        };
    },

    [CAPTCHA_SUCCESS](state, {meta}){
        state.captcha = {
            type: meta.type,
            status: 'success'
        };
    },
    [CAPTCHA_FAILURE](state, {meta}){
        state.captcha = {
            type: meta.type,
            status: 'failure'
        };
    },

    [REGISTER_SUCCESS](state, {payload}){
        state.isLogined = true;
        state.isLogouted = true;
        state.token = payload.data;
    },

    [REGISTER_PENDING](state){
        state.isLogined = null;
    },

    [REGISTER_FAILURE](state, {payload}){
        state.err = {
            errCode: payload.errCode,
            errMsg: payload.errMsg,
        };
    },

    [LOGOUT_SUCCESS](state){
        state.token = null;
        state.info.data = null;
        state.isLogined = false;
        state.isLogouted = false;
    },


    [GET_ASSET_SUCCESS](state, {payload}){
        if (payload.data) {
            state.asset.status = 'success';
            if (payload.params.vatype == 'integral') {
                state.asset.integral = payload.data.v ? payload.data.v : 0;
            }
        } else {
            state.asset.status = 'unknown';
        }
    },

    // 上传头像 success
    [ADD_MEDIA_SUCCESS](state, {payload}) {
        state.media.status = 'add';
        state.media.data = payload.data;
        state.media.params = payload.params;
    },

    // 上传头像 pending
    [ADD_MEDIA_PENDING](state) {
        state.media.status = 'pending';
    },

    // 上传头像 failure
    [ADD_MEDIA_FAILURE](state) {
        state.media.status = 'failure';
    },

    // 更新用户信息 success
    [UPDATE_MEMBER_INFO_SUCCESS](state, {payload}){
        state.item = payload.data;
        state.info.status = 'update';
    },

    // 更新用户信息 pending
    [UPDATE_MEMBER_INFO_PENDING](state){
        state.info.status = 'pending';
    },

    [GET_MEMBER_INFO_SUCCESS](state, {payload}){
        let data = payload.data;
        data.isImprove = !!data.name;
        state.isLogined = true;
        state.isLogouted = true;
        state.isLoaded = true;
        state.item = payload.data;
        state.asset.integral = payload.data.asset.integral;
        state.asset.coupons = payload.data.asset.coupons;
        //现金回显的是“分”，故要换算成“元”除以100
        state.asset.money = payload.data.asset.money / 100;
        state.info.data = payload.data;
        state.info.status = 'get';
    },

    [GET_MEMBER_INFO_PENDING](state) {
        state.info.data = {};
        state.info.status = 'pending';
    },

    [GET_MEMBER_INFO_FAILURE](state){
        state.token = null;
        state.info.data = null;
        state.isLogined = false;
        state.isLogouted = false;
        state.isLoaded = true;
        state.info.status = 'failure';
    },

    [GET_BALANCE_SUCCESS](state, {payload}){

        if (payload.data) {
            //回显的是“分”，故要换算成“元”除以100
            state.asset.money = payload.data ? payload.data / 100 : -1;
            //console.log(state.asset.money);
        }
    },

    // 获取会员卡样式
    [GET_CARD_STYLE_SUCCESS](state, {payload}){
        if (payload.data) {
            state.card = payload.data;
        } else {
            state.card = _.assign({}, _defaultCard);
        }
    },

    // 获取会员卡样式PENDING
    [GET_CARD_STYLE_PENDING](state){
        state.card = null;
    },

    // 获取会员卡样式PENDING
    [GET_CARD_STYLE_FAILURE](state){
        state.card = _.assign({}, _defaultCard);
    },


    [GET_ASSET_FLOW_SUCCESS](state, {payload}){
        state.flow.result = payload.data;

        state.flow.status = 'success';

        const dataList = payload.data.content;
        let list = [];
        for (let i = 0; i < dataList.length; i++) {

            let name = '',
                score = '';

            switch (dataList[i].type) {
                case 'deposit':
                    switch (dataList[i].payType) {
                        case 'alipay':
                            name = '支付宝充值';
                            break;
                        case 'wechat':
                            name = '微信充值';
                            break;
                    }
                    score = dataList[i].money / 100;
                    break;
                case 'withdraw':
                    name = dataList[i].productDesc.name;
                    score = dataList[i].money / 100;
                    break;
            }

            if (dataList[i].v) {
                name = dataList[i].productDesc ? dataList[i].productDesc.name : '暂无';
                score = dataList[i].v;
            }

            let data = {
                id: dataList[i].id,
                name: name,
                desc: '等待后台提供',
                date: dataList[i].lastModifiedDate,
                //积分或现金
                //现金回显的是“分”，故要换算成“元”除以100
                score: score
            };
            list.push(data);
        }
        state.flow.content = list;

    },

    [GET_ASSET_FLOW_PENDING](state){
        state.flow.status = 'pending';
    },

    // 获取地址
    [GET_ADDRESS](state, {payload}){

        let item;
        const id = payload;

        for (let i = 0; i < state.addressList.length; i++) {
            if (state.addressList[i].id == id) {
                item = state.addressList[i];
                break;
            }
        }
        state.item = item;
    },

    // 获取地址列表
    [GET_ADDRESSES_SUCCESS](state, {payload}){
        let items = {};
        let hasOften = false;
        let list = [];
        if (payload.data) {
            list = payload.data;
            list.forEach(item => {
                items[item.id] = item;
                if (item.often) {
                    state.oftenAddress = item;
                    hasOften = true;
                    return false;
                }
            });
        }

        if (!hasOften) {
            state.oftenAddress = null;
        }
        state.address.list = list;
        state.items = items;
    },

    // 获取地址列表进行
    [GET_ADDRESSES_PENDING](state){
        state.address.list = null;
    },

    // 添加地址
    [ADD_ADDRESS_SUCCESS](state){
        state.address.status = 'add';
    },

    // 添加地址进行中
    [ADD_ADDRESS_PENDING](state){
        state.address.status = 'pending';
    },

    // 更新地址
    [UPDATE_ADDRESS_SUCCESS](state, {payload}){

        let item = payload.params;
        let list = state.address.list;

        if (item.often) {
            _.map(state.address.list, (obj, index) => {
                if (obj.often) {
                    list[index].often = false;
                }
            });
        }

        // TODU: 写法很冗余,对象不可覆盖vue的对象类型
        _.map(state.address.list, (obj, index) => {
            if (list[index].id == item.id) {
                list[index].city = item.city;
                list[index].createdDate = item.createdDate;
                list[index].mobile = item.mobile;
                list[index].name = item.name;
                list[index].often = item.often;
                list[index].prov = item.prov;
                list[index].region = item.region;
                list[index].status = item.status;
                list[index].street = item.street;
            }
        });

        state.address.list = list;
        state.address.status = 'update';
    },

    // 更新地址进行中
    [UPDATE_ADDRESS_PENDING](state){
        state.address.status = 'pending';
    },

    // 删除地址
    [DEL_ADDRESS_PENDING](state){
        state.address.status = 'pending';
    },

    // 删除地址
    [DEL_ADDRESS_SUCCESS](state){
        state.address.status = 'del';
    }
};

export default {
    state,
    mutations
};
