// 根据request修改成适配存储管理服务的接口调用
import axios from "axios";
import { message, notification } from "antd";

function getToken() {
  return localStorage.getItem("token");
}

function getGlobalUserId() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userId = userInfo.id;

  return userId;
}

// 全局 loading 控制回调函数
let setLoading: (loading: boolean) => void = () => {};

// 设置全局 loading 回调函数
export const setLoadingHandler = (handler: (loading: boolean) => void) => {
  setLoading = (loading) => {
    handler(loading);
  };
};

export interface IResponse<T = any> {
  code: number;
  message?: string;
  data: T;
}

const requestApi = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // timeout: 30000,
});

// function isExcluded(config: any) {
//   if (!excludeUrls) {
//     return false;
//   }
//   const { url, method, params, data } = config;

//   for (const excludeUrl of excludeUrls) {
//     try {
//       if (excludeUrl.startsWith("^") || excludeUrl.includes("*")) {
//         const regex = new RegExp(excludeUrl);
//         if (regex.test(url)) {
//           return true;
//         }
//       } else {
//         if (url === excludeUrl) {
//           return true;
//         }
//       }
//     } catch (e) {
//       console.error(`Invalid excludeUrl pattern: ${excludeUrl}`);
//     }
//   }

//   // 如果需要更复杂的匹配逻辑，可以在这里扩展
//   // 例如：根据 method、params 或 data 进行匹配
//   return false;
// }

requestApi.interceptors.request.use(
  (config) => {
    // const shouldShowLoading = !isExcluded(config);
    // if (shouldShowLoading) {
    //   setLoading(true);
    // }
    config.headers["Authorization"] = getToken();
    config.headers["uid"] = getGlobalUserId();
    return config;
  },
  (error) => {
    setLoading(false);
    Promise.reject(error);
  }
);

const excludeCodes = [200, 200000];
// const redirectCodes = [];
// const excludeUrls = []

requestApi.interceptors.response.use(
  (response) => {
    setLoading(false);
    if (response.status === 200) {
      // if (response.data.code !== 200000) {
      //   if (redirectCodes.includes(response.data.code)) {
      //     notification.error({
      //       message: "提示",
      //       description: "登录已过期，请重新登录",
      //     });
      //     localStorage.removeItem("token");
      //     localStorage.removeItem("userInfo");
      //     localStorage.removeItem("permissions");
      //     localStorage.removeItem("uid");
      //     localStorage.removeItem("refresh_token");
      //     setTimeout(() => {
      //       window.location.href = REDIRECT_URL;
      //     }, 2000);
      //   } else {
      //     if (!excludeCodes.includes(response.data.code)) {
      //       notification.error({
      //         message: "提示",
      //         description: response.data.message,
      //       });
      //     } else {
      //       return response.data;
      //     }
      //   }
      // } else {
      //   return response.data;
      // }
      if (!excludeCodes.includes(response.data.code)) {
        notification.error({
          message: "提示",
          description: response.data.message,
        });
      } else {
        return response.data;
      }
    }
    return response;
  },
  (error) => {
    setLoading(false);
    message.error(error.message);
    return Promise.reject(error);
  }
);

export default requestApi;
