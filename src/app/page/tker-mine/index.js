import Vue from 'vue';
import {XButton} from 'vux';
import store from '../../store';
import {updateTker, getTkerMemberProductList} from '../../store/tker/action';
import ProductList from '../../component/product-list';
import XResult from '../../component/x-result';
import {tkerSiteShareInfo} from '../../store/getters';
import LkShare from 'common/lk-share';
import {TKER_TYPE} from '../../config/constants';
const TKER_TYPE_TKER_SITE = TKER_TYPE.TKER_SITE;
import './index.less';

// 我的分销商城 => 管理查看
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XButton,
        ProductList,
        XResult,
    },
    store: store,
    data(){
        return {};
    },
    vuex: {
        getters: {
            list: ({tker}) => tker.memberProductList.content,
            total: ({tker}) => tker.memberProductList.content.length,
            tkerSiteUrl: ({tker}) => tker.tasks[TKER_TYPE_TKER_SITE].url,
            tkerSiteShareInfo: tkerSiteShareInfo
        },
        actions: {
            updateTker,
            getTkerMemberProductList
        }
    },
    methods: {
        shareSite(){
            if (this.total > 0) {
                LkShare.show(this.tkerSiteShareInfo);
            } else {
                this.$root.alert({
                    content: '你还没有代言商品,请先添加代言商品',
                    onOk: ()=> {
                        this.$router.go({
                            name: 'tker-mall'
                        });
                    }
                });
            }
        },
        // 设置站点分销信息
        setShareSiteInfo(){
            if (this.tkerSiteShareInfo) {
                this.$root.setShare(this.tkerSiteShareInfo);
            }
        }
    },
    watch: {
        list(){
            // 如果列表有数据再去获取分销链接
            if (this.total > 0 && !this.tkerSiteUrl) {
                this.updateTker({
                    type: TKER_TYPE_TKER_SITE,
                    productDesc: {}
                });
            }
        },
        tkerSiteUrl(){
            this.setShareSiteInfo();
        },
    },

    created(){
        this.$root.showTopBar({
            backGo: 'tker'
        });
        this.getTkerMemberProductList({
            page: 0
        });

        // 如果有分销入口URL,就直接设置分享信息
        if (this.tkerSiteUrl) {
            this.setShareSiteInfo();
        }
    }
});
