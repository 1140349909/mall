import {
    GET_ORDER_LIST_PENDING,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_FAILURE,

    GET_UNPAID_ORDER_LIST_PENDING,
    GET_UNPAID_ORDER_LIST_SUCCESS,
    GET_UNPAID_ORDER_LIST_FAILURE,

    DEL_FINISHED_ORDER_SUCCESS,
    DEL_FINISHED_ORDER_FAILURE,

    UPDATE_SHOW_ORDER_PENDING,
    UPDATE_SHOW_ORDER_SUCCESS,
    UPDATE_SHOW_ORDER_FAILURE,

    UPDATE_ORDER_STATUS_PENDING,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,

    UPDATE_UNPAID_ORDER_PENDING,
    UPDATE_UNPAID_ORDER_SUCCESS,
    UPDATE_UNPAID_ORDER_FAILURE
} from './action';

const state = {
    order: {
        status: '',
        result: {},
        params: {}
    },

    unpaid: {
        status: '',
        result: {},
        params: {}
    },

    deleted: {
        status: ''
    },

    show: {
        status: '',
        result: {},
        params: {}
    },

    cancel: {
        status: '',
        result: {},
        params: {}
    }

};

const mutations = {
    [GET_ORDER_LIST_PENDING](state){
        state.order.status = 'pending';
    },
    [GET_ORDER_LIST_SUCCESS](state, {payload}){

        /**
         * 将秒数换成时分秒格式
         * 整理：www.jbxue.com
         */

        function formatSeconds(value) {
            var theTime = parseInt(value);// 秒
            var theTime1 = 0;// 分
            var theTime2 = 0;// 小时
            if (theTime > 60) {
                theTime1 = parseInt(theTime / 60);
                theTime = parseInt(theTime % 60);
                if (theTime1 > 60) {
                    theTime2 = parseInt(theTime1 / 60);
                    theTime1 = parseInt(theTime1 % 60);
                }
            }
            var result = '' + parseInt(theTime) + '秒';

            if (theTime1 > 0) {
                result = '' + parseInt(theTime1) + '分' + result;
            }
            if (theTime2 > 0) {
                result = '' + parseInt(theTime2) + '时' + result;
            }
            return result;
        }


        if (payload.data) {
            state.order.status = 'success';
            state.order.result = payload.data;

            // 支付状态(payStatus)]:s0:未支付,s1支付完成,s2支付失败,s3超时支付关闭,s4主动支付取消


            const dataSource = [];

            const dataList = payload.data.content;

            for (let i = 0; i < dataList.length; i++) {

                let score = '',
                    cash = '',
                    number = '',
                    payType = '',
                    status = '',
                    issueNo = '',
                    issueId = '',
                    payStatus = '',
                    cancelDate = '',
                    preferentialWay = '',
                    payWay = '',
                    cfg = '';

                switch (dataList[i].buyType) {
                    case 'yyg':
                        score = dataList[i].yyg.money;
                        cash = dataList[i].yyg.money != 0 ? dataList[i].yyg.money / 100 : dataList[i].yyg.balance / 100;
                        number = dataList[i].yyg.credit;
                        payWay = dataList[i].yyg.payType;
                        status = dataList[i].drawStatus;
                        issueNo = dataList[i].issueNo;
                        issueId = dataList[i].issueId;
                        payType = 'cash';
                        cfg = dataList[i].yygCfg;
                        break;
                    case 'mall':
                        score = dataList[i].mall.integral;
                        cash = dataList[i].mall.money != 0 ? dataList[i].mall.money / 100 : dataList[i].mall.balance / 100;
                        number = dataList[i].mall.amount;
                        payWay = dataList[i].mall.payType;
                        status = dataList[i].tradeStatus;
                        issueNo = dataList[i].issueNo;
                        issueId = dataList[i].issueId;
                        //定义支付类型默认值
                        payType = 'score';
                        //定义优惠方式
                        preferentialWay = '';

                        cfg = dataList[i].mallCfg;

                        for (var name in dataList[i].mallCfg) {

                            //过滤一下对象的属性
                            if (dataList[i].mallCfg[name] == true
                                &&
                                dataList[i].mallCfg.hasOwnProperty(name)) {
                                //console.log(name);
                                switch (name) {
                                    case 'enableCash':
                                        payType = 'cash';
                                        preferentialWay = 'cash';
                                        break;
                                    case 'enableCoupon':
                                        payType = 'cash';
                                        preferentialWay = 'coupon';
                                        break;
                                    case 'enableIntegral':
                                        payType = 'score';
                                        preferentialWay = 'integral';
                                        break;
                                    case 'enableIntegralCash':
                                        payType = 'both';
                                        preferentialWay = 'both';
                                        break;
                                    case 'enableIntegralOffset':
                                        payType = 'other';
                                        preferentialWay = 'offset';
                                        break;
                                    default:
                                        payType = 'score';
                                        preferentialWay = 'other';
                                        break;
                                }

                            }

                        }

                        payStatus = dataList[i].payStatus;

                        let time = (parseInt(dataList[i].cancelDate) - new Date().getTime()) / 1000;

                        if (time < 0) {
                            time = 0;
                        }


                        cancelDate = dataList[i].cancelDate != undefined ? formatSeconds(time) : undefined;

                }

                let data = {
                    id: dataList[i].id,
                    issueNo: issueNo,
                    coverImgId: dataList[i].coverImgId,
                    name: dataList[i].productName,
                    payType: payType,
                    payWay: payWay,
                    // desc:'等待后台提供',
                    logistic: dataList[i].logistic,
                    date: dataList[i].lastModifiedDate,
                    issueId: issueId,
                    productId: dataList[i].productId,
                    status: status,
                    payStatus: payStatus ? payStatus : '',
                    cancelDate: cancelDate ? cancelDate : '',
                    score: score,
                    cash: cash,
                    number: number,
                    way: preferentialWay ? preferentialWay : '',
                    percent: dataList[i].stock != 0 ? (dataList[i].creditRecieved / dataList[i].stock * 100) : 0,
                    creditRecieved: dataList[i].creditRecieved ? dataList[i].creditRecieved : 0,
                    stock: dataList[i].stock ? dataList[i].stock : 0,
                    ticket: dataList[i].ticket ? dataList[i].ticket : '',
                    cfg: cfg,
                    luckys: dataList[i].luckys ? dataList[i].luckys : [],
                };
                dataSource.push(data);
            }

            // console.log(dataSource);

            state.order.result.content = dataSource;

            state.order.params = payload.params;
            // state.order.params.totalElements = undefined;

            if (payload.params.status == '') {
                payload.params.status = 'all';
            }

            state.order.params.status = payload.params.status;

        } else {
            state.order.status = 'unknown';
        }
    },

    [GET_ORDER_LIST_FAILURE](state){
        state.order.status = 'failure';
    },

    [GET_UNPAID_ORDER_LIST_PENDING](state){
        state.order.status = 'pending';
    },
    [GET_UNPAID_ORDER_LIST_SUCCESS](state, {payload}){

        /**
         * 将秒数换成时分秒格式
         * 整理：www.jbxue.com
         */

        function formatSeconds(value) {
            var theTime = parseInt(value);// 秒
            var theTime1 = 0;// 分
            var theTime2 = 0;// 小时
            if (theTime > 60) {
                theTime1 = parseInt(theTime / 60);
                theTime = parseInt(theTime % 60);
                if (theTime1 > 60) {
                    theTime2 = parseInt(theTime1 / 60);
                    theTime1 = parseInt(theTime1 % 60);
                }
            }
            var result = '' + parseInt(theTime) + '秒';

            if (theTime1 > 0) {
                result = '' + parseInt(theTime1) + '分' + result;
            }
            if (theTime2 > 0) {
                result = '' + parseInt(theTime2) + '时' + result;
            }
            return result;
        }


        if (payload.data) {

            if (payload.params.value == undefined) {
                state.order.status = 'success';
                state.order.result = payload.data;

                // 支付状态(payStatus)]:s0:未支付,s1支付完成,s2支付失败,s3超时支付关闭,s4主动支付取消


                const dataSource = [];

                const dataList = payload.data.content;

                for (let i = 0; i < dataList.length; i++) {

                    let score = '',
                        cash = '',
                        number = '',
                        payType = '',
                        status = '',
                        issueNo = '',
                        issueId = '',
                        payStatus = '',
                        cancelDate = '',
                        preferentialWay = '',
                        payWay = '',
                        cfg = '';


                    switch (dataList[i].buyType) {
                        case 'yyg':
                            score = dataList[i].yyg.money;
                            cash = dataList[i].yyg.money != 0 ? dataList[i].yyg.money / 100 : dataList[i].yyg.balance / 100;
                            number = dataList[i].yyg.credit;
                            payWay = dataList[i].yyg.payType;
                            status = dataList[i].drawStatus;
                            issueNo = dataList[i].issueNo;
                            issueId = dataList[i].issueId;
                            payType = 'cash';
                            cfg = dataList[i].yygCfg;
                            break;
                        case 'mall':
                            score = dataList[i].mall.integral;
                            cash = dataList[i].mall.money != 0 ? dataList[i].mall.money / 100 : dataList[i].mall.balance / 100;
                            number = dataList[i].mall.amount;
                            payWay = dataList[i].mall.payType;
                            status = dataList[i].tradeStatus;
                            issueNo = dataList[i].issueNo;
                            issueId = dataList[i].issueId;
                            //定义支付类型默认值
                            payType = 'score';
                            //定义优惠方式
                            preferentialWay = '';

                            cfg = dataList[i].mallCfg;

                            for (var name in dataList[i].mallCfg) {

                                //过滤一下对象的属性
                                if (dataList[i].mallCfg[name] == true
                                    && dataList[i].mallCfg.hasOwnProperty(name)) {
                                    switch (name) {
                                        case 'enableCash':
                                            payType = 'cash';
                                            preferentialWay = 'cash';
                                            break;
                                        case 'enableCoupon':
                                            payType = 'cash';
                                            preferentialWay = 'coupon';
                                            break;
                                        case 'enableIntegral':
                                            payType = 'score';
                                            preferentialWay = 'integral';
                                            break;
                                        case 'enableIntegralCash':
                                            payType = 'both';
                                            preferentialWay = 'both';
                                            break;
                                        case 'enableIntegralOffset':
                                            payType = 'other';
                                            preferentialWay = 'offset';
                                            break;
                                        default:
                                            payType = 'score';
                                            preferentialWay = 'other';
                                            break;
                                    }
                                }


                            }

                            payStatus = dataList[i].payStatus;

                            let time = (parseInt(dataList[i].cancelDate) - new Date().getTime()) / 1000;

                            if (time < 0) {
                                time = 0;
                            }

                            // cancelDate = Math.ceil((parseInt(dataList[i].cancelDate)-new Date().getTime())/60000);
                            cancelDate = dataList[i].cancelDate != undefined ? formatSeconds(time) : undefined;

                    }


                    let data = {
                        id: dataList[i].id,
                        issueNo: issueNo,
                        coverImgId: dataList[i].coverImgId,
                        name: dataList[i].productName,
                        payType: payType,
                        payWay: payWay,
                        // desc:'等待后台提供',
                        logistic: dataList[i].logistic,
                        date: dataList[i].lastModifiedDate,
                        issueId: issueId,
                        productId: dataList[i].productId,
                        status: status,
                        payStatus: payStatus ? payStatus : '',
                        cancelDate: cancelDate ? cancelDate : '',
                        score: score,
                        cash: cash,
                        number: number,
                        way: preferentialWay ? preferentialWay : '',
                        percent: dataList[i].stock != 0 ? (dataList[i].creditRecieved / dataList[i].stock * 100) : 0,
                        creditRecieved: dataList[i].creditRecieved ? dataList[i].creditRecieved : 0,
                        stock: dataList[i].stock ? dataList[i].stock : 0,
                        ticket: dataList[i].ticket ? dataList[i].ticket : '',
                        cfg: cfg
                    };
                    dataSource.push(data);
                }

                state.order.result.content = dataSource;

                state.order.params = payload.params;
                state.order.params.totalElements = payload.data.numberOfElements.toString();

                state.order.params.status = 'topay';
            } else {
                state.order.status = 'success';
                state.order.params = payload.params;
                state.order.params.totalElements = payload.data.numberOfElements.toString();

                state.order.params.status = 'topay';
            }


        } else {
            state.order.status = 'unknown';
        }
    },

    [GET_UNPAID_ORDER_LIST_FAILURE](state){
        state.order.status = 'failure';
    },

    [DEL_FINISHED_ORDER_SUCCESS](state){
        state.deleted.status = 'success';
    },
    [DEL_FINISHED_ORDER_FAILURE](state){
        state.deleted.status = 'failure';
    },

    [UPDATE_SHOW_ORDER_SUCCESS](state, {payload}){

        //alert(JSON.stringify(payload.params));

        if (payload.data) {
            state.show.status = 'success';
            state.show.result = payload.data;
            state.show.params = payload.params;
        } else {
            state.show.status = 'unknown';
        }

        //alert(state.show.status);
    },

    [UPDATE_SHOW_ORDER_PENDING](state){
        state.show.status = 'pending';
    },
    [UPDATE_SHOW_ORDER_FAILURE](state){
        state.show.status = 'failure';
    },

    [UPDATE_ORDER_STATUS_SUCCESS](state, {payload}){

        //alert(JSON.stringify(payload.params));

        if (payload.errCode == 0) {
            state.cancel.status = 'success';
        } else {
            state.cancel.status = 'unknown';
        }

        state.cancel.params = payload.params;
        //alert(state.show.status);
    },

    [UPDATE_ORDER_STATUS_PENDING](state){
        state.cancel.status = 'pending';
    },

    [UPDATE_ORDER_STATUS_FAILURE](state, {payload}){

        if (payload.errMsg) {
            state.cancel.errMsg = payload.errMsg;
        }

        state.cancel.status = 'failure';

    },

    [UPDATE_UNPAID_ORDER_SUCCESS](state, {payload}){

        if (payload.errCode == 0) {
            state.unpaid.status = 'success';
            state.unpaid.params = payload.params;
            state.unpaid.result = payload.data;
        } else {
            state.unpaid.status = 'unknown';
        }

        //alert(state.show.status);
    },

    [UPDATE_UNPAID_ORDER_PENDING](state){
        state.unpaid.status = 'pending';
    },

    [UPDATE_UNPAID_ORDER_FAILURE](state, {payload}){

        if (payload.errMsg) {
            state.unpaid.errMsg = payload.errMsg;
        }

        state.unpaid.status = 'failure';

    }


};
export default {
    state,
    mutations
};

