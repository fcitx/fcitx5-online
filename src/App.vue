<script setup lang="ts">
import {
  darkTheme,
  NConfigProvider,
  NH1,
  NMessageProvider,
  NModalProvider,
  NNotificationProvider,
  useOsTheme,
} from 'naive-ui'
import { appName } from '../package.json'
import MyContent from './components/MyContent.vue'
import MyFooter from './components/MyFooter.vue'
import MyHeader from './components/MyHeader.vue'
import MyLayout from './components/MyLayout.vue'
import MyPwa from './components/MyPwa.vue'
import { getDirection, getNaiveLocale } from './i18n'

const osThemeRef = useOsTheme()
</script>

<template>
  <NConfigProvider :theme="osThemeRef === 'dark' ? darkTheme : null" :locale="getNaiveLocale()" :dir="getDirection()">
    <MyLayout>
      <template #header>
        <MyHeader />
      </template>
      <template #content>
        <div style="cursor: pointer; text-align: center; margin-top: 16px">
          <NH1>{{ appName }}</NH1>
        </div>
        <NModalProvider>
          <NMessageProvider>
            <!-- Make sure Ctrl+Shift+F only has 1 latest notification. -->
            <NNotificationProvider :max="1">
              <MyPwa />
              <MyContent />
            </NNotificationProvider>
          </NMessageProvider>
        </NModalProvider>
      </template>
      <template #footer>
        <MyFooter />
      </template>
    </MyLayout>
  </NConfigProvider>
</template>
