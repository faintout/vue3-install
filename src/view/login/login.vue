<template>
    <div class="login">
        <div class="loginContainer">
            <dl class="login_title">
                <h1>VMS模拟仿真系统</h1>
            </dl>
            <dl class="form">
                <dd class="font-style">
                    用户名:&nbsp;&nbsp;
                </dd>
                <dd>
                    <input id="userName" class="formControl inputBlock" type="text" placeholder="请输入用户名" autocomplete="off">
                </dd>
            </dl>
            <dl class="form">
                <dd class="font-style">
                    &nbsp;&nbsp;&nbsp;&nbsp;密码:&nbsp;&nbsp;
                </dd>
                <dd>
                    <input id="passWord" class="formControl inputBlock" type="password" placeholder="请输入密码" autocomplete="off">
                </dd>
            </dl>
            <dl class="form">
                <dd class="font-style">
                    &nbsp;验证码:&nbsp;&nbsp;
                </dd>

                <dd style="position: relative">
                    <input id="captcha" class="formControl inputBlockCaptcha" type="text" ref="captcha" placeholder="请输入右侧验证码" autocomplete="off">
                    <!--<span style="float: left;">hello</span>-->
                    <div style="position: absolute;width: 100px;height: 48px;right: 42px;top: 4px;cursor: pointer" id="captchaSvg">

                    </div>
                </dd>

            </dl>

            <!--<el-form label-width="120px">-->
            <!--<el-form-item label="用户名" style="color:#fff;"><input id="userName" class="formControl inputBlock" type="text" placeholder="请输入用户名" autocomplete="off"></el-form-item>-->
            <!--</el-form>-->

            <dl class="form buttonForm">
                <dd>
                    <label style="display:none"><input id="remember" type="checkbox">记住密码</label>
                    <button id="buttonLogin" style="width: 20%;margin-right: 8px;" class="formControl buttonBlock buttonLogin">登 录</button>
                </dd>
            </dl>
        </div>
        <footer class="boxMainColor">
            <p class="companyName">1993-{{findDate()}} 北京市博汇科技股份有限公司</p>
        </footer>
    </div>
</template>

<script lang="ts">
    // import crypto from 'crypto';
    import CryptoJS from 'crypto-js';
    import moment from 'moment';
    import $ from 'jquery'
    import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
    import { ElMessage } from "element-plus";
    import { useRoute, useRouter } from "vue-router";
    export default defineComponent({
        name: "login",
        components: {},
        setup(props, context) {
            const router = useRouter();
            // const encryption = new Encryption();
            const state = reactive({
                navData: [],
            });
            // const store = useStore()

            onMounted(() => {
                const vm = methods
                $('#buttonLogin').click(function() {
                    vm.doLogin();
                });
                $(function() {
                    $('#captchaSvg').on('click', function() {
                        vm.getCaptcha();
                    });
                    vm.getCaptcha();
                    window.document.onkeydown = disableRefresh;

                    function disableRefresh(evt) {
                        evt = evt ? evt : window.event;
                        if (evt.keyCode) {
                            if (evt.keyCode == 13) {
                                $('#buttonLogin').click();
                            }
                        }
                    }
                });
                window.onload = function() {
                    var btn = document.getElementById('buttonLogin');
                    var oUser = document.getElementById('userName');
                    var oPswd = document.getElementById('passWord');
                    var oRemember = document.getElementById('remember');

                    if (vm.getCookie('userName') && vm.getCookie('passWord')) {
                        oUser.value = vm.getCookie('userName');
                        oPswd.value = vm.getCookie('passWord');
                        // console.log('oUser',oUser)
                        oRemember.checked = true;
                    }
                    oRemember.onchange = function() {
                        if (!this.checked) {
                            vm.delCookie('userName');
                            vm.delCookie('passWord');
                        }
                    };
                    btn.onclick = function() {
                        if (oRemember.checked) {
                            // console.log('oUser',oUser)
                            vm.setCookie('userName', oUser.value, 7); //保存帐号到cookie，有效期7天
                            vm.setCookie('passWord', oPswd.value, 7); //保存密码到cookie，有效期7天
                        }
                    };
                };
            });
            const methods = {
                doLogin() {
                    let vm = state;
                    //开始进行提交登录时间
                    let captcha = $('#captcha').val();
                    let password = CryptoJS.MD5($('#passWord').val() + 'bohui').toString();
                    if (!captcha) {
                        $('#captcha').focus();
                        alert('请输入验证码!');
                        return;
                    }
                    $.ajax({
                        url: './api/device/web/captcha/:',
                        type: 'GET',
                        contentType: 'text/plain; charset=utf-8',
                        data: {
                            type: 2,
                            captcha: captcha,
                            ran: Math.random(),
                        },
                        success: function(res) {
                            var status = res.status;
                            if (status == 1) {
                                let sendData = {
                                    userName: $('#userName').val(),
                                    password: password,
                                };
                                let sendMsg = methods.encrypt(JSON.stringify(sendData));
                                $.ajax({
                                    url: './api/device/web/login/:',
                                    type: 'GET',
                                    contentType: 'text/plain; charset=utf-8',
                                    data: {
                                        //                   userName: $("#userName").val(),
                                        //                   password: password,
                                        //                   ran: Math.random()
                                        // //            password: $("#passWord").val()
                                        //                 }, {
                                        loginInfo: sendMsg,
                                        ran: Math.random(),
                                    },
                                    success: function(res) {
                                        var status = res.status;
                                        if (status != '1') {
                                            alert(res.desc);
                                            methods.getCaptcha();
                                            return;
                                        }
                                        //判断是否超过有效期。如果超过弹框提示
                                        let user = res.data;
                                        let lastModifyTime = user.lastModifyTime;
                                        let pwdSavePeriod = user.pwdSavePeriod;
                                        let nowTime = moment();
                                        let time = moment(lastModifyTime).add(pwdSavePeriod, 'days');
                                        // console.info(time);
                                        // console.info(time.isBefore(nowTime));
                                        // console.info(user);
                                        if (time.isBefore(nowTime)) {
                                            // .$notify({
                                            //     title: '密码修改',
                                            //     message: '密码超过' + pwdSavePeriod + '天未修改，请及时修改密码',
                                            //     showClose: false,
                                            // });
                                        }
                                        //储存用户信息到cookie
                                        let params = {
                                            id:res.data.id,
                                            roleId:res.data.roleID,
                                            password,
                                            userName:res.data.userName,
                                            nickName:res.data.nickName,
                                            picPath:res.data.picPath,
                                        }
                                        methods.setCookie('VMSUserInfo',JSON.stringify(params),365) 
                                        //进行跳转到首页目录;
                                        // console.log('res.data.roleID', res.data.roleID);
                                        router.push('/duty')
                                        // vm.vue.$emit('logined', res.data.roleID);
                                    },
                                });
                            } else {
                                alert('验证码错误，请重新填写。');
                                $('#captcha').val('');
                                $('#captcha').focus();
                                methods.getCaptcha();
                            }
                        },
                    });
                },
                /**
                 * 加密
                 */
                encrypt(word) {
                    var key = CryptoJS.enc.Utf8.parse('46cc793c53dc451b');
                    var srcs = CryptoJS.enc.Utf8.parse(word);
                    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7,
                    });
                    return encrypted.toString();
                },
                setCookie(name, value, day) {
                    var date = new Date();
                    date.setDate(date.getDate() + day);
                    document.cookie = name + '=' + value + ';expires=' + date;
                },
                getCookie(name) {
                    var reg = RegExp(name + '=([^;]+)');
                    // console.log('reg', reg)
                    var arr = document.cookie.match(reg);
                    if (arr) {
                        return arr[1];
                    } else {
                        return '';
                    }
                },
                delCookie(name) {
                    methods.setCookie(name, null, -1);
                },
                getCaptcha() {
                    $.ajax({
                        url: './api/device/web/captcha/:',
                        type: 'GET',
                        contentType: 'text/plain; charset=utf-8',
                        data: {
                            type: 1,
                            ran: Math.random(),
                        },
                        success: function(res) {
                            var status = res.status;
                            if (status == 1) {
                                $('#captchaSvg').html(res.data);
                            } else {
                                alert('获取验证码失败');
                            }
                        },
                    });
                },
                findDate() {
                    return moment().format('YYYY');
                },
            };
            return {
                ...toRefs(state),
                ...methods,
            };
        },
    });
