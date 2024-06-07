import { ElMessage } from 'element-plus';
import type { messageType } from 'element-plus';
import dayjs from 'dayjs';
import { isPlainObject, forEach, isNil } from 'lodash-es';

/**
 * @function showMessage 显示消息
 * @param  {string} msg: string        {内容}
 * @param  {messageType} type?: messageType {类型}
 */
export const showMessage = (msg: string, type?: messageType): void => {
  ElMessage({
    message: msg || 'error',
    type: type || 'error'
  });
};

/**
 * @function dayjsValueOf 返回时间戳
 * @param  {type} time: Date {时间}
 * @return {type} {时间戳}
 */
export const dayjsValueOf = (time: Date): any => {
  return dayjs(time).valueOf();
};

/**
 * @function dayjsFormat 时间格式化
 * @param  {type} time: Date {时间}
 * @return {type} {格式化时间}
 */
export const dayjsFormat = (time: Date, str: any): any => {
  return dayjs(time).format(str);
};
/**
 * @function clearEmptyData 清除对象中的空字符串数据
 * @param  {object} data: any {数据}
 * @return {object} {结果数据}
 */
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
/**
 * @function toFixed 保留小数
 * @param  {number} num: number   {当前数值}
 * @param  {number} point: number {保留位数}
 * @return {number} {结果值}
 */
export const toFixed = (num: number, point: number): number => {
  let n = num.toFixed(point + 1);
  n = n.substring(0, n.length - 1);
  return Number(n);
};
//http 错误拦截 可拦截 404 403等
export const interceptErrorPublic = (res: any) => {
  if (res.Message) {
    showMessage(res.Message);
    return;
  }
  if (res && res.response) {
    showMessage(res.response.data || res.response.statusText || res.response.status);
  }
};
//合并到老数据有的属性
export const mergeHasSource = (oldData: any, newData: any) => {
  const result: any = {};
  for (const key in oldData) {
    if (!isNil(newData[key])) {
      result[key] = newData[key];
    }
  }

  return Object.assign({}, oldData, result);
};
