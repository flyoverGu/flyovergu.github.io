<template>
  <el-row class="hot-list" justify="space-evenly">
    <el-col v-for="ht in panelList" :key="ht.cacheKey" :span="6">
      <hotTopPanel :hotTop="ht"></hotTopPanel>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
// .hot-list {
//   display: flex;
// }

</style>

<script lang="ts">
import { defineComponent } from 'vue'
import hotTopPanel from '@/components/hotTopPanel.vue';
import api from '@/utils/api';

export default defineComponent({
  components: { hotTopPanel },

  data() {
    return {
      panelList: [] as HotTop[]
    }
  },

  async mounted() {
    const res = await api.hotTopList();
    // console.log(res);
    if (res.code) {
      this.panelList = res.data;
    }
  }

})
</script>
