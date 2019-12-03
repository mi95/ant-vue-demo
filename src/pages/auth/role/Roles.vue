<template>
  <a-card>
    <a-card style="width:40%;float:left;margin-left:50px">
      <a-row>
        <a-button type="primary" @click="onAdd" v-has="{btns:this.btns,id:'add'}">新增</a-button>
        <a-button
          type="primary"
          @click="onAddUser"
          v-if="this.roleSelectedRowKeys.length == 1"
          v-has="{btns:this.btns,id:'addUser'}"
        >添加用户</a-button>
        <span style="float:right;margin-bottom:10px">
          <a-input-search placeholder="请输入角色名" style="width: 200px" @search="onRoleSearch" />
        </span>
      </a-row>
      <a-row>
        <a-table
          :columns="roleColumns"
          :dataSource="roleData"
          :pagination="rolePagination"
          @change="handleRoleChange"
          :rowKey="record => record.id"
          :rowSelection="{selectedRowKeys: roleSelectedRowKeys, onChange: onRoleSelectChange}"
        >
          <template slot="oper" slot-scope="text">
            <a @click="edit(text)" v-has="{btns:btns,id:'edit'}">编辑</a>
            <!-- <a-button @click="updState(text)" v-has="{btns:btns,id:'del'}">禁用</a-button> -->
            <a-popconfirm title="确定禁用该角色吗?" okText="Yes" cancelText="No" @confirm="updState(text)" v-has="{btns:btns,id:'del'}">
            <a>禁用</a>
          </a-popconfirm>
          </template>
        </a-table>
      </a-row>
    </a-card>
    <a-card style="width:40%;float:right;margin-right:50px">
      <a-tabs defaultActiveKey="user" @change="callback">
        <a-tab-pane tab="用户" key="user">
          <a-row>
            <span style="float:right;margin-bottom:10px">
              <a-input-search placeholder="请输入用户名" style="width: 200px" @search="onUserSearch" />
            </span>
          </a-row>
          <a-row>
            <a-button
              type="primary"
              @click="delRoleUser"
              v-if="this.userSelectedRowKeys.length > 0"
              v-has="{btns:this.btns,id:'delUser'}"
            >删除</a-button>
            <a-table
              :columns="userColumns"
              :dataSource="userData"
              :pagination="userPagination"
              @change="handleUserChange"
              :rowKey="record => record.id"
              :rowSelection="{selectedRowKeys: userSelectedRowKeys, onChange: onUserSelectChange}"
            ></a-table>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="权限" key="auth">
          <a-tree
            checkable
            :checkedKeys="treeSelectedKeys"
            :treeData="treeData"
            @check="onTreeCheck"
          />
          <a-button
            type="primary"
            style="float:right"
            @click="onAddAuth()"
            v-has="{btns:this.btns,id:'addAuth'}"
          >提交</a-button>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <role-modal :visible="visible" @cancel="onModalCancel" @submit="onModalSubmit" :role="role" />
    <role-user-modal
      :userVisible="userVisible"
      ref="loadUserData"
      @userCancel="onUserCancel"
      @userSubmit="onUserSubmit"
    />
  </a-card>
</template>
<script>
import roleModal from "./RoleModal";
import roleUserModal from "./RoleUserModal";
import {has} from "../../../utils/btnPermissions";

const rolePagination = {
  pageNum: 1,
  pageSize: 10,
  showTotal: total => `共 ${total} 条数据`,
  showSizeChanger: true,
  showQuickJumper: false,
  pageSizeOptions: ["10", "20", "50", "100", "200"],
  total: 0
};

const userPagination = {
  pageNum: 1,
  pageSize: 10,
  showTotal: total => `共 ${total} 条数据`,
  showSizeChanger: true,
  showQuickJumper: false,
  pageSizeOptions: ["10", "20", "50", "100", "200"],
  total: 0
};

const roleColumns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    }
  },
  {
    title: "名称",
    dataIndex: "name"
  },
  {
    title: "说明",
    dataIndex: "comment"
  },
  {
    title: "操作",
    scopedSlots: { customRender: "oper" }
  }
];

