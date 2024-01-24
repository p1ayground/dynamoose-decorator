import {
  getAttributeDefinitions,
  setAttributeDefinitions,
  getModelTableOptions,
  setModelTableOptions,
  getSchemaSettings,
  setSchemaSettings,
} from '../reflect-metadata';

describe('reflect-metadata', () => {
  class TestClass {}

  it('should get and set attribute definitions', () => {
    const attributeDefinitions = { key1: { type: String }, key2: { type: Number } };

    setAttributeDefinitions(TestClass, attributeDefinitions);
    
    const result = getAttributeDefinitions(TestClass);
    expect(result).toEqual(attributeDefinitions);
  });

  it('should get and set model table options', () => {
    const modelTableOptions = { create: true, waitForActive: true };

    setModelTableOptions(TestClass, modelTableOptions);

    const result = getModelTableOptions(TestClass);
    expect(result).toEqual(modelTableOptions);
  });

  it('should get and set schema settings', () => {
    const schemaSettings = { saveUnknown: true, timestamps: true };

    setSchemaSettings(TestClass, schemaSettings);
    
    const result = getSchemaSettings(TestClass);
    expect(result).toEqual(schemaSettings);
  });
});