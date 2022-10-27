/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-10 17:09:31
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-12 23:41:15
 * @FilePath: \blog\api\article.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Wujie16 xx@email.com, All Rights Reserved. 
 */
import Request from "./requestMethod.js"




/**
 * @description:请求文章数据 
 * @return {*}
 */


export const getArticleDetail = (author, articleId) => {
    return Request.get(`/api/article/details?author=${author}&articleId=${articleId}`)
}

/**
 * @description:文章评论 
 * @return {*}
 */
export const getArticleComment =
    (articleId, page = 1, size = 5) => {
        return Request.get(`/api/article/comment/list?articleId=${articleId}&page=${page}&size=${size}`)
    }



/**
* 关注用户
*/
export function userFollow(author, isFollow) {
    // return request({
    //     url: '/user/follow',
    //     data
    // });

    return Request.get(`/api/user/follow?author=${author}&isFollow=${isFollow}`, "", true)
}

/**
 * 发表评论
 */
export function userArticleComment(data) {
    return request({
        url: '/user/article/comment',
        method: 'POST',
        data
    });
}

/**
 * 用户点赞
 */
export function userPraise(data) {
    return request({
        url: '/user/praise',
        data
    });
}

/**
 * 用户收藏
 */
export function userCollect(data) {
    return request({
        url: '/user/collect',
        data
    });
}
