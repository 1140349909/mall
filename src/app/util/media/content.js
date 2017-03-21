export function contentParse(data) {

    //视频处理
    let videoList = data.querySelectorAll('.edui-faked-video');

    for (let i = 0; i < videoList.length; i++) {

        let newNode = document.createElement('iframe');
        let element = videoList[i];

        newNode.src = '';
        newNode.width = '100%';
        newNode.setAttribute('allowfullscreen', true);
        newNode.setAttribute('frameborder', 0);
        newNode.height = window.innerWidth * 498 / 610;

        //优酷视频地址hack
        if (element.src.indexOf('youku') != -1 && element.src.indexOf('.swf') != -1) {
            let hrefList = element.src.split('\/');

            for (let i = 0; i < hrefList.length; i++) {
                if (hrefList[i].indexOf('==') != -1) {
                    newNode.src = 'http://player.youku.com/embed/' + hrefList[i];
                }
            }
        }

        //腾讯视频地址hack
        if (element.src.indexOf('qq') != -1 && element.src.indexOf('.swf') != -1) {
            let hrefList = element.src.split('.swf');
            newNode.src = 'http://v.qq.com/iframe/player.html?' + hrefList[1];
        }

        element.parentNode.replaceChild(newNode, element);
    }

    //音频处理
    let audioList = data.querySelectorAll('.edui-faked-music');

    for (let j = 0; j < audioList.length; j++) {

        let newNode = document.createElement('audio');
        let element = audioList[j];

        newNode.src = element.src;

        //显示控制面板
        newNode.setAttribute('controls', 'controls');
        //进入后自动播放
        if(element.getAttribute('play') == 'true'){
            newNode.setAttribute('autoplay', 'autoplay');
        }
        //是否开启循环
        if(element.getAttribute('loop') == 'true'){
            newNode.setAttribute('loop', 'loop');
        }

        element.parentNode.replaceChild(newNode, element);
    }
}
