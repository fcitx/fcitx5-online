<script setup lang="ts">
import {
  NConfigProvider,
  NH1,
  NModalProvider,
  darkTheme,
  useOsTheme,
} from 'naive-ui'
import { appName } from '../package.json'
import MyLayout from './components/MyLayout.vue'
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
import MyContent from './components/MyContent.vue'

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
          <MyContent />
        </NModalProvider>
      </template>
      <template #footer>
        <MyFooter />
      </template>
    </MyLayout>
  </NConfigProvider>
</template>
