import axios from 'axios';
import es6Promise from 'es6-promise';
import config from '../../config';
import {transforms} from 'common/util/urlTemplate';
import {exists} from 'common/util';
import _ from 'lodash';
es6Promise.polyfill();

const instance = axios.create({
    baseURL: config.API_BASE_URL,
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
instance.interceptors.request.use(function (opts) {

    let {params, data} = opts;

    // 原始参数
    opts.origin = {
        ...(_.isPlainObject(params) ? params : {}),
        ...(_.isPlainObject(data) ? data : {})
    };

    // params将转换到url中的替换
    if (opts.params) {

        // 处理排序
        if (opts.params.sort && opts.params.order) {
            opts.params.sort = opts.params.sort + ',' + opts.params.order;
            delete opts.params.order;
        } else {
            delete opts.params.sort;
            delete opts.params.order;
        }

        // 转换URL的参数,需要自动删除没有的参数
        opts.url = transforms(opts.url, opts.params);
    }

    opts.params = opts.params || {};
    opts.params['_'] = new Date().getTime();

    return opts;
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    response.data.params = response.config.origin;
    if (response.data.errCode == 0) {
        // console.info(response.config.url, response.data)
        return response.data;
    } else {
        // 业务错误
        //console.error(response.config.url, response.data.errMsg);
        //console.log('response-reject-code', error)
        return Promise.reject(response.data);
    }


}, function (error) {
    // Http错误
    // console.log('response-reject-http', arguments);
    let response = error instanceof Error ? error.response || error : error;
    let result;

    if (response.data) {
        result = response.data;
    } else {
        result = {
            errCode: response.status || -1,
            errMsg: response.statusText || '网络异常'
        };
    }
    result.params = response.config.origin;
    return Promise.reject(result);
});
const api = {
    request(opts){

        // http://www.baidu.com/api

        if (!/^http/i.test(opts.url)) {

            // /buy/logout => http://api.dev.vveshow.com/buy/logout
            if (/^\//.test(opts.url)) {
                opts.url = config.API_ORIGIN + opts.url;
            }

            // TODO:
            // buy/manager/product/list =>  http://api.dev.vveshow.com/buy/api/v1/{client}/{channel}/manager/product/list
            // if (/^buy\//.test(opts.url)) {
            //    opts.url = config.API_ORIGIN + opts.url;
            // }

            // iloka/manager/site/config => http://api.dev.vveshow.com/iloka/api/v1/{client}/{channel}/manager/site/config
            // if (/^iloka\//.test(opts.url)) {
            //    opts.url = config.API_ORIGIN + opts.url;
            // }

        }
        return instance.request(opts);
    },

    get(url, params, opts){
        opts = opts || {};
        opts.method = 'get';
        opts.url = url;
        if (exists(params)) {
            opts.params = params;
        }
        return this.request(opts);
    },

    delete(url, params, opts){
        opts = opts || {};
        opts.method = 'delete';
        opts.url = url;
        if (params) {
            opts.params = params;
        }
        return this.request(opts);
    },

    post(url, data, opts){
        opts = opts || {};
        opts.method = 'post';
        opts.url = url;
        if (exists(data)) {
            opts.data = data;
        }
        return this.request(opts);
    },

    put(url, data, opts){
        opts = opts || {};
        opts.method = 'put';
        opts.url = url;
        if (exists(data)) {
            opts.data = data;
        }
        return this.request(opts);
    },

    patch(url, data, opts){
        opts = opts || {};
        opts.method = 'patch';
        opts.url = url;
        if (exists(data)) {
            opts.data = data;
        }
        return this.request(opts);
    }
};

export default api;
//export const ProductResource = (method, path = 'admin/product', id, data) => {
//    return instance[method](path + (id ? ('/' + id) : ''), data)
//}


/*
 POST admin/product 新增商品
 GET admin/product/list 商品列表
 POST admin/product/opening 商品上架
 GET admin/product/{id} 获取商品信息
 POST admin/product/{id} 修改商品

 POST admin/product/{buyType}/finished/{id} 商城商品下架
 POST admin/product/{buyType}/info/{id} 修改商城商品图文信息
 GET admin/product/{buyType}/list 商城商品列表
 POST admin/product/{buyType}/trade/{id} 修改商城商品交易属性


 axios.request(config)                 vue.http(config)                      api.request(config)
 axios.get(url[, config])              vue.get(url, [params], [config])      api.get(url, [params], [config])
 axios.delete(url[, config])           vue.delete(url, [params], [config])   api.delete(url, [params], [config])
 axios.post(url[, data[, config]])     vue.post(url, [data], [config])       api.post(url, [data], [config])
 axios.put(url[, data[, config]])      vue.put(url, [data], [config])        api.put(url, [data], [config])
 axios.patch(url[, data[, config]])    vue.patch(url, [data], [config])      api.patch(url, [data], [config])




 resource
 resource(url, [params], [actions], [options])
 get: {method: 'GET'},
 save: {method: 'POST'},
 query: {method: 'GET'},
 update: {method: 'PUT'},
 remove: {method: 'DELETE'},
 delete: {method: 'DELETE'}

 export const CommentResource = Vue.resource(API_ROOT + 'comment{/id}{/controller}')
 CommentResource.get({id: id, controller: 'getFrontCommentList'})
 CommentResource.save({id: 'addNewComment'}, data)
 CommentResource.save({id: id, controller: 'addNewReply'}, data)
 CommentResource.remove({id: id})
 CommentResource.update({id: id, controller: 'delReply'}, data)


 */