</script>
<style lang="less">
    .login {
        height: 100%;
        width: 100%;
        background: url('../../assets/images/bg-1.png');
    }

    .loginContainer {
        position: relative;
        top: 25%;
        width: 600px;
        height: 430px;
        margin: auto auto;
        border-radius: 20px;
        box-sizing: border-box;
        padding: 28px 40px;
        background: rgba(255, 255, 255, 0.1);
    }

    .login_title {
        color: white;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: rgba(0, 173, 255, 1);
        text-shadow: 1px 2px 0 rgba(0, 6, 6, 1);
    }

    .buttonForm {
        margin-top: 30px;
    }

    .buttonLogin {
        font-size: 20px;
        cursor: pointer;
        color: #fff;
        background: rgba(7, 173, 255, 0.8);
    }

    .buttonLogin:hover {
        /*background: #aaaaaa;*/
        /*color: #666666;*/
        background: rgba(7, 173, 255, 0.5);
    }

    .buttonLogin:focus {
        color: #fff;
        /*background: #aaaaaa;*/
    }

    .loginContainer .form-label {
        color: #aaaaaa;
        display: block;
        font-size: 20px;
    }

    .loginContainer .formControl {
        min-height: 26px;
        border-radius: 5px;
        border: 1px solid #0f2038;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .loginContainer .formControl:focus {
        border-color: rgba(7, 173, 255, 1);
        outline: none;
    }

    .loginContainer .form {
        margin: 40px 0;
    }

    .inputBlock {
        display: block;
        width: 400px;
        padding: 10px;
        font-size: 16px;
        /*float: left;*/
    }

    .inputBlockCaptcha {
        display: block;
        width: 290px;
        padding: 10px;
        font-size: 16px;
        /*float: left;*/
    }

    .buttonBlock {
        display: block;
        width: 40%;
    }

    .buttonLogin {
        margin: 0 auto;
    }

    footer {
        position: fixed;
        left: 0;
        bottom: 0;
        height: 30px;
        width: 100%;
        background: #0f2038;
    }

    .companyName {
        text-align: center;
        height: 100%;
        line-height: 30px;
        font-size: 16px;
        color: #aaaaaa;
        background: #15253f;
    }

    .font-style {
        color: #fff;
        float: left;
        margin-top: 10px;
        height: 27px;
        line-height: 27px;
    }

    .font-style-form {
        color: #fff;
        /*float: left;*/
        margin-top: 10px;
        height: 27px;
        line-height: 27px;
    }
</style>