<template>
  <v-container>
    <!-- 버튼 -->
    <v-btn color="primary" @click="openOverlay">
      열기
    </v-btn>
  </v-container>
  <OverlayContentWrapper />
</template>

<script setup>
import { useUIStore } from "@/stores/ui"
import { MODAL_COMPONENTS } from "@/constant/modal"
import OverlayContentWrapper from "./OverlayContentWrapper.vue"
const { openContent } = useUIStore()

const uiStore = useUIStore();
// const { openContent } = uiStore; // 이렇게 쓰면 반응형 연결이 끊길 수 있음 (함수는 괜찮지만 권장 X)

const openOverlay = () => {
    const options = {
        component: MODAL_COMPONENTS.OVERLAID_01,
        content: { title: 'overlaid01' }
    }
    uiStore.openContent(options); // 직접 호출 권장
}

</script>
