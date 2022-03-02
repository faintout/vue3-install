/**
 * Desc: 通用工具
 * User: ChenJiaLei
 * Date: 2019/7/25
 * Time: 上午10:47
 */

 const ToolUtil = {

    // 转换为16进制
    strTo16(val:string) {
        if (val == null || val === undefined || val === "") return "";
        let str = "";
        if (parseInt(val) >= 0 && parseInt(val) < 16) {
            str = "0x0";
        } else if (parseInt(val) >= 16 && parseInt(val) < 256) {
            str = "0x";
        } else if (parseInt(val) >= 256 && parseInt(val) < 4096) {
            str = "0x0"
        } else if (parseInt(val) >= 4096 && parseInt(val) < 65536) {
            str = "0x"
        }
        let str16 = parseInt(val).toString(16).toUpperCase();
        return str + str16;
    },

    // 判定是否是IE浏览器
    isIE() {
        if (!!(window as any).ActiveXObject || "ActiveXObject" in window) {
            return true;
        } else {
            return false;
        }
    }

};


export {
    ToolUtil
}