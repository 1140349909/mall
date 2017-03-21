/**
 * Created by Asoiso on 16/8/16.
 */
import http from '../util/http';
import config from '../config';

// 获取商品详情
export function getProduct(id, buyType, idType) {
    return http.get('product/issue/{buyType}/{id}', {
        id,
        buyType,
        idType
    });
}

// 获取商城商品详情预览
export function getProductPreview(id) {
    return http.get('product/preview/{id}', {
        id
    });
}

// 获取一元购商品详情预览
export function getProductYygPreview(id, buyChannel) {
    return http.get('product/channel/{buyChannel}/preview/{id}', {
        id,
        buyChannel,
    });
}

// 获取商品列表
export function getProducts({
    buyType,
    page = 0,
    size = config.SIZE,
    sort,
    order,
}) {

    return http.get('product/issue/{buyType}/list', {
        buyType,
        page,
        size,
        sort,
        order
    });
}
//获取已经上架的商品的晒单列表
export function getShowList({
    buyType,
    productId,
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get('product/issue/{buyType}/{productId}/list', {
        buyType,
        productId,
        page,
        size,
        sort,
        order
    });
}

//GET /api/v1/{client}/{channel}/product/issue/tker/list 己开通推客分销的商品列表
export function getProductIssueTkerList({
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get('product/issue/tker/list', {
        page,
        size,
        sort,
        order
    });
}

//GET /api/v1/{client}/{channel}/product/issue/yyg/history/list 一元购在售商品往期列表
export function getProductIssueYygHistoryList() {
    return http.get('product/issue/yyg/history/list');
}
