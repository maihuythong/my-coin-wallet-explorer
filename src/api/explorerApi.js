import axiosClient from './axiosClient';

const explorerApi = {
  getTransactions: (params) => {
    const url = `/blockchain/transactions`;
    return axiosClient.get(url, params);
  },
  getBlockchain: (params) => {
    const url = `/blockchain/blocks`;
    return axiosClient.get(url, params);
  }
};
export default explorerApi;