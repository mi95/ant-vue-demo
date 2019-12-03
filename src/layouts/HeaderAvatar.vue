<template>
  <a-dropdown
    style="display: inline-block; height: 100%; vertical-align: initial;float:right; margin-right:30px"
  >
    <span style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" icon='user' />
      <span>{{this.name}}</span>
    </span>
    <a-menu slot="overlay">
      <a-menu-item @click="onClick">
        <span>修改密码</span>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/">
          <span>退出登录</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      name: "xiami"
    };
  },
  methods: {
    onClick(e) {
      console.log("e", e);
    }
  }
};
</script>