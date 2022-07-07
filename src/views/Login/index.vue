<template>
  <div class="loginBox">
    <div class="login">
      <img src="@/assets/background2.png" />
      <div class="fromBox">
        <img src="@/assets/logo.png" alt />
        <h1>欢迎登陆黑马头条后台编辑系统</h1>
        <!-- 登陆表单 -->
        <el-form ref="loginRef" :rules="loginRules" :model="loginForm">
          <el-form-item prop="mobile">
            <el-input
              v-model="loginForm.mobile"
              placeholder="账号"
              maxlength="11"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <el-input
              v-model="loginForm.code"
              placeholder="密码"
              prefix-icon="el-icon-lock"
              maxlength="6"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item prop="agreement">
            <el-checkbox v-model="loginForm.agreement" class="checkA">
              <template>
                我已阅读并同意
                <a href="#">用户协议</a> 和
                <a href="#">隐私条款</a>
              </template>
            </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="loginFn" :loading="isLoading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { check_Checkbox, check_Mobile } from '@/util/validator'
import { loginAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'loginUser',
  data () {
    return {
      // 表单绑定的数据
      loginForm: {
        mobile: '13911111111',
        code: '246810',
        agreement: false
      },
      // 用户协议
      // 用户校验
      loginRules: {
        mobile: [
          { validator: check_Mobile, trigger: 'blur' },
          { min: 11, max: 11, message: '手机号必须是11位' }
        ],
        code: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '请输入3-6位密码', trigger: 'blur' }
        ],
        agreement: [
          { validator: check_Checkbox, trigger: 'change' }
        ]
      },
      isLoading: false
    }
  },
  created () {
  },
  methods: {
    ...mapMutations([ 'EDIT_PHOTO', 'SET_TOKEN', 'SET_REFRESH_TOKEN', 'GET_LOGIN_INFO' ]),
    loginFn () {
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return
        try {
          this.isLoading = true
          const { data: res } = await loginAPI({ mobile: this.loginForm.mobile, code: this.loginForm.code })
          this.EDIT_PHOTO(res.data.photo)
          this.SET_TOKEN(res.data.token)
          this.SET_REFRESH_TOKEN(res.data.refresh_token)
          this.GET_LOGIN_INFO(res.data)
          console.log(res.data)
          this.$message({ showClose: true, type: 'success', message: '登录成功' })
          this.isLoading = false
          this.$router.push('/home')
        } catch (err) {
          this.$message({ showClose: true, type: 'error', message: err.response.data.message })
        }
      })
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped >
.loginBox {
  height: 100%;
  background-image: url('@/assets/background1.png');
  background-position: center;
  background-repeat: no-repeat;
  .login {
    height: 782px;
    width: 1373px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .fromBox {
      width: 480px;
      height: 500px;
      position: absolute;
      right: 94px;
      top: 176px;
      text-align: center;
      padding: 20px;
      box-sizing: border-box;
      img {
        width: 200px;
        padding-bottom: 20px;
      }
      h1 {
        font-size: 26px;
        color: #409eff;
        font-weight: normal;
      }
      .el-form {
        padding-top: 30px;
        .el-checkbox {
          float: left;
        }
        .el-button {
          width: 100%;
        }
        .checkA a {
          text-decoration: none;
          color: #409eff;
        }
      }
    }
  }
}
</style>
