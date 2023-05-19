<template>
  <div class="common-layout">
    <el-container>
      <el-header class="nav-header">
        <div v-for="item in navList" :key="item.path" :class="'nav-item ' + (activePath == item.path ? 'active' : '')">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.nav-header {
  // position: fixed;
  width: 100%;
  top: 0;
  padding: 0 32px;
  display: flex;
  align-items: center;
  /* 垂直居中 */
  background-color: #fff;

  .nav-item {
    margin-left: 20px;

    &:hover {
      color: #00a4ec;
    }

    &.active {
      color: #00a4ec;
      border-bottom: solid 2px #00a4ec;
    }
  }

}
</style>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    activePath() {
      return this.$route.path;
    },
    navList() {
      return this.$router.getRoutes();
    }
  }
});

</script>
