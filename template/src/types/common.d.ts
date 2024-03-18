export interface ResponseInfo {
  Code: number;
  Data: any;
  Message: string;
}

export interface TypeList {
  key: string;
  value: number;
}

export type TypeAjaxCllback = Promise<any>;
