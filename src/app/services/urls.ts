import { environment } from '../../environments/environment.development';

const baseUrl = environment.base_url;
export const URL_AUTH_LOGIN = `${baseUrl}/auth/login`;
export const URL_AUTH_REFRESH = `${baseUrl}/auth/refresh`;
