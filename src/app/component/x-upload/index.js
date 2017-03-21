import Vue from 'vue';
import { Popup,XButton } from 'vux';
import  Cropper from 'cropperjs';
import { getMediaUrl } from '../../util/url';
import { updateBase64 } from '../../store/product/action';
import LKUpload from '../../util/upload';
import VueImg from '../vue-img';
import './index.less';

let cropper = '';

export default Vue.extend ({
    template: __inline ('./index.tpl'),
    components: {
        Popup,
        XButton,
        Cropper,
        VueImg
    },
    data () {
        return {
            mediaId: '',
            mediaUrl: '',
            initCropper: false,
        };
    },
    props: {
        // 是否显示弹窗
        show: {
            type: Boolean,
            default: false,
            twoWay: true
        },
        id: '',//图片id
        width: 100, //裁剪框初始化宽
        height: 100,//裁剪框初始化高
        type: '',//裁剪图片类型res || headimg || face || cover || tker || vcard || show || bg || shape || banner || feedback || ......
        uin: '',//平台标识
        owner: '',
        uploadImgId: {
            type: String,
            twoWay: true
        }, //对应接口mediaId
        xuploadUrl: {
            type: String,
            twoWay: true
        }, //返回给子组件的mediaId
    },
    vuex: {
        actions: {
            updateBase64
        },
        getters: {
            // 提交成功返回结果
            base64Result: ( { product } ) => product.base64.result,
            base64Status: ( { product } ) => product.base64.status,
        }
    },
    watch: {
        'mediaUrl': function ( val ) {
            if ( this.initCropper ) {
                cropper.replace (val);
            }
            this.$root.hideLoading ();
        },
        'uploadImgId': function ( val ) {
            //只初始化一次cropper
            if ( !this.initCropper ) {
                let image = document.getElementById ('image');
                cropper = new Cropper (image,{
                    aspectRatio: this.width / this.height,
                    cropBoxMovable: true,
                    minContainerHeight: 240,
                    minContainerWidth: 300,
                    responsive: true
                });
                this.initCropper = true;
            }else{
                cropper.setAspectRatio(this.width/this.height);
            }
            this.mediaUrl = getMediaUrl (val);
        },
        'base64Status': function ( val ) {
            if ( 'success' == val ) {
                this.$root.hideLoading ();
                let dtName = this.type;
                this.xuploadUrl = this.base64Result;
                //跳转到来源页面,并且返回裁剪图片的mediaId
                this.$router.replace ({
                    query: {
                        [dtName]: this.xuploadUrl
                    }
                });
            }
        }
    },
    methods: {
        uploadImg: function () {
            let twindow = this;
            LKUpload.uploadify ({
                uin: twindow.uin,
                owner: twindow.owner,
                resType: twindow.type,
                fileSizeLimit: '1024',
                onUploadSuccess: ( result,mediaId ) => {
                    twindow.uploadImgId = mediaId;
                    twindow.$root.hideLoading ();
                },
                onUploadError: ( result ) => {
                    twindow.$root.hideLoading ();
                    twindow.$root.showToast ({
                        type: 'cancel',
                        content: result
                    });
                },
                onUploadProgress: ()=> {
                    twindow.$root.showLoading ();
                }
            });
        },
        onReset: function () {
            if ( cropper ) {
                cropper.reset ();
            }
        },
        onSave: function () {
            this.$root.showLoading ();
            let croppedCanvas = cropper.getCroppedCanvas ();
            let newImgUrl = croppedCanvas.toDataURL ().split (';base64,')[ 1 ];
            this.updateBase64 ({
                owner: this.owner,
                restype: this.type,
                data: {
                    'base64': newImgUrl,
                    'fileName': new Date () + '.png',
                }
            });
            this.show = false;
        },
        onHidePopup: function () {
            this.show = false;
        }
    },
    ready(){
        this.mediaUrl = getMediaUrl (this.uploadImgId);
    }
});
