import axios from 'axios';
import ENV from '../env/env';

const BASE_URL = ENV.BASE_API_URL;

const Methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

const ApiService = async (
  endPoints: string,
  method: keyof typeof Methods,
  data?: any,
  headers: any = {},
) => {
  try {
    const response = await axios({
      method,
      baseURL: BASE_URL,
      url: endPoints,
      data: data,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default ApiService;
