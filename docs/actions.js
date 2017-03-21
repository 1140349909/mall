/**
 * Created by Asoiso on 16/8/16.
 */

// Actions 是用于分发 mutations 的函数
import api from '../api';
import types from './types';


// export function getProducts({ dispatch }, params) {
//     return dispatch({
//         type: GET_PRODUCTS,
//         payload: api.getProducts(params)
//     });
// }

// export function getProduct({ dispatch }, id, buyType, idType) {
//     return dispatch({
//         type: GET_PRODUCT,
//         payload: api.getProduct(id, buyType, idType)
//     });
// }
//
// // 商品商品预览
// export function getProductPreview({ dispatch }, id) {
//     return dispatch({
//         type: GET_PRODUCT_PREVIEW,
//         payload: api.getProductPreview(id)
//     });
// }
//
// // 一元购商品预览
// export function getProductYygPreview({ dispatch }, id, buyChannel) {
//     return dispatch({
//         type: GET_PRODUCT_YYG_PREVIEW,
//         payload: api.getProductYygPreview(id, buyChannel)
//     });
// }
//
// export function getProductTrades({ dispatch }, params) {
//     return dispatch({
//         type: GET_PRODUCTTRADES,
//         payload: api.getProductTrades(params)
//     });
// }

// export function getTradeCallback({ dispatch }, businessId, buyType) {
//     return dispatch({
//         type: GET_TRADECALLBACK,
//         payload: api.getTradeCallback(businessId, buyType)
//     });
// }
//
// export function addToCart({ dispatch }, order) {
//     return dispatch({
//         type: ADD_TO_CART,
//         payload: order
//     });
// }
//
// export function clearCart({ dispatch }) {
//     return dispatch(CLEAR_CART);
// }
//
// export function purchase({ dispatch }, id, order) {
//     return dispatch({
//         type: PURCHASE,
//         payload: api.purchase(id, order)
//     });
// }


// export function register({ dispatch }, mobile, code) {
//     return dispatch({
//         type: REGISTER,
//         payload: api.register(mobile, code)
//     });
// }
//
// export function login({ dispatch }, uin, openid) {
//     return dispatch({
//         type: LOGIN,
//         payload: api.login(uin, openid)
//     });
// }
//
// export function logout({ dispatch }) {
//     return dispatch({
//         type: LOGOUT,
//         payload: api.logout()
//     });
// }
//
// export function sendCaptcha({ dispatch }, mobile, type) {
//     return dispatch({
//         type: CAPTCHA,
//         payload: api.sendCaptcha(mobile, type),
//         meta: {
//             type
//         }
//     });
// }
//
// export function getNotification({ dispatch }) {
//     return dispatch({
//         type: GET_NOTIFICATION,
//         payload: api.getNotification()
//     });
// }

// export function getAsset({ dispatch }, params) {
//     return dispatch({
//         type: GET_ASSET,
//         payload: api.getAsset(params),
//         meta: {
//             token: false
//         }
//     });
// }
//
// export function getAssetFlow({ dispatch }, params) {
//     return dispatch({
//         type: GET_ASSET_FLOW,
//         payload: api.getAssetFlow(params)
//     });
// }
//
// export function getBalance({ dispatch }, params) {
//     return dispatch({
//         type: GET_BALANCE,
//         payload: api.getBalance(params)
//     });
// }

// export function getOrderList({ dispatch }, params) {
//     return dispatch({
//         type: GET_ORDER_LIST,
//         payload: api.getOrderList(params)
//     });
// }
//
// export function getUnpaidOrderList({ dispatch }, params) {
//     return dispatch({
//         type: GET_UNPAID_ORDER_LIST,
//         payload: api.getUnpaidOrderList(params)
//     });
// }
//
// export function delFinishedOrder({ dispatch }, params) {
//     return dispatch({
//         type: DEL_FINISHED_ORDER,
//         payload: api.delFinishedOrder(params)
//     });
// }

