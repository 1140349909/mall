/**
 * Created by Asoiso on 16/10/16.
 */

// http://cn.vuejs.org/guide/mixins.html
// http://cn.vuejs.org/api/#extends
// https://github.com/vuejs/vue-router/tree/1.0/docs/zh-cn
// TODO:此模块还在单元测试阶段,其他模块请勿使用
export default {
    route: {
        activate: function (transition) {
            // console.log('PageBase:router:activated!');
            transition.next();
            // //this.token?transition.redirect('/'):transition.next()
        },
        deactivate: function (transition) {
            // console.log('PageBase:router:deactivate!');
            transition.next();
        },
        // data ({to: {params: {aid}}}) {
        //     console.log('routex:route-data');
        // },
        // activate ({ next }) {
        //     this.getApps()
        //     next()
        // }
    }
};
