<template>
  <a-menu theme="dark" mode="inline" @click="onClick" class="contextmenu">
    <template v-for="item in list">
      <a-menu-item v-if="!item.children" :key="item.path">
        <a-icon :type="item.icon ? item.icon : 'none'" />
        <span>{{item.name}}</span>
      </a-menu-item>
      <SubMenu v-else :menu-info="item" :key="item.path" />
    </template>
  </a-menu>
</template>
<script>
import SubMenu from "./SubMenu";
export default {
  name: "SiderMenu",
  components: { SubMenu },
  data() {
    return {
      list: [],
      pageList: [],
      linkList: []
    };
  },
  created() {
    this.list = this.$store.state.user.menus
  },
  
  watch: {
    $route: function(newRoute) {
      this.activePage = newRoute.fullPath;
      if (!this.multipage) {
        this.linkList = [newRoute.fullPath];
        this.pageList = [newRoute];
      } else if (this.linkList.indexOf(newRoute.fullPath) < 0) {
        this.linkList.push(newRoute.fullPath);
        this.pageList.push(newRoute);
      }
    },
    activePage: function(key) {
      this.$router.push(key);
    },
    multipage: function(newVal) {
      if (!newVal) {
        this.linkList = [this.$route.fullPath];
        this.pageList = [this.$route];
      }
    }
  },
  methods: {
    onClick(e) {
      this.$router.push({ path: e.key });
    //   this.$emit('onMenuClick',e)
    }
  }
};
</script>
<style scoped>

</style>