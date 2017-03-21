import Vue from 'vue';
import {Dialog, Tab, TabItem, XButton, Flexbox, FlexboxItem} from 'vux';
import store from '../../store';
import {getProduct, getProductTrades, updateBase64, getShowList} from '../../store/product/action';
import {updateTker} from '../../store/tker/action';
import {getMediaUrl,getMainUrl} from '../../util/url';
import config from '../../config';
import {TKER_TYPE} from '../../config/constants';
import * as LkShare from 'common/lk-share';
import './index.less';

const TKER_TYPE_PRODUCT = TKER_TYPE.PRODUCT;

const IMGS = {
    BG: __uri('./img/bg.png'),
    thumb: __uri('./img/thumb.png')
};

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        Dialog,
        Tab,
        TabItem,
        XButton,
        Flexbox,
        FlexboxItem,
    },
    props: {
        show: {
            type: Boolean,
            // 双向绑定
            twoWay: true
        },
        item: {
            type: Object,
            default: {}
        },
        title: String,
        desc: String
    },
    store: store,
    data: function () {
        return {
            id: '',
            canvas: {},

            QrcodeUrl: '',
            //推客提交的数据
            tkerData: {
                'mediaId': '', // BASE64
                'productDesc': {
                    'name': '', // name
                    'pid': '', // productId
                    'price': 100, // 100
                    'total': 0 // credit
                },
                'type': 'product'
            },
            text: '点击按钮生成图片',
            success: false,
            failure: false,
        };
    },
    vuex: {
        getters: {
            tkerProductData:({tker}) => tker.tasks[TKER_TYPE_PRODUCT],
            base64Result: ({product}) => product.base64.result,
            base64Status: ({product}) => product.base64.status

        },
        actions: {
            getProduct,
            getProductTrades,
            updateTker,
            updateBase64,
            getShowList
        }
    },
    watch: {
        'tkerProductData':function (val) {

            this.drawCanvas(this.item, val.url);

            //微信分享
            this.$root.setShare({
                title: this.item.name,
                desc: this.item.digest,
                link: val.url,
                imgId: this.item.mediaRes.coverImgId,
                isResolveLink: false
            });
            this.$root.setTitle(this.item.name);

        },
        'item': function (val) {
            if (val){
                document.getElementById('product-share').style.display = 'none';
                this.showDialog(val);
            }
        },
        /*'tkerResult': function (val) {

            this.drawCanvas(this.item, this.tkerResult);

            //微信分享
            this.$root.setShare({
                title: this.item.name,
                desc: this.item.digest,
                link: this.tkerResult,
                imgId: this.item.mediaRes.coverImgId,
                isResolveLink: false
            });
            this.$root.setTitle(this.item.name);
        },*/
        'base64Status': function (val) {

            if ('success' == val) {
                var newImg = document.createElement('img');
                newImg.src = getMediaUrl(this.base64Result, false);
                newImg.style.width = '70%';
                newImg.style.height = 'auto';
                document.getElementById('canvas').innerHTML = '';
                document.getElementById('canvas').appendChild(newImg);
                document.getElementById('product-share').style.display = 'block';
            } else if ('pending' == val) {
                document.getElementById('canvas').innerHTML = '<div class="product-distribution-loading">正在生成图片...</div>';
                // document.getElementById('product-share').style.display = 'none';
            } else {
                document.getElementById('canvas').innerHTML = '<div class="product-distribution-failure">图片生成失败...</div>';
                // document.getElementById('product-share').style.display = 'none';
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
            for (var bak in sources) {
                imagesBak[bak] = new Image();
                imagesBak[bak].crossOrigin = 'Anonymous';
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

        drawCanvas: function (data, val) {

            document.getElementById('canvas').innerHTML = '<div class="product-distribution-loading">正在生成图片...</div>';

            var TxtTitle = this.title;
            var TxtDesc = this.desc;
            var TxtProductTitle = data.name;
            var TxtProductOther = '扫描二维码，马上参与';
            var TxtProductOther2 = '长按保存图片到相册，分享到朋友圈';

            let test = this;

            //动态创建元素
            var canvas = document.createElement('canvas');
            //定义画布
            canvas.width = 560;
            canvas.height = (660 + 170);

            var ctx = canvas.getContext('2d');

            //创建白色矩形背景
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            //定义一组规范坐标
            let xyData = {
                ImgTitle: {
                    x: 86,
                    y: 20,
                    w: 390,
                    h: 84
                },
                ImgProduct: {
                    x: 0,
                    y: 157,
                    w: canvas.width,
                    h: 372
                },
                ImgQrCode: {
                    x: 164 - 10,
                    y: 637 - 10,
                    w: 150,
                    h: 150
                },
                ImgThumb: {
                    w: 98,
                    h: 98,
                    x: 338,
                    y: 654
                },

                text: {
                    title: {
                        y: 90 - 6
                    },
                    desc: {
                        y: 143
                    },
                    //产品标题
                    name: {
                        y: 540 + 20
                    },
                    other: {
                        y: 582 + 20
                    },
                    other2: {}
                }
            };

            ctx.font = '32px Arial';
            xyData.text.title.x = (canvas.width - ctx.measureText(TxtTitle).width) / 2;
            ctx.font = '24px Arial';
            xyData.text.desc.x = (canvas.width - ctx.measureText(TxtDesc).width) / 2;
            ctx.font = '24x SimHei';
            xyData.text.name.x = (canvas.width - ctx.measureText(TxtProductTitle).width) / 2;
            ctx.font = '24px SimHei';
            xyData.text.other.x = (canvas.width - ctx.measureText(TxtProductOther).width) / 2;
            ctx.font = '20px Arial';
            xyData.text.other2.x = (canvas.width - ctx.measureText(TxtProductOther2).width) / 2;
            xyData.text.other2.y = xyData.ImgThumb.y + xyData.ImgThumb.h + 30 + 18;

            //存储图片链接信息的关联数组
            var sources = {
                ImgProduct: config.API_BASE_URL + '/media/image/' + data.mediaRes.coverImgId,
                ImgQrCode: config.API_BASE_URL + '/media/qrcode/300/300?content=' + val,
                ImgTitle: getMainUrl(IMGS.BG),
                // 领取当前推客集客二维码
                ImgThumb: getMainUrl(IMGS.thumb),
            };

            this.QrcodeUrl = sources.ImgQrCode;

            //调用图片预加载函数，实现回调函数
            this.loadImages(sources, function (images) {

                var TxtTitle = test.title;
                var TxtDesc = test.desc;
                var TxtProductTitle = data.name;
                var TxtProductOther = '扫描二维码，马上参与';
                var TxtProductOther2 = '长按保存图片到相册，分享到朋友圈';

                //图片渲染
                ctx.drawImage(images.ImgTitle, xyData.ImgTitle.x, xyData.ImgTitle.y, xyData.ImgTitle.w, xyData.ImgTitle.h);

                //标题
                ctx.font = 'bold 32px SimHei';
                ctx.fillStyle = 'white';
                ctx.fillText(TxtTitle, xyData.text.title.x, xyData.text.title.y);

                //摘要
                ctx.font = 'bold 24px SimHei';
                ctx.fillStyle = '#ff3a1e';
                ctx.fillText(TxtDesc, xyData.text.desc.x, xyData.text.desc.y);

                xyData.ImgProduct.w = xyData.ImgProduct.h * images.ImgProduct.width / images.ImgProduct.height;
                xyData.ImgProduct.x = (canvas.width - xyData.ImgProduct.w) / 2;

                //图片渲染
                ctx.drawImage(images.ImgProduct, xyData.ImgProduct.x, xyData.ImgProduct.y, xyData.ImgProduct.w, xyData.ImgProduct.h);

                //图片渲染
                ctx.drawImage(images.ImgQrCode, xyData.ImgQrCode.x, xyData.ImgQrCode.y, xyData.ImgQrCode.w, xyData.ImgQrCode.h);

                //商品标题
                if (TxtProductTitle.length <= 16) {
                    ctx.font = '24x SimHei';
                    ctx.fillStyle = '#595757';
                    ctx.fillText(TxtProductTitle, xyData.text.name.x, xyData.text.name.y);
                } else {
                    var TxtProductTitle1 = TxtProductTitle.substr(0, 13);

                    ctx.font = '24px SimHei';
                    ctx.fillStyle = '#595757';
                    ctx.fillText(TxtProductTitle1 + '...', xyData.text.name.x, xyData.text.name.y);
                }

                //扫描二维码font-family:PingFangSC-Regular;
                ctx.font = '24px SimHei';
                ctx.fillStyle = '#ff3a1e';
                ctx.fillText(TxtProductOther, xyData.text.other.x, xyData.text.other.y);

                //绘制线条
                ctx.beginPath();
                ctx.moveTo(40, 660 - 40); //(x,y)
                ctx.lineTo(520, 660 - 40); //(x+w,y)
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#e9e9e9';
                ctx.stroke();

                //图片渲染
                ctx.drawImage(images.ImgThumb, xyData.ImgThumb.x, xyData.ImgThumb.y, xyData.ImgThumb.w, xyData.ImgThumb.h);

                ctx.font = '20px SimHei';
                ctx.fillStyle = '#595757';
                ctx.fillText(TxtProductOther2, xyData.text.other2.x, xyData.text.other2.y);


                test.canvas = canvas;

                test.dataUrl = canvas.toDataURL();
                test.saveSharePicture();

            });

        },

        showDialog: function (item) {

            this.tkerData = {
                'mediaId': '', // BASE64
                'productDesc': {
                    'desc': item.digest, // digest
                    'name': item.name,
                    'pid': item.productId || item.id,
                    'price': 100, // 100
                    'total': item.credit
                },
                'type': 'product'
            };

            // 执行推客提交任务，返回链接后生成二维码，最后才显示对话框
            this.updateTker(this.tkerData);

        },

        saveSharePicture: function () {

            let shareData = {
                'base64': '',
                'bid': this.tkerProductData.id,
                'categoryId': '',
                'fileName': 'share.png',
                'lib': false,
                'mediaId': '',
                'quality': 1.0
            };

            shareData.base64 = this.dataUrl.split(';base64,')[1];
            //
            this.updateBase64({
                owner: 'platform',
                restype: 'tker',
                data: shareData
            });

            // 将整个部分保存为canvas之后：
            // 1.生成base64图片并保存（点击本按钮【保存成图片转发】）
            // 2.通过更新推客接口完成更新
        },

        showShareMask: function () {
            //分享组件
            LkShare.show({
                title: this.item.name,
                desc: this.item.digest,
                link: this.tkerResult,
                imgUrl: getMediaUrl(this.item.mediaRes.coverImgId, false)
            });
        }
    },
    ready(){
        // document.getElementById('product-share').style.display = 'none';
    }
});


