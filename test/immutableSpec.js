import {expect} from 'chai';
import {List} from 'immutable'

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(state).to.equal(42);
      expect(nextState).to.equal(43);
    });

  });

  describe('a list', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Trainspotting', 'Fight Club');
      let nextState = addMovie(state, 'Pulp Fiction');

      expect(state, List.of('Trainspotting', 'Fight Club'))
      expect(nextState, List.of('Trainspotting', 'Fight Club', 'Pulp Fiction'))
    });
  });

});
