import http from '../util/http';

// 一元购在售商品往期列表
export function getProductIssueYygHistoryList({
    page = 0,
    size = 100,
    sort,
}) {
    return http.get('product/issue/yyg/history/list', {
        page,
        size,
        sort,
    });
}

// GET /api/v1/{client}/{channel}/product/issue/{buyType}/{resType}/{resId}/{id} 资讯绑定的商品详情
export function getProductIssueResType({
    buyType,
    resType,
    resId,
    id,
}) {
    return http.get('product/issue/{buyType}/{resType}/{resId}/{id}', {
        buyType,
        resType,
        resId,
        id,
    });
}
