<script setup lang="ts">
import { computed } from 'vue'
import { NSelect, NSpace } from 'naive-ui'
import { inputMethod, inputMethods, loading } from '../fcitx'

const options = computed(() => {
  return inputMethods.value.map(({ displayName, name }) => ({
    label: displayName,
    value: name,
  }))
})
</script>

<template>
  <NSpace>
    <NSelect
      v-model:value="inputMethod"
      style="width: 220px"
      :loading="loading"
      :options="options"
    />
  </NSpace>
</template>
