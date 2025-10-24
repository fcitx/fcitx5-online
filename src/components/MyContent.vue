<script setup lang="ts">
import { ResetButton } from 'fcitx5-config-vue'
import { fcitxReady } from 'fcitx5-js'
import { NInput, NSpace, useNotification } from 'naive-ui'
import StatusArea from './StatusArea.vue'

const notification = useNotification()

fcitxReady.then(() => {
  window.fcitx.setNotificationCallback((name, icon, body, timeout) => {
    const options = { title: name, content: body, duration: timeout }
    switch (icon) {
      case 'error':
        notification.error(options)
        break
      case 'success':
        notification.success(options)
        break
      default:
        notification.info(options)
    }
  })
})
</script>

<template>
  <NSpace class="my-column" vertical>
    <StatusArea />

    <NInput
      type="textarea"
      clearable
      :rows="15"
    />

    <ResetButton />
  </NSpace>
</template>
