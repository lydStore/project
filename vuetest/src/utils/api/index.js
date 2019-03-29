import { post, get } from "./http";
//初始化首页
export const getindex = params => {
  return get(`/list`, { params: params });
};
//获取应用信息
export const getAppInfo = params => {
  return get(`/app/info`, { params: params });
};
