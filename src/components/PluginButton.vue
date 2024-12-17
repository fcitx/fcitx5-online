<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import PlugIcon from './PlugIcon.vue'
</script>

<template>
  <NButton
    secondary
  >
    <template #icon>
      <NIcon>
        <PlugIcon />
      </NIcon>
    </template>
  </NButton>
</template>
