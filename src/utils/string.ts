import camelCase from "lodash-es/camelCase";
import kebabCase from "lodash-es/kebabCase";
import snakeCase from "lodash-es/snakeCase";
import startCase from "lodash-es/startCase";

export const CONVERT_CASES = {
  camel: "camel",
  snake: "snake",
  snakeUpper: "snakeUpper",
  snakeLower: "snakeLower",
  kebab: "kebab",
  kebabUpper: "kebabUpper",
  kebabLower: "kebabLower",
  start: "start",
  upper: "upper",
  lower: "lower",
};

export type CONVERT_CASES = keyof typeof CONVERT_CASES;

export const convertCase = (value: string, convertCase?: CONVERT_CASES) => {
  switch (convertCase) {
    case CONVERT_CASES.camel:
      value = camelCase(value);
      break;
    case CONVERT_CASES.snake:
      value = snakeCase(value);
      break;
    case CONVERT_CASES.snakeUpper:
      value = snakeCase(value).toUpperCase();
      break;
    case CONVERT_CASES.snakeLower:
      value = snakeCase(value).toLowerCase();
      break;
    case CONVERT_CASES.kebab:
      value = kebabCase(value);
      break;
    case CONVERT_CASES.kebabUpper:
      value = kebabCase(value).toUpperCase();
      break;
    case CONVERT_CASES.kebabLower:
      value = kebabCase(value).toLowerCase();
      break;
    case CONVERT_CASES.start:
      value = startCase(value);
      break;
    case CONVERT_CASES.upper:
      value = value.toUpperCase();
      break;
    case CONVERT_CASES.lower:
      value = value.toLowerCase();
      break;
  }

  return value.replace(/\s/g, "");
};