const userColumns = [
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

export default {
  name: "roles",
  components: { roleModal, roleUserModal },
  data() {
    return {
      treeData: [],
      userColumns,
      roleColumns,
      params: {
        pageNum: 1,
        pageSize: 10
      },
      rolePagination,
      userPagination,
      roleData: [],
      userData: [],
      userSearchValue: "",
      userSelectedRowKeys: [],
      roleSearchValue: "",
      roleSelectedRowKeys: [],
      visible: false,
      userVisible: false,
      tabSelectedKey: "user",
      treeSelectedKeys: [],
      selectData: [],
      role: {},
      btns: []
    };
  },
  created() {
    this.btns = this.$route.meta.btns;
  },
  mounted() {
    this.findRoleList();
  },
  methods: {
    callback(key) {
      this.selectData = [];
      this.tabSelectedKey = key;
      if (this.roleSelectedRowKeys.length > 0) {
        if (key == "user") {
          this.findUserList();
        } else {
          this.findAuthList();
        }
      }
    },
    onAdd() {
      this.visible = true;
    },
    edit(text) {
      this.role = text;
      this.visible = true;
    },
    updState(text) {
      const params = {};
      params.beforeState = text.state;
      params.id = text.id;
      this.$store.dispatch("updRoleState", params);
      this.findRoleList();
    },
    onAddUser() {
      this.userVisible = true;
      this.$refs.loadUserData.findUserList(this.roleSelectedRowKeys[0]);
    },
    onModalCancel() {
      this.visible = false;
      this.role = {};
    },
    onModalSubmit(role) {
      if (role && (!role.id || role.id == null)) {
        this.$store.dispatch("addRole", role);
        this.findRoleList();
        this.visible = false;
      } else if (role && role.id && role.id != null) {
        this.$store.dispatch("editRole", role);
        this.findRoleList();
        this.visible = false;
      }
      this.role = {};
    },
    onUserCancel() {
      this.userVisible = false;
    },
    onUserSubmit(users) {
      this.userVisible = false;
      var userIds = "";
      const params = {};
      users.map(item => {
        if (userIds) {
          userIds = userIds + "," + item;
        } else {
          userIds = item;
        }
      });
      params.roleId = this.roleSelectedRowKeys[0];
      params.userIds = userIds;
      this.addRoleUser(params);
      this.findUserList(this.roleSelectedRowKeys[0]);
    },
    handleData(data) {
      const firstObjs = [];
      for (var item in data) {
        if (item.fatherId == "0") {
          const obj = {};
          obj.id = item.id;
          obj.title = item.name;
          firstObjs.pust(obj);
        } else if (item.fatherId == "1") {
        }
      }
    },
    handleRoleChange() {},
    handleUserChange() {},
    onRoleSearch(value) {
      this.findRoleList(value);
    },
    onUserSearch(value) {
      if (value) {
        retrun;
      }
    },
    //多选框
    onTreeCheck(treeNode, e) {
      const checkedKeysResult = [...treeNode, ...e.halfCheckedKeys];
      this.selectData = checkedKeysResult;
      this.treeSelectedKeys = treeNode;
    },
    treeChecked(treeNode) {
      treeNode.parent;
    },
    onUserSelectChange(userSelectedRowKeys) {
      this.userSelectedRowKeys = userSelectedRowKeys;
    },
    onRoleSelectChange(roleSelectedRowKeys) {
      if (roleSelectedRowKeys.length > 0) {
        const rowKey = [];
        rowKey.push(roleSelectedRowKeys[roleSelectedRowKeys.length - 1]);
        this.roleSelectedRowKeys = rowKey;
        if (this.tabSelectedKey == "user") {
          this.findUserList();
        } else {
          this.findAuthList();
        }
      } else {
        this.treeSelectedKeys = [];
        this.roleSelectedRowKeys = [];
        this.userData = [];
        this.treeData = [];
      }
    },
    delRoleUser() {
      const params = {};
      var userIds;
      this.userSelectedRowKeys.map(item => {
        if (userIds) {
          userIds = userIds + "," + item;
        } else {
          userIds = item;
        }
      });
      params.roleId = this.roleSelectedRowKeys[0];
      params.userIds = userIds;
      this.$store.dispatch("delRoleUser", params);
      this.findUserList(this.roleSelectedRowKeys[0]);
      this.userSelectedRowKeys = [];
    },
    findRoleList(key) {
      const params = {
        type: 1,
        pageNum: this.rolePagination.pageNum,
        pageSize: this.rolePagination.pageSize,
        key: key
      };
      this.$store.dispatch("findRolePageList", params).then(res => {
        this.roleData = res.data.list;
      });
    },
    findUserList() {
      const params = {
        pageNum: this.userPagination.pageNum,
        pageSize: this.userPagination.pageSize,
        roleId: this.roleSelectedRowKeys[0]
      };

      this.$store.dispatch("findUserPageListByRoleId", params).then(res => {
        if (res) {
          this.userData = res.data.list;
        }
      });
    },
    findAuthList() {
      const params = {
        type: 1,
        roleId: this.roleSelectedRowKeys[0]
      };
      this.treeSelectedKeys = [];
      this.$store.dispatch("findAuthListByRoleId", params).then(res => {
        if (res && res.menus.length > 0) {
          this.treeData = res.menus;
          if (res.checked && res.checked.length > 0) {
            for (var item in res.checked) {
              if (res.checked[item] > 0) {
                this.treeSelectedKeys.push(parseInt(res.checked[item]));
              }
            }
          }
        }
      });
    },
    addRoleUser(params) {
      this.$store.dispatch("addRoleUser", params);
    },
    onAddAuth() {
      if (this.selectData.length < 1) {
        this.$notification.info({
          message: "未做修改",
          duration: 4
        });
        return;
      }
      var keys;
      for (var item in this.selectData) {
        var key = this.selectData[item];
        if (keys) {
          keys = keys + "," + key;
        } else {
          keys = key;
        }
      }
      const params = {};
      params.roleId = this.roleSelectedRowKeys[0];
      params.authIds = keys;

      this.$store.dispatch("addRoleAuth", params);
      this.$notification.success({
        message: "操作成功",
        duration: 4
      });
    },
    test(){
      console.log(111);
      return false
    }
  }
};
</script>
