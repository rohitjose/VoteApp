import {expect} from 'chai'
import {List, Map} from 'immutable'

describe('immutability', () => {

	// Sample test case
	describe('a number', () => {

		function increment(currentState) {
			return currentState + 1;
		}

		// Test Implementations
		it('is immutable', () => {
			let state = 68;
			let nextState = increment(state);

			expect(nextState).to.equal(69);
			expect(state).to.equal(68);
		});
	});

	// Immutable List
	describe('a list', () => {

		function addMovie(currentState, movie) {
			return currentState.push(movie);
		}

		it('is immutable', () => {
			let state = List.of('Trainspotting', '28 Days Later');
			let nextState = addMovie(state, 'Sunshine');

			expect(nextState).to.equal(List.of('Trainspotting', '28 Days Later', 'Sunshine'));
			expect(state).to.equal(List.of('Trainspotting', '28 Days Later'));
		});
	});

	// Immutable Tree
	describe('a tree', () => {

		function addMovie(currentState, movie) {
			return currentState.update('movies', movies => movies.push(movie));
		}

		it('is immutable', () => {
			let state = Map({
				movies: List.of('Trainspotting', '28 Days Later')
			});
			let nextState = addMovie(state, 'Sunshine');

			expect(nextState).to.equal(Map({
				movies: List.of('Trainspotting', '28 Days Later', 'Sunshine')
			}));
			expect(state).to.equal(Map({
				movies: List.of('Trainspotting', '28 Days Later')
			}));
		});
	});
});