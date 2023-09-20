import { expect } from 'chai';
import { Hero } from '../src/model/hero-business';
import { createTestableHeroWithInvalidName } from './test-helpers/testable-hero';

/**
 * Unit tests for Hero class and its validation.
 */
describe('Unit tests: Hero Validation', () => {
  it('should return true if a new hero has no validation errors', () => {
    const hero = Hero.createWithIdAndName(1, 'John Doe');
    const actual = hero.validate();
    const expected = null;
    expect(actual).to.deep.equal(expected);
  });

  it('should return an error if the name property does not have type string', () => {
    const hero = createTestableHeroWithInvalidName(1, 1);
    const validationError = hero.validate();
    const expected = "Invalid 'name' value. The value must be of type string.";
    expect(validationError).to.include(expected);
  });

  it('should return an error if the name property is empty', () => {
    const hero = Hero.createWithIdAndName(1, '');
    const actual = hero.validate();
    const expected = "Invalid 'name' value. The value can not be empty.";
    expect(actual).to.include(expected);
  });
});
