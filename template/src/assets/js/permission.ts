import { isString } from 'lodash-es';
import { apiGetPower } from '@/api/common';
import { showMessage } from '@/utils';
import router from '@/router';
import { isView } from '@/config/permission';
// import type { ResponseInfo } from '@/types/common.d';
let PermissionPageId = 0;

export const routerInit = (Permission: any) => {
  router.beforeEach(async (to) => {
    const pageid = Number(to.meta.pageid);
    if (isString(to.meta.title)) {
      document.title = to.meta.title;
    }
    if (pageid && PermissionPageId !== pageid) {
      await apiGetPower(pageid)
        .then((res: any) => {
          if (res.Code === 0) {
            Permission.success(res.Data);
            PermissionPageId = pageid;
            if (!isView(pageid, res.Data)) {
              Permission.go403();
            }
            return true;
          }
          Permission.go403();
          return false;
        })
        .catch(function () {
          showMessage('权限获取错误');
          return false;
        });
      return true;
    }
    return true;
  });
};
