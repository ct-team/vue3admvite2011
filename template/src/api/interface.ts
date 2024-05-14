import type { TypeAnyObject } from '@/types/index.d';
const index = {
  AddWarningConfig: '/api/GoodsManage/AddWarningConfig',
  GetWarningConfig: '/api/GoodsManage/GetWarningConfig',
  GetGoodsType: '/api/GoodsManage/GetGoodsType',
  GetGrantType: '/api/GoodsManage/GetGrantType',
  GetGoodsList: '/api/GoodsManage/GetGoodsList',
  EditGoods: '/api/GoodsManage/EditGoods',
  UpLoadImage: '/api/GoodsManage/UpLoadImage',
  GetCouponByBatchNo: '/api/GoodsManage/GetCouponByBatchNo',
  GetGoodsDetail: '/api/GoodsManage/GetGoodsDetail',
  EditWarning: '/api/GoodsManage/EditWarning',
  DeleteGoods: '/api/GoodsManage/DeleteGoods',
  GetCanAddGoodsList: '/api/GoodsManage/GetCanAddGoodsList'
};

const common = {
  GetPower: '/api/Common/GetPower'
};

const getApi = (paths: TypeAnyObject) => {
  const apiPre = 'Ydmalladm';
  const result: TypeAnyObject = {};
  for (const key in paths) {
    result[key] = paths[key].replace('/api/', `/api/${apiPre}/`);
  }
  return result;
};
export const indexApi = getApi(index);
export const commonApi = getApi(common);
