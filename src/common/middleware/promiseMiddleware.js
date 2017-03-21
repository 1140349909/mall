import logger from '../lk-logger';

// function isPromise(payload) {
//     return payload && (payload.then || (Array.isArray(payload) && payload.some(p => p && p.then)));
// }

function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value && typeof value.then === 'function';
    }
    return false;
}

// 推迟执行,解决vue中watch事件无法监听同步操作中的状态变化
function nextTick(callback) {
    setTimeout(callback, 0);
}

const operation = 'OPERATION';
const [PENDING, SUCCESS, FAILURE] = ['PENDING', 'SUCCESS', 'FAILURE'];

export default function promiseMiddleware({debug = false} = {}) {
    return {
        onInit () {
            if (debug) {
                logger.log('Vuex Promise Initialized.');
            }
        },
        onMutation ({type, payload, meta}, state, {dispatch}) {
            meta = meta || {};

            if (isPromise(payload)) {

                // if (!Array.isArray(payload)) {
                //     payload = [payload];
                // }

                /**
                 * @function getAction
                 * @description Utility function for creating a rejected or fulfilled
                 * flux standard action object.
                 * @param {boolean} Is the action rejected?
                 * @returns {object} action
                 */
                const getAction = (type, newPayload, isRejected) => ({
                    type: type,
                    ...newPayload ? {payload: newPayload} : {},
                    ...meta ? {meta} : {},
                    ...isRejected ? {error: true} : {},
                    silent: true
                });


                // PENDING
                nextTick(()=> {
                    dispatch(getAction(`${type}_${PENDING}`, payload.data, false));
                    dispatch(getAction(operation, {
                        ...payload.data,
                        type: `${type}_${PENDING}`
                    }, false));

                });
                /*
                 * @function handleFailure
                 * @description Dispatch the rejected action and return
                 * an error object. The error object should contain the
                 * value and the dispatched action.
                 * @params value The value the promise was rejected
                 * @returns {object}
                 */
                const handleFailure = (value = null) => {
                    const failureAction = getAction(`${type}_${FAILURE}`, value, true);
                    nextTick(()=> {
                        dispatch(failureAction);
                        // 操作快照
                        dispatch(getAction(operation, {
                            ...value,
                            type: `${type}_${FAILURE}`
                        }, true));

                    });

                    const error = value instanceof Error ? value : new Error();

                    error.value = value;
                    error.action = failureAction;

                    //先不要抛异常
                    //throw error;
                    return error;
                };

                /*
                 * @function handleSuccess
                 * @description Dispatch the fulfilled action and
                 * return the success object. The success object should
                 * contain the value and the dispatched action.
                 * @param value The value the promise was resloved with
                 * @returns {object}
                 */
                const handleSuccess = (value = null) => {
                    const successAction = getAction(`${type}_${SUCCESS}`, value, false);
                    nextTick(()=> {
                        dispatch(successAction);
                        // 操作快照
                        dispatch(getAction(operation, {
                            ...value,
                            type: `${type}_${SUCCESS}`
                        }, false));
                    });
                    return {
                        value,
                        action: successAction
                    };
                };

                return payload.then(handleSuccess, handleFailure);
            }
        }
    };
}
