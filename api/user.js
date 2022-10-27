/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-13 15:40:29
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-13 17:49:17
 * @FilePath: \Blog\blog\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Request from "./requestMethod.js"






/**
 * @description: 登陆
 * @return {*}
 */
export const login = (paras) => {
    return Request.post('/api/sys/login', paras)
}


