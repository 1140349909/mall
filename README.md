爆款平台
==========

爆款商场作为一套销售模式系统,采用游戏类的销售方式,迅速的吸引客户流量,将流量转为企
业会员的平台模式。重点在于解决品牌企业对会员数据缺失,无法获取黏度用户从而无法进行后
期品牌运营的痛点需求。

----------

## 目录结构



## 使用说明
```
	npm i -g fis3
	npm i -g fis3-hook-commonjs fis3-hook-node_modules fis-parser-babel-5.x fis3-preprocessor-js-require-css fis3-preprocessor-js-require-file fis3-parser-node-sass fis3-parser-less-2.x fis3-postprocessor-autoprefixer
	npm i -g fis3-postpackager-loader

```

## DEV环境配置

### 入口

#### 本地调试地址

http://127.0.0.1:8080/?uin=dev

#### sit环境

http://mall.sit.vveshow.com/?uin=dev

http://mall.sit.vveshow.com/dev

#### api入口
http://api.sit.vveshow.com/buy/entry/dev/home/linkin



* 入口
http://api.sit.vveshow.com/buy/entry/dev/yyg/linkin?url=http://127.0.0.1:8080/#!/mall本地链接
* 例子
http://api.sit.vveshow.com/buy/entry/dev/yyg/linkin?url=http%3A%2F%2F127.0.0.1%3A8080%2Fmall%2F

商城首页
http://mall.sit.vveshow.com/dev#!/mall
http://api.sit.vveshow.com/buy/entry/dev/mall/linkin
http://mall.sit.vveshow.com/?uin=dev#!/mall

一元购首页
http://mall.sit.vveshow.com/#!/yyg
http://api.sit.vveshow.com/buy/entry/dev/yyg/linkin


资讯首页
http://mall.sit.vveshow.com/#!/content/list
http://api.sit.vveshow.com/buy/entry/dev/content/linkin

会员中心
http://mall.sit.vveshow.com/#!/member
http://api.sit.vveshow.com/buy/entry/dev/member/linkin

分销商城首页
http://mall.sit.vveshow.com/#!/tker/product
商城商品详情页
http://mall.sit.vveshow.com/#!/product/show/57b41bc20f93d5223998d52f

商品预览页
http://mall.sit.vveshow.com/#!/product/preview/57b41bc20f93d5223998d52f



## SIT环境配置
* http://api.sit.vveshow.com/buy/entry/dev/mall/linkin

## UAT环境配置
* http://api.uat.vveshow.com/buy/entry/dev/mall/linkin

## PRD环境配置
* http://api.linkin.mobi/buy/entry/dev/mall/linkin

## Api说明

## 排错
```
<script type="text/javascript">
    window.onerror = testError;
    function testError() {
        arglen = arguments.length;
        var errorMsg = "参数个数：" + arglen + "个";
        for (var i = 0; i < arglen; i++) {
            errorMsg += "/n参数" + (i + 1) + "：" + arguments[i];
        }
        alert(errorMsg);
        window.onerror = null;
        return true;
    }
</script>
```

## 严格模式下,同一个属性申明2次,在android手机中报错

## <font color="red">store操作中时，尽量必免多个返回的action操作一个state属性</font>
```js

import {
    GET_LIST_SUCCESS,
    GET_PRICE_SUCCESS,
} from '../types';

const state = {
    status: 'init',
};

const mutations = {
    //两个action同时执行异步请求，store操作同一个state属性，可能会出现异常问题
    [GET_LIST_SUCCESS](state){
        state.status = 'listSuccess';
    },

    [GET_PRICE_SUCCESS](state){
        state.status = 'priceSuccess';
    },
}

```

## vue-resource/0.7版本不支持并发,升级0.9版本需要考虑api兼容问题

## 优化点
* 页面合并
* 修复并发加载阻断问题
* 程序升级提示
* 页面路由规划
* 全局提示
* 全局loading
* 加载更多

## 体验优化
页面载入Loading优化
页面转场Loading优化
下拉刷新
上拉加载更多
input聚焦底部固定定位
统一提示框(信息提示,错误提示,警告提示)
统一空数据提示
统一报错提示



## 安装eslint
* [官网](http://eslint.org/)
* [入门](http://eslint.org/docs/user-guide/getting-started)
* cd src && npm i
* npm run lint

## apache config

```
RewriteRule ^(.*)/index.html$ /index.html
RewriteRule ^/(\w+)(/?)$ /index.html

RewriteRule ^(.*)/$ /index.html

```

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 加载更多
滚动到底部->广播加载更多事件


## 页面载入
是否开启滚动加载事件->注册滚动加载事件

## 页面滚动到底部

页面收到事件->加载数据开始,锁定加载更多事件

数据处理:
加载首页数据->
加载中间数据->
加载尾页数据->

加载数据成功->解锁加载更多事件
加载数据失败->解锁加载更多事件

## 页面卸载
是否开启滚动加载事件->卸载滚动加载事件

## 页面入口
1、追加from=groupmessage&isappinstalled=0参数导致分享验签失败
2、Safari跨域访问受限制
3、切换商城


