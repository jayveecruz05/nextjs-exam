'use strict';

// Axios
import Axios from 'axios';

// Type Checker
type InstanceConfig = { baseURL?: string, headers?: any };
type PayloadConfig = { url?: string, data?: any, config?: any, apiCancelToken?: any };

const api = (instanceConfig: InstanceConfig = {}) => {
  const { baseURL = '', headers = {} } = instanceConfig;
  const CancelToken = Axios.CancelToken;
  const generateApiCancelToken = () => (`api_cancel_token_${Math.floor(Math.random() * Date.now()).toString(36).slice(2)}`);
  let apiCallList: any = {};
  
  // Process ENV Details
  // console.log(process.env);
  
  // Create New Axios Instance And Default Configurations
  const axiosInstance = Axios.create({ baseURL, headers });
  
  // console.log(axiosInstance.defaults);
  
  axiosInstance.interceptors.request.use(
    (config) => {
      // console.log(config);
      return config;
    },
    (error) => {
      // console.log(error);
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => {
      // console.log(response);
      return response;
    },
    (error) => {
      // console.log(error);
      // if (Axios.isCancel(error)) {
      // } else {
      // }
      return Promise.reject(error);
    }
  );
  
  return {
    config: { baseURL, headers },
    generateApiCancelToken,
    getAuthorization: () => {
      return axiosInstance.defaults.headers.common['Authorization'];
    },
    setAuthorization: (token: string) => {
      // console.log(token);
      // Set Authorization
      if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
      }
    },
    cancelCurrentApiCall: (cancelToken?: any) => {
      const cancelSourceList = Object.keys(apiCallList);
      if (cancelToken && typeof cancelToken === 'string') {
        const cancelRequest = apiCallList[cancelToken];
        if (cancelRequest) { cancelRequest(`Cancel "${cancelToken}" API Call.`) }
      } else if (cancelToken && Array.isArray(cancelToken) && cancelToken.length > 0) {
        cancelToken.forEach((apiCancelToken) => {
          const cancelRequest = apiCallList[apiCancelToken];
          if (cancelRequest) { cancelRequest(`Cancel "${apiCancelToken}" API Call.`) }
        });
      } else if (!cancelToken && cancelSourceList.length > 0) {
        cancelSourceList.forEach((apiCancelToken) => { apiCallList[apiCancelToken]('Cancel All Current API Call.'); });
        apiCallList = {};
      }
    },
    get: (payload: PayloadConfig = {}) => {
      const { url = '', config = {}, apiCancelToken = generateApiCancelToken() } = payload;
      return new Promise((resolve, reject) => {
        axiosInstance.get(url, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { apiCallList = { ...apiCallList, [apiCancelToken]: cancelSource }; })
        }).then(
          (response) => {
            // console.log(response);
            delete apiCallList[apiCancelToken];
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            delete apiCallList[apiCancelToken];
            if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    },
    post: (payload: PayloadConfig = {}) => {
      const { url = '', data = {}, config = {}, apiCancelToken = generateApiCancelToken() } = payload;
      return new Promise((resolve, reject) => {
        axiosInstance.post(url, data, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { apiCallList = { ...apiCallList, [apiCancelToken]: cancelSource }; })
        }).then(
          (response) => {
            // console.log(response);
            delete apiCallList[apiCancelToken];
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            delete apiCallList[apiCancelToken];
            if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    },
    put: (payload: PayloadConfig = {}) => {
      const { url = '', data = {}, config = {}, apiCancelToken = generateApiCancelToken() } = payload;
      return new Promise((resolve, reject) => {
        axiosInstance.put(url, data, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { apiCallList = { ...apiCallList, [apiCancelToken]: cancelSource }; })
        }).then(
          (response) => {
            // console.log(response);
            delete apiCallList[apiCancelToken];
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            delete apiCallList[apiCancelToken];
            if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    },
    patch: (payload: PayloadConfig = {}) => {
      const { url = '', data = {}, config = {}, apiCancelToken = generateApiCancelToken() } = payload;
      return new Promise((resolve, reject) => {
        axiosInstance.patch(url, data, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { apiCallList = { ...apiCallList, [apiCancelToken]: cancelSource }; })
        }).then(
          (response) => {
            // console.log(response);
            delete apiCallList[apiCancelToken];
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            delete apiCallList[apiCancelToken];
            if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    },
    delete: (payload: PayloadConfig = {}) => {
      const { url = '', config = {}, apiCancelToken = generateApiCancelToken() } = payload;
      return new Promise((resolve, reject) => {
        axiosInstance.delete(url, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { apiCallList = { ...apiCallList, [apiCancelToken]: cancelSource }; })
        }).then(
          (response) => {
            // console.log(response);
            delete apiCallList[apiCancelToken];
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            delete apiCallList[apiCancelToken];
            if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    }
  };
};

export default api;