<script setup lang="ts">
import { useNotification } from 'naive-ui'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { h, watch } from 'vue'
import { t } from '../i18n'
import UpdatePrompt from './UpdatePrompt.vue'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
const notification = useNotification()

// Don't use watchEffect as notification is also reactive.
watch(offlineReady, (value) => {
  if (value) {
    notification.success({
      content: t('Site is ready to work offline.'),
      duration: 5000,
    })
  }
})

watch(needRefresh, (value) => {
  if (value) {
    const instance = notification.info({
      title: t('Update available'),
      content: () => h(UpdatePrompt, {
        onUpdate: updateServiceWorker,
        onClose: () => instance.destroy(),
      }),
      closable: false,
    })
  }
})
</script>
