import Vue from 'vue';
import store from '../../store';
import {
    getProducts,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
} from '../../store/product/action';

import {getAsset} from '../../store/member/action';
import {getBannerBuy, GET_BANNER_BUY_SUCCESS, GET_BANNER_BUY_FAILURE} from '../../store/banner/action';
import {integral, isTker} from '../../store/getters';
import Navbar from '../../component/navbar';
import ProductList from '../../component/product-list';
import Banner from '../../component/banner';
import config from '../../config';
import XResult from '../../component/x-result';
import './index.less';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Banner,
        Navbar,
        ProductList,
        XResult,
    },
    data(){
        return {
            page: 0,
            typeDone: [
                GET_PRODUCTS_SUCCESS,
                GET_BANNER_BUY_SUCCESS,
            ],
        };
    },
    store,
    vuex: {
        actions: {
            getProducts,
            getAsset,
            getBannerBuy
        },

        getters: {
            integral,
            isTker,
            operation: ({operation}) => operation,
            info: ({vsite}) => vsite,
            uin: ({vsite}) => vsite.uin,
            list: ({product}) => product.list,
            isLogined: ({member}) => member.isLogined,
            banners: ({banner}) => banner.banners,
        }
    },

    methods: {
        getList(page){
            this.page = page;
            this.getProducts({
                buyType: 'mall',
                page: page
            });
        },

        typeQueueDone(isTypeQueue){
            if (isTypeQueue(this.typeDone)) {
                this.$root.hidePageLoading();
            }
        },
    },

    watch: {
        operation: {
            handler: function (action) {
                switch (action.type) {

                    case GET_BANNER_BUY_FAILURE:
                    case GET_BANNER_BUY_SUCCESS:
                        this.$root.hidePageLoading();
                        // this.$root.pushTypeQueue(action.type, this.typeQueueDone);
                        break;

                    case GET_PRODUCTS_SUCCESS:
                    case GET_PRODUCTS_FAILURE:
                        if (this.page == 0) {
                            // this.$root.pushTypeQueue(action.type, this.typeQueueDone);
                            this.getBannerBuy();
                            return;
                        }
                        this.$root.hidePageLoading();
                        this.$root.updateLoadMore({
                            status: action.status,
                            first: this.list.first,
                            last: this.list.last
                        });
                        break;
                }
            },
            deep: true
        },
        uin(){
            this.$root.setTitle(config.NAME, false);
        }
    },

    events: {
        more(){
            this.getList(++this.page);
        }
    },

    created(){
        if (this.$root.authRedirect('mall')) {

            this.$root.showPageLoading();

            this.getList(0);

            // setTimeout(() => {
            //     this.getBannerBuy();
            // }, 400);
        }
    },

});
