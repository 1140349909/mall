import Vue from 'vue';
import ContentList from '../../component/content-list';
import './index.less';
import navbar from '../../component/navbar';
import XResult from  '../../component/x-result';
import Banner from '../../component/banner';
import store from '../../store';
import {
    GET_CONTENT_LIST_FAILURE,
    GET_CONTENT_LIST_SUCCESS,
    getContentList
} from '../../store/content/action';

export default Vue.extend({
    components: {
        Banner,
        ContentList,
        navbar,
        XResult,
    },
    template: __inline('./index.tpl'),
    data: function () {
        return {
            page: 0
        };
    },
    store,
    vuex: {
        getters: {
            uin: ({vsite}) => vsite.uin,
            operation: ({operation}) => operation,
            banner: ({vsite}) => vsite.banner,
            banners: ({vsite}) => vsite.banners,
            layout: ({vsite}) => vsite.layout,
            list: ({content}) => content.list
        },
        actions: {
            getContentList
        }
    },

    methods: {
        getList(page){
            this.page = page;
            this.getContentList({
                page: this.page
            });
        }
    },

    watch: {
        operation: {
            handler: function (action) {
                switch (action.type) {
                    case GET_CONTENT_LIST_SUCCESS:
                    case GET_CONTENT_LIST_FAILURE:
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
        }
    },
    events: {
        more(){
            this.getList(++this.page);
        }
    },
    created() {
        if (this.$root.authRedirect('content')) {
            this.$root.showPageLoading();
            this.getList(0);
        }
    }
});
