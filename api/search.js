/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-02 15:07:39
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-10 17:10:23
 * @FilePath: \blog\api\search.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
 */

import Request from "./requestMethod.js"



/**
 * @description: 加载热榜 
 * @return {*}
 */
export const getHotList = () => {
    return Request.get('/api/search/hot-list')
}

/**
 * @description:加载默认搜索内容 
 * @return {*}
 */
export const getDefaultText = () => {
    return Request.get('/api/search/default-text');
}

/**
 * @description: 请求搜索内容
 * @param {*} q 搜索的问题
 * @param {*} p 搜索的页面
 * @return {*} 
 */
export const Search = (q, p) => {
    return Request.get('/api/search?q=' + q + "&p=" + p);
}
