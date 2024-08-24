<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader } from 'naive-ui'
</script>

<template>
  <NLayoutHeader
    bordered
    style="height: 56px; display: flex; align-items: center; justify-content: space-between"
  >
    <slot name="header" />
  </NLayoutHeader>
  <NLayout
    position="absolute"
    :native-scrollbar="false"
    style="top: 56px"
    content-style="height: 100%; display: flex; flex-direction: column"
  >
    <NLayoutContent style="flex: 1 0 auto">
      <slot name="content" />
    </NLayoutContent>
    <NLayoutFooter
      style="flex-shrink: 0; margin-top: 16px"
    >
      <slot name="footer" />
    </NLayoutFooter>
  </NLayout>
</template>
