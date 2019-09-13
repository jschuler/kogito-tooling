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

export const getColumns = data => {
  let columnDefsOther = [];
  let columnDefsGiven = [];
  let columnDefsExpect = [];
  const { factMapping } = data.value.simulation.simulationDescriptor.factMappings;
  factMapping.forEach(col => {
    const type = col.expressionIdentifier.type; // OTHER | GIVEN | EXPECT
    const field = col.expressionIdentifier.name;
    if (type === 'OTHER') {
      const name = col.factAlias;
      columnDefsOther.push({ name });
    } else {
      const name = col.expressionAlias;
      const group = col.factAlias;
      if (type === 'GIVEN') {
        columnDefsGiven.push({ name, group });
      } else {
        // EXPECT
        columnDefsExpect.push({ name, group });
      }
    }
  });
  return {
    other: columnDefsOther,
    given: columnDefsGiven,
    expect: columnDefsExpect
  };
}

export const getRows = data => {
  const rows = [];
  const { scenario } = data.value.simulation.scenarios;
  scenario.forEach(dataRow => {
    let row = [];
    const columns = dataRow.factMappingValues.factMappingValue;
    columns.forEach(col => {
      const { value } = col.rawValue;
      row.push({ value });
    });
    rows.push(columns);
  });
  return rows;
}