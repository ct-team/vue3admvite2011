import { createApp } from 'vue';
import pinia from '@/stores/store';
import router from '@/router';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@/assets/js/icon';
import { alias } from '@/config/permission';
import { clearEmptyData, showMessage } from '@/utils';
import { routerInit } from '@/assets/js/permission';
import type { ResponseInfo } from '@/types/common.d';
import App from './App.vue';
import {
  Toolbar,
  Search,
  SearchItem,
  Http,
  Permission,
  ListTemp,
  ListTempItem,
  Table,
  TableColumn,
  Input
} from 'ct-dart3';

const app = createApp(App);
app
  .use(pinia)
  .use(router)
  .use(ElementPlus, { size: 'small', zIndex: 3000, locale: zhCn })
  .use(ElementPlusIconsVue)
  .use(Toolbar)
  .use(Search)
  .use(SearchItem)
  .use(ListTemp)
  .use(ListTempItem)
  .use(Table)
  .use(TableColumn)
  .use(Input)
  .use(Http, {
    requestInterceptor(opts: any) {
      opts.params = clearEmptyData(opts.params);
      opts.data = clearEmptyData(opts.data);
    },
    interceptError(res: ResponseInfo) {
      const data: any = JSON.parse(JSON.stringify(res).toLowerCase());

      showMessage(data.message);
    },
    interceptorSuccess(res: ResponseInfo) {
      const data: any = JSON.parse(JSON.stringify(res).toLowerCase());

      // 对响应成功数据做点什么
      if (data.code !== 0) {
        showMessage(data.message);
      }
    },
    timeout: 60000
  })
  .use(Permission, {
    //设置权限别名
    alias: alias(),
    router: router
  });

app.mount('#app');
routerInit(Permission);
