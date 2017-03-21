import Vue from 'vue';
import store from '../../store';
import {getMemberVcardById} from '../../store/vcard/action';
import {XButton, Flexbox, FlexboxItem} from 'vux';
import './index.less';
import {getMediaUrl, getVcardShareUrl, getVcardQrCodeUrl} from '../../util/url';
import VueImg from '../../component/vue-img';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Flexbox,
        FlexboxItem,
        XButton,
        VueImg
    },
    data: function () {
        return {
            imgs: {
                qrcode: __uri('./img/qrcode.png')
            },
            styleObject: {
                background: ''
            },
            style21: {},
            style22: {},
            vcardBackup: {
                adr: '上海市黄陂南路700号D座503',
                bgImg: '',
                email: 'iloka@linkin.mobi',
                logo: '',
                mobile: '131-1234-5678',
                name: 'iloka',
                nickname: '',
                note: '',
                org: '灵肯科技',
                photo: '',
                wechat: 'Michelle759921143',
                style: {
                    background: {
                        color: '#2f3033'
                    }
                },
                tel: '',
                title: '艾乐卡营销管家',
                url: ''
            },
            vcard: {},
            value: false,
            qrcode:'',
            shareUrl:''

        };
    },
    store,
    vuex: {
        getters: {
            uin: ({vsite}) => vsite.uin,
            vcardResult: ({vcard})=>vcard.vcard.result,
            vcardStatus: ({vcard})=>vcard.vcard.status,
        },
        actions: {
            getMemberVcardById: getMemberVcardById
        }
    },

    computed: {

    },

    watch: {
        'vcardStatus': function (val) {

            switch (val) {
                case 'getMemberVcardByIdSuccess':
                    this.vcard = this.vcardResult;
                    this.qrcode = getVcardQrCodeUrl(this.$route.query.id, 320);
                    this.shareUrl = getVcardShareUrl(this.uin, this.$route.query.id, this.$route.query.type);

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

                    let type = this.$route.query.type;

                    this.changeStyle(type);

                    this.$root.setShare({
                        title: this.vcard.name + '的名片',
                        desc: this.vcard.name + '的名片',
                        link: this.shareUrl,
                        imgId: this.vcard.logo,
                        isResolveLink: false
                    });
                    this.$parent.setTitle(this.vcard.name);
                    break;
                case 'getMemberVcardByIdFailure':
                    this.vcard = this.vcardBackup;
                    this.qrcode = '';
                    this.shareUrl = '';
                    break;
            }
        }
    },
    methods: {
        changeStyle: function (value) {
            switch (value) {
                case 'left':
                    this.style21 = {};
                    this.style22 = {};
                    break;
                case 'center':
                    this.style21 = {
                        textAlign: 'right'
                    };
                    this.style22 = {
                        textAlign: '-webkit-center'
                    };
                    break;
            }
        },
        gotoIndex: function () {

            this.$router.go({
                name: 'member-vcard'
            });
        }
    },
    created(){
        this.$root.showTopBar();
        this.getMemberVcardById(this.$route.query.id);
    }
});

