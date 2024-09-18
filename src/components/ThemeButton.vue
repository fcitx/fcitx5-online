<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import PaletteIcon from './PaletteIcon.vue'
</script>

<template>
  <NButton
    secondary
  >
    <template #icon>
      <NIcon>
        <PaletteIcon />
      </NIcon>
    </template>
  </NButton>
</template>
