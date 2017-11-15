import {List, Map} from 'immutable';
import {expect} from 'chai';

// Import functions implementing application logic
import {setEntries, next, vote} from '../src/core';



describe('application logic', () => {

	// UNIT TESTS - setEntries()
	describe('setEntries', () => {

		it('adds the entries to the state', () => {
			const state = Map();
			const entries = List.of('Trainspotting', '28 Days Later');
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));
		});

		it('converts to immutable', () => {
			const state = Map();
			const entries = ['Trainspotting', '28 Days Later'];
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));
		});
	});

	// UNIT TESTS - next()
	describe('next', () => {

		it('takes the next two entries under vote', () => {
			const state = Map({
				entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
			});
			const nextState = next(state);

			// Assertions
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List.of('Sunshine')
			}));
		});

		it('puts the winner of the current vote back to entries', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				}),
				entries: List.of('Sunshine', 'Millions', 'Citizen Kane')
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions')
				}),
				entries: List.of('Citizen Kane', 'Trainspotting')
			}));
		});

		it('puts both entries from a tied vote to the entries list', ()=>{
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 4
					})
				}),
				entries: List.of('Sunshine', 'Millions', 'Citizen Kane')
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions')
				}),
				entries: List.of('Citizen Kane', 'Trainspotting', '28 Days Later')
			}));
		});
	});

	// UNIT TESTS - vote()
	describe('vote', () => {

		it('creates a tally for the voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 1
					})
				}),
				entries: List()
			}));
		});

		it('adds to existing tally for the voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 3,
						'28 Days Later': 2
					})
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				}),
				entries: List()
			}));
		});


	});
});