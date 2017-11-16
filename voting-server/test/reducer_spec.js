import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';


describe('reducer', () => {

	it('handles SET_ENTRIES', () => {
		const initialState = Map();
		const action = {
			type: 'SET_ENTRIES',
			entries: ['Trainspotting']
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			entries: ['Trainspotting']
		}));
	});

	it('handles NEXT', () => {
		const initialState = fromJS({
			entries: ['Trainspotting', '28 Days Later']
		});
		const action = {
			type: 'NEXT'
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later']
			},
			entries: []
		}));
	});

	it('handles VOTE', () => {
		const initialState = fromJS({
			vote: {
				pair: ['Fight Club', 'What we do in the Shadows']
			},
			entries: []
		});
		const action = {
			type: 'VOTE',
			entry: 'Fight Club'
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Fight Club', 'What we do in the Shadows'],
				tally: {
					'Fight Club': 1
				}
			},
			entries: []
		}));
	});

	it('has an initial state', () => {
		const action = {
			type: 'SET_ENTRIES',
			entries: ['Fight Club']
		};
		const nextState = reducer(undefined, action);

		expect(nextState).to.equal(fromJS({
			entries: ['Fight Club']
		}));
	});

	it('can be used with reduce', () => {
		const actions = [{
			type: 'SET_ENTRIES',
			entries: ['Trainspotting', 'Fight Club']
		}, {
			type: 'NEXT'
		}, {
			type: 'VOTE',
			entry: 'Fight Club'
		}, {
			type: 'VOTE',
			entry: 'Trainspotting'
		}, {
			type: 'VOTE',
			entry: 'Fight Club'
		}, {
			type: 'NEXT'
		}];

		const finalState = actions.reduce(reducer, Map());

		expect(finalState).to.equal(fromJS({
			winner: 'Fight Club'
		}));
	});
});