// // 添加或更新判断
// export function addAddressOpinion({ dispatch }, params) {
//     if (params.id !== '') {
//         return dispatch(UPDATE_ADDRESS, api.updateAddress(params));
//     } else {
//         return dispatch(ADD_ADDRESS, api.addAddress(params));
//     }
// }
//
// // 获取地址
// export function getAddress({ dispatch }, id) {
//     return dispatch({
//         type: GET_ADDRESS,
//         payload: id
//     });
// }
//
// // 获取地址列表
// export function getAddresses({ dispatch }) {
//     return dispatch({
//         type: GET_ADDRESSES,
//         payload: api.getAddresses()
//     });
// }
//
// // 删除地址
// export function delAddress({ dispatch }, id) {
//     return dispatch({
//         type: DEL_ADDRESS,
//         payload: api.delAddress(id)
//     });
// }

// // 会员充值
// export function memberCharge({ dispatch }, params) {
//     return dispatch({
//         type: UPDATE_CHARGE,
//         payload: api.memberCharge(params)
//     });
// }


// // 上传媒体文件
// export function addMedia({ dispatch }, id) {
//     return dispatch({
//         type: ADD_MEDIA,
//         payload: api.addMedia(id)
//     });
// }
//
// // 获取个人信息
// export function getMemberInfo({ dispatch }) {
//     return dispatch({
//         type: GET_MEMBER_INFO,
//         payload: api.getMemberInfo(),
//         meta: {
//             token: false
//         }
//     });
// }
//
// // 修改用户个人信息服务
// export function updateMemberInfo({ dispatch }, params) {
//     return dispatch({
//         type: UPDATE_MEMBER_INFO,
//         payload: api.updateMemberInfo(params)
//     });
// }

//
// // 获取微信JsTicket
// export function getWechatTicket({ dispatch }, params) {
//     return dispatch({
//         type: GET_WECHAT_TICKET,
//         payload: api.getWechatTicket(params)
//     });
// }

//
// // 商城信息
// export function getMallInfo({ dispatch }) {
//     return dispatch({
//         type: GET_MALL_INFO,
//         payload: api.getMallInfo()
//     });
// }
//
// // 商城信息
// export function getMallQrcode({ dispatch }) {
//     return dispatch({
//         type: GET_MALL_QRCODE,
//         payload: api.getMallQrcode()
//     });
// }

// 一元购领奖
// export function updateYYGAwardInfo({ dispatch }, params) {
//     return dispatch({
//         type: UPDATE_YYG_AWARD_INFO,
//         payload: api.updateYYGAwardInfo(params)
//     });
// }
//
// // 获取员工通道详细信息
// export function getMemberEmployeeInfoDetail({ dispatch }, params) {
//     return dispatch({
//         type: GET_MEMBER_EMPLOYEE_INFO_DETAIL,
//         payload: api.getMemberEmployeeInfoDetail(params)
//     });
// }
//
// // 获取员工通道排行榜
// export function getMemberEmployeeInfoTop({ dispatch }, params) {
//     return dispatch({
//         type: GET_MEMBER_EMPLOYEE_INFO_TOP,
//         payload: api.getMemberEmployeeInfoTop(params)
//     });
// }

// // 一元购领奖
// export function updateShowOrder({ dispatch }, params) {
//     return dispatch({
//         type: UPDATE_SHOW_ORDER,
//         payload: api.updateShowOrder(params)
//     });
// }


//领取推客服务
// export function updateBase64({ dispatch }, params) {
//     return dispatch({
//         type: UPDATE_BASE64,
//         payload: api.updateBase64(params)
//     });
// }


// // 获取激励
// export function getMemberexcitation({ dispatch }) {
//     return dispatch({
//         type: GET_MEMBER_EXCITATION,
//         payload: api.getMemberexcitation()
//     });
// }

// export function getShowList({ dispatch }, params) {
//     return dispatch({
//         type: GET_SHOW_LIST,
//         payload: api.getShowList(params)
//     });
// }

