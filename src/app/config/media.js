import config from './index';

// 删除图片ID
let MEDIA_DEL_ID;

switch (config.ENV) {
    default:
        MEDIA_DEL_ID = '5870853e0f93d50845100ba1';
        break;

    case 'sit':
        MEDIA_DEL_ID = '5870853e0f93d50845100ba1';
        break;

    case 'uat':
        MEDIA_DEL_ID = '5870853e0f93d50845100ba1';
        break;

    case 'prd':
        MEDIA_DEL_ID = '587086aaa6dc364107b18d2b';
        break;
}

// 删除图片ID
export default {
    MEDIA_DEL_ID
};
