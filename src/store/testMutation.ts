/*
 * @Author: LiuFengRui
 * @Date: 2021-09-25 14:42:59
 * @LastEditTime: 2021-09-26 15:35:51
 * @LastEditors: LiuFengRui
 * @Description: 
 */
const MutationType = {
    setMsg:'SET_MSG',
    setInfo:'SET_INFO',
    setTest:'SET_TEST',
    setChannelList:'SET_CHANNEL'
}
export default {
    getters:{
        testCompute:((state:any) => {
            return state.test2.object+1
        }) 
    },
    state() {
        return {
            test1:'this is test1',
            test2:{object:1},
            isLogin:false,
            channelList:[],
            isShowClass:false,
            startExam:[],
            examList:[],
            //控制取消之后更改路由不显示
            flag:false
        }
    },
    mutations:{
        [MutationType.setTest](state,value){
            state.test1 = value
        },
        [MutationType.setChannelList](state,value){
            state.channel = value
        },
        setShowClass(state,value){
            state.isShowClass = value
        },
        getExamList(state,value){
            state.startExam = value
        },
        changeFlag(state,value){
            state.flag = value
        }
    },
    actions:{
        setTest(props,value){
            props.commit(MutationType.setTest,value)
        }
    }
}