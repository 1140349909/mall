import * as apiMember from '../../api/member';
import * as apiCommon from '../../api/common';

export const CAPTCHA = 'CAPTCHA';
export const CAPTCHA_PENDING = 'CAPTCHA_PENDING';
export const CAPTCHA_SUCCESS = 'CAPTCHA_SUCCESS';
export const CAPTCHA_FAILURE = 'CAPTCHA_FAILURE';

//注册会员
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_PENDING = 'REGISTER_PENDING';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

//登录退出
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_PENDING = 'LOGOUT_PENDING';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

//登录
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

//获取会员信息
export const GET_MEMBER_INFO = 'GET_MEMBER_INFO';
export const GET_MEMBER_INFO_SUCCESS = 'GET_MEMBER_INFO_SUCCESS';
export const GET_MEMBER_INFO_PENDING = 'GET_MEMBER_INFO_PENDING';
export const GET_MEMBER_INFO_FAILURE = 'GET_MEMBER_INFO_FAILURE';

//获取虚拟资产
export const GET_ASSET = 'GET_ASSET';
export const GET_ASSET_SUCCESS = 'GET_ASSET_SUCCESS';
export const GET_ASSET_FAILURE = 'GET_ASSET_FAILURE';

//获取流水
export const GET_ASSET_FLOW = 'GET_ASSET_FLOW';
export const GET_ASSET_FLOW_PENDING = 'GET_ASSET_FLOW_PENDING';
export const GET_ASSET_FLOW_SUCCESS = 'GET_ASSET_FLOW_SUCCESS';
export const GET_ASSET_FLOW_FAILURE = 'GET_ASSET_FLOW_FAILURE';

//获取地址列表
export const GET_ADDRESSES = 'GET_ADDRESSES';
export const GET_ADDRESSES_SUCCESS = 'GET_ADDRESSES_SUCCESS';
export const GET_ADDRESSES_PENDING = 'GET_ADDRESSES_PENDING';
export const GET_ADDRESSES_FAILURE = 'GET_ADDRESSES_FAILURE';

//获取会员地址
export const GET_ADDRESS = 'GET_ADDRESS';
export const GET_ADDRESS_SUCCESS = 'GET_ADDRESS_SUCCESS';
export const GET_ADDRESS_FAILURE = 'GET_ADDRESS_FAILURE';

//添加会员地址
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';
export const ADD_ADDRESS_PENDING = 'ADD_ADDRESS_PENDING';
export const ADD_ADDRESS_FAILURE = 'ADD_ADDRESS_FAILURE';

//修改会员地址
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_PENDING = 'UPDATE_ADDRESS_PENDING';
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';

//删除会员地址
export const DEL_ADDRESS = 'DEL_ADDRESS';
export const DEL_ADDRESS_SUCCESS = 'DEL_ADDRESS_SUCCESS';
export const DEL_ADDRESS_PENDING = 'DEL_ADDRESS_PENDING';
export const DEL_ADDRESS_FAILURE = 'DEL_ADDRESS_FAILURE';

//会员余额
export const GET_BALANCE = 'GET_BALANCE';
export const GET_BALANCE_SUCCESS = 'GET_BALANCE_SUCCESS';
export const GET_BALANCE_FAILURE = 'GET_BALANCE_FAILURE';

// 上传媒体文件
export const ADD_MEDIA = 'ADD_MEDIA';
export const ADD_MEDIA_SUCCESS = 'ADD_MEDIA_SUCCESS';
export const ADD_MEDIA_PENDING = 'ADD_MEDIA_PENDING';
export const ADD_MEDIA_FAILURE = 'ADD_MEDIA_FAILURE';

// 修改个人信息
export const UPDATE_MEMBER_INFO = 'UPDATE_MEMBER_INFO';
export const UPDATE_MEMBER_INFO_SUCCESS = 'UPDATE_MEMBER_INFO_SUCCESS';
export const UPDATE_MEMBER_INFO_PENDING = 'UPDATE_MEMBER_INFO_PENDING';

// 获取会员卡风格
export const GET_CARD_STYLE = 'GET_CARD_STYLE';
export const GET_CARD_STYLE_SUCCESS = 'GET_CARD_STYLE_SUCCESS';
export const GET_CARD_STYLE_PENDING = 'GET_CARD_STYLE_PENDING';
export const GET_CARD_STYLE_FAILURE = 'GET_CARD_STYLE_FAILURE';

export function register({dispatch}, mobile, code, data) {
    return dispatch({
        type: REGISTER,
        payload: apiMember.register(mobile, code, data)
    });
}

export function login({dispatch}, uin, openid) {
    return dispatch({
        type: LOGIN,
        payload: apiMember.login(uin, openid)
    });
}

export function logout({dispatch}) {
    return dispatch({
        type: LOGOUT,
        payload: apiMember.logout()
    });
}

export function sendCaptcha({dispatch}, mobile, type) {
    return dispatch({
        type: CAPTCHA,
        payload: apiCommon.sendCaptcha(mobile, type),
        meta: {
            type
        }
    });
}

export function getAsset({dispatch}, params) {
    return dispatch({
        type: GET_ASSET,
        payload: apiMember.getAsset(params),
        meta: {
            token: false
        }
    });
}

export function getAssetFlow({dispatch}, params) {
    return dispatch({
        type: GET_ASSET_FLOW,
        payload: apiMember.getAssetFlow(params)
    });
}

export function getBalance({dispatch}, params) {
    return dispatch({
        type: GET_BALANCE,
        payload: apiMember.getBalance(params)
    });
}


// 添加或更新判断
export function addAddressOpinion({dispatch}, params) {
    if (params.id !== '') {
        return dispatch(UPDATE_ADDRESS, apiMember.updateAddress(params));
    } else {
        return dispatch(ADD_ADDRESS, apiMember.addAddress(params));
    }
}

// 获取地址
export function getAddress({dispatch}, id) {
    return dispatch({
        type: GET_ADDRESS,
        payload: id
    });
}

// 获取地址列表
export function getAddresses({dispatch}) {
    return dispatch({
        type: GET_ADDRESSES,
        payload: apiMember.getAddresses()
    });
}

// 删除地址
export function delAddress({dispatch}, id) {
    return dispatch({
        type: DEL_ADDRESS,
        payload: apiMember.delAddress(id)
    });
}

// 上传媒体文件
export function addMedia({dispatch}, id) {
    return dispatch({
        type: ADD_MEDIA,
        payload: apiCommon.addMedia(id)
    });
}

// 获取个人信息
export function getMemberInfo({dispatch}, params) {
    return dispatch({
        type: GET_MEMBER_INFO,
        payload: apiMember.getMemberInfo(params),
        meta: {
            token: false
        }
    });
}

// 修改用户个人信息服务
export function updateMemberInfo({dispatch}, params) {
    return dispatch({
        type: UPDATE_MEMBER_INFO,
        payload: apiMember.updateMemberInfo(params)
    });
}
// 获取会员卡样式
export function getcardStyle({dispatch}) {
    return dispatch({
        type: GET_CARD_STYLE,
        payload: apiMember.getcardStyle()
    });
}
