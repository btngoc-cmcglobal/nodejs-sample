const faker = require('faker');
const { Category } = require('../../../src/models');

describe('Category model', () => {
  describe('Category validation', () => {
    let newCategory;
    beforeEach(() => {
      newCategory = {
        name: faker.name.findName(),
        status: faker.datatype.number({
            min: 0,
            max: 1
        })
      };
    });

    test('should correctly validate a valid category', async () => {
      await expect(new Category(newCategory).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if name is empty', async () => {
      newCategory.name = '';
      await expect(new Category(newCategory).validate()).rejects.toThrow();
    });

    test('should throw a validation error if status is not 0 or 1', async () => {
      newCategory.status = -1;
      await expect(new Category(newCategory).validate()).rejects.toThrow();
    });
  });
});
