/**
 * Created by Asoiso on 16/8/16.
 */
import http from '../util/http';
import config from '../config';

// 绑定手机号
export function register(mobile, code) {

    return http.post('member/wechat/mobile/{mobile}/{code}', {
        v: new Date().getDate()
    }, {
        params: {
            mobile,
            code
        }
    });
}

// 登陆
export function login(uin, openid) {
    return http.get('/buy/api/wechat/openid/{uin}/mall', {
        uin,
        openid
    });
}

export function logout() {
    return http.get('/buy/logout');
}

// 修改会员基本信息
export function updateMemberInfo({
    birthday,
    headImg,
    name,
    sex,
}) {
    return http.post('member/info/basic', {
        birthday,
        headImg,
        name,
        sex,
    });
}

// 获取会员基地信息
export function getMemberInfo(params) {
    return http.get('member/info/detail', params);
}

// 获取地址列表
export function getAddresses() {
    return http.get('member/address');
}

//获取我的虚拟资产
export function getAsset({
    vatype = 'integral'
}) {
    return http.get('member/asset/{vatype}', {
        vatype
    });
}

//获取我的会员余额
export function getBalance() {
    return http.get('member/balance');
}


//获取我的虚拟资产流水
export function getAssetFlow({
    vatype = '',
    type = '',
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.get('member/asset/{vatype}/list', {
        vatype,
        type,
        page,
        size,
        sort,
        order
    });
}

//获取我的订单列表
export function getOrderList({
    buyType,
    status,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {

    return http.get('member/{buyType}/order/list', {
        buyType,
        status,
        page,
        size,
        sort,
        order
    });
}

//获取我的未支付订单列表
export function getUnpaidOrderList({
    buyType,
    page = 0,
    size = config.SIZE,
    sort,
    order,
    value,
    switchValue
}) {

    return http.get('member/{buyType}/order/unpaid/list', {
        buyType,
        page,
        size,
        sort,
        order,
        value,
        switchValue
    });
}

//删除我已完成的订单
export function delFinishedOrder({id}) {

    return http.delete('member/mall/order/{id}', {
        id
    });
}

// 添加地址
export function addAddress(params) {
    return http.post('member/address', params);
}

// 删除会员地址
export function delAddress(id) {
    return http.delete('member/address/{id}', {
        id
    });
}

//更新地址
export function updateAddress(params) {

    return http.post('member/address/{id}', params, {
        params: {
            id: params.id
        }
    });
}

//会员充值
export function memberCharge(params) {
    return http.post('member/deposit', params, {
        params: {
            money: params.money,
            payType: params.payType,
            callBackPage: params.callBackPage
        }
    });
}
//一元购提交领奖
export function updateYYGAwardInfo({
    id,
    address
}) {
    return http.post('member/yyg/order/accept/{id}', address, {
        params: {
            id: id
        }
    });
}

// 获取员工通道详细信息
export function getMemberEmployeeInfoDetail(clientInfo) {
    return http.get('member/employee/info/detail', clientInfo);
}

// 获取员工通道详细信息
export function getMemberEmployeeInfoTop({
    dataType,
    topType,
    type = '',
    page = 0,
    size = config.SIZE,
    clientInfo,
}) {
    return http.get('member/employee/info/top/{dataType}/{topType}', {
        dataType,
        topType,
        type,
        page,
        size,
        clientInfo,
    });
}


//对我的已经完成的订单进行晒图
export function updateShowOrder({
    id,
    data
}) {
    return http.post('member/mall/order/show/{id}', data, {
        params: {
            id
        }
    });
}


// 获取激励
export function getMemberexcitation() {
    return http.get('member/employee/excitation');
}

//对未支付的订单进行取消操作
export function updateOrderStatus(id) {
    return http.post('member/mall/order/cancel/{id}', null, {
        params: {
            id
        }
    });
}

//获取会员卡样式
export function getcardStyle() {
    return http.get('member/card/style');
}

// 对未支付的订单进行支付操作
export function updateUnpaidOrder({
    id, payType
}) {
    return http.post('member/mall/order/pay/{payType}/{id}', null, {
        params: {
            id,
            payType
        }
    });
}

// 提供会员制作自动的微名片
export function updateMemberVcard(data) {
    return http.post('member/vcard', data);
}

// 获取会员微名片
export function getMemberVcard() {
    return http.get('member/vcard');
}
