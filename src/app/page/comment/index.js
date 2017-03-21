import Vue from 'vue';
import {XNumber, XTextarea, Group} from 'vux';
import store from '../../store';
import {getProduct} from '../../store/product/action';
import {addMedia} from '../../store/member/action';
import {updateShowOrder, getOrderList} from '../../store/order/action';
import './index.less';
import XUpload from '../../component/x-upload';

export default Vue.extend({
    template: __inline('./index.tpl'),
    components: {
        XNumber,
        XTextarea,
        Group,
        XUpload
    },
    store: store,
    data: function () {
        return {

            item: {},

            value: false,
            id: '',
            issueId: '',
            type: '',
            submitData: {
                content: this.type == 'yyg' ? '好运爆表，1块钱拥有了它，终于到货啦！' : '好评',
                imgIds: []
            },

            error: {
                name: '警告',
                data: {
                    content: {
                        text: '不说点什么真的好吗？',
                        value: false
                    },
                    imgIds: {
                        text: '至少上传一张图片！',
                        value: false
                    }
                }
            },
            showUpload:false,
            xuploadMediaUrl:''
        };
    },
    vuex: {
        getters: {
            productItem: ({product}) => product.item,
            vsite: ({vsite}) => vsite,
            // 提交成功返回结果
            mediaItem: ({member}) => member.media.data,
            mediaStatus: ({member}) => member.media.status,
            showStatus: ({order}) => order.show.status,
            order: ({order}) => order.order.result
        },
        actions: {
            getProduct,
            addMedia: addMedia,
            updateShowOrder: updateShowOrder,
            getOrderList: getOrderList
        }
    },
    computed: {},
    methods: {
        submitShowData: function () {
            //console.log(JSON.stringify(this.submitData));

            if (this.submitData.content == '') {

                this.$root.showToast({
                    content: this.error.data.content.text
                });


                return;
            }

            if (this.submitData.imgIds.length == 0) {

                this.$root.showToast({
                    content: this.error.data.imgIds.text
                });
                return;
            }

            this.updateShowOrder({
                id: this.id,
                data: this.submitData
            });
        },
        submitImages: function () {

            this.showUpload = true;

            /*LKUpload.uploadify({
                uin: this.productItem.uin,
                owner: 'wechat',
                resType: 'show',
                fileSizeLimit: '1024',
                onUploadSuccess: (mediaUrl, mediaId)=> {

                    this.$root.hideLoading();
                    this.submitData.imgIds.push(mediaId);

                },
                onUploadError: ()=> {

                    this.$root.hideLoading();

                    this.$root.showToast({
                        type: 'warn',
                        content: '上传失败',
                        time: 3000
                    });
                },
                onUploadProgress: ()=> {
                    this.$root.showLoading('读取图片...');
                }
            });*/
        }
    },
    watch: {
        'xuploadMediaUrl':function (val) {
            this.submitData.imgIds.push(val);
        },
        'order': function (val) {

            for (let i = 0; i < val.content.length; i++) {

                let data = val.content[i];

                if (data.id == this.id) {

                    this.item = data;
                    break;
                }
            }
        },

        //已经上传到公司的服务器，此时应该显示“上传成功”并清空状态
        'mediaStatus': function (val) {
            switch (val) {
                case 'add':
                    this.$root.hideLoading();
                    this.submitData.imgIds.push(this.mediaItem);
                    break;

                case 'failure':
                    this.$root.showLoading('读取图片...');

                    this.$root.showToast({
                        type: 'warn',
                        content: '上传失败',
                        time: 3000
                    });
                    break;
            }
        },

        //提交表单数据至晒单接口
        'showStatus': function (val) {

            switch (val) {
                case 'success':
                    this.$root.alert({
                        title: '恭喜',
                        content: '晒单成功！',
                        onOk: function () {
                            //跳转一元购
                            this.$router.replace({
                                name: 'yyg-trade'
                            });
                        }
                    });
                    break;

                case 'unknown':
                    this.$root.showToast({
                        type: 'warn',
                        content: '晒单出错，请重试！',
                    });
                    break;

                case 'failure':
                    this.$root.showToast({
                        type: 'cancel',
                        content: '晒单失败，请重试！',
                    });
                    break;
            }
        }
    },
    created(){
        this.issueId = this.$route.params.issueId;
        this.id = this.$route.params.id;

        this.type = 'yyg';

        this.getOrderList({
            buyType: this.type
        });

        //获取uin用
        this.getProduct(this.issueId, this.type);
    }
});
