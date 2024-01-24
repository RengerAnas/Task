import ApiService from '../service/ApiService';
import {END_POINTS} from '../Constants/API.Constants';

export default {
  async getProductListing(data: Record<string, unknown>) {
    return await ApiService(END_POINTS.PRODUCT_LIST, 'POST', data);
  },

  async getDashboardData(data: Record<string, unknown>) {
    return await ApiService(END_POINTS.DASHBOARD, 'POST', data);
  },
};
