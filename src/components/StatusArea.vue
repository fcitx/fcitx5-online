<script setup lang="ts">
import { AdvancedConfig, GearButton, GlobalConfig, InputMethodConfig, isMobile, PluginManager, t, ThemeConfig } from 'fcitx5-config-vue'
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
const modalStyle = computed(() => {
  const style: { [key: string]: string } = modalType.value === 'plugin' ? { width: 'auto' } : { 'max-width': '1024px' }
  if (isMobile.value && modalType.value !== 'plugin') {
    style.height = '100vh'
  }
  return style
})

const inputMethodTitle = ref('')
const globalTitle = ref('')
const themeTitle = ref('')
const advancedTitle = ref('')

const titleMap = {
  im: t('Input Method'),
  global: t('Global Config'),
  theme: t('Theme Editor'),
  plugin: t('Plugin Manager'),
  advanced: t('Advanced'),
}

const title = computed(() => {
  if (modalType.value === 'im' && inputMethodTitle.value) {
    return inputMethodTitle.value
  }
  if (modalType.value === 'global' && globalTitle.value) {
    return globalTitle.value
  }
  if (modalType.value === 'theme' && themeTitle.value) {
    return themeTitle.value
  }
  if (modalType.value === 'advanced' && advancedTitle.value) {
    return advancedTitle.value
  }
  return titleMap[modalType.value]
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
      :style="modalStyle"
      preset="card"
      :title="title"
    >
      <InputMethodConfig
        v-if="modalType === 'im'"
        :input-method="inputMethod"
        :input-methods="inputMethods"
        @close="showModal = false"
        @update-title="(title) => inputMethodTitle = title"
      />
      <GlobalConfig
        v-else-if="modalType === 'global'"
        @close="showModal = false"
        @update-title="(title: string) => globalTitle = title"
      />
      <ThemeConfig
        v-else-if="modalType === 'theme'"
        @close="showModal = false"
        @update-title="(title: string) => themeTitle = title"
      />
      <PluginManager
        v-else-if="modalType === 'plugin'"
        :disabled="loading"
        @close="showModal = false"
      />
      <AdvancedConfig
        v-else
        @close="showModal = false"
        @update-title="(title) => advancedTitle = title"
      />
    </NModal>
  </NSpace>
</template>

<style>
.n-modal .n-card__content {
  /* Make mobile modal unscrollable by calculating exact content height. */
  height: calc(100% - var(--n-padding-top) - var(--n-padding-bottom) - var(--n-line-height) * var(--n-title-font-size));
}

.n-modal .n-card-header {
  /* Don't enlarge height for long title that wraps, so that the calculation above still holds. */
  overflow: hidden;
}
</style>
