<template>
  <v-container>
    <v-table class="custom-table">
      <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td style="position: relative;">
          <v-hover v-slot="{ isHovering, props }" @update:model-value="fetchManager">
            <div v-bind="props" class="d-inline-block pa-2">
              {{ item.calories }}

              <v-fade-transition>
                <v-card
                  v-if="isHovering"
                  class="hover-card"
                  elevation="8"
                  color="primary"
                >
                  <v-card-text>
                    <strong>{{ item.name }}</strong>: {{ item.calories }}kcal
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </div>
          </v-hover>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from "@/helpers/axios"

const desserts = ref([
  { name: 'Frozen Yogurt', calories: 159 },
  { name: 'Ice cream sandwich', calories: 237 },
  { name: 'Eclair', calories: 262 },
  { name: 'Cupcake', calories: 305 },
  { name: 'Gingerbread', calories: 356 },
  { name: 'Jelly bean', calories: 375 },
  { name: 'Lollipop', calories: 392 },
])

const fetchManager = async (value) => {
  const response = await axios.get("/users")
  console.log('fetchManager', response)
}

</script>

<style scoped>
/* 테이블 래퍼에서 팝업이 잘리지 않게 설정 */
.custom-table :deep(.v-table__wrapper) {
  overflow: visible !important;
}

.hover-card {
  position: absolute;
  top: 100%;       /* td 바로 아래 배치 */
  left: 0;
  z-index: 100;
  min-width: 150px;

  /* [핵심] 카드가 마우스 이벤트를 먹지 않게 하여 아래쪽 행의 호버를 방해하지 않음 */
  pointer-events: none;

  white-space: nowrap;
}

/* 마우스 커서 스타일 */
.d-inline-block {
  cursor: pointer;
}
</style>
