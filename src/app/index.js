import es6Promise from 'es6-promise';
import Vue from 'vue';
import VueRouter from 'vue-router';
import config from './config';
import configRouter from './route';
import VueTouch from 'vue-touch';
import App from './page/app';
import * as payment from 'common/lk-payment';
import 'vux/dist/vux.css';
import 'common/iconfont/iconfont.css';
import 'common/lk-content/index.less';
import './asset/base.less';
import './asset/mall.less';
import './asset/yyg.less';

es6Promise.polyfill();

const entry = {
    init() {

        // 使用vue插件
        Vue.use(VueRouter);

        // 使用touch触屏事件指令 https://github.com/vuejs/vue-touch
        Vue.use(VueTouch);

        // 启用调试
        Vue.config.debug = !config.RELEASED;

        // 是否启用devtools
        Vue.config.devtools = Vue.config.debug;

        // 加载directive组件
        Vue.directive('lazyload', require('common/directive/lazyload'));
        Vue.directive('minheight', require('common/directive/minheight'));
        Vue.directive('input-fix', require('common/directive/inputfix'));

        // 加载filter
        Vue.filter('media', require('./util/media'));
        Vue.filter('dateFormat', require('common/filter/dateFormat'));
        Vue.filter('numberFormat', require('common/filter/numberFormat'));
        Vue.filter('datetime', require('common/filter/datetime'));
        Vue.filter('moneyFormat', require('common/filter/moneyFormat'));
        Vue.filter('nickname', require('common/filter/nickname'));


        Vue.filter('encode', function (str) {
            return encodeURIComponent(str);
        });

        Vue.filter('decode', function (str) {
            return decodeURIComponent(str);
        });

        // 配置
        // http://router.vuejs.org/zh-cn/options.html
        const router = configRouter(new VueRouter({
            // 是否启用 HTML5 history 模式
            history: false,
            saveScrollPosition: false
        }));

        payment.setOptions({
            env: config.ENV,
            site: config.SITE
        });

        router.start(App, '#app');

        // TODO:识别当前应用签名
        // app-{os} : app-ard | app-ios
        // app-{client} : app-wap | app-app | app-wechat
        // app-{channel} app-linkin | app-iloka

    }
};

export default entry;

