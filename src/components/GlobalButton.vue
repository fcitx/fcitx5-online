<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import GlobalIcon from './GlobalIcon.vue'
</script>

<template>
  <NButton
    secondary
  >
    <template #icon>
      <NIcon>
        <GlobalIcon />
      </NIcon>
    </template>
  </NButton>
</template>
