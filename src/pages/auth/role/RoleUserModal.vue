<template>
  <div class="role-user-modal">
    <a-modal
      title="Title"
      :visible="userVisible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="30%"
    >
      <a-row>
        <span style="float:right;margin-bottom:10px">
          <a-input-search placeholder="请输入用户名" style="width: 200px" @search="onUserModalSearch" />
        </span>
      </a-row>
      <a-row>
        <a-table
          :columns="userModalColumns"
          :dataSource="userModalData"
          :pagination="userModalPagination"
          @change="handleUserModalChange"
          :rowKey="record => record.id"
          :rowSelection="{selectedRowKeys: userModalSelectedRowKeys, onChange: onUserModalSelectChange}"
        ></a-table>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
const userModalColumns = [
  {
    title: "序号",
    customRender: (text, row, index) => {
      return index + 1;
    }
  },
  {
    title: "编号",
    dataIndex: "id"
  },
  {
    title: "用户名",
    dataIndex: "account"
  }
];
const userModalPagination = {
  pageNum: 1,
  pageSize: 10,
  showTotal: total => `共 ${total} 条数据`,
  showSizeChanger: true,
  showQuickJumper: false,
  pageSizeOptions: ["10", "20", "50", "100", "200"],
  total: 0
};

export default {
  name: "roleUserModal",
  props: ["userVisible", "roleId"],
  data() {
    return {
      confirmLoading: false,
      userModalColumns,
      userModalPagination,
      userModalSelectedRowKeys: [],
      userModalData: [],
      userModalparams: {
        pageNum: 1,
        pageSize: 10,
        roleId: ""
      }
    };
  },
  methods: {
    handleOk(e) {
      this.$emit("userSubmit", this.userModalSelectedRowKeys);
      this.userModalSelectedRowKeys = [];
    },
    handleCancel(e) {
      this.$emit("userCancel");
    },
    handleUserModalChange() {
      this.userModalPagination.pageSize = page.pageSize;
      this.userModalparams.pageNum = page.current;
      this.userModalparams.pageSize = page.pageSize;
      this.findUserList(this.userModalparams);
    },
    onUserModalSearch() {},
    onUserModalSelectChange(userModalSelectedRowKeys) {
      this.userModalSelectedRowKeys = userModalSelectedRowKeys;
    },
    findUserList(params) {
      this.userModalparams.roleId = params;
      this.$store
        .dispatch("findUserPageListByRoleIdForNotExist", this.userModalparams)
        .then(res => {
          if (res) {
            this.userModalData = res.data.list;
          }
        });
    }
  }
};
</script>
