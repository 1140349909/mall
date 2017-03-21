import Home from '../page/home';
import Mall from '../page/mall';
import ProductShow from '../page/product-show';
import ProductPreview from '../page/product-preview';
import Order from '../page/order';
import OrderCoupon from '../page/order-coupon';
import OrderResult from '../page/order-result';
import Trade from '../page/trade';
import TradeShow from '../page/trade-show';
import TradeLogistic from '../page/trade-logistic';
import  MediaUpload from '../page/media-upload';
import  ContentShare from '../page/content-share';

// 一元购
import Yyg from '../page/yyg';
import YygProductShow from '../page/yyg-product-show';
import YygProductPreview from '../page/yyg-product-preview';
import YygOrder from '../page/yyg-order';
import YygOrderResult from '../page/yyg-order-result';
import YygTrade from '../page/yyg-trade';
import YygTradeLogistic from '../page/yyg-trade-logistic';
import YygTradeAward from '../page/yyg-trade-award';

import Passport from '../page/passport';
import Comment from '../page/comment';
import Service from '../page/service';
import ServiceShow from '../page/service-show';

//会员中心
import Member from '../page/member';
import MemberSetting from '../page/member-setting';
import MemberAddress from '../page/member-address';
import MemberIntegral from '../page/member-integral';
import MemberBill from '../page/member-bill';
import MemberCharge from '../page/member-charge';
import MemberCoupon from '../page/member-coupon';
import MemberVcard from '../page/member-vcard';
import MemberVcardEdit from '../page/member-vcard-edit';
import MemberVcardShare from '../page/member-vcard-share';

// 员工
import Employee from '../page/employee';
import EmployeeShow from '../page/employee-show';
import EmployeeRule from '../page/employee-rule';
import EmployeeRankMember from '../page/employee-rank-member';
import EmployeeRankConsumption from '../page/employee-rank-consumption';

// 分销模块
import Tker from '../page/tker';
import TkerHelp from '../page/tker-help';
import TkerFriends from '../page/tker-friends';
import TkerProfile from '../page/tker-profile';
import TkerMall from '../page/tker-mall';
import TkerMine from '../page/tker-mine';
import TkerProduct from '../page/tker-product';
import TkerProfit from '../page/tker-profit';
import TkerDividend from '../page/tker-dividend';

// 提现模块
import Withdraw from '../page/withdraw';
import WithdrawList from '../page/withdraw-list';

// 资讯
import Content from '../page/content';
import ContentShow from '../page/content-show';
import ContentPreview from '../page/content-preview';
import ContentPost from '../page/content-post';
import ContentTemplate from '../page/content-template';

// 打赏
import Tips from '../page/tips';
// 红包
import Packet from '../page/packet';

import NotFound from '../page/notfound';
import Vux from '../page/vux';
//import Demo from '../view/demo';

