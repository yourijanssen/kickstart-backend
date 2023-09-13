// import { expect } from 'chai';
// import { Hero } from '../src/model/hero-business';

// /**
//  * Unit tests for Hero class and its validation.
//  */
// describe('Unit tests: Hero Validation', () => {
//   /**
//    * Test case: should throw an error if the ID is negative.
//    */
//   it('should throw an error if the ID is negative', () => {
//     expect(() => new Hero(-1, 'John Doe')).to.throw(
//       "Invalid 'id' value. The value must not be negative."
//     );
//   });

//   /**
//    * Test case: should throw an error if the name is empty.
//    */
//   it('should throw an error if the name is empty', () => {
//     expect(() => new Hero(1, '')).to.throw(
//       "Invalid 'name' value. The value must have a length of 1 or more."
//     );
//   });

//   /**
//    * Test case: should create a Hero instance with a valid ID and name.
//    */
//   it('should create a Hero instance with a valid ID and name', () => {
//     const hero = new Hero(1, 'John Doe');
//     expect(hero).to.be.an.instanceOf(Hero);
//     expect(hero.id).to.equal(1);
//     expect(hero.name).to.equal('John Doe');
//   });
// });
