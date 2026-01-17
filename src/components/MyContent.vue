<script setup lang="ts">
import { ResetButton } from 'fcitx5-config-vue'
import { fcitxReady } from 'fcitx5-js'
import { NButton, NFlex, NInput, NSpace, useMessage, useNotification } from 'naive-ui'
import { h } from 'vue'
import { t } from '../i18n'
import StatusArea from './StatusArea.vue'

const notification = useNotification()
const message = useMessage()
let messagedSystemInputMethodInUse = false

fcitxReady.then(() => {
  window.fcitx.setNotificationCallback((name, icon, body, timeout, tipId, actions) => {
    const instance = notification.create({
      type: icon === 'error' ? 'error' : icon === 'success' ? 'success' : 'info',
      title: name,
      content: body,
      duration: timeout > 0 ? Math.max(timeout, 3000) : undefined,
      meta: () => h('div'),
      action: tipId
        ? () => h(NButton, {
            onClick: () => {
              window.fcitx.activateNotificationAction('dont-show', tipId)
              instance.destroy()
            },
          }, () => window.fcitx.translateDomain('fcitx5', 'Do not show again'))
        : () => h(NFlex, () => actions.map(({ id, text }) => h(NButton, {
            onClick: () => {
              window.fcitx.activateNotificationAction(id)
              instance.destroy()
            },
          }, () => text))),
    })
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
