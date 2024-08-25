<script setup lang="ts">
// import { ref, onMounted } from 'vue'
import { NInput, NSpace } from 'naive-ui'
import StatusArea from './StatusArea.vue'

// const input = ref<InstanceType<typeof NInput>>()

// onMounted(() => {
//   input.value.focus()
// })
</script>

<template>
  <NSpace class="my-column" vertical>
    <StatusArea />

    <NInput
      type="textarea"
      clearable
      :rows="15"
    />
  </NSpace>
</template>
