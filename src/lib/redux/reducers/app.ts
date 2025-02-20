import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRealms } from 'src/lib/api/index';
import { Realm } from 'src/lib/model/api/realm';
import { getCurrentTheme } from 'src/lib/utils/functions';

interface AppState {
	theme: string;
	notifs: any;
	config: any;
	realms: Realm[] | undefined;
	realmLoading: boolean;
}

const initialConfigState: AppState = {
	theme: getCurrentTheme(),
	notifs: {
		enabled_debug: window.localStorage.getItem('debug-notif-enabled')
			? (window.localStorage.getItem(
					'debug-notif-enabled',
			  ) as string) === 'true'
			: false,
	},
	config: {},
	realms: undefined,
	realmLoading: false,
};

const AppReducer = (state = initialConfigState, action: any) => {
	let nextState: AppState;
	switch (action.type) {
		case 'saveConfig':
			nextState = { ...state, config: { ...action.payload } };
			return nextState;
		case 'changeTheme':
			nextState = {
				...state,
				theme: action.payload.nameTheme,
			};
			window.localStorage.setItem(
				'theme',
				JSON.stringify(action.payload.nameTheme),
			);
			return nextState;
		case 'getRealms/pending': {
			nextState = {
				...state,
				realmLoading: true,
			};
			return nextState;
		}
		case 'getRealms/fulfilled': {
			nextState = {
				...state,
				realms: action.payload,
				realmLoading: false,
			};
			return nextState;
		}

		case 'changeStatusNotifDebug': {
			nextState = {
				...state,
				notifs: {
					...state.notifs,
					enabled_debug: action.payload.enabled,
				},
			};
			return nextState;
		}
		default:
			return state;
	}
};

export const fetchRealms = createAsyncThunk('getRealms', async () => {
	return await getRealms();
});

export default AppReducer;
