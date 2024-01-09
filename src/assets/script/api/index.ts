'use strict';

import Axios from '@/plugins/axios';

// Process ENV Details
// console.log(process.env);

const api = {
  main: Axios({ baseURL: process.env.NEXT_APP_API_BASE_URL })
};

// console.log(api);

export default api;