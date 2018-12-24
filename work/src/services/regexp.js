/**
 * 提供表单验证所需的正则表达式
 */

export default {
  /**
   * 验证姓名不能有数字
   */
  name(i) {
    var reg_name = new RegExp('^[^\\d]+$')
    return reg_name.test(i)
  },
  /**
   * 验证手机号码
   */
  phone(i) {
    var reg_phone = new RegExp('^1[34578]\\d{9}$')
    return reg_phone.test(i)
  },
  /**
   * 验证电话号码（包括座机和手机）
   */
  tel(i) {
    var reg_tel = new RegExp('(^(0[0-9]{2,3}\\-?)?([2-9][0-9]{6,7})+(\\-?[0-9]{1,4})?$)|(^((\\(\\d{3}\\))|(\\d{3}\\-?))?(1[34578]\\d{9})$)')
    return reg_tel.test(i)
  },
  /**
   * 验证是否为空
   */
  empty(i) {
    var reg_empty = new RegExp('^.*\\S+.*$')
    return reg_empty.test(i)
  },
  /**
   * 验证身份证号
   */
  idcard(i) {
    var reg_idcard = new RegExp('^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}(\\d|x|X)$')
    return reg_idcard.test(i)
  },
  /**
   * 验证日期（年月） 2016-08
   */
  date(i) {
    var reg_date = new RegExp('^[1-9]\\d{3}-((0?[1-9])|(1[0-2]))$')
    return reg_date.test(i)
  },
  /**
   * 验证金额
   */
  money(i) {
    var reg_money = new RegExp('^[1-9]\\d*.\\d*$')
    return reg_money.test(i)
  },
  /**
   * 验证小数点两位金额
   */
  defaultMoney(i) {
    var reg_money = new RegExp('(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)')
    return reg_money.test(i)
  },
  /**
   * 银行卡验证，最大 19 位数字
   */
  bankcard(i) {
    var reg = new RegExp('^\\d{14,19}$')
    return reg.test(i)
  },
  /**
   * 密码强度检查（6-16位数字或字母）
   */
  password(i) {
    var reg = new RegExp('^[0-9a-zA-Z]{6,16}$')
    return reg.test(i)
  },
}