export default function configRouter(router) {
    router.map({
        '/home': {
            title: '首页',
            name: 'home',
            component: Home,
        },
        '/mall': {
            title: '商城',
            name: 'mall',
            component: Mall,
            loadMore: true
        },
        '/vux': {
            name: 'vux',
            component: Vux
        },
        '/product/show/:id': {
            title: '商品详情',
            name: 'product-show',
            component: ProductShow
        },
        '/product/preview/:id': {
            title: '商品预览',
            name: 'product-preview',
            component: ProductPreview
        },
        '/order': {
            title: '下单',
            name: 'order',
            component: Order,
            auth: true
        },
        '/order/result': {
            title: '下单结果',
            name: 'order-result',
            component: OrderResult,
            auth: true
        },
        '/order/coupon': {
            title: '选择优惠券',
            name: 'order-coupon',
            component: OrderCoupon,
            auth: true
        },
        '/trade': {
            title: '我的商城',
            name: 'trade',
            component: Trade,
            auth: true
        },
        '/trade/show/:id': {
            title: '订单详情',
            name: 'trade-show',
            component: TradeShow,
            auth: true
        },
        '/trade/logistic/:id': {
            title: '订单物流详情',
            name: 'trade-logistic',
            component: TradeLogistic,
            auth: true
        },

        // 一元购物
        '/yyg': {
            title: '一元购',
            name: 'yyg',
            component: Yyg
        },
        '/yyg/product/show/:id': {
            title: '商品详情',
            name: 'yyg-product-show',
            component: YygProductShow
        },
        '/yyg/product/preview/:id': {
            title: '商品预览',
            name: 'yyg-product-preview',
            component: YygProductPreview
        },
        '/yyg/order/:id': {
            title: '下单',
            name: 'yyg-order',
            component: YygOrder,
            auth: true
        },
        '/yyg/order/result': {
            title: '下单结果',
            name: 'yyg-order-result',
            component: YygOrderResult,
            auth: true
        },
        '/yyg/trade': {
            title: '我的一元购',
            name: 'yyg-trade',
            component: YygTrade,
            auth: true
        },
        '/yyg/trade/logistic/:id': {
            title: '物流详情',
            name: 'yyg-trade-logistic',
            component: YygTradeLogistic,
            auth: true
        },
        '/yyg/trade/award/:issueId/:id': {
            title: '领取奖品',
            name: 'yyg-trade-award',
            component: YygTradeAward,
            auth: true
        },

        '/passport': {
            title: '用户登录',
            name: 'passport',
            component: Passport
        },
        '/comment/:issueId/:id': {
            title: '用户晒图',
            name: 'comment',
            component: Comment,
            auth: true
        },
        '/service': {
            title: '系统设置',
            name: 'service',
            component: Service
        },
        '/service/show/:id': {
            title: '系统设置详情',
            name: 'service-show',
            component: ServiceShow
        },

        //会员中心
        '/member': {
            title: '我',
            name: 'member',
            component: Member
        },
        '/member/setting': {
            title: '个人信息',
            name: 'member-setting',
            component: MemberSetting,
            auth: true
        },
        '/member/address': {
            title: '地址管理',
            name: 'member-address',
            component: MemberAddress,
            auth: true
        },
        '/member/integral': {
            title: '我的积分',
            name: 'member-integral',
            component: MemberIntegral,
            auth: true
        },
        '/member/bill': {
            title: '交易记录',
            name: 'member-bill',
            component: MemberBill,
            auth: true
        },
        '/member/charge': {
            title: '会员充值',
            name: 'member-charge',
            component: MemberCharge,
            auth: true
        },

        '/member/coupon': {
            title: '我的优惠券',
            name: 'member-coupon',
            component: MemberCoupon,
            auth: true
        },

        '/member/vcard': {
            title: '我的名片',
            name: 'member-vcard',
            component: MemberVcard,
            auth: true
        },
        '/member/vcard/edit': {
            title: '编辑名片',
            name: 'member-vcard-edit',
            component: MemberVcardEdit,
            auth: true
        },
        '/member/vcard/share': {
            title: '分享名片',
            name: 'member-vcard-share',
            component: MemberVcardShare
        },

        // 员工中心
        '/employee': {
            title: '员工通道',
            name: 'employee',
            component: Employee,
            auth: true
        },

        '/employee/show': {
            title: '员工专属二维码',
            name: 'employee-show',
            component: EmployeeShow,
            auth: true
        },

        '/employee/rule': {
            title: '员工激励规则',
            name: 'employee-rule',
            component: EmployeeRule
        },

        '/employee/rank/member': {
            title: '累计扩展用户人数排行',
            name: 'employee-rank-member',
            component: EmployeeRankMember,
            auth: true
        },

        '/employee/rank/consumption': {
            title: '累计扩展用户总消费币数排行',
            name: 'employee-rank-consumption',
            component: EmployeeRankConsumption,
            auth: true
        },

        '/content': {
            title: '资讯首页',
            name: 'content',
            component: Content,
            loadMore: true
        },
        '/content/show/:id': {
            title: '资讯详情',
            name: 'content-show',
            component: ContentShow
        },
        '/content/preview/:id': {
            title: '资讯预览',
            name: 'content-preview',
            component: ContentPreview
        },
        '/content/template/:channel/:id': {
            title: '预览前页',
            name: 'content-template',
            component: ContentTemplate
        },

        // 留言
        '/content/post': {
            title: '留言',
            name: 'content-post',
            component: ContentPost
        },

        '/tips': {
            title: '打赏',
            name: 'tips',
            component: Tips
        },

        '/packet': {
            title: '红包',
            name: 'packet',
            component: Packet
        },

        // 我的分销
        '/tker': {
            title: '我的代言',
            name: 'tker',
            component: Tker,
            auth: true
        },

        // 如何分销
        '/tker/help': {
            title: '如何代言',
            name: 'tker-help',
            component: TkerHelp
        },

        // 集客列表
        '/tker/friends': {
            title: '粉丝列表',
            name: 'tker-friends',
            component: TkerFriends,
            auth: true
        },

        // 我要集客
        '/tker/profile': {
            title: '粉丝拓展',
            name: 'tker-profile',
            component: TkerProfile,
            auth: true
        },

        // 商家货源
        '/tker/mall': {
            title: '商家货源',
            name: 'tker-mall',
            component: TkerMall,
            auth: true
        },

        // 我的分销商城
        '/tker/mine': {
            title: '我的代言商城',
            name: 'tker-mine',
            component: TkerMine,
            auth: true
        },
        // 分销商城
        '/tker/product': {
            title: '代言商城',
            name: 'tker-product',
            component: TkerProduct,
            auth: true
        },

        // 佣金明细
        '/tker/profit': {
            title: '酬劳明细',
            name: 'tker-profit',
            component: TkerProfit,
            auth: true
        },

        // 分销红利
        '/tker/dividend': {
            title: '提成明细',
            name: 'tker-dividend',
            component: TkerDividend,
            auth: true
        },

        // 我要提现
        '/withdraw': {
            title: '我要提现',
            name: 'withdraw',
            component: Withdraw,
            auth: true
        },

        // 提现记录
        '/withdraw/list': {
            title: '提现记录',
            name: 'withdraw-list',
            component: WithdrawList,
            auth: true
        },
        // /media/upload?id={id}&w={w}&h={h}&redirect=member-setting&type=avatar|vcard|vcard-bg
        // member/setting?avatar={id}
        '/media/upload': {
            title: '图片裁剪',
            name: 'media-upload',
            component: MediaUpload
        },
        '/content/share': {
            title: '商品分享',
            name: 'content-share',
            component: ContentShare
        },
        '*': {
            component: NotFound
        },
        //TODO: 异步装载的有问题,待处理
        //,
        //'*': {
        //    component (resolve) {
        //        require(['../component/notfound'], resolve)
        //    }
        //}
        /*'/demo': {
         component: Demo
         }*/
    });

    router.redirect({
        // 重定向 / 到 /0
        '/': '/home',
        //'/home': '/mall',
        // TODO:兼容老的资讯首页链接
        '/content/list': '/content'
    });

    // https://github.com/vuejs/vue-router/tree/1.0/docs/zh-cn
    // global before
    // 3 options:
    // 1. return a boolean
    // 2. return a Promise that resolves to a boolean
    // 3. call transition.next() or transition.abort()
    // 全局的前置钩子函数，这个函数会在路由切换开始时调用
    router.beforeEach(function (transition) {
        // console.log('beforeEach', transition);
        // TODO:页面卸载时卸载滚动加载事件,位置待优化
        router.app.stopLoadMoreListener();
        router.app.hideLoading();
        router.app.clearTypeQueue();

        if (transition.to.auth && router.app.appLoaded && !router.app.isLogined) {
            return transition.redirect('/passport?redirect=' + encodeURIComponent(transition.to.path));
        }

        if (transition.to.title) {
            router.app.setTitle(transition.to.title, true);
            router.app.setTopBar({curText: transition.to.title});
        }
        document.body.className = 'app-page-' + transition.to.name;
        transition.next();
    });

    // 全局的后置钩子函数，该函数会在每次路由切换成功进入激活阶段时被调用
    router.afterEach(function (transition) {
        // console.log('afterEach', transition);
        router.app.setShare();
        router.app.hideTopBar();
        // TODO:页面载入时注册滚动加载事件,位置待优化
        if (transition.to.loadMore) {
            router.app.startLoadMoreListener();
        }
    });

    return router;
}
