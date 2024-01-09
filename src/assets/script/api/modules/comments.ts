'use strict';

import api from '../index';

// console.log(api);

const getComments = async () => {
  return await api.main.get({ url: '/comments' });
};

const getComment = async (id: string) => {
  return await api.main.get({ url: `/comments/${id}` });
};

export { getComments, getComment };