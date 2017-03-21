import Vue from 'vue';
import {XButton} from 'vux';
import './index.less';
import * as wechat from 'common/lk-wechat';
import Envelope from '../../component/envelope';
import ContentOperation from '../../component/content-operation';
import OpinionList from '../../component/opinion-list';
import {parseParam, hasClass, closest, urlSerialization} from 'common/util';
import {getIlokaContentUrl} from '../../util/url';
import store from '../../store';
import {getMemberInfo} from '../../store/member/action';
import {getContent, getCountly, getOpinionList, getCountlyRedirect} from '../../store/content/action';
import {
    getDistributeEntry,
    GET_DISTRIBUTE_ENTRY_SUCCESS,
    GET_DISTRIBUTE_ENTRY_FAILURE
} from '../../store/distributeEntry/action';
import {contentParse} from '../../util/media/content';
import {getMediaUrl, getContentShowUrl, getEntryUrl} from '../../util/url';
import {browser} from 'common/util/detect';
import specialEffects from 'common/special-effects';
import config from '../../config';
import _ from 'lodash';
import {countlyRedirect} from '../../api/common';
import VueImg from '../../component/vue-img';

export default Vue.extend({
    template: __inline('./index.tpl'),
    store,
    components: {
        Envelope,
        ContentOperation,
        OpinionList,
        XButton,
        VueImg
    },

    data: function () {
        return {
            id: '',
            loadNumber: 0,
            minContentHeight: window.innerHeight,
            queryParams: {},
        };
    },

    route: {
        deactivate: function (transition) {
            if (this.isSpecialEffects()) {
                const effect = this.item.style.effect;
                if (effect === 'snow') {
                    specialEffects.snow.remove();
                } else if (effect === 'flowers') {
                    specialEffects.flowers.remove();
                }
            }
            transition.next();
        },
    },

    vuex: {
        getters: {
            uin: ({vsite}) => vsite.uin,
            item: ({content}) => content.content.data,
            contentErrCode: ({content}) => content.content.errCode,
            isLogined: ({member}) => member.isLogined,
            opinionList: ({content}) => content.opinion.list,
            operation: ({operation}) => operation,
        },

        actions: {
            getContent,
            getMemberInfo,
            getCountly,
            getOpinionList,
            getDistributeEntry,
            getCountlyRedirect
        }
    },

    computed: {
        // 判断获取存在
        isCoupon() {

            let s = (this.item.couponId != undefined && this.item.couponId != '' ) ||
                (this.item.integralId != undefined && this.item.integralId != '' ) || this.getChannelRes('coupon');

            return s;
        },

        isWechatr(){
            return browser.wechat;
        },
    },

    methods: {
        getIconMediaId(position) {
            if (this.item.style.iconMediaId) {
                return getMediaUrl(this.item.style.iconMediaId);
            }
            if (position !== 'fixed') {
                return require('./img/Group22.png');
            } else {
                return require('./img/min.png');
            }
        },

        // 判断页面是否全部加载
        isLoad(){
            this.loadNumber++;
            if (this.loadNumber == 2) {
                // this.renderShoppersImg();
                this.$root.hidePageLoading();
                //抽离处理函数(目前支持视频处理)
                contentParse(this.$els.content);

                this.setSpecialEffects();
            }
        },

        getChannelRes(type){
            let item = null;
            _.map(this.item.channelRes, (_item) => {
                if (type === _item.type) {
                    item = _item;
                }
            });

            return item;
        },

        // 打开红包
        onOpen() {

            let {id, couponId, integralId} = this.item;
            let couponItem = this.getChannelRes('coupon');

            if (couponItem) {
                this.getCountlyRedirect({
                    from: couponItem.channel,
                    url: couponItem.url,
                    name: couponItem.name
                });
                location.href = couponItem.url;
                return;
            }

            // 判断红包类型跳转
            if (couponId) {
                this.$router.go({
                    name: 'packet',
                    query: {
                        resId: id,
                        couponId,
                        resType: this.item.resType,
                    }
                });
                return;
            }

            if (integralId) {
                this.$router.go({
                    name: 'packet',
                    query: {
                        resId: id,
                        integralId,
                        resType: this.item.resType,
                    }
                });
                return;
            }
        },

        // 一键导购事件
        openAuto(e) {
            const ele = e.target;

            // 跳转对应的一键导购
            const doGo = (param, ele) =>{
                // 商城跳转
                if (param.type == 'mall' && !param.buyType) {
                    this.$router.go({
                        name: 'mall',
                    });
                    return;
                }

                // 一元购
                if (param.type == 'yyg' && !param.buyType) {
                    this.$router.go({
                        name: 'yyg',
                    });
                    return;
                }

                // 商城商品跳转
                if (param.type == 'product' && param.buyType == 'mall') {
                    this.$router.go({
                        name: 'product-show',
                        params: {
                            id: param.id,
                        },
                        query: {
                            resType: 'content',
                            resId: this.item.id
                        }
                    });
                    return;
                }

                // 一元购商品跳转
                if (param.type == 'product' && param.buyType == 'yyg') {
                    return this.$router.go({
                        name: 'yyg-product-show',
                        params: {
                            id: param.id,
                        },
                        query: {
                            resType: 'content',
                            resId: this.item.id
                        }
                    });
                }

                // 有赞商品跳转
                if (param.type == 'product' && param.buyType == 'youzan') {
                    let url = ele.getAttribute('data-url');
                    this.getCountlyRedirect({
                        from: 'youzan',
                        url,
                        name: param.name
                    });
                    location.href = url;
                    return;
                }

                if (param.type == 'h5') {
                    let url = getIlokaContentUrl({id: ele.getAttribute('data-id')});
                    location.href = url;
                }

                // 外链跳转
                if (param.type == 'link') {
                    let url = ele.getAttribute('data-id');
                    countlyRedirect({
                        from: 'rechtext',
                        url: url,
                        channel: config.CHANNEL,
                    }).then(()=> {
                        location.href = url;
                    }).catch(()=> {
                        location.href = url;
                    });
                }
            };

            if (ele.nodeName === 'A' && (hasClass(ele, 'lk-product') || hasClass(ele, 'lk-linkto'))) {
                // 防止href跳转
                ele.setAttribute('data-url', ele.href);
                ele.setAttribute('href', 'javascript:;');
                doGo(parseParam(ele.getAttribute('data')), ele);

            } else {
                let parentEle = closest(ele, '.lk-linkto');
                if (!parentEle) {
                    parentEle = closest(ele, '.lk-product');
                }
                if (parentEle) {
                    ele.setAttribute('data-url', ele.href);
                    parentEle.setAttribute('href', 'javascript:;');
                    doGo(parseParam(parentEle.getAttribute('data')), parentEle);
                }
            }
        },

        isSpecialEffects() {
            return _.has(this.item, 'style.effect');
        },

        setSpecialEffects() {
            if (this.isSpecialEffects()) {
                const effect = this.item.style.effect;
                const content = document.querySelector('.content');
                switch (effect) {
                    case 'snow':
                        specialEffects.snow.render(content);
                        break;
                    case 'flowers':
                        specialEffects.flowers.render(content);
                        break;
                    case 'stars':
                        specialEffects.stars.render(content);
                        break;
                }
            }
        },

        clearSpecialEffects(){
            if (this.isSpecialEffects()) {
                const effect = this.item.style.effect;
                switch (effect) {
                    case 'snow':
                        specialEffects.snow.remove();
                        break;
                    case 'flowers':
                        specialEffects.flowers.remove();
                        break;
                    case 'stars':
                        specialEffects.stars.remove();
                        break;
                }
            }
        },

        getEnableOpinion(){
            if ((_.has(this.item.actions, 'enableOpinion')) && this.item.actions.enableOpinion) {
                return true;
            } else {
                return false;
            }
        },

        goMall(){
            this.$router.go({
                name: 'mall'
            });
        },

        // 一购导购图片中插入导购图标
        renderShoppersImg(){
            let productEle = document.querySelectorAll('.lk-product,.lk-linkto');

            if (productEle.length == 0) {
                return;
            }

            _.map(productEle, (ele) => {
                if (ele.querySelector('img')) {
                    let tip = document.createElement('div');

                    tip.setAttribute('class', 'content-show-product-tip iconfont icon-lianjie');
                    ele.appendChild(tip);
                }
            });
        }
    },

    watch: {
        operation: {
            handler: function (action) {
                switch (action.type) {
                    case GET_DISTRIBUTE_ENTRY_SUCCESS:
                    case GET_DISTRIBUTE_ENTRY_FAILURE:
                        this.getContent(this.id);
                        break;
                }
            },
            deep: true
        },


        item(val) {
            if (!val) return;
            this.$parent.setTitle(val.title);

            if (val.vsite) {
                let queryParams = {
                    shareKey: val.shareKey,
                    ...this.queryParams
                };

                let url = `${getContentShowUrl(this.uin, val.id, true)}?${urlSerialization(queryParams)}`;
                const link = getEntryUrl({
                    uin: this.uin,
                    code: 'home',
                    channel: 'lkshare',
                    url,
                });

                this.$root.setShare({
                    title: val.vsite.title,
                    desc: val.vsite.desc,
                    link,
                    imgUrl: val.vsite.imgUrl,
                    isResolveLink: false,
                    success: () => {
                        this.getCountly({
                            type: 'forward',
                            code: 'content',
                            id: this.item.id,
                            shareKey: val.shareKey
                        });
                    }
                });
            }
            this.isLoad();
            if (this.getEnableOpinion()) {
                this.getOpinionList(this.id, {});
            } else {
                this.$root.hidePageLoading();
                //抽离处理函数(目前支持视频处理)
                contentParse(this.$els.content);
                this.setSpecialEffects();
            }
        },

        opinionList(val) {
            if (!val) return;
            this.isLoad();
        },

        contentErrCode() {
            this.$root.hidePageLoading();
        }
    },

    created() {
        const {
            channelUin,
            openChannel,
            pubId,
            resType,
        } = this.$route.query;
        this.id = this.$route.params.id;

        if (channelUin && openChannel && pubId && resType) {
            let params = {};

            params = {
                channelUin,
                openChannel,
                pubId,
                resType,
                uin: this.uin,
                resId: this.id
            };
            this.getDistributeEntry(params);
            this.queryParams = params;
        } else {
            this.getContent(this.id);
        }


        this.$root.showTopBar({backGo: 'content'});
        this.$root.showPageLoading();
        wechat.init();
    },
    ready(){
        setTimeout(()=> {
            this.minContentHeight = (window.innerHeight - this.$els.footer.offsetHeight - 25);
        }, 50);
    }
});
