// 引入 mock
// mockjs来模拟数据接口
import Mock from "mockjs";

// 通过import导入过来的数据，，就是本来的结构
import banner from "./banner.json";
import floor from "./floor.json";

// 第一个参数：模拟的接口路径
// 第二个参数：返回的数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
