<template>
  <div class="user-modal">
    <a-modal
      title="Title"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="60%"
    >
      <a-form :form="form">
        <a-row>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="用户名"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input
                v-decorator="['account',{ rules: [{ required: true, message: '请输入用户名' }] }]"
                placeholder="请输入用户名"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="密码"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input
                v-decorator="['pwd',{ rules: [{ required: true, message: '请输入密码' }] }]"
                placeholder="请输入密码"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "userModal",
  props: ["visible"],
  data() {
    return {
      confirmLoading: false,
      user: {
        account: "",
        pwd: ""
      },
      form: this.$form.createForm(this, { name: "forms" })
    };
  },
  methods: {
    handleOk(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.user = { ...values };
          this.$emit("submit", this.user);
          this.form.resetFields();
        }
      });
    },
    handleCancel(e) {
      this.$emit("cancel");
      this.form.resetFields();
    }
  }
};
</script>
