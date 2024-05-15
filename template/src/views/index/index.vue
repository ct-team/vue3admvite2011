<template>
  <div>
    <Search @search="onSearch" ref="searchRef" />
    <Tool></Tool>
    <Table
      @open-edit="onOpenEdit"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
      :data="tableData"
      :loading="loading"
    ></Table>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Search from './Search.vue';
import Table from './Table.vue';
import Tool from './Tool.vue';

import { apiGetGoodsList, apiGetGoodsType, apiGetGrantType } from '@/api/index';
import useCommon from '@/hooks/use-common';
import useRefreshTable from '@/hooks/use-refreshTable';

const searchRef = ref(null);
const { loading, tableData, onSearch, onPageSizeChange, onPageChange } = useRefreshTable({
  searchRef,
  ajax: apiGetGoodsList,
  bindEvent: 'refreshTable'
});
const { router } = useCommon();

const onOpenEdit = (id: number): void => {
  routerPush('/edit', id);
};

const routerPush = (path: string, id: number): void => {
  router.push({
    path,
    query: {
      id
    }
  });
};

apiGetGoodsType();
apiGetGrantType();
</script>
