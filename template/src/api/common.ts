import { commonApi } from '@/api/interface';
import type { TypeCompleteFun } from '@/types/index.d';
import type { TypeAjaxCllback } from '@/types/common.d';
import { Http } from 'ct-dart3';

//获取所属页面
export const apiGetPower = (id: number, complete?: TypeCompleteFun): TypeAjaxCllback => {
  return Http.ajax({
    method: 'get',
    url: commonApi.GetPower,
    data: { pageId: id },
    complete
  });
};