// // 获取咨询列表
// export function getContentList({ dispatch }) {
//     return dispatch({
//         type: GET_CONTENT_LIST,
//         payload: api.getContentList()
//     });
// }
//
// // 获取咨询详情
// export function getContent({ dispatch }, id) {
//     return dispatch({
//         type: GET_CONTENT,
//         payload: api.getContent(id)
//     });
// }
//
// // 获取站点配置
// export function getContentConfig({ dispatch }) {
//     return dispatch({
//         type: GET_CONTENT_CONFIG,
//         payload: api.getContentConfig()
//     });
// }
//
// // 获取资讯预览
// export function getContentPreview({dispatch}, id) {
//     return dispatch({
//         type:GET_CONTENT_PREVIEW,
//         payload:api.getContentPreview(id)
//     })
// }

// 获取积分对换比
// export function getIntegralExchange({ dispatch }) {
//     return dispatch({
//         type: GET_INTEGRAL_EXCHANGE,
//         payload: api.getIntegralExchange()
//     });
// }

// // 获取会员卡样式
// export function getcardStyle({ dispatch }) {
//     return dispatch({
//         type: GET_CARD_STYLE,
//         payload: api.getcardStyle()
//     });
// }
// 更新地址
// export function updateOrderStatus({ dispatch }, params) {
//     return dispatch({
//         type: UPDATE_ORDER_STATUS,
//         payload: api.updateOrderStatus(params)
//     });
// }


// // 优惠券核销总金额
// export function getCouponCash({ dispatch }) {
//     return dispatch({
//         type: GET_COUPON_CASH,
//         payload: api.getCouponCash()
//     });
// }
//
// // 己失效的优惠券列表
// export function getCouponListInvalid({ dispatch }, para) {
//     return dispatch({
//         type: GET_COUPON_LIST_INVALID,
//         payload: api.getCouponListInvalid(para)
//     });
// }
//
// // 己使用的优惠券列表
// export function getCouponListUsed({ dispatch }, para) {
//     return dispatch({
//         type: GET_COUPON_LIST_USED,
//         payload: api.getCouponListUsed(para)
//     });
// }
//
// // 领取优惠券
// export function getCouponReceive({ dispatch }, para) {
//     return dispatch({
//         type: GET_COUPON_RECEIVE,
//         payload: api.getCouponReceive(para)
//     });
// }
//
// // 优惠券列表
// export function getCouponList({ dispatch }, para) {
//     return dispatch({
//         type: GET_COUPON_LIST,
//         payload: api.getCouponList(para)
//     });
// }
//
// // 获取当前订单可用的优惠券列表
// export function getAvailableCouponList({ dispatch }, para, order) {
//     return dispatch({
//         type: GET_AVAILABLE_COUPON_LIST,
//         payload: api.getCouponList(para),
//         meta: {
//             order
//         }
//     });
// }
//
//
// // 获取优惠券信息
// export function getCouponInfo({ dispatch }, couponId) {
//     return dispatch({
//         type: GET_COUPON_INFO,
//         payload: api.getCouponInfo(couponId),
//         meta: {
//             token: false
//         }
//     });
// }

// // 领取积分
// export function getIntegralReceive({ dispatch }, para) {
//     return dispatch({
//         type: GET_INTEGRAL_RECEIVE,
//         payload: api.getIntegralReceive(para),
//         meta: {
//             token: false
//         }
//     });
// }
//
// // 获取积分值
// export function getIntegralFaceValue({ dispatch }, id) {
//     return dispatch({
//         type: GET_INTEGRAL_FACEVALUE,
//         payload: api.getIntegralFaceValue(id)
//     });
// }

// // 获取商城广告条
// export function getBannerBuy({ dispatch }, buyType) {
//     return dispatch({
//         type: GET_BANNER_BUY,
//         payload: api.getBannerBuy(buyType)
//     });
// }

// // 更新地址
// export function updateUnpaidOrder({ dispatch }, params) {
//     return dispatch({
//         type: UPDATE_UNPAID_ORDER,
//         payload: api.updateUnpaidOrder(params)
//     });
// }

// // 获取点赞
// export function getContentPraise({ dispatch }, id) {
//     return dispatch({
//         type: GET_CONTENT_PRAISE,
//         payload: api.getContentPraise(id)
//     });
// }
//
// // 打赏
// export function updateContentAward({ dispatch }, id, data) {
//     return dispatch({
//         type: UPDATE_CONTENT_AWARD,
//         payload: api.updateContentAward(id, data)
//     });
// }

