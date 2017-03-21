/**
 * @Author:      Cold
 * @DateTime:    2016-08-20 10:35:17
 */

import Vue from 'vue';
import {
    XInput,
    XButton,
    Cell,
    Group,
    Address,
    AddressChinaData,
    XTextarea,
    Switch,
} from 'vux';
import './index.less';
import {name2value, value2name} from  'common/filter/address';
import {isValid} from 'common/util/validator';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XInput,
        Cell,
        Group,
        Address,
        XTextarea,
        XButton,
        Switch,
    },

    data () {
        return {

            // 地址选择组件value
            addressValue: [],

            // 地址所有区域的数据列表
            addressData: AddressChinaData,

            /*alert: {
             show: false,
             title: '提醒',
             text: '',
             },*/
        };
    },

    props: {
        // 显示表单
        show: {
            type: Boolean,
            default: false,
        },

        // 编辑带入表单填充的数据
        formData: {
            type: Object,
        },
    },

    computed: {

        // 是否为添加地址操作
        isAdd (){
            if (!this.formData.id) {
                return true;
            } else {
                return false;
            }
        },
    },

    watch: {
        show(val){
            if (val) {

                document.querySelector('.address-add-form').style.top = document.body.scrollTop + 'px';
                document.body.style.overflow = 'hidden';
                document.body.addEventListener('touchmove', this.bodyScroll, false);

                if (this.formData.id) {
                    this.addressValue = this.handelAddressValue(false);
                } else {
                    this.formData = this.handelDefaultFormData();
                }

            } else {
                document.body.removeEventListener('touchmove', this.bodyScroll, false);
                document.body.style.overflow = 'inherit';
            }
        },
    },

    methods: {

        // 阻止滑动
        bodyScroll(e){
            e.preventDefault();
        },

        // 保存地址
        onSave() {
            let formData = {
                ...this.formData,
                ...this.handelAddressValue(true),
            };

            if (!this.handelCheck(formData)) return;

            this.$emit('on-save', formData);
        },

        // 显示表单
        onShow() {
            this.show = true;
        },

        // 表单校验
        handelCheck(formData){
            if (formData.name == '') {
                this.$root.showToast({
                    content: '收货人姓名，不可为空'
                });
                return;
            }

            if (formData.mobile == '') {
                this.$root.showToast({
                    content: '收货人联系电话，不可为空',
                });
                return;
            }

            if (!isValid('mobile', formData.mobile)) {
                this.$root.showToast({
                    content: '手机号格式不正确'
                });
                return;
            }

            if (formData.prov == undefined || formData.region == undefined || formData.city == undefined || (formData.prov == '--' && formData.region == '--' && formData.city == '--')) {
                this.$root.showToast({
                    content: '请选择收货地址'
                });
                return;
            }

            if (formData.street == '') {
                this.$root.showToast({
                    content: '请输入详细地址'
                });
                return;
            }

            return true;
        },

        /* 转换地址处理数据
         true为转为API格式
         false转为组件可识别格式*/
        handelAddressValue(state) {
            if (state) {
                return {
                    prov: value2name(this.addressValue[0] || '', AddressChinaData),
                    city: value2name(this.addressValue[1] || '', AddressChinaData),
                    region: value2name(this.addressValue[2] || '', AddressChinaData)
                };
            } else {
                return [
                    name2value(this.formData.prov, AddressChinaData),
                    name2value(this.formData.city, AddressChinaData),
                    name2value(this.formData.region, AddressChinaData)
                ];
            }
        },
        // 表单默认值
        handelDefaultFormData(){
            this.addressValue = [name2value('--', AddressChinaData), name2value('--', AddressChinaData), name2value('--', AddressChinaData)];
            return {
                id: '',
                name: '',
                mobile: '',
                prov: '',
                region: '',
                city: '',
                street: '',
                often: false,
            };
        }
    },
});
