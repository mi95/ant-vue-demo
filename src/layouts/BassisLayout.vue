<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo">
        <router-link to="/home">
          <!-- <span style="size:20px">antd-vue-demo</span> -->
        </router-link>
      </div>
      <SiderMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <!-- <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        /> -->
        <HeaderAvatar/>
      </a-layout-header>
      <a-layout-content :style="{minHeight: minHeight, margin: '24px 24px 0'}">
        <slot></slot>
      </a-layout-content>
      <a-layout-footer style="padding: 0px">
        <global-footer :link-list="linkList" :copyright="copyright" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import SiderMenu from "./SiderMenu";
import HeaderAvatar from "./HeaderAvatar"
import GlobalFooter from './GlobalFooter';
const minHeight = window.innerHeight - 64 - 24 - 122;
export default {
  name: "bassisLayout",
  components: { SiderMenu,HeaderAvatar,GlobalFooter},
  data() {
    return {
      collapsed: false,
      minHeight: minHeight + "px",
      panes: []
    };
  },
  computed:{
    linkList () {
      return []
    },
    copyright () {
      return '....'
    }
  },
  methods: {
    onMenuClick(menu) {
      this.panes.push(menu);
    }
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
