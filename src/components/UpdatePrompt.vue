<script setup lang="ts">
import { NButton, NFlex } from 'naive-ui'
import { t } from '../i18n'

defineEmits<{
  update: []
  close: []
}>()
</script>

<template>
  <NFlex vertical>
    {{ t('You may also need to download latest version of plugins.') }}
    <NFlex justify="end">
      <NButton secondary type="success" @click="$emit('update')">
        {{ t('Update now') }}
      </NButton>
      <NButton secondary @click="$emit('close')">
        {{ t('Maybe later') }}
      </NButton>
    </NFlex>
  </NFlex>
</template>
