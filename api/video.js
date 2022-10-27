/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-14 09:53:22
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-14 10:04:16
 * @FilePath: \Blog\blog\api\vido.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Request from "./requestMethod.js"



/**
 * @description: 加载热榜 
 * @return {*}
 */
export const getHotVideoList = (page, size) => {
    return Request.get(`/api/video/list?page=${page}&size=${size}`)
}

