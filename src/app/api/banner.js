/**
 * Created by Asoiso on 16/8/16.
 */
import http from '../util/http';
// 获取商城广告条
export function getBannerBuy(buyType = 'mall') {
    return http.get('banner/buy/{buyType}', {
        buyType
    });
}
