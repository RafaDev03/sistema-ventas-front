import { environment } from '../../environments/environment.development';

const baseUrl = environment.base_url;

//Endpoints autenticación
export const URL_AUTH_LOGIN = `${baseUrl}/auth/login`;
export const URL_AUTH_REFRESH = `${baseUrl}/auth/refresh`;

//Endpoits categoría
export const URL_CATEGORY_FIND_ALL = `${baseUrl}/categoria/findAll`;
export const URL_CATEGORY_FIND_BY_ID = `${baseUrl}/categoria/find`;
export const URL_CATEGORY_SAVE = `${baseUrl}/categoria/save`;
export const URL_CATEGORY_UPDATE = `${baseUrl}/categoria/update`;
export const URL_CATEGORY_DELETE = `${baseUrl}/categoria/delete`;
