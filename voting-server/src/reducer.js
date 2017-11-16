import {setEntries, next, vote} from './core'

export default function reducer(state, action) {
	// Identify and invoke the right function call

	switch (action.type) {
		case 'SET_ENTRIES':
			return setEntries(state, action.entries);
		case 'NEXT':
			return next(state);
		case 'VOTE':
			return vote(state, action.entry);
	}

	return state;
}