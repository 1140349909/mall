import {getMediaUrl} from '../url';

const DEFAULT_MEDIA = {
    'default': require('./default.png'),
    'avatar1': require('./avatar1.png'),
    'avatar2': require('./avatar2.png'),
    'avatar3': require('./avatar3.png'),
    'upload': require('./upload.png'),
};

export default function (mediaId, className, mediaType) {
    let html = '';

    mediaType = mediaType || 'default';

    let imgSrc;

    if (mediaId) {
        imgSrc = getMediaUrl(mediaId);
    } else {
        imgSrc = DEFAULT_MEDIA[mediaType];
    }

    className = className || '';

    html = '<img src=' + imgSrc + ' class=' + className + ' />';

    return html;
}




