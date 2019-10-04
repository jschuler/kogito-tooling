const Jsonix = require('./jsonix').Jsonix;

// Load the schema rules
const SceSimRules = require('../rules/scesim').scesim;
const DmnRules = require('../rules/dmn').dmn;

// Construct a Jsonix context - a factory for unmarshaller (parser) and marshaller (serializer)
const sceSimContext = new Jsonix.Context([SceSimRules]);
const dmnContext = new Jsonix.Context([DmnRules]);

// Create an unmarshaller (scesim => json)
const sceSimUnmarshaller = sceSimContext.createUnmarshaller();
const dmnUnmarshaller = dmnContext.createUnmarshaller();

// Create a marshaller (json => scesim)
const sceSimMarshaller = sceSimContext.createMarshaller();
const dmnMarshaller = dmnContext.createMarshaller();

export const getJsonFromSceSim = scesim => {
  const unmarshalled = sceSimUnmarshaller.unmarshalString(scesim);
  console.log(unmarshalled);
  return unmarshalled;
}

export const setSceSimFromJson = json => {
  const marshalled = sceSimMarshaller.marshalString(json);
  console.log(marshalled);
  return marshalled;
}

export const getJsonFromDmn = dmn => {
  const unmarshalled = dmnUnmarshaller.unmarshalString(dmn);
  console.log(unmarshalled);
  return unmarshalled;
}

export const setDmnFromJson = json => {
  const marshalled = dmnMarshaller.marshalString(json);
  console.log(marshalled);
  return marshalled;
}