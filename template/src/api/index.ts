import { indexApi } from '@/api/interface';
import type { ResponseInfo, TypeAjaxCllback } from '@/types/common.d';
import type {
  TypeAlertSetting,
  TypeSearchInfo,
  TypeCompleteFun,
  TypeFormData
} from '@/types/index.d';
import { Http } from 'ct-dart3';
import store from '@/stores/store';

//添加预警配置
export const apiAddWarningConfig = (
  params: Array<TypeAlertSetting>,
  complete: TypeCompleteFun
): TypeAjaxCllback => {
  return Http.ajax({
    method: 'post',
    url: indexApi.AddWarningConfig,
    data: params,
    complete: complete
  });
};

//获取预警配置
export const apiGetWarningConfig = (complete?: TypeCompleteFun): TypeAjaxCllback => {
  return Http.ajax({
    method: 'get',
    url: indexApi.GetWarningConfig,
    complete: complete
  });
};

//获取商品列表
export const apiGetGoodsList = (
  params: TypeSearchInfo,
  complete?: TypeCompleteFun
): TypeAjaxCllback => {
  return Http.ajax({
    method: 'get',
    url: indexApi.GetGoodsList,
    data: params,
    complete: complete
  });
};

//获取商品列表
export const apiDeleteGoods = (GoodsId: number): TypeAjaxCllback => {
  return Http.ajax({
    method: 'get',
    url: indexApi.DeleteGoods,
    data: { GoodsId }
  });
};

//获取商品类型
export const apiGetGoodsType = (): void => {
  Http.ajax({
    method: 'get',
    url: indexApi.GetGoodsType
  }).then((data) => {
    const res = data as ResponseInfo;
    if (res.Code === 0) {
      store.goodsType = res.Data;
    }
  });
};
//获取发放类型
export const apiGetGrantType = (): void => {
  Http.ajax({
    method: 'get',
    url: indexApi.GetGrantType
  }).then((data) => {
    const res = data as ResponseInfo;
    if (res.Code === 0) {
      store.grantType = res.Data;
    }
  });
};

//获取某批次优惠券信息
export const apiGetCouponByBatchNo = (
  params: { BatchNo: string | number },
  complete: TypeCompleteFun
): TypeAjaxCllback => {
  return Http.ajax({
    method: 'get',
    url: indexApi.GetCouponByBatchNo,
    data: params,
    complete: complete
  });
};

//编辑新增

export const apiEditGoods = (params: TypeFormData, complete?: TypeCompleteFun): TypeAjaxCllback => {
  return Http.ajax({
    method: 'post',
    url: indexApi.EditGoods,
    data: params,
    complete
  });
};

//获取商品详情
export const apiGetGoodsDetail = (
  params: { GoodsId: number },
  complete?: TypeCompleteFun
): TypeAjaxCllback => {
  return Http.ajax({
    method: 'get',
    url: indexApi.GetGoodsDetail,
    data: params,
    complete
  });
};
//预警开关
export const apiEditWarning = (
  params: { IsOpen: boolean; GoodsId: number },
  complete?: TypeCompleteFun
): TypeAjaxCllback => {
  return Http.ajax({
    method: 'post',
    url: indexApi.EditWarning,
    data: params,
    complete
  });
};
