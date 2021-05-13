import axiosClient from './axiosClient';

const authApi = {
  getWalletDetail: (params) => {
    const url = '/operator/wallets';
    return axiosClient.get(url, params);
  },
  createWallet: (params) => {
    const url = '/operator/wallets';
    return axiosClient.post(url, params);
  },
  createAddress: (params) => {
    const url = `operator/wallets/${params.walletId}/address`;
    return axiosClient.post(url, params);
  }
};
export default authApi;