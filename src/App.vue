<script setup lang="ts">
import {
  darkTheme,
  NConfigProvider,
  NH1,
  NMessageProvider,
  NModalProvider,
  useOsTheme,
} from 'naive-ui'
import { appName } from '../package.json'
import MyContent from './components/MyContent.vue'
import MyFooter from './components/MyFooter.vue'
import MyHeader from './components/MyHeader.vue'
import MyLayout from './components/MyLayout.vue'

const osThemeRef = useOsTheme()
</script>

<template>
  <NConfigProvider :theme="osThemeRef === 'dark' ? darkTheme : null">
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
            <MyContent />
          </NMessageProvider>
        </NModalProvider>
      </template>
      <template #footer>
        <MyFooter />
      </template>
    </MyLayout>
  </NConfigProvider>
</template>
