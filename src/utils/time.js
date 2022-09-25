//该文件是一个把时间戳变为有一定格式的时间
export default function(timestamp) {
    const date = new Date(+timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date
      .getDate()
      .toString()
      .padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  }