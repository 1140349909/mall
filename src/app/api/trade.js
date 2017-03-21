/**
 * Created by Asoiso on 16/8/16.
 */
import http from '../util/http';
import config from '../config';

// 获取商品参与记录
export function getProductTrades({
    issueId,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {

    return http.get('trade/participants/list/{issueId}', {
        issueId,
        size,
        page,
        sort,
        order
    });
}

// 获取支付结果
export function getTradeCallback(businessId, buyType) {
    return http.get('trade/callback/{buyType}/{businessId}', {
        buyType,
        businessId,
    });
}

// 在售商品己成功交易的数量
// GET /api/v1/{client}/{channel}/trade/product/issue/amount/{buyType}/{id}
export function getTradeAmount({
    buyType,
    id,
}) {
    return http.get('trade/product/issue/amount/{buyType}/{id}', {
        buyType,
        id,
    });
}

// 参与购买
export function purchase(id, order) {
    return http.post('trade/purchase/{id}', order, {
        params: {
            id
        },
        timeout: 60 * 1000
    });
}
