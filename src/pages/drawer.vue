<template>
  <v-row>
  </v-row>
  <VResizeDrawer
    ref="resizeDrawer"
    v-model="open"
    location="right"
    :save-width="false"
    :snap-back="false"
    min-width="200"
    @handle:drag="onDrag"
  >
    [{{ resizedWidth }}]
    <br/>
    [{{ width }}]
  </VResizeDrawer>
</template>

<script setup>
import VResizeDrawer from  '@wdns/vuetify-resize-drawer';

const open = ref(true)
const resizeDrawer = ref(null)
const resizedWidth = ref(0)
const width = ref(0)

const onDrag = (event) => {
  resizedWidth.value = event.resizedWidth
  const { nextElementSibling } = resizeDrawer.value.$el
  width.value = parseInt(nextElementSibling.style.width, 10)
  console.log("resizeDrawer.value.$el", nextElementSibling.style.width)
}
</script>
