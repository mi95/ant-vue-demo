<template>
  <div class="role-modal">
    <a-modal
      title="Title"
      :visible="visible"
      :role="role"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="60%"
    >
      <a-form :form="form">
        <a-row>
          <a-col :md="8" :sm="24">
            <a-form-item label="角色名" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
              <a-input
                v-decorator="['name',{ rules: [{ required: true, message: '角色名' }],initialValue: this.role.name }]"
                placeholder="角色名"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="说明" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
              <a-input
                v-decorator="['comment',{initialValue: this.role.comment}]"
                placeholder="请输入说明"
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
  name: "roleModal",
  props: ["visible", "role"],
  data() {
    return {
      confirmLoading: false,
      form: this.$form.createForm(this, { name: "forms" })
    };
  },
  methods: {
    handleOk(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = { id: this.role.id, ...values };
          this.$emit("submit", params);
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
