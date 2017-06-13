/**
 * 提供提交数据时，防止连续点击提交的方法
 * @param {Number|1000} time 两次提交的间隔时间，单位 ms
 * @returns {Function} submit 提交数据时防止连续提交的方法
 * @example
 * import once from './services/once.js'
 * // 初始化
 * var onceSubmit = once();
 * // 提交时触发
 * onceSubmit(function() {
 *     console.log('这里是回调函数，写提交数据的语句');
 * });
 */
export default function (time) {
  var flag = true;
  return function (cb) {
    if (!flag) return;
    flag = false;
    var tid = setTimeout(function () {
      flag = true;
      clearTimeout(tid);
    }, (time || 1000));
    typeof cb === 'function' && cb();
  }
};