import * as apiCommon from '../../api/common';

export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const GET_NOTIFICATION_SUCCESS = 'GET_NOTIFICATION_SUCCESS';
export const GET_NOTIFICATION_PENDING = 'GET_NOTIFICATION_PENDING';
export const GET_NOTIFICATION_FAILURE = 'GET_NOTIFICATION_FAILURE';

export function getNotification({dispatch}) {
    return dispatch({
        type: GET_NOTIFICATION,
        payload: apiCommon.getNotification()
    });
}
