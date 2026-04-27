import { ref, markRaw } from 'vue';
import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', () => {
    const overlayContents = ref([]);

    const openContent = (options) => {
        const id = Date.now(); // 고유 키 추가
        // 컴포넌트 객체는 markRaw로 감싸서 반응형 변환을 방지해야 합니다.
        const newContent = {
            id,
            open: true,
            component: markRaw(options.component),
            content: options.content || {}
        };

        overlayContents.value.push(newContent);
    };

    const closeContent = (id) => {
        // ID를 찾아서 해당 오버레이만 닫거나 배열에서 제거
        overlayContents.value = overlayContents.value.filter(item => item.id !== id);
    };

    return {
        overlayContents,
        openContent,
        closeContent
    };
});
