import {List} from 'immutable';

// Initializes the data structure
export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}