/*var Vue = require("vue");

 Vue.filter('datetime', function (date) {
 var now = +new Date;
 var text = '';
 var distance = now - date;
 console.log(distance);
 if (distance <= 86400 * 1000) {
 text = "大约" + Math.round((now - date) / 3600000) + "小时以前";
 } else if (distance < 86400000 * 30) {
 text = Math.round((now - date) / 86400000) + "天以前";
 } else if (distance < 86400000 * 30 * 12) {
 text = Math.round((now - date) / 86400000 / 30) + "个月以前";
 } else {
 text = "一年以前";
 }
 return text;
 })*/

export default function (date) {
    var now = +new Date;
    var text = '';
    var distance = now - date;
    if (distance <= 60000) {
        text = '大约' + Math.round((now - date) / 1000) + '秒以前';
    } else if (distance <= 3600000) {
        text = '大约' + Math.round((now - date) / 60000) + '分以前';
    } else if (distance <= 86400 * 1000) {
        text = '大约' + Math.round((now - date) / 3600000) + '小时以前';
    } else if (distance < 86400000 * 30) {
        text = Math.round((now - date) / 86400000) + '天以前';
    } else if (distance < 86400000 * 30 * 12) {
        text = Math.round((now - date) / 86400000 / 30) + '个月以前';
    } else {
        text = '一年以前';
    }
    return text;

}
