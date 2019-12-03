<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" :form="form">
        <div :class="advanced ? null: 'fold'">
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item label="关键字" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
                <a-input
                  v-decorator="['key',{}]"
                  placeholder="请输入"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="状态" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
                <a-select placeholder="请选择" v-decorator="['state',{}]">
                  <a-select-option value="1">有效</a-select-option>
                  <a-select-option value="2">无效</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="handleSearchClick">查询</a-button>
          <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
        </span>
      </a-form>
    </div>
    <div>
      <a-button @click="onAdd" type="primary" v-has="{btns:this.btns,id:'add'}">新建</a-button>
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :rowKey = "record => record.id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template slot="oper" slot-scope="text">
          <a @click="updState(text)" v-if="text.state == 1" v-has="{btns:btns,id:'del'}">禁用</a>
          <a @click="updState(text)" v-else>启用</a>
          <a-popconfirm title="确定重置密码?" okText="Yes" cancelText="No" @confirm="resetPwd(text)" v-has="{btns:btns,id:'reset'}">
            <a>重置密码</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <user-modal @submit="onSubmit" :visible="visible" @cancel="onCancel" />
  </a-card>
</template>

<script>
import userModal from "./UserModal";

const dataSource = [];

export default {
  name: "users",
  components: { userModal },
  data() {
    return {
      advanced: true,
      columns: [
        {
          title: "id",
          dataIndex: "id"
        },
        {
          title: "用户名",
          dataIndex: "account"
        },
        {
          title: "状态",
          dataIndex: "state",
          customRender: (text, row, index) => {
            if (text == 1) {
              return "有效";
            } else {
              return "无效";
            }
          }
        },
        {
          title: "最后登录时间",
          dataIndex: "last_login_time"
        },
        {
          title: "操作",
          dataIndex: "",
          scopedSlots: { customRender: "oper" }
        }
      ],
      dataSource: dataSource,
      pagination: {
        pageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        showQuickJumper: false,
        pageSizeOptions: ["10", "20", "50", "100", "200"],
        total: 0
      },
      visible: false,
      params: {
        pageNum: 1,
        pageSize: 10
      },
      form: this.$form.createForm(this, { name: "users" }),
      btns:[]
    };
  },
  created(){
    this.btns = this.$route.meta.btns
  },
  mounted() {
    this.findUserList(this.params);
  },
  methods: {
    findUserList(params) {
      this.$store.dispatch("UserPageList", params).then(res => {
        this.dataSource = res.data.list;
      });
    },
    handleReset() {
      this.form.resetFields();
      this.findUserList(this.params);
    },
    handleMenuClick(e) {
      if (e.key === "delete") {
        this.remove();
      }
    },
    handleSearchClick() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            ...values,
            pageNum: this.params.pageNum,
            pageSize: this.params.pageSize
          };
          this.findUserList(params);
        }
      });
    },
    onSubmit(user) {
      this.visible = false;
      const params = {
        ...user
      };
      this.$store.dispatch("addUser", params);
      this.$store.dispatch("UserPageList", this.params).then(res => {
        this.dataSource = res.data.list;
      });
    },
    onAdd() {
      this.visible = true;
    },
    onCancel() {
      this.visible = false;
    },
    handleTableChange(page) {
      this.pagination.pageSize = page.pageSize;
      this.params.pageNum = page.current;
      this.params.pageSize = page.pageSize;
      this.findUserList(this.params);
    },
    updState(record) {
      const user = {
        userId: record.id,
        state: record.state == 1 ? 2 : 1
      };

      this.$store.dispatch("updUserState", user);
      this.findUserList(this.params);
    },
    resetPwd(record) {
      const params = {
        id: record.id
      };
      this.$store.dispatch("resetPwd", params);
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
