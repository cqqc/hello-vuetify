import { defineAsyncComponent } from 'vue'

export const MODAL_COMPONENTS = {

  // 결제/정산 (도메인별 그룹화)
  OVERLAID_01: defineAsyncComponent(() => import('@/components/modal/OverlayContent01.vue')),
  OVERLAID_02: defineAsyncComponent(() => import('@/components/modal/OverlayContent02.vue')),
  OVERLAID_03: defineAsyncComponent(() => import('@/components/modal/OverlayContent03.vue'))

}

