/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-09-28 17:30:42
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-13 16:16:53
 * @FilePath: \Blog\blog\api\requestMethod.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from './request.js'



const get = (url, params, showLoading) => {
    return service({ url, method: 'GET', params, showLoading })
}
const post = (url, data) => {
    return service({ url, method: 'POST', data })
}
const put = (url, data) => {
    return service({ url, method: 'PUT', data })
}
const deleteRequest = (url, data) => {
    return service({ url, method: 'DELETE', data })
}
export default {
    get,
    post,
    put,
    delete: deleteRequest,
}
