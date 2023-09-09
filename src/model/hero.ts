export class Hero {
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public get id(): number {
    return this.id;
  }

  public set id(value: number) {
    if (value >= 1) {
      this.id = value;
    } else {
      throw new Error(
        "Invalid 'id' value. The value must be greater than or equal to 1."
      );
    }
  }

  public get name(): string {
    return this.name;
  }

  public set name(value: string) {
    if (value.length >= 1) {
      this.name = value;
    } else {
      throw new Error(
        "Invalid name value. The value must have a length of 1 or more."
      );
    }
  }
}
