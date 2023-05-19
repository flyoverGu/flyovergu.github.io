<template>
  <div class="hot-panel box">
    <div class="header">
      <img class="logo" :src="require('@/assets' + hotTop?.logoImg)">
      <span class="title">{{ hotTop?.title }}</span>
    </div>
    <div class="body">
      <a class="hot-item" v-for="item in hotTop?.hotList" :key="item.rankNo" :href="item.url" target="_blank" >
        <div class="rank">{{ item.rankNo }}</div>
        <div class="content">{{ item.title }}</div>
        <!-- <div>{{ item.hot }}</div> -->
      </a>
    </div>
    <div class="footer">
      {{ hotTop?.time }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hot-panel {
  width: 400px;
  height: 550px;
}

.header {
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6ebf5;
  padding: 0 15px;

  .logo {
    height: 20px;
    margin-right: 5px;
  }

  .title {
    font-size: 18px;
    font-weight: 700;
  }
}

.body {
  padding: 10px;
  height: 460px;
  overflow: auto;
  border-bottom: 1px solid #e6ebf5;
}

.hot-item {
  display: flex;
  margin-bottom: 10px;

  &:hover {
    color: #00a4ec;
  }

  .rank {
    width: 20px;
  }

  &:nth-child(-n+3) > .rank {
    color: red;
  }

  .content {
    flex: 1;
    padding-left: 10px;
    font-size: 15px;
  }

}

.footer {
  height: 28px;
  color: #909090;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    hotTop: {
      type: Object as () => HotTop
    }
  },
  mounted() {
    // console.log(this.hotTop);
  }
})
</script>
