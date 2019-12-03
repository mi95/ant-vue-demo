<template functional>
  <a-sub-menu
    :key="props.menuInfo.path"
  >
    <span slot="title">
      <a-icon :type="props.menuInfo.icon" /><span>{{ props.menuInfo.name }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
      >
        <a-icon :type="item.icon ? item.icon : 'none'" />
        <span>{{ item.name }}</span>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.path"
        :menu-info="item"
      />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ['menuInfo']
};
</script>