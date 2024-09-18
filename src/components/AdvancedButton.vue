<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import PuzzleIcon from './PuzzleIcon.vue'
</script>

<template>
  <NButton
    secondary
  >
    <template #icon>
      <NIcon>
        <PuzzleIcon />
      </NIcon>
    </template>
  </NButton>
</template>
