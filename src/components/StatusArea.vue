<script setup lang="ts">
import { AdvancedConfig, GearButton, GlobalConfig, InputMethodConfig, ThemeConfig } from 'fcitx5-config-vue'
import { NModal, NSelect, NSpace, NTooltip } from 'naive-ui'
import { computed, ref } from 'vue'
import { inputMethod, inputMethods, loading } from '../fcitx'
import AdvancedButton from './AdvancedButton.vue'
import GlobalButton from './GlobalButton.vue'
import MenuButton from './MenuButton.vue'
import ThemeButton from './ThemeButton.vue'

const options = computed(() => {
  return inputMethods.value.map(({ displayName, name }) => ({
    label: displayName,
    value: name,
  }))
})

const showModal = ref(false)
const modalType = ref<'im' | 'global' | 'theme' | 'advanced'>('im')

const titleMap = {
  im: 'Input Method',
  global: 'Global Config',
  theme: 'Theme Editor',
  advanced: 'Advanced',
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
    <NTooltip>
      <template #trigger>
        <GearButton @click="modalType = 'im'; showModal = true" />
      </template>
      {{ titleMap.im }}
    </NTooltip>
    <MenuButton />
    <NTooltip>
      <template #trigger>
        <GlobalButton @click="modalType = 'global'; showModal = true" />
      </template>
      {{ titleMap.global }}
    </NTooltip>
    <NTooltip>
      <template #trigger>
        <ThemeButton @click="modalType = 'theme'; showModal = true" />
      </template>
      {{ titleMap.theme }}
    </NTooltip>
    <NTooltip>
      <template #trigger>
        <AdvancedButton @click="modalType = 'advanced'; showModal = true" />
      </template>
      {{ titleMap.advanced }}
    </NTooltip>
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
      <AdvancedConfig
        v-else
        @close="showModal = false"
      />
    </NModal>
  </NSpace>
</template>
