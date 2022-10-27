/*
 * @Author: Wujie16 xx@email.com
 * @Date: 2022-10-10 14:56:34
 * @LastEditors: Wujie16 xx@email.com
 * @LastEditTime: 2022-10-14 12:17:58
 * @FilePath: \Blog\blog\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStore } from 'vuex'
import moduleA from "./modules/user"
import moduleB from "./modules/video"
// 创建一个新的 store 实例
const store = createStore({
    modules:
    {
        User: moduleA,
        Video: moduleB
    }

})

export default store