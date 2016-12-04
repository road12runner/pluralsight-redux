import expect from 'expect';
import {authorFormattedForDropdown} from './selectors';

describe('Author Selectors', () => {
  describe('authorFormattedForDropdown', () => {

    it('should return author data formatted for use in a dropdown', ()=> {
      const authors = [
        { id: 'author1', firstName : 'Cory', lastName: 'House'},
        { id: 'author2', firstName : 'Scott', lastName: 'Allen'},
      ];

      const expected = [
        { value: 'author1', text : 'Cory House'},
        { value: 'author2', text : 'Scott Allen'},
      ];


      expect(authorFormattedForDropdown(authors)).toEqual(expected);
    })
  });

});
