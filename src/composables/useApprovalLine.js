// src/composables/useApprovalLine.js
import { ref, computed } from 'vue'

export const useApprovalLine = (dataList) => {
  // 1. 전역 상태: 현재 어떤 행이라도 핀이 고정되어 있는지 확인
  const isAnyPinned = computed(() => dataList.value.some(d => d.isPinned))

  // 2. 카드 노출 여부 판단 (핵심 로직)
  const shouldShowCard = (item) => {
    if (item.isClosed) {
      return false
    }
    if (item.isPinned) {
      return true
    }
    if (isAnyPinned.value) {
      return false
    }

    return !!item.isHovered
  }

  const fetchData = async (item) => {
    if (item.serverData || item.isLoading) {
      return
    }
    item.isLoading = true
    await new Promise(r => setTimeout(r, 500))
    item.serverData = { ...item }
    item.isLoading = false
  }

  // 3. 마우스 진입 시
  const onMouseEnter = (item) => {
    // 잔상 제거: 다른 모든 항목의 호버 상태 초기화
    dataList.value.forEach(d => {
      if (d !== item) d.isHovered = false
    })

    item.isHovered = true
    item.isClosed = false // 다시 진입하면 닫힘 상태 해제

    // 핀 된 게 없을 때만 데이터 호출
    if (!isAnyPinned.value) {
      handleFetch(item)
    }
  }

  // 4. 마우스 이탈 시
  const onMouseLeave = (item) => {
    item.isHovered = false
  }

  // 5. 클릭 시 (싱글 핀 토글)
  const togglePin = (item) => {
    const targetState = !item.isPinned

    // 기존 모든 상태 초기화 (싱글 핀 모드)
    dataList.value.forEach(d => {
      d.isPinned = false
      d.isHovered = false
    })

    item.isPinned = targetState

    if (item.isPinned) {
      handleFetch(item)
    }
  }

  // 6. X 버튼 클릭 (강제 닫기)
  const forceClose = (item) => {
    item.isPinned = false
    item.isClosed = true
  }

  // 7. 데이터 호출 내부 로직
  const handleFetch = async (item) => {
    if (item.serverData || item.isLoading) return

    item.isLoading = true
    try {
      // 컴포넌트에서 넘겨준 fetchApi 실행
      item.serverData = await fetchApi(item)
    } catch (error) {
      console.error('승인 라인 호출 실패:', error)
    } finally {
      item.isLoading = false
    }
  }

  return {
    isAnyPinned,
    shouldShowCard,
    onMouseEnter,
    onMouseLeave,
    togglePin,
    forceClose
  }
}
