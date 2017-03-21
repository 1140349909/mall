/**
 * Created by Asoiso on 16/8/16.
 */
import http from '../util/http';
import config from '../config';
// 点赞
export function updateContentAward(id, data) {
    return http.post(config.API_ILOKA_URL + '/tips/{resId}', data, {
        params: {
            resId: id
        }
    });
}
