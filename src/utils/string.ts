export function kebabCase(value: string) {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function snakeCase(value: string) {
  return value.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}