// // 获取微名片
// export function getMemberVcard({ dispatch }) {
//     return dispatch({
//         type: GET_MEMBER_VCARD,
//         payload: api.getMemberVcard()
//     });
// }
//
// // 新建/修改微名片
// export function updateMemberVcard({ dispatch }, data) {
//     return dispatch({
//         type: UPDATE_MEMBER_VCARD,
//         payload: api.updateMemberVcard(data)
//     });
// }
//
// // 获取微名片
// export function getMemberVcardById({ dispatch }, id) {
//     return dispatch({
//         type: GET_MEMBER_VCARD_BY_ID,
//         payload: api.getMemberVcardById(id)
//     });
// }

/*分销*/
/*// 己开通推客分销的商品列表
 export function getProductIssueTkerList({ dispatch }, params) {
 return dispatch({
 type: GET_PRODUCT_ISSUE_TKER_LIST,
 payload: api.getProductIssueTkerList(params)
 });
 }*/

/*// 获取当前推客的红利明细
 export function getTkerMemberProductDividend({ dispatch }) {
 return dispatch({
 type: GET_TKER_MEMBER_PRODUCT_DIVIDEND,
 payload: api.getTkerMemberProductDividend()
 });
 }*/

/*// 获取当前推客的商品佣金明细
 export function getTkerMemberProductProfit({ dispatch }, params) {
 return dispatch({
 type: GET_TKER_MEMBER_PRODUCT_PROFIT,
 payload: api.getTkerMemberProductProfit(params)
 });
 }*/

/*// 开通分销
 export function openTkerSeller({dispatch}) {
 return dispatch({
 type: OPEN_TIKER_SELLER,
 payload: api.openTkerSeller()
 });
 }*/

/*// 获取当前推客会员的好友
 export function getTkerMemberFriends({dispatch}, params) {
 return dispatch({
 type: GET_TKER_MEMBER_FRIENDS,
 payload: api.getTkerMemberFriends(params)
 });
 }*/
/*// 获取当前推客会员的推客数据
 export function getTkerMemberInfo({dispatch}) {
 return dispatch({
 type: GET_TKER_MEMBER_INFO,
 payload: api.getTkerMemberInfo()
 });
 }*/
/*// 获取推客入口的商品列表
 export function getEntryProductList({dispatch}, params) {
 return dispatch({
 type: GET_ENTRY_PRODUCT_LIST,
 payload: api.getEntryProductList(params)
 });
 }*/

// 获取当前推客的商品列表
/*export function getTkerMemberProductList({dispatch}, params) {
 return dispatch({
 type: GET_TKER_MEMBER_PRODUCT_LIST,
 payload: api.getTkerMemberProductList(params)
 });
 }*/


//领取推客服务
/*export function updateTker({ dispatch }, params) {
 return dispatch({
 type: UPDATE_TKER,
 payload: api.updateTker(params)
 });
 }*/

/*现金*/
/*// 提供会员提现自己的现金服务
 export function updateManagerWithdraw({ dispatch }, data) {
 return dispatch({
 type: UPDATE_MANAGER_WITHDRAW,
 payload: api.updateManagerWithdraw(data)
 });
 }*/

// 返回当前会员提现列表
/*export function getMemberWithdrawList({ dispatch }, params) {
 return dispatch({
 type: GET_MEMBER_WITHDRAW_LIST,
 payload: api.getMemberWithdrawList(params)
 });
 }*/

// 一元购在售商品往期列表
/*export function getProductIssueYygHistoryList({ dispatch }, params) {
 return dispatch({
 type: GET_PRODUCT_ISSUE_YYG_HISTORY_LIST,
 payload: api.getProductIssueYygHistoryList(params)
 });
 }*/

// 通用计数请求
/*export function getCountly({ dispatch }, params) {
 return dispatch({
 type: GET_COUNTLY,
 payload: api.getCountly(params)
 });
 }*/

// 在售商品己成功交易的数量
/*export function getTradeAmount({ dispatch }, params) {
 return dispatch({
 type: GET_TRADE_AMOUNT,
 payload: api.getTradeAmount(params)
 });
 }*/

