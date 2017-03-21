import Vue from 'vue';
import './index.less';
import '../content-show/index.less';
import * as wechat from 'common/lk-wechat';
import detect from 'common/util/detect';
import Envelope from '../../component/envelope';
import ContentOperation from '../../component/content-operation';
import store from '../../store';
import {getContentPreview, getCountly} from '../../store/content/action';
import {contentParse} from '../../util/media/content';
import {getMediaUrl} from '../../util/url';
import specialEffects from 'common/special-effects';
import VueImg from '../../component/vue-img';
import _ from 'lodash';


export default Vue.extend({
    template: __inline('./index.tpl'),
    store,
    components: {
        Envelope,
        ContentOperation,
        VueImg
    },

    data(){
        return {
            showTips: !detect.browser.desktop
        };
    },

    vuex: {
        getters: {
            uin: ({vsite}) => vsite.uin,
            item: ({content}) => content.content.data,
        },
        actions: {
            getContentPreview,
            getCountly
        }
    },

    route: {
        deactivate: function (transition) {
            if (this.isSpecialEffects()){
                location.reload();
            }
            transition.next();
        }
    },

    computed: {
        // 判断获取存在
        isCoupon() {

            let s = (this.item.couponId != undefined && this.item.couponId != '' ) ||
                (this.item.integralId != undefined && this.item.integralId != '' ) || this.getChannelRes('coupon');

            return s;
        }
    },

    methods: {

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
        },

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

        getChannelRes(type){
            let item = null;
            _.map(this.item.channelRes, (_item) => {
                if (type === _item.type) {
                    item = _item;
                }
            });

            return item;
        },
    },

    watch: {
        item(val) {
            if (!val) return;
            this.$parent.setTitle(val.title);
            this.$root.hidePageLoading();
            //抽离处理函数(目前支持视频处理)
            contentParse(this.$els.content);
            // this.renderShoppersImg();
            this.setSpecialEffects();
        }
    },

    created() {
        this.getContentPreview(this.$route.params.id);
        this.$root.showPageLoading();
        wechat.init();
    },
});
