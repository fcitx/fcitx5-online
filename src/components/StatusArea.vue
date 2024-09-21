<script setup lang="ts">
import { computed, ref } from 'vue'
import { NModal, NSelect, NSpace } from 'naive-ui'
import { GearButton, GlobalConfig, InputMethodConfig, ThemeConfig } from 'fcitx5-config-vue'
import { inputMethod, inputMethods, loading } from '../fcitx'
import MenuButton from './MenuButton.vue'
import GlobalButton from './GlobalButton.vue'
import ThemeButton from './ThemeButton.vue'
import AdvancedButton from './AdvancedButton.vue'

const options = computed(() => {
  return inputMethods.value.map(({ displayName, name }) => ({
    label: displayName,
    value: name,
  }))
})

const showModal = ref(false)
const modalType = ref<'im' | 'global' | 'theme'>('im')

const titleMap = {
  im: 'Input Method Config',
  global: 'Global Config',
  theme: 'Theme Config',
}
</script>

<template>
  <NSpace>
    <NSelect
      v-model:value="inputMethod"
      style="width: 220px"
      :loading="loading"
      :options="options"
    />
    <GearButton @click="modalType = 'im'; showModal = true" />
    <MenuButton />
    <GlobalButton @click="modalType = 'global'; showModal = true" />
    <ThemeButton @click="modalType = 'theme'; showModal = true" />
    <AdvancedButton />
    <NModal
      v-model:show="showModal"
      preset="card"
      :title="titleMap[modalType]"
    >
      <InputMethodConfig
        v-if="modalType === 'im'"
        :input-method="inputMethod"
        :input-methods="inputMethods"
        @close="showModal = false"
      />
      <GlobalConfig
        v-else-if="modalType === 'global'"
        @close="showModal = false"
      />
      <ThemeConfig
        v-else-if="modalType === 'theme'"
        @close="showModal = false"
      />
    </NModal>
  </NSpace>
</template>
