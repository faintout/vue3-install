/*
 * @Author: LiuFengRui
 * @Date: 2021-07-15 09:36:50
 * @LastEditTime: 2021-09-15 17:49:23
 * @LastEditors: LiuFengRui
 * @Description: 
 */
/**
 * Desc: 所有请求的url管理
 * User: ChenJiaLei
 * Date: 2019/7/23
 * Time: 下午1:42
 */
interface UrlModel{
    [propName:string]:string
}
 const Url:UrlModel = {
    //***********************产品管理*************************
    //获取产品分类列表
    getProductList:'/api/product/getProductList',
    //新增分类
    addProductType:'/api/product/addProductType',
    //删除分类
    productTypeId:'/api/product/delProductType',
    //获取图片列表
    getProductImgList:'/api/product/getProductImgList',
    //上传修改产品图片
    addOrEditProductImg:'/api/product/addOrEditProductImg',
    //删除产品图片
    delProductImgById:'/api/product/delProductImgById',
    //***********************题目管理*************************
    //新增题目分类
    addExamType:'/api/exam/addExamType',
    //删除题目分类
    delExamType:'/api/exam/delExamType',
    //获取题目分类
    getExamTypeList:'/api/exam/getExamTypeList',
    //新增题库
    addExam:'/api/exam/addExam',
    //删除题库
    delExamById:'/api/exam/delExamById',
    //获取题目列表
    getExamList:'/api/exam/getExamList',
    //***********************日常演练*************************
    getExamInfoById:'/api/exam/getExamInfoById',
    //***********************模拟仿真*************************
    //获取仿真模拟试题id
    getSimulationList:'/api/simulation/getSimulationList',
    //获取试题详情
    getSimulationInfoByLinkId:'/api/simulation/getSimulationInfoByLinkId',
    //根据id获取图片
    getProductImgListById:'/api/product/getProductImgListById',
    //提交试题
    setSimulationList:'/api/simulation/setSimulationList',
    
    //***********************系统管理*************************
    //获取所有角色
    getAllRole:'/api/device/sys/role',
    //获取所有菜单
    getAllModelList:'/api/device/web/modelInfo',
    //***********************工作台*************************
    getSimulationExamList:'/api/simulation/getSimulationExamList',
    getUserSimulationList:'/api/simulation/getUserSimulationList',
    //保存出题配置
    saveExamConfig:'/api/exam/saveExamConfig',
    //获取出题配置
    getExamConfig:'/api/exam/getExamConfig',
    //上传用户头像
    uploadProfilePic:'/api/device/sys/uploadProfilePic',
};

export default Url;
