<template>
  <div class="container">
    <div style="padding-bottom: 20px;">
      <el-radio v-model="type" label="baidu">baidu接口</el-radio>
      <el-radio v-model="type" label="paddle">paddle接口</el-radio>
    </div>
    <el-input class="input" v-model="content" rows="30" type="textarea" placeholder="直接在本页面复制图片即可识别文字"/>
  </div>
</template>

<style lang="scss" scoped>
.input {
  width: 700px;
}

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '@/utils/api';

export default defineComponent({
  data() {
    return {
      content: '',
      type: 'baidu'
    }
  },
  mounted() {
    document.addEventListener('paste', this.uploadPic)
  },
  unmounted() {
    document.removeEventListener('paste', this.uploadPic)
  },
  methods: {
    async uploadPic(event: ClipboardEvent) {
      const items = event.clipboardData?.items;
      let file = null
      if (items && items.length) {
        // 检索剪切板items
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile()
            break
          }
        }
      }
      if (!file) return;
      const formData = new FormData();
      formData.append('image', file);
      if (this.type === 'baidu') {
        const res = await api.uploadPicForOcr(formData);
        if (res.code) {
          this.content = res.data.words_result.map(i => i.words).join('\n');
        }
      } else {
        const res = await api.uploadPicForOcrPaddle(formData);
        if (res.code) {
          this.content = res.data.results[0].map(i => i.text).join('\n');
        }
      }
    }
  }
});
</script>
