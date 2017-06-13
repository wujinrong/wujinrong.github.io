/**
 * 设置根节点字体大小，使用响应式布局，单位使用 rem ，动态监听窗口大小，等比例缩放根节点字体大小
 * @param {Number} base_width 参照屏幕宽度
 * @param {Number} max_width 最大屏幕宽度
 * @author qsq-frontend
 * @example
 * import px2rem from './services/px2rem'
 * px2rem()
 */
export default function (base_width, max_width) {
  base_width = base_width || 375;   // 参照屏幕宽度, 默认参照 iphone 6
  max_width = max_width || 768;     // 最大屏幕宽度
  var rate = 10;                    // 缩放基数，与 /src/sass/_globals.scss 文件中 $_html_font_size 的值一致
  function setHtmlFontSize() {
    var screenWidth = window.innerWidth;
    // var screenWidth = window.screen.width;
    var font_size = screenWidth < max_width ? screenWidth / base_width * rate : max_width / base_width * rate;
    // 限制最大为 iphone 6s 屏幕效果
    font_size > 10 && (font_size = 10);
    document.documentElement.style.fontSize = font_size + 'px';
  };
  setHtmlFontSize();
  window.onload = setHtmlFontSize;
  window.onresize = setHtmlFontSize;
}
