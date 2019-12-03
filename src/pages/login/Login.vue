<template>
  <div class="container">
    <div class="content">
      <div class="login">
        <a-form @submit="onSubmit" :form="form">
          <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
            <a-tab-pane tab="账户密码登录" key="1">
              <a-alert
                type="error"
                :closable="true"
                v-show="error"
                :message="error"
                showIcon
                style="margin-bottom: 24px;"
              />
              <a-form-item>
                <a-input
                  size="large"
                  v-decorator="['account',{ rules: [{ required: true, message: '用户名不能为空' }]}]"
                  placeholder="请输入用户名"
                >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  size="large"
                  type="password"
                  v-decorator="['password',{ rules: [{ required: true, message: '密码不能为空' }]}]"
                  placeholder="请输入密码"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  size="large"
                  style="width:250px"
                  v-decorator="['code',{ rules: [{ required: false, message: '验证码不能为空' }]}]"
                  placeholder="请输入验证码"
                >
                  <a-icon slot="prefix" type="code" />
                </a-input>
                <img :src="codeImg" style="height:40px" @click="onCodeChange()" />
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <a-form-item>
            <a-button style="width: 100%" size="large" htmlType="submit" type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      error: "",
      codeImg:
        process.env.VUE_APP_BASE_URL + "/user/getKaptcha?t=" + new Date().getTime(),
      form: this.$form.createForm(this, { name: "login" })
    };
  },
  created(){
  },
  computed: {},
  methods: {
    ...mapActions(["Login", "Logout"]),
    onSubmit(e) {
      const {
        form: { validateFields },
        Login
      } = this;
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          const user = { ...values };
          
          Login(user).then(res => this.loginSuccess(res));
        }
      });
    },
    loginSuccess(res) {
      if (res && res.result == 1) {
        this.$router.push({ path: "/datas" });
      }
    },
    onCodeChange() {
      this.codeImg =
        process.env.BASE_API + "/user/getKaptcha?t=" + new Date().getTime();
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5
    url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg")
    no-repeat center 110px;
  background-size: 100%;
  .content {
    padding: 32px 0;
    flex: 1;
    @media (min-width: 768px) {
      padding: 112px 0 24px;
    }
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
            sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login {
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button {
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
