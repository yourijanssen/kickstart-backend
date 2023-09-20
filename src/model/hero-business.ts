/**
 * Represents a hero with an ID and a name.
 */
export class Hero {
  private id: number | undefined;
  private name: string;

  private constructor(name: string) {
    this.name = name;
  }

  /**
   * Creates a new instance of the Hero class with a name.
   * @param {string} name - The name of the hero.
   */
  static createWithName(name: string): Hero {
    return new Hero(name);
  }

  /**
   * Creates a new instance of the Hero class with an ID and a name.
   * @param {number} id - The ID of the hero.
   * @param {string} name - The name of the hero.
   */
  static createWithIdAndName(id: number, name: string): Hero {
    const hero = new Hero(name);
    hero.id = id;
    return hero;
  }

  /**
   * Validates the hero's ID and name.
   * @returns {string[] | null} An array of validation errors or null if the hero is valid.
   */
  public validate(): string[] | null {
    const error: string[] = [];
    if (typeof this.name !== 'string') {
      error.push("Invalid 'name' value. The value must be of type string.");
    }
    if (this.name.length == 0) {
      error.push("Invalid 'name' value. The value can not be empty.");
    }
    return error.length > 0 ? error : null;
  }
}
