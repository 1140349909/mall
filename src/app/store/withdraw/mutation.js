import {
    UPDATE_MANAGER_WITHDRAW_PENDING,
    UPDATE_MANAGER_WITHDRAW_SUCCESS,
    UPDATE_MANAGER_WITHDRAW_FAILURE,
    GET_MEMBER_WITHDRAW_LIST_SUCCESS
} from './action';

const state = {
    //会员提现列表
    memberWithdrawList: {},
    //现金服务
    withdraw: {
        result: {},
        status: '',
        params: {}
    }
};

const mutations = {

    //提交提现申请成功
    [UPDATE_MANAGER_WITHDRAW_SUCCESS](state){
        //errCode:0
        state.withdraw.status = 'withdraw';
    },
    [UPDATE_MANAGER_WITHDRAW_PENDING](state){
        state.withdraw.status = 'pending';
    },
    [UPDATE_MANAGER_WITHDRAW_FAILURE](state){
        state.withdraw.status = 'failure';
    },

    [GET_MEMBER_WITHDRAW_LIST_SUCCESS](state, {payload}){

        let memberWithdrawList = [];

        payload.data.content.map((item)=> {

            let memberWithdraw = {};

            memberWithdraw.money = item.money;
            memberWithdraw.date = item.lastModifiedDate;

            switch (item.payType) {
                case 'balance':
                    memberWithdraw.title = '余额';
                    break;
                case 'wechat':
                    memberWithdraw.title = '微信钱包';
                    break;
                case 'alipay':
                    memberWithdraw.title = '支付宝钱包';
                    break;
            }
            // 支付状态(payStatus)]:s0:未支付,s1支付完成,s2支付失败,s3超时支付关闭,s4主动支付取消

            switch (item.payStatus) {
                case 's0':
                    memberWithdraw.status = '申请提交';
                    memberWithdraw.color = '#eeb222';
                    break;
                case 's1':
                    memberWithdraw.status = '处理完成';
                    memberWithdraw.color = '#61b72c';
                    break;
                // 结合商家操作（重新操作或直接退款）状态判断最终是否失败
                case 's2':
                    // memberWithdraw.status = '处理失败';
                    memberWithdraw.status = '正在处理';
                    memberWithdraw.color = '#ff3a1e';
                    break;
                // pass:false，状态：主动拒绝
                case 's3':
                    memberWithdraw.status = '处理关闭';
                    memberWithdraw.color = '#DADADA';
                    break;
                //
                case 's4':
                    memberWithdraw.status = '处理取消';
                    memberWithdraw.color = '#DADADA';
                    break;
                case 's5':
                    memberWithdraw.status = '正在处理';
                    memberWithdraw.color = '#DADADA';
                    break;

            }

            memberWithdrawList.push(memberWithdraw);

        });

        state.memberWithdrawList = memberWithdrawList;
    }


};

export default {
    state,
    mutations
};
