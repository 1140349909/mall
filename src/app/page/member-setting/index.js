import Vue from 'vue';
import {Group, Cell, XInput, Selector, Datetime, XButton, PopupPicker} from 'vux';
import store from '../../store';
import {GET_MEMBER_INFO_SUCCESS, getMemberInfo, updateMemberInfo} from '../../store/member/action';
import dateFormat from 'common/filter/dateFormat';
import XUpload from '../../component/x-upload';
import _ from 'lodash';
import './index.less';

Vue.filter('isSex', function (value) {
    if (value == 'M') {
        return '男';
    } else if (value == 'F') {
        return '女';
    } else if (value == '') {
        return '';
    }
});


export default Vue.extend({
    template: __inline('./index.tpl'),

    components: {
        Group,
        Cell,
        XInput,
        Selector,
        Datetime,
        XButton,
        PopupPicker,
        XUpload
    },

    data: function () {
        return {
            form: {
                headImg: '',
                birthday: '',
                name: '',
                sex: '',
            },
            upeadSuccess: false,

            sexList: [['男', '女']],
            sexValue: ['男'],

            // 页中最小高度
            minContentHeight: 0,
            showUpload : false,
            xuploadMediaUrl : ''
        };
    },

    store,

    vuex: {
        getters: {
            operation: ({operation}) => operation,
            item: ({member}) => member.info.data,
            infoStatus: ({member}) => member.info.status,
            mediaStatus: ({member}) => member.media.status,
            mediaData: ({member}) => member.media.data,
            vsite: ({vsite}) => vsite
        },

        actions: {
            updateMemberInfo: updateMemberInfo,
            getMemberInfo: getMemberInfo,
        }
    },

    computed: {
        maxYear() {
            return new Date().getFullYear();
        },
    },
    methods: {

        // 出生日期改变时
        datetimeChange: function (val) {
            this.form.birthday = val;
        },

        // 上传头像
        uploadImg: function () {
            this.showUpload = true;
        },

        submit: function () {
            let data = this.form;
            if (data.name.length > 15) {
                this.$root.showToast({
                    type: 'cancel',
                    content: '姓名不得超过15个字'
                });
                return;
            }
            data.sex = this.sexValue[0] == '男' ? 'M' : 'F';
            this.$root.showLoading();
            this.updateMemberInfo(data);
        },
        redirect(){
            var url = this.$route.query.redirect || '/member';
            this.$router.go(decodeURIComponent(url));
        }
    },

    watch: {
        operation: {
            handler: function (action) {
                if (action.type == GET_MEMBER_INFO_SUCCESS) {
                    this.$root.hidePageLoading();
                }
            },
            deep: true
        },
        mediaStatus(val) {
            if (val == 'add') {
                this.$root.hideLoading();
                this.form.headImg = this.mediaData;
            }
        },
        xuploadMediaUrl(val){
            this.form.headImg = val;
        },
        infoStatus(val){
            switch (val) {
                case 'get':
                    //获取小时数，修复夏令时的hack
                    let hours = new Date(parseInt(this.item.birthday)).getHours();
                    if (hours != 0) {
                        if (hours >= 12) {
                            this.birthday = parseInt(this.item.birthday) + 3600000 * (24 - hours);
                        } else {
                            this.birthday = parseInt(this.item.birthday) - 3600000 * hours;
                        }
                    } else {
                        this.birthday = parseInt(this.item.birthday);
                    }
                    this.form.headImg = _.has(this.$route.query, 'headimg') ? this.$route.query.headimg : this.item.headImg;
                    this.form.birthday = this.item.birthday == undefined ? '' : dateFormat(this.birthday.toString());
                    this.form.name = this.item.name;
                    this.sexValue = [this.item.sex == 'M' ? '男' : '女'];
                    break;

                case 'update':
                    setTimeout(() => {
                        this.redirect();
                    }, 1000);
                    this.$root.hideLoading();
                    this.$root.showToast({
                        type: 'success',
                        content: '修改成功',
                    });
                    this.hasOften = false;
                    break;
            }
        },
    },

    created() {
        this.$root.showTopBar({
            backGo: 'member'
        });
        this.getMemberInfo();
        this.$root.hideLoading();
        this.$root.showPageLoading();
    },

    ready(){
        this.minContentHeight = (window.innerHeight - this.$els.footer.offsetHeight);
    }
});
