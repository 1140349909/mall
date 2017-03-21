import Vue from 'vue';
import {XButton, Flexbox, FlexboxItem} from 'vux';
import store from '../../store';
import {getMemberVcard} from '../../store/vcard/action';
import {getMediaUrl, getVcardShareUrl, getVcardQrCodeUrl} from '../../util/url';
import Vcard from '../../component/vcard';
import './index.less';
import LkShare from 'common/lk-share';
import VueImg from '../../component/vue-img';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Flexbox,
        FlexboxItem,
        XButton,
        Vcard,
        VueImg
    },
    data: function () {
        return {
            imgs: {
                refresh: __uri('./img/refresh.png'),
                edit: __uri('./img/edit.png'),
                qrcode: __uri('./img/qrcode.png'),
                logo: __uri('./img/logo.png')
            },

            styleObject: {
                background: '',
                backgroundSize: ''
            },

            showDialog: false,
            styleType: 'left',
            style21: {},
            style22: {},
            qrcode: '',
            vcardBackup: {
                adr: '上海市黄陂南路700号D座503',
                bgImg: '',
                email: 'iloka@linkin.mobi',
                logo: '',
                mobile: '13112345678',
                name: 'iloka',
                nickname: '',
                note: '',
                org: '灵肯科技',
                photo: '',
                wechat: 'Michelle759921143',
                style: {
                    'background': {
                        'color': '#2f3033'
                    }
                },
                tel: '',
                title: '艾乐卡营销管家',
                url: ''
            },
            vcard: {},
            value: false,
            status: 'faliure'

        };
    },
    store: store,
    vuex: {
        getters: {
            uin: ({vsite}) => vsite,
            vcardResult: ({vcard})=>vcard.vcard.result,
            vcardStatus: ({vcard})=>vcard.vcard.status,
        },
        actions: {
            getMemberVcard: getMemberVcard
        }
    },

    computed: {},

    watch: {
        'vcardStatus': function (val) {

            switch (val) {
                case 'getMemberVcardSuccess':
                    this.vcard = this.vcardResult;
                    this.$root.hideLoading();
                    this.status = 'success';
                    this.qrcode = getVcardQrCodeUrl(this.vcard.id, 320);
                    break;
                case 'getMemberVcardFailure':
                    this.vcard = this.vcardBackup;
                    this.$root.hideLoading();
                    this.status = 'faliure';
                    this.qrcode = '';
                    this.$router.replace({
                        name: 'member-vcard-edit'
                    });
                    break;
                case 'getMemberVcardPending':
                    this.$root.showLoading('请稍候...');
                    break;
            }

            if (this.vcard.bgImg != '') {
                this.styleObject = {
                    backgroundImage: 'url("' + getMediaUrl(this.vcard.bgImg) + '")',
                    backgroundSize: '100% 100%',
                    backgroundPosition: '0 0',
                    backgroundRepeat: 'no-repeat'
                };
            } else {
                this.styleObject = {
                    background: this.vcard.style.background.color
                };
            }
        }
    },
    methods: {
        changeStyle: function () {

            this.value = !this.value;

            if (this.value) {
                this.style21 = {
                    textAlign: 'right'
                };
                this.style22 = {
                    textAlign: '-webkit-center'
                };
                this.styleType = 'center';
            } else {
                this.style21 = {};
                this.style22 = {};
                this.styleType = 'left';
            }
        },
        checkMyVCard: function (type) {

            switch (this.status) {
                case 'success':
                    switch (type) {
                        case 'share':
                            this.gotoShareVcard();
                            break;
                        case 'build':
                            this.buildMyVCard();
                            break;
                    }
                    break;
                case 'faliure':
                    this.$root.showToast({
                        content: '请先编辑自己的名片'
                    });
                    break;
            }
        },
        gotoShareVcard: function () {

            this.shareUrl = getVcardShareUrl(this.uin, this.vcard.id, this.styleType);
            //console.log(this.shareUrl);

            LkShare.show({
                title: this.vcard.name + '的名片',
                desc: this.vcard.name + '的名片',
                link: this.shareUrl,
                imgUrl: getMediaUrl(this.vcard.logo),
                isResolveLink: false
            });

            /*this.$router.go({
             name: 'member-vcard-share',
             query: {
             id: this.vcard.id,
             type: this.styleType
             }
             });*/

        },

        //canvas生成图片，NMB
        buildMyVCard: function () {
            this.showDialog = true;
        }
    },
    created(){
        this.$root.showTopBar({backGo: 'member'});
        this.getMemberVcard();
    }
});

