import Vue from 'vue';
import {Group, Cell, XButton} from 'vux';
import TkerInfo from '../../component/tker-info';
import Unit from '../../component/unit';
import store from '../../store';
import {openTkerSeller, getTkerMemberInfo} from '../../store/tker/action';
import {GET_MEMBER_INFO_SUCCESS, getMemberInfo} from '../../store/member/action';
import VueImg from '../../component/vue-img';
import './index.less';
import './tker.less';

// 我的分销
export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Group,
        Cell,
        TkerInfo,
        XButton,
        Unit,
        VueImg
    },
    store: store,
    data(){
        return {
            imgs:{
                guide: __uri('./img/guide.png')
            }
        };
    },
    vuex: {
        getters: {
            operation: ({operation}) => operation,
            info: ({member}) => member.info.data,
            isOpened: ({tker}) => tker.isOpened,
            // 获取当前推客会员的推客数据
            summary: ({tker}) => tker.summary
        },
        actions: {
            openTkerSeller,
            getMemberInfo,
            getTkerMemberInfo
        }
    },
    methods: {
        // 开通分销
        seller(){
            if (this.info.isImprove) {
                this.openTkerSeller();
            } else {
                this.$root.alert({
                    content: '请先完善资料,再来开通代言',
                    onOk: ()=> {
                        this.$router.go({
                            name: 'member-setting',
                            query: {
                                'redirect': '/tker'
                            }
                        });
                    }
                });
            }
        },
        // 跳转到分销商城
        goTkerMall(){
            this.$router.go({name: 'tker-mall'});
        }
    },
    computed: {
        // 切换展示的页面
        viewType(){
            // help | guide | index
            if (this.info.uinSeller) {
                return 'index';
            } else {
                if (this.isOpened) {
                    return 'guide';
                } else {
                    return 'help';
                }
            }
        }
    },
    watch: {
        operation: {
            handler: function (action) {
                if (GET_MEMBER_INFO_SUCCESS == action.type) {
                    this.$root.hidePageLoading();
                    document.body.className = 'app-page-tker-' + this.viewType;
                    if (this.info.uinSeller) {
                        this.getTkerMemberInfo();
                    }
                }
            },
            deep: true
        },
    },
    created(){
        this.$root.showTopBar({
            backGo: 'member'
        });
        this.$root.showPageLoading();
        this.getMemberInfo();
    },
});
