import { v4 as uuidv4 } from "uuid";

// 获取用户临时ID函数
export function getUserTempId() {
  // 定义一个变量，用来在游览器永久存储userTempId
  let userTempId = localStorage.getItem("USERTEMPID_KEY");
  // 判断userTempId是否存在
  if (!userTempId) {
    // uuidv4() 生成一个随机唯一的字符串
    userTempId = uuidv4();
    // 把它存入游览器localStorage
    localStorage.setItem("USERTEMPID_KEY", userTempId);
  }
  // 存在直接返回
  return userTempId;
}
