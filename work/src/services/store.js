/**
 * 检查、获取、设置 cookie 和 localStorage 的方法
 * @author qsq-frontend
 */
export default {
  /**
   * 检查、获取、设置 cookie
   */
  cookie: {
    /*
     * 获取 cookie 值
     * @param {String} name cookie 名称
     * @returns {String} value cookie 值 
     */
    get(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
      } else {
        return '';
      }
    },
    /*
     * 设置 cookie
     * @param {String} name cookie 名称
     * @param {String} value cookie 值
     * @param {String} path cookie 路径
     * @param {Number} cycle cookie 的生命周期
     */
    set(name, value, path, cycle) {
      var expires = "";
      if (!cycle) {
        var maxCycle = new Date();
        maxCycle.setTime(maxCycle.getTime() + cycle * 1000);
        expires = ";expires=" + maxCycle.toGMTString();
      }
      path = path ? ";path=" + path : "";
      document.cookie = name + "=" + escape(value) + expires + path;
    },
    /*
     * 删除 cookie
     * @param {String} name cookie 名称
     * @param {String} path cookie 路径
     */
    remove(name, path) {
      var endCycle = new Date();
      endCycle.setTime(endCycle.getTime() - 1);
      var delValue = this.get(name);
      path = path ? ";path=" + path : "";
      document.cookie = name + "=" + delValue + ";expires=" + endCycle.toGMTString() + path;
    },
    /**
     * 检查是否支持 cookie
     */
    support() {
      return navigator.cookieEnabled;
    },
  },
  /**
   * 检查、获取、设置 localStorage
   */
  local: {
    /**
     * localStorage 设置
     * @param {String} key 键
     * @param {String} val 值
     */
    set(key, val) {
      try {
        if (!key) return;
        return localStorage.setItem(key, val);
      } catch (err) { }
    },
    /**
     * localStorage 获取
     * @param {String} key 键
     */
    get(key) {
      try {
        if (!key) return '';
        return localStorage.getItem(key);
      } catch (err) {
        return '';
      }
    },
    /**
     * 清除 localStorage，若不填参数 key ，则清除所有 localStorage
     * @param {String} key 键
     */
    remove(key) {
      if (typeof key === 'undefined') return localStorage.clear();
      try {
        return localStorage.removeItem(key);
      } catch (err) { }
    },
    /**
     * 检查是否支持 localStorage
     */
    support() {
      try {
        localStorage.setItem('key', 'value');
        if (localStorage.getItem('key') === 'vaule') {
          localStorage.removeItem('key');
          return true;
        }
        else {
          return false;
        }
      } catch (err) {
        return false;
      }
    },
  },
}
