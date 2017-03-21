/**
 * @Author:      iris_wu
 * @DateTime : 2016-09-23
 */
import Vue from 'vue';
import { XButton,Flexbox,FlexboxItem } from 'vux';
import  Cropper from 'cropperjs';
import  LKUpload from '../../util/upload';
import  './index.less';
import { getMediaUrl } from '../../util/url';
import { updateBase64 } from '../../store/product/action';
import { addMedia } from '../../store/member/action';

let cropper = '';
let itemData = {
    width: '',
    height: '',
    redirectUrl: '',
    type: ''
};
export default Vue.extend ({
    template: __inline ('./index.tpl'),
    components: {
        XButton,
        Flexbox,
        FlexboxItem,
        Cropper,
    },
    data () {
        return {
            mediaId: '',
            mediaUrl: '',
            isShowResetBtn: false,
            uin: '',
            initCropper: false,
        };
    },
    vuex: {
        actions: {
            updateBase64,
            addMedia: addMedia
        },
        getters: {
            // 提交成功返回结果
            base64Result: ( { product } ) => product.base64.result,
            base64Status: ( { product } ) => product.base64.status,

            mediaStatus: ( { member } ) => member.media.status,
            mediaData: ( { member } ) => member.media.data,

        }
    },
    watch: {
        'mediaUrl': function ( val ) {
            this.isShowResetBtn = true;
            if ( this.initCropper ) {
                cropper.replace (val);
            }
            this.$root.hideLoading ();
        },
        'mediaId': function () {
            //只初始化一次cropper
            if ( !this.initCropper ) {
                let image = document.getElementById ('image');
                cropper = new Cropper (image,{
                    aspectRatio: itemData.width / itemData.height
                });
                this.initCropper = true;
                this.mediaUrl = getMediaUrl (this.mediaId);
            }
            this.isShowResetBtn = true;
        },
        'base64Status': function ( val ) {
            if ( 'success' == val ) {
                this.$root.hideLoading ();
                let dtName = itemData.type;
                //跳转到来源页面,并且返回裁剪图片的mediaId
                this.$router.replace ({
                    name: itemData.redirectUrl,
                    query: {
                        [dtName]: this.base64Result
                    }
                });
            }
        },
        'mediaData': function ( val ) {
            this.mediaId = val;
            this.mediaUrl = getMediaUrl (val);
            this.$root.hideLoading ();
        },
        'mediaStatus': function ( status ) {
            if ( status == 'add' ) {
                this.$root.showLoading ();
                this.mediaUrl = getMediaUrl (this.mediaData);
            }else if ( 'pending' == status ) {
                this.$root.hideLoading ();
            }else {
                this.$root.hideLoading ();
                this.$root.showToast ({
                    type: 'cancel',
                    content: '上传图片失败,请稍后重试'
                });
            }
        },
    },
    methods: {
        uploadImg: function () {
            let picArea = this;
            //选择图片 微信
            LKUpload.uploadify ({
                uin: picArea.uin,
                owner: 'users',
                resType: itemData.type,
                fileSizeLimit: '1024',
                onUploadSuccess: function ( result,mediaId ) {
                    picArea.mediaId = mediaId;
                    picArea.mediaUrl = result;
                    picArea.$root.hideLoading ();
                },
                onUploadError: function ( result ) {
                    picArea.$root.hideLoading ();
                    picArea.$root.showToast ({
                        type: 'cancel',
                        content: result
                    });
                },
                onUploadProgress: function () {
                    picArea.$root.showLoading ();
                }
            });
        },
        onReset: function () {
            cropper.reset ();
        },
        onSave: function () {
            // Crop
            this.$root.showLoading ();
            let croppedCanvas = cropper.getCroppedCanvas ();
            let newImgUrl = croppedCanvas.toDataURL ().split (';base64,')[ 1 ];
            this.updateBase64 ({
                owner: 'wechat',
                restype: itemData.type,
                data: {
                    'base64': newImgUrl,
                    'fileName': new Date () + '.png',
                }
            });
        },
    },
    ready(){
        this.$root.hideLoading ();
        //如果mediaId 为空  , 则为新增图片,重置按钮不显示 ;  反之, 则初始化图片容器,重置按钮显示
        let item = this.$route.query;
        if ( item.id ) {
            this.mediaId = item.id;
        }
        this.uin = item.uin;
        itemData = {
            width: item.width || 4,
            height: item.height || 5,
            redirectUrl: item.redirectUrl,
            type: item.type || 'avatar'
        };
    }
});
