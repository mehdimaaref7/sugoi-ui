import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { enqueueSnackbar } from './../redux/actions/notif';
import Store from './store-configuration';

const isDebugMethod = (method: string | undefined) => {
	if (typeof method === 'undefined') {
		return true;
	}
	return ![
		'delete',
		'DELETE',
		// 'head',
		// 'HEAD',
		'post',
		'POST',
		'put',
		'PUT',
		'patch',
		'PATCH',
		// 'purge',
		// 'PURGE',
		// 'link',
		// 'LINK',
		// 'unlink',
		// 'UNLINK',
	].includes(method);
};

const isDebugError = (a: AxiosError) => {
	if (a.message === 'Operation canceled due to new request.') {
		return true;
	}
	return false;
};

export const getAuthClient = () => {
	const client = axios.create({
		baseURL: Store.getState().app.config.api,
	});
	client.interceptors.request.use(
		async (config: AxiosRequestConfig) => {
			Store.dispatch(
				enqueueSnackbar({
					subject:
						'Send request ' +
						(config.method as string).toUpperCase() +
						' ' +
						config.url,
					options: {
						key: new Date().getTime() + Math.random(),
						variant: 'info',
					},
					debug: true,
				}),
			);
			config.headers = {
				Authorization:
					'Bearer ' + Store.getState().user.access_token,
			};
			return config;
		},
		(err) => {
			return Promise.reject(err);
		},
	);
	client.interceptors.response.use(
		async (response: AxiosResponse) => {
			Store.dispatch(
				enqueueSnackbar({
					subject: response,
					options: {
						key: new Date().getTime() + Math.random(),
						variant: 'success',
					},
					debug: isDebugMethod(response.config.method),
				}),
			);
			return response;
		},
		(err) => {
			Store.dispatch(
				enqueueSnackbar({
					subject: err,
					options: {
						key: new Date().getTime() + Math.random(),
						variant: 'error',
					},
					debug: isDebugError(err),
				}),
			);
			return Promise.reject(err);
		},
	);
	return client;
};
