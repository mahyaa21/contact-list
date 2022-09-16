import axios from 'axios';
import  Utils  from '../lib/utils';

const baseURL = Utils.baseUrl;

const RequestInstance = axios.create({ baseURL });

export { RequestInstance, baseURL };
