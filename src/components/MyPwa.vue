<script setup lang="ts">
import { useNotification } from 'naive-ui'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { h, watchEffect } from 'vue'
import { t } from '../i18n'
import UpdatePrompt from './UpdatePrompt.vue'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
const notification = useNotification()

watchEffect(() => {
  if (offlineReady.value) {
    notification.success({
      content: t('Site is ready to work offline.'),
      duration: 5000,
    })
  }
})

watchEffect(() => {
  if (needRefresh.value) {
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
