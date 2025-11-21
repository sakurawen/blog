/**
 * 把rpc返回对象的date类型转换为string
 */
type RPCResponse<T> = T extends object ? {
  [K in keyof T]: T[K] extends Date ? string : T[K] extends object ? AdapterResponse<T[K]> : T[K];
} : never;
