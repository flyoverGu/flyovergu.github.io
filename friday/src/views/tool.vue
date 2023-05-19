<template>
  <div class="container">
    <div class="box">
      base64解密
      <el-input v-model="decode" placeholder="" />
      <el-tag>{{ xdecode }}</el-tag>
    </div>

    <div class="box">
      base64加密
      <el-input v-model="code" placeholder="" />
      <el-tag>{{ xcode }}</el-tag>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}
.box {
  width: 400px;
  padding: 10px;
  margin-left: 20px;
}
</style>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const decode = ref('');
    const xdecode = computed(() => {
      return window.atob(decode.value);
    });
    const code = ref('');
    const xcode = computed(() => {
      return window.btoa(code.value);
    });
    return {
      decode,
      xdecode,
      code,
      xcode
    }
  }
});
</script>
