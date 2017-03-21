/**
 * Created by Asoiso on 16/8/16.
 * C端推客
 */
import http from '../util/http';

// GET  /api/v1/{client}/{channel}/tker/member/friends 获取当前推客会员的好友
export function getTkerMemberFriends({
    page = 0,
    size = 100,
    sort,
}) {
    return http.get('tker/member/friends', {
        page,
        size,
        sort
    });
}

// GET  /api/v1/{client}/{channel}/tker/member/info 获取当前推客会员的推客数据
export function getTkerMemberInfo() {
    return http.get('tker/member/info');
}

// GET  /api/v1/{client}/{channel}/tker/member/product/dividend 获取当前推客的红利明细
export function getTkerMemberProductDividend() {
    return http.get('tker/member/product/dividend');
}

// GET  /api/v1/{client}/{channel}/tker/member/product/profit 获取当前推客的商品佣金明细
export function getTkerMemberProductProfit({
    page = 0,
    size = 100,
    sort,
}) {
    return http.get('tker/member/product/profit', {
        page,
        size,
        sort
    });
}

// GET /api/v1/{client}/{channel}/tker/entry/product/list 获取推客入口的商品列表
export function getEntryProductList({
    page = 0,
    size = 100,
    sort,
}) {
    return http.get('tker/entry/product/list', {
        page,
        size,
        sort
    });
}

//GET /api/v1/{client}/{channel}/tker/member/product/list 获取当前推客的商品列表
export function getTkerMemberProductList({
    page = 0,
    size = 100,
    sort,
}) {
    return http.get('tker/member/product/list', {
        page,
        size,
        sort
    });
}

// POST /api/v1/{client}/{channel}/tker 创建分销任务
export function updateTker(params) {
    return http.post('tker', params);
}

// PUT  /api/v1/{client}/{channel}/tker/seller 开通推客分销
export function openTkerSeller() {
    return http.put('tker/seller');
}

// 分销任务入口服务
export function getTkerEntry(id) {
    return http.get('tker/entry/{tkerid}', {
        tkerid: id
    });
}



