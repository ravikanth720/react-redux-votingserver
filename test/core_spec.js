import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
// Setting new entries
  describe('setEntries converts to immutable', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = ['Kick Ass', 'Lock, stock and two smoking barrels'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Kick Ass', 'Lock, stock and two smoking barrels')
      }));
    });
  });
// Takes the firsdt two entries and adds to vote pair
  describe('next', () => {
    it('takes next two entries for vote', () => {
      const state = Map({
        entries: List.of('Kick Ass', 'Lock, stock and two smoking barrels', 'Pulp Fiction')
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of('Kick Ass', 'Lock, stock and two smoking barrels')
          }),
          entries: List.of('Pulp Fiction')
        }));
    });
  });
// voting on the pairs. A tally is added to the pairs for every vote cast
  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Kick Ass', 'Lock, stock and two smoking barrels')
        }),
        entries: List()
      });

      const nextState = vote(state, 'Lock, stock and two smoking barrels');

      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of('Kick Ass', 'Lock, stock and two smoking barrels'),
            'Lock, stock and two smoking barrels': 1
            tally: Map({
            })
          }),
          entries: List()
        }));
    });

    it('adds to existing tally for voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Kick Ass', 'Lock, stock and two smoking barrels'),
          tally: Map({
            'Lock, stock and two smoking barrels': 1
          })
        }),
        entries: List()
      });

      const nextState = vote(state, 'Lock, stock and two smoking barrels');

      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of('Kick Ass', 'Lock, stock and two smoking barrels'),
            'Lock, stock and two smoking barrels': 2
            tally: Map({
            })
          }),
          entries: List()
        }));
    })
  })
});
