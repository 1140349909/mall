/**
 * Created by Asoiso on 16/8/16.
 */
import http from '../util/http';
import config from '../config';

/*平台现金服务*/

// 提供会员提现自己的现金服务
export function updateManagerWithdraw(data) {
    return http.post(config.API_ROOT + '/api/cash/member/withdraw', data);
}

// 返回当前会员提现列表
export function getMemberWithdrawList({
    page = 0,
    size = 100,
    sort,
}) {
    return http.get(config.API_ROOT + '/api/cash/member/withdraw/list', {
        page,
        size,
        sort
    });
}

