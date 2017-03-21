/**
 * @module share
 */
import * as wechat from '../lk-wechat';
import { format} from '../util';
import {browser} from '../util/detect';
import './index.less';

// TODO:自定义样式不需要加载

// 分享类型
/*const SHARE_TYPES = {
    WECHAT: 'wechat',
    ALL: 'all'
};*/

// 分享入口链接
const SHARE_URL = {
    QZONE: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={link}&title={title}&summary={desc}&desc=&pics={imgUrl}',
    WEIBO: 'http://service.weibo.com/share/share.php?appkey=3374374355&url={link}&title={title}&pic={imgUrl}',
    WECHART_URL: 'http://api.linkin.mobi/buy/api/v1/w1/linkin/media/qrcode/{width}/{height}?content={qrcode}'
};

export default {
    // @info { title, desc, imgUrl, link, success } 分享的数据
    // @callback 分享成功回调
    show(opts){

        let weibo, qzone, qrcode;

        if (opts.title || opts.desc || opts.link) {

            opts.desc = opts.desc || ' ';

            // 设置QQ空间分享
            qzone = format(SHARE_URL.QZONE, opts, true);

            // 设置微博分享
            weibo = format(SHARE_URL.WEIBO, {
                title: (opts.title ? '【' + opts.title + '】' : '') + opts.desc,
                link: opts.link,
                imgUrl: opts.imgUrl
            }, true);

            //设置微信分享链接
            qrcode = format(SHARE_URL.WECHART_URL, {
                width: '200',
                height: '200',
                qrcode: opts.link
            }, true);

            // 设置微信分享
            if (browser.wechat) {
                // 设置微信分享的信息
                wechat.ready(()=> {
                    wechat.wxShare({
                        title: opts.title,   //分享标题
                        desc: opts.desc,     //分享内容
                        link: opts.link,     //分享连接
                        imgUrl: opts.imgUrl, //分享图片地址
                        success: opts.success
                    });
                });
            }
        }

        // 显示分享
        this._showAllShare({
            qzone: qzone,
            weibo: weibo,
            qrcode: qrcode
        }, opts.success);

    },
    // 显示微信分享
    _showWXShare(qrcode){
        const shareContainerId = 'lk-share-wechat';

        let shareContainer = document.getElementById(shareContainerId);
        let isWechat = browser.wechat;

        // 初始化微信分享提示
        if (!shareContainer) {
            shareContainer = document.createElement('div');
            shareContainer.className = isWechat ? 'lk-share-wechat' : 'lk-share-wechat-qrcode';
            shareContainer.id = shareContainerId;
            document.body.appendChild(shareContainer);
        }

        // 非微信,显示二维码
        if (!isWechat) {
            shareContainer.innerHTML = '<div class="lk-share-wechat-info">' +
                '<p>分享到微信朋友圈</p><img src =' + qrcode + ' /><p class="lk-botDesc">打开微信，点击底部的“发现”<br/>使用“扫一扫”即可将网页分享至朋友圈。</p>' +
                '<a class="lk-share-known-btn">知道啦</a></div>';
        }

        // 隐藏微信分享提示
        const hideWXShare = ()=> {
            shareContainer.style.display = 'none';
            window.removeEventListener('popstate', hideWXShare);
        };

        // 点击遮罩层自动隐藏微信分享提示
        shareContainer.addEventListener('click', () => {
            hideWXShare();
        }, false);

        // hash改变的时候自动隐藏微信分享提示
        window.addEventListener('popstate', hideWXShare);

        // 显示微信分享提示
        shareContainer.style.display = 'block';
    },
    // 显示全部分享的图标
    _showAllShare(urls, success){
        // 创建百度分享控件
        const shareContainerId = 'lk-share-all';

        let shareContainer = document.getElementById(shareContainerId);
        if (!shareContainer) {

            shareContainer = document.createElement('div');
            shareContainer.className = shareContainerId;
            shareContainer.id = shareContainerId;
            document.body.appendChild(shareContainer);

            shareContainer.innerHTML =
                '<div class="lk-share-all-mask"></div>' +
                '<div class="lk-share-all-actionsheet">' +
                '<div class="bdsharebuttonbox">' +
                '<div class="lk-share-all-item">' + '<a class="bds_weixin sprite-friend" href="javascript:void(0);" title="微信好友"></a><i>朋友圈</i></div>' +
                '<div class="lk-share-all-item">' + '<a class="bds_weixin_zone" href="javascript:void(0);" title="朋友圈"></a><i>微信好友</i></div>' +
                '<div class="lk-share-all-item">' + '<a class="bds_qzone" data-cmd="qzone" title="QQ空间"></a><i>QQ空间</i></div>' +
                '<div class="lk-share-all-item">' + '<a class="bds_tsina" data-cmd="tsina" title="微博"></a><i>微博</i></div>' +
                '</div>' +
                '</div>';

            // 微信好友
            shareContainer.getElementsByClassName('bds_weixin')[0].onclick = ()=> {
                this._showWXShare(urls.qrcode);
            };
            // 朋友圈
            shareContainer.getElementsByClassName('bds_weixin_zone')[0].onclick = ()=> {
                this._showWXShare(urls.qrcode);
            };

            // 关闭分享
            shareContainer.getElementsByClassName('lk-share-all-mask')[0].onclick = ()=> {
                hideShare();
            };
        }

        // 分享回调
        const onAfterShare = function () {
            if ('function' == typeof success) {
                success();
            }
        };

        // 隐藏微信分享提示
        const hideShare = ()=> {
            shareContainer.style.display = 'none';
            window.removeEventListener('popstate', hideShare);
        };

        // hash改变的时候自动隐藏微信分享提示
        window.addEventListener('popstate', hideShare, false);

        // QQ空间
        if (urls.qzone) {
            shareContainer.getElementsByClassName('bds_qzone')[0].onclick = ()=> {
                window.open(urls.qzone);
                onAfterShare();
            };
        }

        // 微博
        if (urls.weibo) {
            shareContainer.getElementsByClassName('bds_tsina')[0].onclick = ()=> {
                window.open(urls.weibo);
                onAfterShare();
            };
        }
        shareContainer.style.display = 'block';
    }
};

