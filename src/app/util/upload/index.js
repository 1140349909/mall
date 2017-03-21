/**
 * @module 上传
 * @author iris_wu
 * @DateTime 2016-10-10
 */
import  { browser }  from  'common/util/detect';
import * as weChat from 'common/lk-wechat';
import { getMediaUrl } from '../url';
import { updateBase64,addMedia } from '../../api/common';
let mediaUrl = '',limitSize = 1;
/**
 * owner : 平台标识 user || plateform
 * resType : 资源类型   res || headimg || face || cover || tker || vcard || show || bg || shape || banner || feedback || ......
 * fileSizeLimit : 文件大小限制  , 为M为单位的数值 , 比如 , 限制大小为1M, 则fileSizeLimit的大小为1
 * onUploadSuccess : 成功回调
 * onUploadError : 文件上传失败回调
 * onUploadProgress : 文件上传进度回调
 */
export default {
    uploadify ( upload ) {
        // 在微信环境下使用微信上传
        if ( browser.wechat ) {
            weChat.wxChooseImage ({
                successCallback: function ( serverId ) {
                    wechatAddMeida (upload,serverId);
                }
            });
        }else {
            //浏览器上传
            chooseFileOrImg (upload);
        }
    },
}
;
/**
 * 通过微信平台的图片Id , 获取艾乐卡平台的mediaId , 转换为艾乐卡的mediaUrl
 * @param serverId
 * @param resType
 * @param fileSizeLimit
 * @param onUploadSuccess
 * @param onUploadError
 * @param onUploadProgress
 */
function wechatAddMeida ( upload,serverId ) {
    addMedia ({
        mediaId: serverId,
        owner: 'wechat',
        restype: upload.resType,
        mediaChannel: 'Wx',
        uin: upload.uin,
    }).then (function ( response ) {

        let mediaId = response.data;
        mediaUrl = getMediaUrl (mediaId);
        upload.onUploadSuccess && upload.onUploadSuccess (mediaUrl,mediaId);
    },function () {
        upload.onUploadError ('微信上传失败!');
    });
}
/**
 * 上传文件 , 动态触发文件选择器事件
 * @param owner
 * @param resType
 * @param fileSizeLimit
 * @param onUploadSuccess
 * @param onUploadError
 * @param onUploadProgress
 */
function chooseFileOrImg ( upload ) {
    //打开图片选择器
    const shareContainerId = 'lk-util-upload';
    let shareContainer = document.getElementById (shareContainerId);
    if ( !shareContainer ) {
        let fileElement = document.createElement ('div');
        fileElement.id = shareContainerId;
        fileElement.style.display = 'none';
        fileElement.innerHTML = '<input type="file"   id="attachment"    accept="image/jpeg , image/bmp,image/gif,image/x-png"/>';
        document.body.appendChild (fileElement);
    }else{
        shareContainer.innerHTML = '';
        shareContainer.innerHTML = '<input type="file"   id="attachment"    accept="image/jpeg , image/bmp,image/gif,image/x-png"/>';
    }
    //绑定file的事件的change事件
    let file = document.getElementById ('attachment'),eventTarget = '';
    if ( document.createEvent ) {
        eventTarget = document.createEvent ('HTMLEvents');
        // initEvent接受3个参数： 事件类型，是否冒泡，是否阻止浏览器的默认行为
        eventTarget.initEvent ('click',false,true);
        eventTarget.preventDefault ();
        file.dispatchEvent (eventTarget);
        file.click ();
        eventTarget.stopPropagation ();
    }else {
        file.fireEvent (eventTarget);
    }
    file.onchange = () => {
        fileChange (eventTarget,upload);
    };
}

/**
 * 文件上传核心
 * @param event
 * @param owner
 * @param resType
 * @param fileSizeLimit
 * @param onUploadSuccess
 * @param onUploadError
 * @param onUploadProgress
 */
function fileChange ( event,upload ) {
    let file = event.target.files[ 0 ];

    if ( !file ) {
        return;
    }
    if ( file.size / 1024 / 1024 > limitSize ) {
        upload.onUploadError ('请上传' + limitSize + 'M以下的图片');
        return;
    }
    if ( file.size / 1024 / 1024 > 3 ) {
        //图片大于3M执行压缩图片
        let imageUrl = getObjectURL (file);
        convertImgToBase64 (imageUrl,function ( base64Img ) {
            let serverId = base64Img.split (',')[ 1 ];
            uploadBase64Data (upload,file.name,serverId);
        });
    }else {
        getImgBase64Data (upload,file.name,file);
    }
}

function getObjectURL ( file ) {
    var url = null;
    if ( window.createObjectURL != undefined ) {  // basic
        url = window.createObjectURL (file);
    }else if ( window.URL != undefined ) {       // mozilla(firefox)
        url = window.URL.createObjectURL (file);
    }else if ( window.webkitURL != undefined ) { // web_kit or chrome
        url = window.webkitURL.createObjectURL (file);
    }
    return url;
}

// 压缩base64字节数
function convertImgToBase64 ( url,callback,outputFormat ) {
    let canvas = document.createElement ('CANVAS');
    let ctx = canvas.getContext ('2d');
    let img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        const width = img.width;
        const height = img.height;
        // 按比例压缩4倍
        const rate = (width < height ? width / height : height / width) / 4;
        canvas.width = width * rate;
        canvas.height = height * rate;
        ctx.drawImage (img,0,0,width,height,0,0,width * rate,height * rate);
        const dataURL = canvas.toDataURL (outputFormat || 'image/png');
        callback.call (this,dataURL);
        canvas = null;
    };
    img.src = url;
}

//不进行压缩图片  FileReader

function getImgBase64Data ( upload,name,file ) {
    if ( window.FileReader ) {
        let reader = new FileReader ();
        reader.onload = function ( e ) {
            let serverId = e.target.result;
            serverId = serverId.split (';base64,')[ 1 ];
            //上传图片,获取mediaId ,根据mediaId获取平台的mediaUrl
            uploadBase64Data (upload,name,serverId);
        };
        reader.onprogress = function () {
            upload.onUploadProgress (true);
        };
        reader.readAsDataURL (file);//转换为base64格式的编码*/
    }else {
        upload.onUploadError ('Not supported by your browser!');
    }

}

function uploadBase64Data ( upload,name,serverId ) {
    updateBase64 ({
        owner: upload.owner,
        restype: upload.resType,
        data: {
            'base64': serverId,
            'fileName': name,
        }
    }).then (function ( response ) {
        let mediaId = response.data;
        mediaUrl = getMediaUrl (mediaId);
        upload.onUploadSuccess && upload.onUploadSuccess (mediaUrl,mediaId);
    },function ( response ) {
        upload.onUploadError (response);
    });
}
