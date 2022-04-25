import { Posts, ServiceResponse } from '@types';
import { request } from 'utils/index';

/**
 * 获取所有文章展示信息
 * @returns
 */
export const getAll = () => {
	return request.get<any, ServiceResponse<Posts[]>>('/posts/all');
};

/**
 * 获取文章详情
 * @param key 文章key
 * @returns
 */
export const getDetail = (key: string) => {
	return request.get<any, ServiceResponse<Posts>>('/posts/get', {
		params: {
			key,
		},
	});
};

/**
 * 获取所有文章key
 * @returns
 */
export const getKeys = () => {
	return request.get<any, ServiceResponse<string[]>>('/posts/keys');
};
