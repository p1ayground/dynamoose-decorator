import { kebabCase, snakeCase } from '../string';

describe('string', () => {
  describe('kebabCase', () => {
    it('should convert camel case to kebab case', () => {
      const camelCaseValue = 'someValueInCamelCase';

      const result = kebabCase(camelCaseValue);
      expect(result).toEqual('some-value-in-camel-case');
    });

    it('should not change kebab-case strings', () => {
      const kebabCaseValue = 'some-value-in-kebab-case';

      const result = kebabCase(kebabCaseValue);
      expect(result).toEqual(kebabCaseValue);
    });

    it('should handle empty strings', () => {
      const emptyString = '';

      const result = kebabCase(emptyString);
      expect(result).toEqual('');
    });
  });

  describe('snakeCase function', () => {
    it('should convert camelCase to snake_case', () => {
      const camelCaseValue = 'someValueInCamelCase';

      const result = snakeCase(camelCaseValue);
      expect(result).toEqual('some_value_in_camel_case');
    });

    it('should not change snake_case strings', () => {
      const snakeCaseValue = 'some_value_in_snake_case';

      const result = snakeCase(snakeCaseValue);
      expect(result).toEqual(snakeCaseValue);
    });

    it('should handle empty strings', () => {
      const emptyString = '';

      const result = snakeCase(emptyString);
      expect(result).toEqual('');
    });
  });
});
