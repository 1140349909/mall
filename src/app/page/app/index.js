import Vue from 'vue';
import {Popup, Toast, Alert, Confirm, Loading, XHeader, Spinner} from 'vux';
import store from '../../store';
import config from '../../config';
import {vsiteSettings} from '../../store/getters';
import {getMediaUrl, getEntryUrl} from '../../util/url';
import {login, getAsset, getMemberInfo} from '../../store/member/action';
import {getWechatTicket} from '../../store/wechat/action';
import {getVSiteInfo} from '../../store/vsite/action';
import {addToCart} from '../../store/trade/action';
import * as wechat from 'common/lk-wechat';
import {setDocTitle, exists, reachBottom} from 'common/util';
import {browser} from 'common/util/detect';
import {ENTRY_CODE} from '../../config/constants';
import _ from 'lodash';
import Navbar from '../../component/navbar';
import YygPurchase from '../../component/yyg-purchase';
import PageLoading from '../../component/page-loading';
import TopBar from '../../component/top-bar';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Navbar,
        Popup,
        Toast,
        Alert,
        Confirm,
        Loading,
        YygPurchase,
        PageLoading,
        TopBar,
        XHeader,
        Spinner
    }, data(){
        return {

            isPurchaseVisible: false,

            curPurchaseItem: {},

            isPageLoading: false,

            typeQueue: [],

            // TODO:页头
            headerOpts: {
                title: '标题',
                leftOptions: {
                    showBack: true,
                    backText: '返回',
                    preventGoBack: false
                },
                rightOptions: {
                    showMore: false
                }
            },

            // 顶部栏
            topBarOpts: {
                show: false,
                curText: '',
                backText: '',
                slotCenter: '',
                slotRight: '',
                backGo: null,
            },

            // loading
            loadingOpts: {
                show: false,
                content: ''
            },

            // 轻提示
            toastOpts: {
                show: false,
                type: '',
                content: '',
                time: 0,
                width: ''
            },

            // 提示框
            alertOpts: {
                show: false,
                title: '',
                content: ''
            },

            // 确认框
            confirmOpts: {
                show: false,
                title: '',
                content: ''
            },

            // 加载更多
            loadMoreOpts: {
                // 是否显示
                show: false,
                // 是否可用
                available: false,
                spinner: 'dots',
                content: '正在加载...'
            }
        };
    },
    store,
    vuex: {
        actions: {
            getAsset,
            getMemberInfo,
            getWechatTicket,
            getVSiteInfo,
            addToCart,
            login
        },
        getters: {
            info: ({member})=> member.info.data,
            asset: ({member})=> member.asset,
            isLogined: ({member}) => member.isLogined,
            appLoaded: ({member}) => member.isLoaded,
            ticket: ({wechat}) => wechat.ticket,
            vsite: ({vsite}) => vsite,
            vsiteSettings
        }
    },
    watch: {
        ticket(ticket){
            // 初始化微信sdk
            wechat.init({
                appId: ticket.appId,
                timestamp: ticket.timestamp,
                nonceStr: ticket.nonceStr,
                signature: ticket.signature
            });

            if (!this.appLoaded) {
                this.getMemberInfo({login: true});
            }
        },
        vsite: {
            deep: true,
            handler(vsite){
                if (vsite.status == 'SUCCESS' && vsite.uin) {

                    if (config.ENV.indexOf('@') == 0 && config.DEBUG_OPENID) {
                        this.login(vsite.uin, config.DEBUG_OPENID);
                    }

                    if (browser.wechat) {
                        // 获取微信js ticket
                        this.getWechatTicket({
                            channel: config.CHANNEL,
                            uin: vsite.uin,
                            intercode: config.SITE,
                            url: location.href.split('#')[0]
                        });
                    } else {
                        this.getMemberInfo({login: true});
                    }
                }
            }
        },
        isPurchaseVisible(val){
            const ele = document.querySelector('.vux-popup-mask');
            const what = this;

            if (val) {
                // 阻止打开弹窗时滑动
                document.body.addEventListener('touchmove', this.bodyScroll, false);

                // popup-picker组件移除时，会销毁mask层, 判断添加mask层
                if (!ele) {
                    let mask = document.createElement('a');
                    mask.setAttribute('href', 'javascript:void(0)');
                    mask.setAttribute('class', 'vux-popup-mask vux-popup-show');
                    document.body.appendChild(mask);
                    mask.addEventListener('click', function (e) {
                        what.isPurchaseVisible = false;
                        e.target.setAttribute('class', 'vux-popup-mask');
                    });
                } else {
                    ele.setAttribute('class', 'vux-popup-mask vux-popup-show');
                }
            } else {
                document.body.removeEventListener('touchmove', this.bodyScroll, false);
            }
        }
    },
    methods: {

        // 提示框
        /*
         this.$root.alert({
         title:'',
         content:'',
         onOk:function(){
         console.log('ok');
         }
         });
         */
        alert(opts){
            this.alertOpts.show = true;
            this.alertOpts.title = exists(opts.title) ? opts.title : '操作提示';
            this.alertOpts.content = exists(opts.content) ? opts.content : '';
            if (_.isFunction(opts.onOk)) {
                this.$once('on-alert-ok', opts.onOk);
            }
        },

        // 确认框
        /*
         this.$root.confirm({
         title:'',
         content:'',
         onOk:function(){
         console.log('show');
         },
         onCancel:function(){
         console.log('show');
         }
         });
         */
        confirm(opts){
            this.confirmOpts.show = true;
            this.confirmOpts.title = exists(opts.title) ? opts.title : '确认提示';
            this.confirmOpts.content = exists(opts.content) ? opts.content : '';

            if (_.isFunction(opts.onOk)) {
                this.$once('on-confirm-ok', opts.onOk);
            }

            if (_.isFunction(opts.onCancel)) {
                this.$once('on-confirm-cancel', opts.onCancel);
            }
        },

        // 顶部栏
        /*
         this.$root.showTopBar({
         //显示方式
         show: true,

         //返回文字
         backText:'',

         //String 路由的name值 如backGo: 'mall'
         //或
         //Object 接收router.go()参数 如backGo:{name: 'mall', query: {id: 'abc'}}
         backGo: String || Object;

         //标题文字
         curText: '',

         //右侧slot
         slotRight: '<div>更多</div>',

         //标题部分slot
         slotCenter: '<div>我是标题</div>'
         });
         */
        setTopBar(opts){

            if (!opts) {
                return;
            }

            this.topBarOpts.show = opts.show || false;

            this.topBarOpts.backText = opts.backText || '返回';

            this.topBarOpts.slotCenter = opts.slotCenter || '';

            this.topBarOpts.slotRight = opts.slotRight || '';

            this.topBarOpts.backGo = opts.backGo || null;

            if (opts.curText) {
                this.topBarOpts.curText = opts.curText;
            }
        },

        showTopBar(opts){
            if (browser.wechat || browser.weibo || browser.qq) {
                return;
            }

            this.setTopBar(_.assign(
                {},
                opts,
                {show: true})
            );
        },

        hideTopBar(){
            this.topBarOpts.show = false;
        },

        // 轻提示 toast
        // text | success | cancel | warn
        // showToast({
        //     type: '',
        //     content: 'Hello World',
        //     time: 1000
        // })
        showToast(opts){
            this.toastOpts.show = true;

            this.toastOpts.type = exists(opts.type) ? opts.type : 'text';

            this.toastOpts.time = isNaN(opts.time) ? 1000 : opts.time;

            this.toastOpts.content = exists(opts.content) ? opts.content : '';

            this.toastOpts.width = exists(opts.width) ? opts.width : '';
        },

        // 关闭轻提示
        hideToast(){
            this.toastOpts.show = false;
        },

        // 操作loading
        // showLoading({
        //    type:'',
        //    content:''
        // });
        showLoading(content){
            this.loadingOpts.show = true;
            this.loadingOpts.content = content || '正在加载';
        },
        // 关闭操作loading
        hideLoading(){
            this.loadingOpts.show = false;
        },

        // 页面载入loading
        showPageLoading(){
            this.isPageLoading = true;
        },

        // 关闭页面载入loading
        hidePageLoading(){
            this.isPageLoading = false;
        },

        // 广播LoadMore事件
        _broadcastLoadMore(){
            if (this.$route.loadMore && reachBottom(100) && this.loadMoreOpts.available) {
                this.loadMoreOpts.show = true;
                // pending状态中,设置为不可用
                this.loadMoreOpts.available = false;
                this.$broadcast('more');
            }
        },
        // 打开LoadMore监听
        startLoadMoreListener(){
            // 设置可用
            this.loadMoreOpts.available = true;
            window.addEventListener('scroll', this._broadcastLoadMore, false);
        },
        // 停止LoadMore监听
        stopLoadMoreListener(){
            this.loadMoreOpts.show = false;
            this.loadMoreOpts.available = false;
            window.removeEventListener('scroll', this._broadcastLoadMore);
        },
        // 重置LoadMore
        resetLoadMore(){
            this.loadMoreOpts.available = this.$route.loadMore;
        },
        // first,last,status
        updateLoadMore(opts){
            // 是否第一页,
            // first: false,
            // 是否最后一页,
            // last: false,
            // 状态
            // status: '', // PENDING | SUCCESS | FAILURE

            let available = true;
            let show = true;

            if (opts.status == 'PENDING') {
                return;
            }

            if (opts.status == 'FAILURE') {
                available = true;
                return;
            }

            if (opts.status == 'SUCCESS') {
                if (opts.first) {
                    show = true;
                    available = true;
                }

                if (opts.last) {
                    show = false;
                    available = false;
                }
            }

            this.loadMoreOpts.available = available;
            this.loadMoreOpts.show = show;

        },
        purchase: function (item) {
            // 未登录
            if (!this.isLogined) {
                this.$router.go({
                    name: 'passport'
                });
            } else {
                if (item.mallCfg.stock <= item.creditRecieved) {
                    alert('已兑换完');
                } else if (this.asset.integral < item.mallCfg.integral) {
                    alert('已积分不足');
                } else {
                    //item.id
                    this.addToCart({
                        id: item.id
                    });

                    this.$router.go({
                        name: 'order'
                    });
                }
            }
        },
        setTitle(title, appendName){
            title = title || this.vsite.name || config.NAME;

            // if (appendName && this.vsite.name) {
            //     title = title + ' - ' + this.vsite.name;
            // }

            setDocTitle(title, appendName);
        },
        setShare(params){
            let shareInfo;
            if (params) {
                let link;
                if (params.link) {
                    // 是否转换
                    if (params.isResolveLink !== false) {
                        link = getEntryUrl({
                            uin: this.vsite.uin,
                            code: ENTRY_CODE.CUSTOMIZE,
                            url: params.link
                        });
                    } else {
                        link = params.link;
                    }
                } else {
                    link = this.vsite.share.link;
                }

                shareInfo = {
                    title: params.title,
                    desc: params.desc,
                    link: link,
                    imgUrl: params.imgId ? getMediaUrl(params.imgId, false) : params.imgUrl,
                };

                if (params.success) {
                    shareInfo.success = params.success;
                }

            } else {
                shareInfo = this.vsite.share;
            }

            wechat.ready(function () {
                wechat.wxShare(shareInfo);
            });
        },

        // 阻止滑动
        bodyScroll(e){
            e.preventDefault();
        },

        // 点击马上参与
        yygPurchase: function (item) {
            // 未登录
            if (!this.isLogined) {
                this.$router.go({
                    name: 'passport'
                });
            } else {
                this.isPurchaseVisible = true;
                this.curPurchaseItem = {
                    id: item.id,
                    name: item.name,
                    coverImgId: item.mediaRes.coverImgId,
                    bidStep: item.yygCfg.bidStep,
                    max: item.yygCfg.credit - item.creditRecieved,
                    amount: 1
                };
            }
        },
        // 选择马上参与提交数据
        onYygPurchaseSubmit(){

            this.addToCart({
                id: this.curPurchaseItem.id,
                bidStep: this.curPurchaseItem.bidStep,
                amount: this.curPurchaseItem.amount,
                money: this.curPurchaseItem.bidStep * this.curPurchaseItem.amount * 100
            });

            // 提交数据到购物车
            this.$router.go({
                name: 'yyg-order', params: {
                    id: this.curPurchaseItem.id
                }
            });

            this.purchaseClose();
        },//跳转到图片裁剪页面
        mediaUpload(item){
            // /media/upload?id={id}&w={w}&h={h}&redirect=member-setting&type=avatar|vcard|vcard-bg
            // member/setting?avatar={id}
            this.$router.go({
                name: 'media-upload',
                query: item
            });
        },
        // 默认主页跳转, 判断name的路由是否有权限,如果有权限就跳转,否则就跳转默认主页; 如果name为空就跳转到默认主页
        goHome(name){
            if (this.vsiteSettings.uin) {
                let home;
                if (name && this.vsiteSettings[name]) {
                    home = name;
                } else if (this.vsiteSettings.mall) {
                    home = 'mall';
                } else if (this.vsiteSettings.yyg) {
                    home = 'yyg';
                } else if (this.vsiteSettings.content) {
                    home = 'content';
                } else {
                    home = 'member';
                }

                this.$router.replace({
                    name: home
                });
            }
        },
        // 是否能跳转到这个页面,如果不能跳转就跳转到默认页面
        authRedirect(name){
            if (!(this.vsiteSettings.uin && this.vsiteSettings[name])) {
                this.goHome();
                return false;
            }
            return true;
        },

        purchaseClose(){
            const ele = document.querySelector('.vux-popup-mask');
            ele.setAttribute('class', 'vux-popup-mask');
        },

        /**
         * [pushTypeQueue 推入执行type到typeQueue队列 (处理多个异步action是否全部执行完成)]
         * @param  {String}   type     [推入队列的 action type]
         * @param  {Function} callback [执行函数时的回调，会带入isTypeQueue函数，用于判断所执行type是否全部执行完成]
         */
        pushTypeQueue(type, callback){

            // typeQueue 推入type
            this.typeQueue.push(type);

            if (callback) {
                callback((types) => {
                    return this.isTypeQueue(types);
                });
            }
        },

        /**
         * [isTypeQueue 判断所执行type是否全部执行完成]
         * @param  {Array}   types [需要等待统一执行处理的异步 action type]
         * @return {Boolean}       [type是否全部执行完成]
         */
        isTypeQueue(types) {
            let doneCount = 0;
            for (let i in this.typeQueue) {
                for (let k in types) {
                    if (this.typeQueue[i].indexOf(types[k]) !== -1) {
                        doneCount++;
                    }
                }
            }
            return types.length == doneCount ? true : false;
        },

        /**
         * [clearTypeQueue 清空typeQueue数组]
         */
        clearTypeQueue() {
            this.typeQueue = [];
        },
    },
    created(){
        this.getVSiteInfo(config.UIN, config.CHANNEL);
    },
    ready(){
        document.getElementById('app-loading').style.display = 'none';
    }
});
