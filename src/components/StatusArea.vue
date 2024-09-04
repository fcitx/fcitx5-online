<script setup lang="ts">
import { computed, ref } from 'vue'
import { NButton, NIcon, NModal, NSelect, NSpace } from 'naive-ui'
import { InputMethodConfig } from 'fcitx5-config-vue'
import { inputMethod, inputMethods, loading } from '../fcitx'
import GearIcon from './GearIcon.vue'

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
    <NButton secondary @click="showModal = true">
      <template #icon>
        <NIcon>
          <GearIcon />
        </NIcon>
      </template>
    </NButton>
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
