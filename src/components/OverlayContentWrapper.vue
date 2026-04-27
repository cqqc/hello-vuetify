<template>
  <template v-for="(item, index) in overlayContents" :key="item.id">
    <v-overlay
        :model-value="item.open"
        persistent
        class="d-flex align-center justify-center"
        :z-index="2000 + index"
        scroll-strategy="block"
    >
      <component
          :is="item.component"
          v-bind="item.content"
          @close="uiStore.closeContent(item.id)"
      />
    </v-overlay>
  </template>
</template>

<script setup>
import { useUIStore } from '@/stores/ui'
const uiStore = useUIStore()
const { overlayContents } = uiStore // ref 배열이므로 바로 사용 가능
</script>
