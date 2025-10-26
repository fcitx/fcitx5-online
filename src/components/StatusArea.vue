<script setup lang="ts">
import { AdvancedConfig, GearButton, GlobalConfig, InputMethodConfig, PluginManager, t, ThemeConfig } from 'fcitx5-config-vue'
import { NModal, NSelect, NSpace, NTooltip } from 'naive-ui'
import { computed, ref } from 'vue'
import { inputMethod, inputMethods, loading } from '../fcitx'
import AdvancedButton from './AdvancedButton.vue'
import GlobalButton from './GlobalButton.vue'
import MenuButton from './MenuButton.vue'
import PluginButton from './PluginButton.vue'
import ThemeButton from './ThemeButton.vue'

const options = computed(() => {
  return inputMethods.value.map(({ displayName, name }) => ({
    label: displayName,
    value: name,
  }))
})

const showModal = ref(false)
const modalType = ref<'im' | 'global' | 'theme' | 'plugin' | 'advanced'>('im')

const titleMap = {
  im: t('Input Method'),
  global: t('Global Config'),
  theme: t('Theme Editor'),
  plugin: t('Plugin Manager'),
  advanced: t('Advanced'),
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
        <GearButton :disabled="loading" @click="modalType = 'im'; showModal = true" />
      </template>
      {{ titleMap.im }}
    </NTooltip>
    <MenuButton />
    <NTooltip>
      <template #trigger>
        <GlobalButton :disabled="loading" @click="modalType = 'global'; showModal = true" />
      </template>
      {{ titleMap.global }}
    </NTooltip>
    <NTooltip>
      <template #trigger>
        <ThemeButton :disabled="loading" @click="modalType = 'theme'; showModal = true" />
      </template>
      {{ titleMap.theme }}
    </NTooltip>
    <NTooltip>
      <template #trigger>
        <PluginButton @click="modalType = 'plugin'; showModal = true" />
      </template>
      {{ titleMap.plugin }}
    </NTooltip>
    <NTooltip>
      <template #trigger>
        <AdvancedButton :disabled="loading" @click="modalType = 'advanced'; showModal = true" />
      </template>
      {{ titleMap.advanced }}
    </NTooltip>
    <NModal
      v-model:show="showModal"
      :style="modalType === 'plugin' ? 'width: auto' : 'max-width: 1024px'"
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
      <PluginManager
        v-else-if="modalType === 'plugin'"
        :disabled="loading"
        @close="showModal = false"
      />
      <AdvancedConfig
        v-else
        @close="showModal = false"
      />
    </NModal>
  </NSpace>
</template>
