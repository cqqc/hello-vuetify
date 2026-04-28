<template>
  <div class="app-loader-wrapper">
    <slot></slot>

    <v-dialog
      :model-value="loading"
      contained
      persistent
      no-click-animation
      class="align-center justify-center"
    >
      <v-progress-circular
        color="white"
        indeterminate
        size="32"
      ></v-progress-circular>
    </v-dialog>
  </div>
</template>

<script setup>
defineProps({
  loading: Boolean
})
</script>

<style scoped>
.app-loader-wrapper {
  position: relative; /* 로더 위치의 기준 */
  width: 100%;
  height: 100%;
  min-height: 50px; /* 로더가 보일 최소 공간 */
}
</style>
