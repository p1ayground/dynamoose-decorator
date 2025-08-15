import { AttributeDateSettings, AttributeDefinition } from '../type'
import { getAttributeDefinitions, setAttributeDefinitions } from '../utils/reflect-metadata'

export const Attribute =
  (definition: Partial<AttributeDefinition> = {}) =>
  (target: any, key: string) => {
    const definitions = getAttributeDefinitions(target.constructor)

    definitions[key] = {
      ...definition,
      type: definition.type || Reflect.getMetadata('design:type', target, key),
    }

    setAttributeDefinitions(target.constructor, definitions)
  }

// Attribute Settings

export const Type = (option: AttributeDefinition['type']) => (target: any, key: string) => {
  const definitions = getAttributeDefinitions(target.constructor)

  if (!definitions[key]) {
    definitions[key] = {
      type: Reflect.getMetadata('design:type', target, key),
    }
  }

  definitions[key].type = option

  setAttributeDefinitions(target.constructor, definitions)
}

export const Default = (option: AttributeDefinition['default']) => (target: any, key: string) => {
  const definitions = getAttributeDefinitions(target.constructor)

  if (!definitions[key]) {
    definitions[key] = {
      type: Reflect.getMetadata('design:type', target, key),
    }
  }

  definitions[key].default = option

  setAttributeDefinitions(target.constructor, definitions)
}

export const ForceDefault =
  (option = true) =>
  (target: any, key: string) => {
    const definitions = getAttributeDefinitions(target.constructor)

    if (!definitions[key]) {
      definitions[key] = {
        type: Reflect.getMetadata('design:type', target, key),
      }
    }

    definitions[key].forceDefault = option

    setAttributeDefinitions(target.constructor, definitions)
  }

export const Required =
  (option = true) =>
  (target: any, key: string) => {
    const definitions = getAttributeDefinitions(target.constructor)

    if (!definitions[key]) {
      definitions[key] = {
        type: Reflect.getMetadata('design:type', target, key),
      }
    }

    definitions[key].required = option

    setAttributeDefinitions(target.constructor, definitions)
  }

export const Enum = (option: AttributeDefinition['enum']) => (target: any, key: string) => {
  const definitions = getAttributeDefinitions(target.constructor)

  if (!definitions[key]) {
    definitions[key] = {
      type: Reflect.getMetadata('design:type', target, key),
    }
  }

  definitions[key].enum = option

  setAttributeDefinitions(target.constructor, definitions)
}

export const Index = (option: AttributeDefinition['index']) => (target: any, key: string) => {
  const definitions = getAttributeDefinitions(target.constructor)

  if (!definitions[key]) {
    definitions[key] = {
      type: Reflect.getMetadata('design:type', target, key),
    }
  }

  definitions[key].index = option

  setAttributeDefinitions(target.constructor, definitions)
}

export const HashKey =
  (option = true) =>
  (target: any, key: string) => {
    const definitions = getAttributeDefinitions(target.constructor)

    if (!definitions[key]) {
      definitions[key] = {
        type: Reflect.getMetadata('design:type', target, key),
      }
    }

    definitions[key].hashKey = option

    setAttributeDefinitions(target.constructor, definitions)
  }

export const RangeKey =
  (option = true) =>
  (target: any, key: string) => {
    const definitions = getAttributeDefinitions(target.constructor)

    if (!definitions[key]) {
      definitions[key] = {
        type: Reflect.getMetadata('design:type', target, key),
      }
    }

    definitions[key].rangeKey = option

    setAttributeDefinitions(target.constructor, definitions)
  }

export const Map = (option: AttributeDefinition['map']) => (target: any, key: string) => {
  const definitions = getAttributeDefinitions(target.constructor)

  if (!definitions[key]) {
    definitions[key] = {
      type: Reflect.getMetadata('design:type', target, key),
    }
  }

  definitions[key].map = option

  setAttributeDefinitions(target.constructor, definitions)
}

export const Alias = (option: AttributeDefinition['map']) => Map(option)

export const Aliases = (option: AttributeDefinition['map']) => Map(option)

export const DefaultMap = (option: AttributeDefinition['defaultMap']) => (target: any, key: string) => {
  const definitions = getAttributeDefinitions(target.constructor)

  if (!definitions[key]) {
    definitions[key] = {
      type: Reflect.getMetadata('design:type', target, key),
    }
  }

  definitions[key].defaultMap = option

  setAttributeDefinitions(target.constructor, definitions)
}

export const DefaultAlias = (option: AttributeDefinition['defaultMap']) => Map(option)

// Special

export const CreatedAt = () => (target: any, key: string) => {
  const definitions = getAttributeDefinitions(target.constructor)

  if (!definitions[key]) {
    definitions[key] = {
      type: Reflect.getMetadata('design:type', target, key),
    }
  }

  definitions[key]._specialType = 'createdAt'

  setAttributeDefinitions(target.constructor, definitions)
}

export const UpdatedAt = () => (target: any, key: string) => {
  const definitions = getAttributeDefinitions(target.constructor)

  if (!definitions[key]) {
    definitions[key] = {
      type: Reflect.getMetadata('design:type', target, key),
    }
  }

  definitions[key]._specialType = 'updatedAt'

  setAttributeDefinitions(target.constructor, definitions)
}

export const Storage = (storage: AttributeDateSettings['storage']) => (target: any, key: string) => {
  const definitions = getAttributeDefinitions(target.constructor)
  
  if (!definitions[key]) {
    definitions[key] = {
      type: Reflect.getMetadata('design:type', target, key),
    }
  }
  
  const definition = definitions[key]

  if (definition.type === Date) {
    definition.type = {
      value: definition.type,
      settings: {
        storage,
      },
    }
  } else if (typeof definition.type === 'object' && 'value' in definition.type && definition.type.value === Date) {
    definition.type = {
      value: definition.type.value,
      settings: {
        storage,
      },
    }
  }

  definitions[key] = definition

  setAttributeDefinitions(target.constructor, definitions)
}
