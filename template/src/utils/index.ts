import { ElMessage } from 'element-plus';
import type { messageType } from 'element-plus';
import dayjs from 'dayjs';
import { isPlainObject, forEach } from 'lodash-es';
export const showMessage = (msg: string, type?: messageType): void => {
  ElMessage({
    message: msg || 'error',
    type: type || 'error'
  });
};

export const dayjsValueOf = (time: Date): any => {
  return dayjs(time).valueOf();
};
export const dayjsFormat = (time: Date, str: any): any => {
  return dayjs(time).format(str);
};

export const clearEmptyData = (data: any): any => {
  const result: any = {};
  if (!isPlainObject(data)) {
    return data;
  }
  forEach(data, (value, key) => {
    if (value !== '') {
      result[key] = value;
    }
  });
  return result;
};
export const toFixed = (num: number, point: number): number => {
  let n = num.toFixed(point + 1);
  n = n.substring(0, n.length - 1);
  console.log(n);
  return Number(n);
};

export const interceptErrorPublic = (res: any) => {
  if (res.Message) {
    showMessage(res.Message);
    return;
  }
  if (res && res.response) {
    showMessage(res.response.data || res.response.statusText || res.response.status);
  }
};
