const Jsonix = require('./jsonix').Jsonix;
// Load the schema rules generated from scesim.xsd
const Rules = require('../../generated/rules').rules;
// First we construct a Jsonix context - a factory for unmarshaller (parser)
// and marshaller (serializer)
const context = new Jsonix.Context([Rules]);
// Then we create a unmarshaller (scesim => json)
const unmarshaller = context.createUnmarshaller();
// Also create marshaller (json => scesim)
const marshaller = context.createMarshaller();

export const getJsonFromSceSim = scesim => {
  console.log(`before scesim`);
  console.log(scesim);
  return unmarshaller.unmarshalString(scesim);
}

export const setSceSimFromJson = json => {
  console.log(`before json`);
  console.log(json);
  const asd = marshaller.marshalString(json);
  console.log(asd);
  return asd;
}