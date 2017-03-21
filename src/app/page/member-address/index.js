/**
 * @Author:      Cold
 * @DateTime:    2016-08-20 16:57:15
 */
import Vue from 'vue';
import store from '../../store';
import {
    getAddresses,
    getAddress,
    delAddress,
    addAddressOpinion
} from '../../store/member/action';
import {browser} from  'common/util/detect';
import {
    addToCart
} from '../../store/trade/action';
import AddressItem from  '../../component/address-item';
import AddressAdd from  '../../component/address-add';
import XResult from '../../component/x-result';
import './index.less';
export default Vue.extend ({

    template: __inline ('./index.tpl'),

    data: function () {
        return {

            // 当前选择的ID
            currentId: '',

            // 在不同页面调用地址列表，处理状态
            queryType: '',

            // 表单数据
            formData: {},

            // 表单显示状态双向绑定
            addressAddShow: false,
        };
    },

    store,

    components: {
        AddressItem,
        AddressAdd,
        XResult,
    },

    vuex: {

        getters: {
            list: ({ member }) => member.address.list,
            item: ({ member }) => member.item,
            items: ({ member }) => member.items,
            addressStatus: ({ member }) => member.address.status
        },

        actions: {
            getAddress,
            getAddresses,
            addAddressOpinion,
            delAddress,
            addToCart,
        }
    },

    computed: {
        classAddressAdd(){
            if (!browser.wechat) {
                return 'member-address-notwechat';
            } else {
                return '';
            }
        }
    },

    methods: {

        // 选择地址项
        onLink(id){
            if ( this.queryType == 'mall' ) {
                this.$router.go ({
                    name: 'order',
                    query: {
                        addressId: id,
                    }

                });
            } else if ( this.queryType == 'yyg' ) {
                this.$router.go ({
                    name: 'yyg-trade-award',
                    query: {
                        addressId: id,
                    },
                    params: {
                        issueId: this.$route.query.issueId,
                        id: this.$route.query.id,
                    }
                });
            }
        },

        // 保存地址
        onSave(data){
            let formData = {
                ...data,
            };

            // 如果列表没有地址，保存则自动设为默认地址
            if (this.list.length == 0) {
                formData.often = true;
            }
            this.$root.showLoading();
            this.addAddressOpinion(formData);
        },

        // 编辑地址
        onEdit(id) {
            this.formData = this.items[ id ];
            this.addressAddShow = true;
        },

        // 删除地址
        onDelete(id) {
            this.currentId = id;
            this.$root.showLoading();
            this.delAddress(this.currentId);
        },

        // 设置默认地址
        onSetAddress(id) {
            let item = {
                ...this.items[id]
            };
            if (item.often == true) return;
            item.often = true;
            item.status = 'often';
            this.currentId = id;
            this.$root.showLoading();
            this.addAddressOpinion(item);
        },

        // 重置表单显示层，和表单
        reset(){
            this.addressAddShow = false;
            this.formData = {};
        }
    },


    watch: {

        // 异步请求成功返回
        addressStatus( val ) {
            switch ( val ) {

                // 添加返回
                case 'add':

                    // 如果列表为空时且地址管理从其他页面跳转过来，则直接弹出表单层
                    if ( this.list.length == 0 && this.queryType == 'yyg' || this.queryType == 'mall' ) {

                        // 不同页面跳转的处理
                        if ( this.queryType == 'yyg' ) {
                            this.$router.go ({
                                name: 'yyg-trade-award',
                                params: {
                                    issueId: this.$route.query.issueId,
                                    id: this.$route.query.id,
                                }
                            });

                        }else if ( this.queryType == 'mall' ) {
                            this.$router.go ({
                                name: 'order',
                            });
                        }
                    }else {
                        this.reset ();
                        this.getAddresses();
                    }
                    break;

                // 更新地址
                case 'update':
                    this.reset();
                    this.$root.hideLoading();
                    break;

                // 删除地址
                case 'del':
                    this.reset ();
                    this.getAddresses();
                    break;
            }
        },

        list(val){
            if (!val) return;
            this.$root.hideLoading();
            this.$root.hidePageLoading();
            if ( val.length == 0 && this.queryType != '' ) {
                this.addressAddShow = true;
            }
        }
    },

    created() {
        this.$root.showTopBar({backGo: 'member'});
        this.$root.showPageLoading();
        this.getAddresses();
        this.queryType = this.$route.query.type || '';
    },
});
