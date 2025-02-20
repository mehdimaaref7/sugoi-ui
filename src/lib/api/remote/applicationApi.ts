import { getAuthClient } from '../../configuration/axios-configuration';
import Application from '../../model/api/application';
import { Pageable } from '../../model/api/pageable';
import axios, { CancelTokenSource } from 'axios';

let cancelToken: CancelTokenSource | undefined = undefined;

export const getApplications = (
	realm: string,
	name?: string,
): Promise<Pageable> => {
	//Check if there are any previous pending requests
	if (typeof cancelToken != typeof undefined) {
		cancelToken?.cancel('Operation canceled due to new request.');
	}
	//Save the cancel token for the current request
	cancelToken = axios.CancelToken.source();
	return getAuthClient()
		.get('/realms/' + realm + '/applications', {
			params: { size: 500, name: name },
			cancelToken: cancelToken.token,
		})
		.then((r: any) => r.data);
};

export const getApplication = (realm: string, name?: string): Promise<any> =>
	getAuthClient()
		.get('/realms/' + realm + '/applications/' + name)
		.then((r: any) => r.data);

export const putApplication = (realm: string, app: Application): Promise<any> =>
	getAuthClient()
		.put('/realms/' + realm + '/applications/' + app.name, app)

		.then((r: any) => r.data);

export const postApplication = (
	realm: string,
	app: Application,
): Promise<any> =>
	getAuthClient()
		.post('/realms/' + realm + '/applications', app)
		.then((r: any) => r.data);

export const deleteApplication = (realm: string, app: string): Promise<any> =>
	getAuthClient()
		.delete('/realms/' + realm + '/applications/' + app)
		.then((r: any) => r.data);
