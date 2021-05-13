import axiosClient from './axiosClient';

const walletApi = {
  getBalance: (params) => {
    const url = `/operator/${params.addressId}/balance`;
    return axiosClient.get(url, params);
  },

  getAddress: (params) => {
    const url = `/operator/wallets/${params.walletId}/address`;
    return axiosClient.get(url, params);
  },
  createTransaction: (params) => {
    const url = `/operator/wallets/${params.walletId}/transactions`;
    return axiosClient.post(url, params);
  },
  // createAddress: (params) => {
  //   const url = `operator/wallets/${params.walletId}/addresses`;
  //   return axiosClient.post(url, params);
  // }
};
export default walletApi;