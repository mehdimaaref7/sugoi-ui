import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../configuration/store-configuration';
import { fetchRealms } from '../../redux/reducers/app';

export const useGetRealms = () => {
	const realms = useSelector((state: RootState) => state.app.realms);
	const loading = useSelector((state: RootState) => state.app.realmLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!realms && !loading) {
			dispatch(fetchRealms());
		}
	}, [realms, loading, dispatch]);

	return { realms, loading };
};
