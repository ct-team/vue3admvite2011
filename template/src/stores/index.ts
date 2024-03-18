import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('index', () => {
  const goodsType = ref([]);
  const grantType = ref([]);
  const locationId = ref([]);

  return { goodsType, grantType, locationId };
});
