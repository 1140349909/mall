import http from '../util/http';
import config from '../config';

// GET /distribute/entry/{uin}/{openChannel}/{channelUin}/{resType}/{resId}/{pubId} 分发访问入口
export function getDistributeEntry({
    uin,
    openChannel,
    channelUin,
    resType,
    resId,
    pubId,
    componentAppId,
    redirectUri,
}) {
    return http.get(config.API_ROOT + '/distribute/entry/{uin}/{openChannel}/{channelUin}/{resType}/{resId}/{pubId}', {
        uin,
        openChannel,
        channelUin,
        resType,
        resId,
        pubId,
        componentAppId,
        redirectUri
    });
}
