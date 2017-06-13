/**
 * 计算获取短信验证码所需的 sign
 * @author bigfact
 * @date 2017.05.26
 */

/**
 * js md5
 */
import md5 from 'blueimp-md5'

/**
 * 计算 sign 值并返回，计算逻辑见 https://git.fond.io/b/paydayloan/wikis/appv1/user-signup-code
 * @param {Array} paramsArray 需要被计算的数组
 * @returns {String} sign 值
 */
export default (paramsArray) => {
  // console.log(paramsArray.sort().join('&') + '&si' + 'gn' + '_' + 'key' + '=eE5Dbe0T' + '5pY0jxy0')
  if (paramsArray instanceof Array) return md5(paramsArray.sort().join('&') + '&si' + 'gn' + '_' + 'key' + '=eE5Dbe0T' + '5pY0jxy0')
  else return ''
}