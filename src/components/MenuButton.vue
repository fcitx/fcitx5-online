<script setup lang="ts">
import type { MenuAction } from 'fcitx5-js'
import type { DropdownOption } from 'naive-ui'
import { NButton, NDropdown, NIcon } from 'naive-ui'
import { computed, h } from 'vue'
import { refocus, statusArea } from '../fcitx'
import CheckIcon from './CheckIcon.vue'
import HamburgerIcon from './HamburgerIcon.vue'

function actionToOption(action: MenuAction, inputContext: string, generation: number) {
  if (action.separator) {
    return { type: 'divider' }
  }
  const option: DropdownOption = {
    label: action.desc,
    key: JSON.stringify([action.id, inputContext, generation]),
  }
  if (action.checked) {
    option.icon = () => h(NIcon, null, {
      default: () => h(CheckIcon),
    })
  }
  if (action.children) {
    option.children = action.children.map(action => actionToOption(action, inputContext, generation))
  }
  return option
}

const options = computed(() => {
  const value = statusArea.value
  return value?.actions.map(action => actionToOption(action, value.inputContext, value.generation)) ?? []
})

function handleSelect(key: string) {
  const [id, inputContext, generation] = JSON.parse(key) as [number, string, number]
  refocus()
  window.fcitx.activateMenuAction(id, inputContext, generation)
}
</script>

<template>
  <NDropdown
    trigger="hover"
    :options="options"
    @select="handleSelect"
  >
    <NButton
      secondary
      :disabled="options.length === 0"
    >
      <template #icon>
        <NIcon>
          <HamburgerIcon />
        </NIcon>
      </template>
    </NButton>
  </NDropdown>
</template>
