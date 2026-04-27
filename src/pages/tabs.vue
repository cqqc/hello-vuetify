<template>
  <v-container>
    <v-tabs v-model="activeTab">
      <template v-for="(tab, index) in tabs" :key="tab.id">
        <v-tab
          draggable="true"
          @dragstart="onDragStart(index)"
          @dragover.prevent
          @drop="onDrop(index)"
        >
          {{ tab.label }}
        </v-tab>
      </template>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="(tab, index) in tabs" :key="tab.id">
        <v-card>{{ tab.content }}</v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const tabs = ref([
      { id: 1, label: 'Tab 1', content: 'Content for Tab 1' },
      { id: 2, label: 'Tab 2', content: 'Content for Tab 2' },
      { id: 3, label: 'Tab 3', content: 'Content for Tab 3' },
    ]);

    const activeTab = ref(0);
    const dragSourceIndex = ref(null);

    const onDragStart = (index) => {
      dragSourceIndex.value = index;
    };

    const onDrop = (targetIndex) => {
      const sourceIndex = dragSourceIndex.value;
      if (sourceIndex !== null) {
        const updatedTabs = [...tabs.value];
        const [draggedTab] = updatedTabs.splice(sourceIndex, 1);
        updatedTabs.splice(targetIndex, 0, draggedTab);
        tabs.value = updatedTabs;
        dragSourceIndex.value = null;
      }
    };

    return { tabs, activeTab, onDragStart, onDrop };
  },
};
</script>
