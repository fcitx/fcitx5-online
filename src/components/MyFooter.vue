<script setup lang="ts">
import { NA } from 'naive-ui'
import { homepage } from '../../package.json'

const commit = '__COMMIT__'
const commitURL = `${homepage}/commit/${commit}`
const buildDate = '__BUILD_DATE__'
const copyright = '2024-2025 Qijia Liu'
</script>

<template>
  <div class="my-footer">
    <p>
      Commit <NA
        :href="commitURL"
        target="_blank"
      >
        {{ commit.slice(0, 7) }}
      </NA> · Built at {{ buildDate }}
    </p>
    <p>&copy; {{ copyright }}</p>
    <p>
      This project is <NA
        href="https://www.gnu.org/philosophy/free-sw"
        target="_blank"
      >
        Free
      </NA> and
      <NA
        href="https://opensource.org/osd"
        target="_blank"
      >
        Open Source
      </NA>
      (<NA
        href="https://www.gnu.org/licenses/agpl-3.0.html"
        target="_blank"
      >
        AGPLv3
      </NA>+)
    </p>
  </div>
</template>
