<script setup lang="ts">
import { NIcon, NText } from 'naive-ui'
import GitHub from './GitHub.vue'

function toFC() {
  window.open('https://fcitx-contrib.github.io', '_blank')
}

function toRepo() {
  window.open('https://github.com/fcitx-contrib/fcitx5-online', '_blank')
}
</script>

<template>
  <div
    style="padding-left: 24px; display: flex; align-items: center; cursor: pointer"
    @click="toFC"
  >
    <!-- eslint-disable -->
    <img
      :src="'./favicon.svg'"
      style="width: 48px; height: 48px"
    >
    <!-- eslint-enable -->
    <NText style="font-size: 18px; margin-left: 12px">
      Fcitx Contrib
    </NText>
  </div>
  <NIcon
    :size="28"
    style="padding-right: 16px; cursor: pointer"
    @click="toRepo"
  >
    <GitHub />
  </NIcon>
</template>
