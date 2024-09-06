<script setup lang="ts">
import { computed, ref } from 'vue'
import { NModal, NSelect, NSpace } from 'naive-ui'
import { GearButton, InputMethodConfig } from 'fcitx5-config-vue'
import { inputMethod, inputMethods, loading } from '../fcitx'

const options = computed(() => {
  return inputMethods.value.map(({ displayName, name }) => ({
    label: displayName,
    value: name,
  }))
})

const showModal = ref(false)
</script>

<template>
  <NSpace>
    <NSelect
      v-model:value="inputMethod"
      style="width: 220px"
      :loading="loading"
      :options="options"
    />
    <GearButton @click="showModal = true" />
    <NModal
      v-model:show="showModal"
      preset="card"
      title="Input Method Config"
    >
      <InputMethodConfig
        :input-method="inputMethod"
        :input-methods="inputMethods"
        @close="showModal = false"
      />
    </NModal>
  </NSpace>
</template>
