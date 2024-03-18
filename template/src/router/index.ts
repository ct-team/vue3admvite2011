import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { config } from '@/config/permission';
import Home from '@/views/index/index.vue';
import Add from '@/views/index/Edit.vue';
import Edit from '@/views/index/Edit.vue';
// import AlertSetting from '@/views/index/AlertSetting.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
    meta: { pageid: config.CM.pageId, title: config.CM.title },
    children: [
      {
        path: 'add',
        component: Add,
        meta: { type: 'add' }
      },
      {
        path: 'edit',
        component: Edit,
        meta: { type: 'edit' }
      },
      {
        path: 'alert-setting',
        component: () => import('@/views/index/AlertSetting.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
