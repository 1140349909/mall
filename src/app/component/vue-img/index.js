import VueImg from 'lk-vue-img';

import config from '../../config';

import 'lk-vue-img/lib/index.less';

const Img = VueImg({env: config.ENV});

export default Img; 