export default function(fn, duration = 100) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, duration);
    };
  }
  //函数防抖，控制避免连续执行