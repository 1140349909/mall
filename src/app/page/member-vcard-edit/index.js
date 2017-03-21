import Vue from 'vue';
import {
    Group,
    Cell,
    XButton,
    Flexbox,
    FlexboxItem,
    XInput,
    XTextarea,
    Address,
    AddressChinaData,
    ColorPicker,
} from 'vux';
import store from '../../store';
import {updateMemberVcard, getMemberVcard} from '../../store/vcard/action';
import './index.less';
import {getMediaUrl,getVcardQrCodeUrl} from '../../util/url';
import XUpload from '../../component/x-upload';
import VueImg from '../../component/vue-img';

Vue.filter('addressConversion', function (value) {
    let val;
    AddressChinaData.map((item) => {
        if (value === item.value) {
            val = item.name;
            return false;
        }
    });

    return val;
});

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Group,
        Cell,
        Flexbox,
        FlexboxItem,
        XButton,
        XInput,
        XTextarea,
        Address,
        AddressChinaData,
        ColorPicker,
        XUpload,
        VueImg
    },
    data: function () {
        return {

            imgs: {
                upload: __uri('./img/upload.png'),
                qrcode:__uri('./img/qrcode.png'),
                photo: __uri('./img/photo.png')
            },

            //颜色选择器
            color: '#fff',
            colors: ['#FF3B3B', '#FFEF7D', '#8AEEB1', '#8B8AEE', '#CC68F8', '#fff'],
            //样式定义
            styleObject: {
                background: ''
            },

            showBgUpload: false,

            qrcode: '',

            addressText: '联系地址',
            addressData: AddressChinaData,

            index: undefined,

            title: '',
            content: '',

            address: [],
            note: '',

            colorList1: [
                {
                    index: 0,
                    color: '#ec4b52'
                }, {
                    index: 1,
                    color: '#f9ad30'
                }, {
                    index: 2,
                    color: '#f47a4f'
                }
            ],

            colorList2: [
                {
                    index: 3,
                    color: '#4c9ee3'
                }, {
                    index: 4,
                    color: '#63cb7b'
                }, {
                    index: 5,
                    color: '#735ea7'
                }
            ],

            vcard: {},

            selectType: '',

            vcardBackup: {
                adr: '',
                bgImg: '',
                email: '',
                logo: '',
                mobile: '',
                name: '',
                nickname: '',
                note: '',
                org: '',
                photo: '',
                wechat: '',
                style: {
                    background: {
                        color: '#2f3033'
                    }
                },
                tel: '',
                title: '',
                url: ''
            },

            item:{

            },
            showUpload:false,
            xuploadMediaUrl:''
        };
    },
    store: store,
    vuex: {
        getters: {
            uin: ({vsite}) => vsite.uin,
            // 提交成功返回结果
            mediaStatus: ({member}) => member.media.status,
            mediaData: ({member}) => member.media.data,
            // 不可删除，下面判断需要
            mediaParams: ({member}) => member.media.params,

            vcardResult: ({vcard})=>vcard.vcard.result,
            vcardStatus: ({vcard})=>vcard.vcard.status,

        },
        actions: {
            getMemberVcard: getMemberVcard,
            updateMemberVcard: updateMemberVcard
        }
    },

    computed: {},

    watch: {
        '$route':function (val) {

            let bgImg = val.query.bg;
            let logo = val.query.vcard;
            // console.log(bgImg,logo);

            if(bgImg){
                this.vcard.bgImg = bgImg;

                this.styleObject = {
                    backgroundImage: 'url("' + getMediaUrl(this.vcard.bgImg) + '")',
                    backgroundSize: '100% 100%',
                    backgroundPosition: '0 0',
                    backgroundRepeat: 'no-repeat'
                };

                // console.log(this.styleObject);

                this.selectType = 'bg';
            }

            if(logo){
                this.vcard.logo = logo;
            }


            // console.log(this.vcard);
        },
        /*'xuploadMediaUrl':function (val,oldVal) {
            console.log(val,oldVal);

            console.log(this.$route);

        },*/
        'vcardStatus': function (val) {

            //可能需要localStorage备份bgImg和logo
            // let storage = window.localStorage;

            switch (val) {
                case 'getMemberVcardSuccess':

                    this.$root.hideLoading();

                    this.vcard = {
                        adr:this.vcardResult.adr,
                        //添加storage.vcard.bgImg
                        bgImg: this.vcardResult.bgImg,
                        email:this.vcardResult.email,
                        //添加storage.vcard.logo
                        logo:  this.vcardResult.logo,
                        mobile: this.vcardResult.mobile,
                        name: this.vcardResult.name,
                        nickname: this.vcardResult.nickname,
                        note: this.vcardResult.note,
                        org: this.vcardResult.org,
                        photo: this.vcardResult.photo,
                        style: this.vcardResult.style,
                        tel: this.vcardResult.tel,
                        title: this.vcardResult.title,
                        url: this.vcardResult.url,
                        wechat: this.vcardResult.wechat,
                    };

                    /*this.vcard = {
                        adr: storage.adr != '' && storage.adr != undefined?storage.adr:this.vcardResult.adr,
                        //添加storage.vcard.bgImg
                        bgImg: storage.bgImg != '' && storage.bgImg != undefined? storage.bgImg : this.vcardResult.bgImg,
                        email: storage.email != ''&& storage.email != undefined?storage.email:this.vcardResult.email,
                        //添加storage.vcard.logo
                        logo: storage.logo != '' && storage.logo != undefined? storage.logo : this.vcardResult.logo,
                        mobile: storage.mobile != ''&& storage.mobile != undefined?storage.mobile:this.vcardResult.mobile,
                        name: storage.name != ''&& storage.name != undefined?storage.name:this.vcardResult.name,
                        nickname: storage.nickname != ''&& storage.nickname != undefined?storage.nickname:this.vcardResult.nickname,
                        note: storage.note != ''&& storage.note != undefined?storage.note:this.vcardResult.note,
                        org: storage.org != ''&& storage.org != undefined?storage.org:this.vcardResult.org,
                        photo: storage.photo != ''&& storage.photo != undefined?storage.photo:this.vcardResult.photo,
                        style: storage.style != '' && storage.style != undefined?JSON.parse(storage.style):this.vcardResult.style,
                        tel: storage.tel != ''&& storage.tel != undefined?storage.tel:this.vcardResult.tel,
                        title: storage.title != ''&& storage.title != undefined?storage.title:this.vcardResult.title,
                        url: storage.url != ''&& storage.url != undefined?storage.url:this.vcardResult.url,
                        wechat: storage.wechat != ''&& storage.wechat != undefined?storage.wechat:this.vcardResult.wechat,
                    };*/

                    // console.dir(this.vcard);
                    // this.qrcode = config.API_BASE_URL + '/vcard/qrcode/' + this.vcardResult.id + '/320';
                    this.qrcode = getVcardQrCodeUrl(this.vcardResult.id,320);

                    break;
                case 'getMemberVcardFailure':
                    this.$root.hideLoading();
                    this.vcard = this.vcardBackup;

                    /*this.vcard = {
                        adr: storage.adr != '' && storage.adr != undefined?storage.adr:this.vcardBackup.adr,
                        //添加storage.vcard.bgImg
                        bgImg: storage.bgImg != '' && storage.bgImg != undefined? storage.bgImg : this.vcardBackup.bgImg,
                        email: storage.email != ''&& storage.email != undefined?storage.email:this.vcardBackup.email,
                        //添加storage.vcard.logo
                        logo: storage.logo != '' && storage.logo != undefined? storage.logo : this.vcardBackup.logo,
                        mobile: storage.mobile != ''&& storage.mobile != undefined?storage.mobile:this.vcardBackup.mobile,
                        name: storage.name != ''&& storage.name != undefined?storage.name:this.vcardBackup.name,
                        nickname: storage.nickname != ''&& storage.nickname != undefined?storage.nickname:this.vcardBackup.nickname,
                        note: storage.note != ''&& storage.note != undefined?storage.note:this.vcardBackup.note,
                        org: storage.org != ''&& storage.org != undefined?storage.org:this.vcardBackup.org,
                        photo: storage.photo != ''&& storage.photo != undefined?storage.photo:this.vcardBackup.photo,
                        style: storage.style != '' && storage.style != undefined?JSON.parse(storage.style):this.vcardBackup.style,
                        tel: storage.tel != ''&& storage.tel != undefined?storage.tel:this.vcardBackup.tel,
                        title: storage.title != ''&& storage.title != undefined?storage.title:this.vcardBackup.title,
                        url: storage.url != ''&& storage.url != undefined?storage.url:this.vcardBackup.url,
                        wechat: storage.wechat != ''&& storage.wechat != undefined?storage.wechat:this.vcardBackup.wechat,
                    };*/

                    this.qrcode = '';
                    break;
                case 'getMemberVcardPending':
                    this.$root.showLoading('请稍候...');
                    break;
                case 'pending':
                    this.$root.showLoading('正在提交...');
                    break;
                case 'success':
                    this.$root.hideLoading();
                    this.$root.showToast({
                        type: 'success',
                        content: '提交成功'
                    });
                    //提交成功自动返回上页
                    this.$router.replace({
                        name: 'member-vcard'
                    });
                    break;
                case 'failure':
                    this.$root.hideLoading();
                    this.$root.showToast({
                        type: 'cancel',
                        content: '提交失败'
                    });
                    break;
            }

            let colorList = this.colorList1.concat(this.colorList2);

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
                for (let i = 0; i < colorList.length; i++) {
                    if (colorList[i].color == this.vcard.style.background.color) {
                        this.index = i;
                        break;
                    }
                }
            }


        },


        //已经上传到公司的服务器，此时应该显示“上传成功”并清空状态
        'mediaStatus': function (val) {

            this.$root.hideLoading();

            switch (val) {
                case 'add':

                    switch (this.mediaParams.restype) {
                        case 'bg':

                            this.vcard.bgImg = this.mediaData;

                            this.styleObject = {
                                backgroundImage: 'url("' + getMediaUrl(this.vcard.bgImg) + '")',
                                backgroundSize: '100% 100%',
                                backgroundPosition: '0 0',
                                backgroundRepeat: 'no-repeat'
                            };

                            this.selectType = 'bg';

                            break;
                        case 'vcard':
                            this.vcard.logo = this.mediaData;
                            break;
                    }

                    this.$root.showToast({
                        content: '上传成功',
                        time: 3000
                    });
                    break;

                case 'failure':

                    this.$root.showToast({
                        type: 'warn',
                        content: '上传失败',
                        time: 3000
                    });
                    break;
                case 'pending':
                    break;
            }

        }
    },
    methods: {
        setHeaderBgColor: function () {

            this.vcard.style = {
                background: {
                    color: '#f4f4f4'
                }
            };

            this.index = undefined;

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

            this.showBgUpload = true;

        },
        selectBgColor: function (item, $index) {

            this.showBgUpload = false;

            this.index = $index;

            this.vcard.style = {
                background: {
                    color: item.color
                }
            };

            this.styleObject = {
                background: item.color
            };

            this.selectType = 'color';

        },
        submitImage: function (type) {

            // console.log(this.vcard.style);

           /* let storage = window.localStorage;

            storage.adr = this.vcard.adr;
            storage.bgImg = this.vcard.bgImg;
            storage.email = this.vcard.email;
            storage.logo = this.vcard.logo;
            storage.mobile = this.vcard.mobile;
            storage.name = this.vcard.name;
            storage.nickname = this.vcard.nickname;
            storage.note = this.vcard.note;
            storage.org = this.vcard.org;
            storage.photo = this.vcard.photo;
            //保存对象
            storage.style = JSON.stringify(this.vcard.style);

            storage.tel = this.vcard.tel;
            storage.title = this.vcard.title;
            storage.url = this.vcard.url;
            storage.wechat = this.vcard.wechat;
            */
            //TODO：只要触发这个动作，就需要本地缓存所有的信息！

            //暂时没有想好
            this.item = {
                id: '',//图片id
                width: '',
                height: '',
                redirectUrl: 'member-vcard-edit',
                type: type,
                uin: this.uin,
                resType: type
            };

            //更换为裁剪用函数
            switch (type) {
                case 'bg':
                    this.item.id = this.vcard.bgImg;//图片id
                    this.item.width = 588;
                    this.item.height = 202;
                    break;
                case 'vcard':
                    this.item.id = this.vcard.logo;//图片id
                    this.item.width = 100;
                    this.item.height = 100;
                    break;
            }

            this.showUpload = true;

            /*LKUpload.uploadify({
                uin: item.uin,
                owner: 'users',
                resType: type,
                fileSizeLimit: '1024',
                onUploadSuccess: (result, mediaId)=> {
                    item.id = mediaId;
                    this.$root.showLoading();
                    this.$root.mediaUpload(item);
                },
                onUploadError: (result)=> {
                    this.$root.hideLoading();
                    this.$root.showToast({
                        type: 'cancel',
                        content: result
                    });
                },
                onUploadProgress: ()=> {
                    this.$root.showLoading('');
                }
            });*/

        },
        updateMemberVcardEntry: function () {

            switch (this.selectType) {
                case 'color':
                    this.vcard.bgImg = '';
                    break;
                case 'bg':
                    this.vcard.style.background.color = '';
                    break;
            }

            let checkList = {
                'adr': '工作地址',
                'email': '电子邮箱',
                'logo': 'logo',
                'mobile': '手机号码',
                'name': '姓名',
                'org': '公司名称',
                'title': '公司职务',
                'wechat': '微信号'
            };

            for (let attr in this.vcard) {

                if (this.$refs.hasOwnProperty(attr) && !this.$refs[attr].valid) {
                    this.$root.showToast({
                        content: '无效或为空的' + checkList[attr]
                    });
                    return;
                }

            }
            this.updateMemberVcard(this.vcard);

        }
    },
    created(){
        this.$root.showTopBar({backGo: 'member'});

        //可能需要localStorage备份bgImg和logo
        /*let storage = window.localStorage;

        //都没有参数的情况下才会清空
        if (this.$route.query.bg == undefined && this.$route.query.vcard == undefined) {
            storage.adr = '';
            storage.bgImg = '';
            storage.email = '';
            storage.logo ='';
            storage.mobile = '';
            storage.name = '';
            storage.nickname = '';
            storage.note = '';
            storage.org = '';
            storage.photo = '';
            storage.style = '';
            storage.tel = '';
            storage.title = '';
            storage.url = '';
            storage.wechat = '';
            // 其它缓存全部清空

        }

        //赋值
        if (this.$route.query.bg != undefined) {
            console.log(this.$route.query.bg);
            storage.bgImg = this.$route.query.bg;
        }
        if (this.$route.query.vcard != undefined) {
            console.log(this.$route.query.vcard);
            storage.logo = this.$route.query.vcard;
        }*/

        this.getMemberVcard();
    }
});

