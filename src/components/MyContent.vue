<script setup lang="ts">
import { NInput, NSpace } from 'naive-ui'
</script>

<template>
  <NSpace class="my-column" vertical>
    <NInput
      type="textarea"
      clearable
      :rows="15"
    />
  </NSpace>
</template>
