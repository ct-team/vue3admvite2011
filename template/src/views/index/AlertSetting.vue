<template>
  <DrawerMode
    v-model="status"
    title="预警配置"
    @closed="onClosed"
    :loading="slideLoading"
    :confirmLoading="confirmLoading"
    footerIsCenter
    isEdit
    @confirm="onSubmit"
  >
    <el-form :model="formData" ref="formRef" :rules="formRules">
      <el-form-item prop="list">
        <dart-list-temp
          v-model="formData.list"
          :rules="listRules"
          :max="20"
          ref="listRef"
          :default-data="{ UserName: '', Email: '', Phone: '' }"
          @change="onClearVaid('list')"
        >
          <dart-list-temp-item prop="UserName" label="用户名">
            <template #default="scope">
              <el-input
                v-model="scope.row.UserName"
                placeholder="请输入用户名"
                :max-length="30"
                clearable
              ></el-input>
            </template>
          </dart-list-temp-item>
          <dart-list-temp-item prop="Email" label="邮箱">
            <template #default="scope">
              <el-input
                v-model="scope.row.Email"
                placeholder="请输入邮箱"
                :max-length="100"
                clearable
              ></el-input>
            </template>
          </dart-list-temp-item>
          <dart-list-temp-item prop="Phone" label="手机号">
            <template #default="scope">
              <dart-input
                v-model="scope.row.Phone"
                input-type="num"
                placeholder="请输入手机号"
                :maxlength="11"
                clearable
              ></dart-input>
            </template>
          </dart-list-temp-item>
        </dart-list-temp>
      </el-form-item>
    </el-form>
  </DrawerMode>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { FormRules, FormInstance } from 'element-plus';
import { apiAddWarningConfig, apiGetWarningConfig } from '@/api/index';
import { showMessage } from '@/utils';
import type { ResponseInfo } from '@/types/common.d';
import type { TypeAlertSetting } from '@/types/index.d';
import DrawerMode from '@/components/DrawerMode.vue';
const slideLoading = ref(false);
const status = ref(true);
const formRef = ref<FormInstance>();
const listRef = ref();
const router = useRouter();
const confirmLoading = ref(false);
const formRules: FormRules = {
  list: [
    { required: true, message: '请添加预警配置', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        (listRef.value as any)
          .validate()
          .then(() => {
            callback();
          })
          .catch(() => {
            callback(new Error('预警配置有错误'));
          });
      },
      trigger: 'blur'
    }
  ]
};
const listRules: FormRules = {
  UserName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  Email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  Phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[0-9]{10}$/, message: '手机号格式不正确', trigger: 'blur' }
  ]
};
const formData = reactive({
  list: []
});
const setLoading = (value: boolean) => {
  slideLoading.value = value;
};
const setConfirmLoading = (value: boolean) => {
  confirmLoading.value = value;
};
const onSubmit = () => {
  formRef?.value?.validate((valid) => {
    if (valid) {
      setConfirmLoading(true);
      saveList(formData.list, () => {
        setConfirmLoading(false);
      });
      return;
    }

    showMessage('请检查输入项');
  });
};
const onClearVaid = (name: string) => {
  formRef?.value?.clearValidate(name);
};
const onClosed = () => {
  router.push({
    path: '/'
  });
};
const saveList = (data: Array<TypeAlertSetting>, complete: any) => {
  apiAddWarningConfig(data, complete).then((res: ResponseInfo) => {
    if (res.Code === 0) {
      showMessage('保存成功', 'success');
      onClosed();
    }
  });
};
const getList = () => {
  setLoading(true);
  apiGetWarningConfig(() => {
    setLoading(false);
  }).then((res: ResponseInfo) => {
    if (res.Code === 0) {
      formData.list = res.Data;
    }
  });
};

getList();
</script>
<style>
.color-gray {
  color: #8c939d;
  font-size: 12px;
}
.avatar-uploader .avatar {
  width: 200px;
  height: 100px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 100px;
  text-align: center;
}
</style>
