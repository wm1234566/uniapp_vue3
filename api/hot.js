/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-09-28 17:25:29
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-01 15:53:06
 * @FilePath: \blog\api\hot.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
 */
import Request from "./requestMethod.js"




export const getTabs = () => {
    return Request.get('/api/hot/tabs')
}

// 请求栏目对应的id页
export const getList = (id) => {
    return Request.get('/api/hot/list?type=' + id, "", true);//不展示加载
}
