<script setup lang="ts">
import { ResetButton } from 'fcitx5-config-vue'
import { fcitxReady } from 'fcitx5-js'
import { NInput, NSpace, useMessage, useNotification } from 'naive-ui'
import { t } from '../i18n'
import StatusArea from './StatusArea.vue'

const notification = useNotification()
const message = useMessage()
let messagedSystemInputMethodInUse = false

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

  window.fcitx.setSystemInputMethodInUseCallback(() => {
    if (!messagedSystemInputMethodInUse) {
      message.warning(t('Please disable system input method'))
      messagedSystemInputMethodInUse = true
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
      @blur="messagedSystemInputMethodInUse = false"
    />

    <ResetButton />
  </NSpace>
</template>
