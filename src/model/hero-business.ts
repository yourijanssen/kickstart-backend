/**
 * Represents a Hero with an ID and a name.
 */
export class Hero {
  /**
   * Creates a new Hero instance.
   * @param {number} id - The ID of the hero.
   * @param {string} name - The name of the hero.
   * @throws {Error} If the ID is negative or if the name is empty.
   */
  constructor(public id: number, public name: string) {
    if (id <= 0) {
      throw new Error("Invalid 'id' value. The value must not be negative.");
    }

    if (name.length <= 1) {
      throw new Error("Invalid 'name' value. The value must have a length of 1 or more.");
    }
  }
}
