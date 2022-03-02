// /**
//  * Desc: webSocket通用工具
//  * User: ChenJiaLei
//  * Date: 2019/7/25
//  * Time: 下午6:55
//  */
//  import io from "socket.io-client"
//  import {Config} from "../config/config"
 
//  const ws = {
//      wsUrl: Config.wsUrl,
//      wsClient: null,
//      connected: false
//  };
 
 
//  /**
//   * 定义WSClient对象
//   * @constructor
//   * @param wsUrl webSocket连接地址
//   * @param wsClient webSocket连接后返回的实例
//   * @param connected webSocket的连接状态。true：已连接；false：未连接
//   */
//  function WSClient() {
//      this.wsClient = ws.wsClient;
//      this.connected = ws.connected;
//  }
 
//  /**
//   * webSocket连接方法
//   * @param callback 回调函数 多为连接后的订阅事件
//   */
//  WSClient.prototype.connect = function (callback) {
//      console.log("webSocket连接地址：" + ws.wsUrl);
//      ws.wsClient = io.connect(ws.wsUrl);
//      ws.wsClient.on("connect", () => {
//          ws.connected = true;
//          if (callback) {
//              callback();
//          }
//      })
//  };
 
//  export  {
//      WSClient
//  };