import {List, Map} from 'immutable';

// Initializes the data structure
export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}

// Generates the next state
export function next(state) {
	const entries = state.get('entries');

	return state.merge({
		vote: Map({
			pair: entries.take(2)
		}),
		entries: entries.skip(2)
	});
}

// Generates vote count based on votes
export function vote(state, entry){
	return state.updateIn(
		['vote','tally', entry],
		0,
		tally => tally + 1);
}