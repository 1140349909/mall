/**
 * @Author:      iris_wu
 * @DateTime : 2016-09-26
 */
import Vue from 'vue';
import {XButton, XInput} from 'vux';
import XUpload from '../../component/x-upload';
import LkShare from 'common/lk-share';
import LKUpload from '../../util/upload';
import {getMediaUrl} from '../../util/url';
import {updateBase64} from '../../store/product/action';
import VueImg from '../../component/vue-img';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XButton,
        XInput,
        XUpload,
        VueImg
    },
    data () {
        return {
            mediaId: '',
            mediaUrl: '',
            uin: '',
            newImg: '',
            showUpload : false
        };
    },
    watch: {
        'base64Status': function () {
        },
        'base64Result': function (val) {
            this.mediaId = val;
            this.mediaUrl = getMediaUrl(val);
        },
        'mediaId':function ( val ) {
            this.mediaUrl = getMediaUrl(val);
        }
    },
    vuex: {
        actions: {
            updateBase64
        },
        getters: {
            // 提交成功返回结果
            base64Result: ({product}) => product.base64.result,
            base64Status: ({product}) => product.base64.status,
        }
    },
    methods: {
        'showActionSheet': function () {
            LkShare.show({
                title: '分享标题',
                desc: '分享描述',
                link: 'http://www.iloka.me/',
                imgUrl: 'http://api.dev.vveshow.com/buy/api/v1/w1/linkin/media/image/579852e00f93d566a79bd130',
                success: function () {
                }
            });
        },
        'testLkUpload': function () {
            //提供owner,resType 三个参数
            let what = this;
            LKUpload.uploadify({
                uin: 'dev',
                owner: 'users', resType: 'res',
                fileSizeLimit: '1024',
                onUploadSuccess: function (mediaUrl , mediaId) {
                    what.$root.hideLoading();
                    what.newImg = mediaUrl;
                    what.mediaId = mediaId;
                },
                onUploadError: function ( ) {
                    what.$root.hideLoading();
                },
                onUploadProgress: function ( ) {
                    what.$root.showLoading('上传中...');
                }
            });
        },
        'testXupload' : function (  ) {
            this.showUpload = true;
        }
    },
});
