<template>
  <div>
    <Search @search="onSearch" ref="searchRef" />
    <Tool></Tool>
    <Table
      @open-edit="onOpenEdit"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
      :data="tableData"
      :pagination="pagination"
      :loading="loading"
    ></Table>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import Search from './Search.vue';
import Table from './Table.vue';
import Tool from './Tool.vue';
import type { ResponseInfo } from '@/types/common.d';
import type { TypeSearchInfo } from '@/types/index.d';
import { apiGetGoodsList, apiGetGoodsType, apiGetGrantType } from '@/api/index';
import { Pagination } from '@/config';
import useCommon from '@/hooks/use-common';
import Bus from '@/assets/js/bus';
const { router } = useCommon();
const searchRef = ref();
const tableData = ref([]);
const loading = ref(true);
const pagination: any = ref({ ...Pagination });
let searchDataHistory: TypeSearchInfo = {};

const onSearch = (searchValue: TypeSearchInfo): void => {
  searchDataHistory = searchValue;
  refreshTable(searchValue, () => {
    (searchRef as any).value.setLoading(false);
  });
};

const onOpenEdit = (id: number): void => {
  routerPush('/edit', id);
};
const setTableLoading = (type: boolean) => {
  loading.value = type;
};
const onPageChange = (pageIndex: number) => {
  if (pageIndex > 0) {
    pagination.value.pageIndex = pageIndex;
  }

  refreshTable(searchDataHistory);
};
const onPageSizeChange = (size: number) => {
  if (size > 0) {
    pagination.value.pageSize = size;
  }

  refreshTable(searchDataHistory);
};
//刷新表格数据
const refreshTable = (data?: TypeSearchInfo, complete?: any) => {
  setTableLoading(true);
  const newData = data ? data : searchDataHistory;
  apiGetGoodsList({
    ...newData,
    ...{ PageIndex: pagination.value.pageIndex, PageSize: pagination.value.pageSize }
  })
    .then((res: ResponseInfo) => {
      if (res.Code === 0) {
        tableData.value = res.Data.List;
        pagination.value = {
          recordCount: res.Data.RecordCount,
          pageSize: res.Data.PageSize,
          pageIndex: res.Data.PageIndex
        };
      }
    })
    .catch(() => {
      tableData.value = [];
      pagination.value = { ...Pagination };
    })
    .finally(() => {
      complete && complete();
      setTableLoading(false);
    });
};
const bindBusEvent = () => {
  Bus.on('refreshTable', (index: number) => {
    onPageChange(index);
  });
};
const routerPush = (path: string, id: number): void => {
  router.push({
    path,
    query: {
      id
    }
  });
};

onBeforeUnmount(() => {
  Bus.off('refreshTable');
});
onMounted(() => {
  (searchRef as any).value.search();
});

bindBusEvent();
apiGetGoodsType();
apiGetGrantType();
</script>
