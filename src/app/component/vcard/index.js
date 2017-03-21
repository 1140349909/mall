import Vue from 'vue';
import store from '../../store';
import {Dialog, Tab, TabItem, XButton} from 'vux';
import './index.less';
import {getMediaUrl,getMainUrl} from '../../util/url';
import config from '../../config';
import {updateBase64} from '../../store/product/action';

const IMGS = {
    ImgVCard: __uri('./img/bg.png'),
    ImgBg: __uri('./img/logo.png'),
    ImgLogo: __uri('./img/logo.png'),
    ImgShade: __uri('./img/shade.png'),
    ImgWeChat: __uri('./img/wechat.png'),
    ImgMobile: __uri('./img/mobile.png'),
    ImgEmail: __uri('./img/email.png'),
    ImgAddress: __uri('./img/address.png'),
    ImgSave: __uri('./img/save.png')
};

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Dialog,
        Tab,
        TabItem,
        XButton,
    },
    props: {
        type: String,
        vcard: {
            type: Object,
            default: {}
        },
        show: {
            type: Boolean,
            // 双向绑定
            twoWay: true
        }
    },
    store: store,
    data: function () {
        return {
            id: '',
            // type: 'product',
            canvas: {},

            //dialog
            // show: false,
            QrcodeUrl: '',

            success: false,
            failure: false,
            finished: false
        };
    },
    vuex: {
        getters: {
            item: ({product}) => product.item,

            base64Result: ({product}) => product.base64.result,
            base64Status: ({product}) => product.base64.status,
            base64Params: ({product}) => product.base64.params,

            showResult: ({product}) => product.show.result,
            showStatus: ({product}) => product.show.status,
            showParams: ({product}) => product.show.params

        },
        actions: {
            updateBase64,
            getMediaUrl
        }
    },
    watch: {
        'show': function (val) {

            switch (val) {
                case true:
                    this.drawCanvas(this.vcard, this.type);
                    break;
                case false:
                    this.finished = false;
                    break;
            }

        },
        'base64Status': function (val) {

            this.$root.showLoading('正在生成...');


            switch (val) {
                case 'success':
                    this.finished = true;
                    this.$root.hideLoading();

                    this.$root.showToast({
                        type: 'success',
                        content: '处理成功'
                    });
                    var newImg = document.createElement('img');
                    newImg.src = getMediaUrl(this.base64Result);
                    newImg.style.width = '100%';
                    newImg.style.height = 'auto';
                    document.getElementById('canvas').innerHTML = '';
                    document.getElementById('canvas').appendChild(newImg);
                    break;
                case 'unknown':
                    this.$root.hideLoading();
                    this.$root.showToast({
                        type: 'cancel',
                        content: '处理失败'
                    });

                    break;
                case 'failure':
                    this.$root.hideLoading();
                    this.$root.showToast({
                        type: 'cancel',
                        content: '处理失败'
                    });
                    break;
            }

        }
    },
    //
    methods: {

        loadImages: function (sources, callback) {

            var count = 0,
                images = {},
                imagesBak = {},
                imgNum = 0;
            for (var num in sources) {
                imagesBak[num] = new Image();
                imagesBak[num].crossOrigin = 'Anonymous';
                imgNum++;
            }

            for (var src in sources) {
                images[src] = new Image();
                images[src].crossOrigin = 'Anonymous';
                images[src].onload = function () {
                    if (++count >= imgNum) {
                        callback(images);
                    }
                };
                images[src].src = sources[src];
            }
        },

        drawCanvas: function (data, type) {

            let test = this;

            //动态创建元素
            var canvas = document.createElement('canvas');
            //定义画布
            canvas.width = 587;

            //1:726
            //2:966
            canvas.height = 726;

            var ctx = canvas.getContext('2d');

            let icon = {
                w: 32,
                h: 32
            };

            //定义一组规范坐标
            let xyData = {
                header: 202,

                // qrcode-debug
                /*qrCode: {
                 x: 410,
                 y: 58,
                 w: 144,
                 h: 144
                 },*/
                qrCode: {
                    x: 410 - 16,
                    y: 58 - 16,
                    w: 160,
                    h: 160
                },
                name: {
                    x: 34,
                    y: 98,
                    color: 'white'
                },
                desc: {
                    y: 143,
                    color: '#cbcbcb'
                },
                qrCodeBg: {
                    h: 46,
                    color: '#6f7075'
                },
                qrcodeText: {
                    color: 'white'
                },
                logo: {
                    x: 40,
                    y: 259,
                    w: 100,
                    h: 100
                },
                wechat: {
                    y: 383,
                    w: icon.w,
                    h: icon.h
                },
                mobile: {
                    plus: 50,
                    w: icon.w,
                    h: icon.h
                },
                email: {
                    plus: 50,
                    w: icon.w,
                    h: icon.h
                },
                address: {
                    plus: 50,
                    w: icon.w,
                    h: icon.h
                },
                infoText: {
                    color: '#595959',
                    plus: 45
                },
                home: {
                    url: {
                        y: 635,
                        color: '#4285be'
                    },
                    text: {
                        plus: 22,
                        color: '#b5b6b6'
                    }

                },
                save: {
                    x: 34,
                    y: 726,
                    w: 520,
                    h: 189
                },
                org: {},
                title: {}
            };

            var infoText1 = '微信：' + data.wechat;
            var infoText2 = '手机：' + data.mobile;
            var infoText3 = '邮件：' + data.email;
            var infoText4 = '地址：' + data.adr;

            // console.log(type);

            switch (type) {
                case 'left':
                    // xyData.desc.x = xyData.name.x;
                    xyData.org.x = xyData.name.x;
                    xyData.title.x = xyData.name.x;

                    // console.log(xyData.desc.x );

                    xyData.wechat.x = xyData.logo.x;
                    xyData.mobile.x = xyData.logo.x;
                    xyData.email.x = xyData.logo.x;
                    xyData.address.x = xyData.logo.x;
                    break;
                case 'center':


                    // console.log(ctx.measureText(data.name).width);

                    //姓名
                    var name = data.name;
                    ctx.font = '34px Arial';
                    xyData.name.x = 345 - ctx.measureText(name).width;

                    //摘要=公司/职位
                    /* var desc = data.org + '/' + data.title;
                     ctx.font = '24px Arial';
                     xyData.desc.x = 345 - ctx.measureText(desc).width;*/

                    var org = data.org;
                    ctx.font = '24px Arial';
                    xyData.org.x = 345 - ctx.measureText(org).width;

                    var title = data.title;
                    ctx.font = '24px Arial';
                    xyData.title.x = 345 - ctx.measureText(title).width;

                    //logo居中
                    // xyData.logo.w = xyData.logo.h * images.ImgLogo.width / images.ImgLogo.height;
                    xyData.logo.x = (canvas.width - xyData.logo.w) / 2;

                    //其他
                    ctx.font = '20px Arial';
                    xyData.wechat.x = (canvas.width - (ctx.measureText(infoText1).width + xyData.infoText.plus + xyData.wechat.w)) / 2;

                    xyData.mobile.x = (canvas.width - (ctx.measureText(infoText2).width + xyData.infoText.plus + xyData.mobile.w)) / 2;

                    xyData.email.x = (canvas.width - (ctx.measureText(infoText3).width + xyData.infoText.plus + xyData.email.w) ) / 2;

                    xyData.address.x = (canvas.width - (ctx.measureText(infoText4).width + xyData.infoText.plus + xyData.address.w)) / 2;

                    break;
            }


            xyData.body = canvas.height - xyData.header;

            xyData.qrCodeBg.x = xyData.qrCode.x;
            xyData.qrCodeBg.y = xyData.qrCode.y + xyData.qrCode.h;
            xyData.qrCodeBg.w = xyData.qrCode.w;

            xyData.mobile.y = xyData.wechat.y + xyData.mobile.plus;
            xyData.email.y = xyData.mobile.y + xyData.email.plus;
            xyData.address.y = xyData.email.y + xyData.address.plus;

            xyData.home.text.y = xyData.home.url.y + xyData.home.text.plus;

            // console.log(data);

            //创建白色矩形背景
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            /*//创建矩形边框（黑色）
             ctx.strokeStyle = '#cbcbcb';
             ctx.strokeRect(0, 0, canvas.width, canvas.height);*/

            //创建名片header背景
            ctx.fillStyle = data.style.background.color;
            ctx.fillRect(0, 0, canvas.width, xyData.header);


            //存储图片链接信息的关联数组
            var sources = {
                ImgVCard: getMainUrl(IMGS.ImgVCard),
                ImgBg: data.bgImg != '' ? getMediaUrl(data.bgImg) : getMainUrl(IMGS.ImgBg),
                ImgQrCode: config.API_BASE_URL + '/vcard/qrcode/' + data.id + '/320',
                ImgLogo: data.logo != '' ? getMediaUrl(data.logo) : getMainUrl(IMGS.ImgLogo),

                ImgShade: getMainUrl(IMGS.ImgShade),

                ImgWeChat: getMainUrl(IMGS.ImgWeChat),
                ImgMobile: getMainUrl(IMGS.ImgMobile),
                ImgEmail: getMainUrl(IMGS.ImgEmail),
                ImgAddress: getMainUrl(IMGS.ImgAddress),

                ImgSave: getMainUrl(IMGS.ImgSave)
            };

            // console.log(sources);


            this.QrcodeUrl = sources.ImgQrCode;

            //调用图片预加载函数，实现回调函数
            this.loadImages(sources, function (images) {

                //创建底纹


                // console.log(images.ImgBg);

                //图片背景渲染
                if (data.bgImg != '') {
                    ctx.drawImage(images.ImgBg, 0, 0, canvas.width, xyData.header);
                } else {
                    //还有一种可能：没有bg有底色
                    ctx.fillStyle = data.style.background.color;
                    ctx.fillRect(0, 0, canvas.width, xyData.header);
                }

                //二维码渲染
                ctx.drawImage(images.ImgQrCode, xyData.qrCode.x, xyData.qrCode.y, xyData.qrCode.w, xyData.qrCode.h);

                //
                ctx.drawImage(images.ImgShade, 0, xyData.header, canvas.width, xyData.body);

                //创建“长按二维码保存至通讯录”背景
                ctx.fillStyle = xyData.qrCodeBg.color;
                ctx.fillRect(xyData.qrCodeBg.x, xyData.qrCodeBg.y, xyData.qrCodeBg.w, xyData.qrCodeBg.h);

                //姓名
                var name = data.name;
                ctx.font = '34px Arial';
                ctx.fillStyle = xyData.name.color;
                ctx.fillText(name, xyData.name.x, xyData.name.y);

                //摘要=公司/职位
                /*var desc = data.org + '/' + data.title;
                 ctx.font = '24px Arial';
                 ctx.fillStyle = xyData.desc.color;
                 ctx.fillText(desc, xyData.desc.x, xyData.desc.y);*/

                var org = data.org;
                ctx.font = '24px Arial';
                ctx.fillStyle = xyData.desc.color;
                ctx.fillText(org, xyData.org.x, xyData.desc.y);

                var title = data.title;
                ctx.font = '24px Arial';
                ctx.fillStyle = xyData.desc.color;
                ctx.fillText(title, xyData.title.x, xyData.desc.y + 40);

                //长按二维码
                var qrCodeText1 = '长按二维码';
                ctx.font = '20px Arial';
                ctx.fillStyle = xyData.qrcodeText.color;
                var qrCodeText1Width = ctx.measureText(qrCodeText1).width;
                // console.log(qrCodeText1Width);
                ctx.fillText(qrCodeText1,
                    xyData.qrCodeBg.x + ((xyData.qrCodeBg.w - qrCodeText1Width) / 2),
                    xyData.qrCodeBg.y + 20);

                var qrCodeText2 = '保存至通讯录';
                ctx.font = '20px Arial';
                ctx.fillStyle = xyData.qrcodeText.color;
                var qrCodeText2Width = ctx.measureText(qrCodeText2).width;
                // console.log(qrCodeText2Width);
                ctx.fillText(qrCodeText2,
                    xyData.qrCodeBg.x + ((xyData.qrCodeBg.w - qrCodeText2Width) / 2),
                    xyData.qrCodeBg.y + 20 * 2);

                //等比缩放
                xyData.logo.w = xyData.logo.h * images.ImgLogo.width / images.ImgLogo.height;

                if (type == 'center') {
                    xyData.logo.x = (canvas.width - xyData.logo.w) / 2;
                }

                //logo渲染
                ctx.drawImage(images.ImgLogo, xyData.logo.x, xyData.logo.y, xyData.logo.w, xyData.logo.h);

                //基本信息渲染

                //微信
                ctx.drawImage(images.ImgWeChat, xyData.wechat.x, xyData.wechat.y, xyData.wechat.w, xyData.wechat.h);


                ctx.font = '20px Arial';
                ctx.fillStyle = xyData.infoText.color;
                ctx.fillText(infoText1,
                    xyData.wechat.x + xyData.infoText.plus,
                    xyData.wechat.y + 20);

                //手机
                ctx.drawImage(images.ImgMobile, xyData.mobile.x, xyData.mobile.y, xyData.mobile.w, xyData.mobile.h);


                ctx.font = '20px Arial';
                ctx.fillStyle = xyData.infoText.color;
                ctx.fillText(infoText2,
                    xyData.mobile.x + xyData.infoText.plus,
                    xyData.mobile.y + 20);

                //邮箱
                ctx.drawImage(images.ImgEmail, xyData.email.x, xyData.email.y, xyData.email.w, xyData.email.h);


                ctx.font = '20px Arial';
                ctx.fillStyle = xyData.infoText.color;
                ctx.fillText(infoText3,
                    xyData.email.x + xyData.infoText.plus,
                    xyData.email.y + 20);

                //地址
                ctx.drawImage(images.ImgAddress, xyData.address.x, xyData.address.y, xyData.address.w, xyData.address.h);


                ctx.font = '20px Arial';
                ctx.fillStyle = xyData.infoText.color;
                ctx.fillText(infoText4,
                    xyData.address.x + xyData.infoText.plus,
                    xyData.address.y + 20);

                // www.iloka.me
                var homeUrl = 'www.iloka.me';
                ctx.font = '22px Arial';
                ctx.fillStyle = xyData.home.url.color;
                var homeUrlWidth = ctx.measureText(homeUrl).width;
                ctx.fillText(homeUrl,
                    (canvas.width - homeUrlWidth) / 2,
                    xyData.home.url.y);


                // 艾乐卡-企业营销管家
                var homeText = '艾乐卡-企业营销管家';
                ctx.font = '22px Arial';
                ctx.fillStyle = xyData.home.text.color;
                var homeTextWidth = ctx.measureText(homeText).width;
                ctx.fillText(homeText,
                    (canvas.width - homeTextWidth) / 2,
                    xyData.home.text.y + 22);

                //保存
                if (canvas.height == 966) {
                    ctx.drawImage(images.ImgSave, xyData.save.x, xyData.save.y, xyData.save.w, xyData.save.h);
                }

                //创建矩形边框（黑色）
                ctx.strokeStyle = '#cbcbcb';
                ctx.strokeRect(0, 0, canvas.width, canvas.height);

                //
                test.canvas = canvas;

                test.dataUrl = canvas.toDataURL();
                //console.log(test.dataUrl);

                test.saveSharePicture();

            });

        },

        saveSharePicture: function () {

            let shareData = {
                'base64': '',
                'bid': '',
                'categoryId': '',
                'fileName': 'share.png',
                'lib': false,
                'mediaId': '',
                'quality': 1.0
            };

            //console.log(this.dataUrl.split(';base64,'));

            shareData.base64 = this.dataUrl.split(';base64,')[1];
            //
            this.updateBase64({
                owner: 'users',
                restype: 'vcard',
                data: shareData
            });

            // 将整个部分保存为canvas之后：
            // 1.生成base64图片并保存（点击本按钮【保存成图片转发】）
            // 2.通过更新推客接口完成更新
        },

        //直接转发给好友：直接传链接
        shareDirectLink: function () {

        }
    }
});


