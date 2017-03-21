import * as apiDistributeEntry from '../../api/distributeEntry';

// 分发访问入口
export const GET_DISTRIBUTE_ENTRY = 'GET_DISTRIBUTE_ENTRY';
export const GET_DISTRIBUTE_ENTRY_SUCCESS = 'GET_DISTRIBUTE_ENTRY_SUCCESS';
export const GET_DISTRIBUTE_ENTRY_PENDING = 'GET_DISTRIBUTE_ENTRY_PENDING';
export const GET_DISTRIBUTE_ENTRY_FAILURE = 'GET_DISTRIBUTE_ENTRY_FAILURE';

// 分发访问入口
export function getDistributeEntry({dispatch}, params) {
    return dispatch({
        type: GET_DISTRIBUTE_ENTRY,
        payload: apiDistributeEntry.getDistributeEntry(params)
    });
}

