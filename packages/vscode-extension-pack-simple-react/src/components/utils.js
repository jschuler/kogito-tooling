// @ts-ignore
import ViolationScenarios from '!!raw-loader!../../data/ViolationScenarios.scesim';
const Jsonix = require('./jsonix').Jsonix;
// Load the schema rules generated from scesim.xsd
const Rules = require('../../generated/rules').rules;

export const getJsonFromSceSim = () => {
  // First we construct a Jsonix context - a factory for unmarshaller (parser)
  // and marshaller (serializer)
  const context = new Jsonix.Context([Rules]);
  // Then we create a unmarshaller
  const unmarshaller = context.createUnmarshaller();
  const objectFromXMLString = unmarshaller.unmarshalString(ViolationScenarios);

  return objectFromXMLString;
}