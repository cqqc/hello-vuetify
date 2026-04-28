<template>
  <v-container>
    <table class="custom-table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Calories</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td class="text-center" style="position: relative;">
          <div
            class="cursor-pointer"
            @mouseenter="onMouseEnter(item)"
            @mouseleave="onMouseLeave(item)"
            @click="togglePin(item)"
          >
            <span>{{ item.calories }}</span>
            <div v-if="shouldShowCard(item)" :class="['hover-card-wrapper', { 'is-pinned': item.isPinned }]">
              <AppLoader :loading="item.isLoading">
                <v-card class="hover-card" color="primary" min-height="120" min-width="240">
                  <v-card-text v-if="item.serverData">
                    <div class="d-flex justify-space-between">
                      <div class="text-h6 mb-2">상세 정보
                        <v-icon v-if="item.isPinned" size="x-small">mdi-pin</v-icon>
                      </div>
                      <v-btn icon="mdi-close" density="compact" variant="text" @click.stop="forceClose(item)"/>
                    </div>
                    <div>Name: {{ item.serverData.name }}</div>
                    <div>Calories: {{ item.serverData.calories }}</div>
                  </v-card-text>
                </v-card>
              </AppLoader>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppLoader from "@/components/AppLoader.vue"

const desserts = ref([
  { name: 'Frozen Yogurt', calories: 159 },
  { name: 'Ice cream sandwich', calories: 237 },
  { name: 'Eclair', calories: 262 },
  { name: 'Cupcake', calories: 305 },
  { name: 'Gingerbread', calories: 356 }
])

const isAnyPinned = computed(() => desserts.value.some(d => d.isPinned))

const shouldShowCard = (item) => {
  console.log('shouldShowCard', item)
  // 1. 사용자가 X를 눌러서 강제로 닫았는가? (최우선 순위)
  if (item.isClosed) {
    return false
  }

  // 2. 이 항목 자체가 핀(Pin) 되어 있는가?
  if (item.isPinned) {
    return true
  }

  // 3. 현재 화면에 핀 된 항목이 '하나라도' 있는가?
  // 핀 된 게 있다면 다른 항목은 호버를 보여주지 않음
  if (isAnyPinned.value) {
    return false
  }

  // 4. 마지막으로, 현재 마우스가 올라가 있는 상태(Hover)인가?
  if (item.isHovered) {
    return true
  }
  return false
}

// [이벤트 1] 마우스 진입
const onMouseEnter = (item) => {
  console.log('onMouseEnter', item, item.isHovered)
  item.isHovered = true
  item.isClosed = false // 다시 진입하면 닫힘 상태 해제
  // 핀 고정이면 다른곳 hover 여도 데이터 X
  if (isAnyPinned.value) {
    return
  }
  fetchData(item)
}

// [이벤트 2] 마우스 이탈
const onMouseLeave = (item) => {
  console.log('onMouseLeave', item)
  item.isHovered = false // 마우스 나갔으니 hover X
}

// [이벤트 3] 클릭 (핀 토글)
const togglePin = (item) => {
  console.log('togglePin', item)
  const isPinned = !item.isPinned
  desserts.value.forEach(d => d.isPinned = false) // 모든 핀 제거
  item.isPinned = isPinned // 싱글 핀
  if (item.isPinned) {
    fetchData(item)
  }
}

// [이벤트 4] X 버튼 (즉시 닫기)
const forceClose = (item) => {
  item.isPinned = false
  item.isClosed = true // 마우스가 위에 있어도 v-if에서 탈락시킴
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
</script>

<style scoped>
/* 2. 테이블 본체 */
.custom-table {
  width: 50%; /* 부모 너비에 꽉 차게 */
  border-collapse: collapse; /* 테두리 겹침 방지 */
  table-layout: fixed; /* 너비를 고정적으로 제어 */
  font-size: 14px;
}

/* 3. 헤더 스타일 */
.custom-table th {
  background-color: #f8f9fa;
  color: #555;
  font-weight: 600;
  padding: 12px 16px;
  border-bottom: 2px solid #eee;
}

.custom-table td {
  /* 상하 8px 좌우 16px 정도면 약 32px~40px의 높이가 체감됩니다 */
  padding: 8px 16px;
}

.hover-card-wrapper {
  position: absolute;
  top: 100%;
  //left: -80px;
  z-index: 100;
  padding-top: 8px;
  pointer-events: none;
}

.is-pinned, .hover-card {
  pointer-events: auto;
}
</style>
