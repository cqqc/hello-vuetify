<template>
  <v-card width="400">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-actions>
      <v-btn @click="$emit('close')">닫기</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps(['title'])
defineEmits(['close'])
</script>
