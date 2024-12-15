<script setup lang="ts">
import type { MenuAction } from 'fcitx5-js'
import type { DropdownOption } from 'naive-ui'
import { NButton, NDropdown, NIcon } from 'naive-ui'
import { computed, h } from 'vue'
import { menuActions, refocus } from '../fcitx'
import CheckIcon from './CheckIcon.vue'
import HamburgerIcon from './HamburgerIcon.vue'

function actionToOption(action: MenuAction) {
  if (action.separator) {
    return { type: 'divider' }
  }
  const option: DropdownOption = {
    label: action.desc,
    key: action.id,
  }
  if (action.checked) {
    option.icon = () => h(NIcon, null, {
      default: () => h(CheckIcon),
    })
  }
  if (action.children) {
    option.children = action.children.map(actionToOption)
  }
  return option
}

const options = computed(() => menuActions.value.map(actionToOption))

function handleSelect(key: number) {
  window.fcitx.activateMenuAction(key)
  refocus()
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
