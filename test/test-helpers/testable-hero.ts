// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createTestableHeroWithInvalidName(id: number, name: any): any {
  return {
    id,
    name,
    validate: function () {
      const errors: string[] = [];
      if (typeof this.name !== 'string') {
        errors.push("Invalid 'name' value. The value must be of type string.");
      }
      if (this.name.length === 0) {
        errors.push("Invalid 'name' value. The value cannot be empty.");
      }
      return errors.length > 0 ? errors : null;
    },
  };
}
