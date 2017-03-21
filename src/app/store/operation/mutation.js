import logger from 'common/lk-logger';
import {
    OPERATION
} from './action';
import config from '../../config';
import {ENTRY_CODE} from '../../config/constants';
import {getEntryUrl} from '../../util/url';

const STATUS_REG = /_(PENDING|SUCCESS|FAILURE)$/;

const state = {
    // 操作模块类型
    type: '',

    // // 操作参数
    // params: {},
    // // 操作结果
    // data: {},

    // 操作错误码
    errCode: 0,
    // 操作错误信息
    errMsg: ''
};

const mutations = {
    // 操作失败
    [OPERATION](state, {meta, payload, error}){

        if (error) {
            logger.error(payload.errCode + ':' + payload.errMsg);

            // TODO: 错误处理要剥离出来
            if (meta.token !== false && payload.errCode == 40001) {
                location.hash = '!/passport';
            }

            // 非法uin:uin is null
            if (payload.errCode == 49002) {
                //config
                const url = getEntryUrl({
                    uin: config.UIN,
                    code: ENTRY_CODE.CUSTOMIZE,
                    url: location.href,
                    channel: config.CHANNEL
                });
                return location.replace(url);
            }

            // 五uin:uin 参数为空
            if (payload.errCode == 40100 && config.RELEASED) {
                return location.replace(config.ILOKA_URL);
            }
        }

        setOperation(state, payload);
    }
};


function setOperation(state, payload) {

    const {type, errCode, errMsg} = payload;

    state.type = type;

    // TODO:暂时不开放快照参数和数据
    // state.params = params;

    // state.data = data;

    state.status = (type.match(STATUS_REG) || ['', ''])[1];

    state.errCode = errCode;

    state.errMsg = errMsg;
}

export default {
    state,
    mutations
};













































