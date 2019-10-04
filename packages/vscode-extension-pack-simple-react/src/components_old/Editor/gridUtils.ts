export const getColumnNames = (data: {
  value: {
    simulation: {
      simulationDescriptor: { factMappings: { factMapping: any } };
    };
  };
}) => {
  let columns: any[] = [];
  const {
    factMapping
  } = data.value.simulation.simulationDescriptor.factMappings;
  factMapping.forEach(
    (col: {
      expressionIdentifier: { type: any; name: any };
      factAlias: any;
      expressionAlias: any;
    }) => {
      const type = col.expressionIdentifier.type; // OTHER | GIVEN | EXPECT
      // const field = col.expressionIdentifier.name;
      let name;
      if (type === "OTHER") {
        name = col.factAlias;
      } else {
        name = col.expressionAlias;
      }
      columns.push(name);
    }
  );
  return columns;
};

export const getColumns = (data: {
  value: {
    simulation: {
      simulationDescriptor: { factMappings: { factMapping: any } };
    };
  };
}, byGroup: boolean = false) => {
  let columnDefsOther: { name: any }[] = [];
  let columnDefsGiven: Array<({ name: any; group: any; children?: undefined; } | { group: any; children: { name: any; }[]; name?: undefined; })> = [];
  let columnDefsExpect: Array<({ name: any; group: any; children?: undefined; } | { group: any; children: { name: any; }[]; name?: undefined; })> = [];
  let numGiven: number = 0;
  let numExpect: number = 0;
  const {
    factMapping
  } = data.value.simulation.simulationDescriptor.factMappings;
  factMapping.forEach(
    (col: {
      expressionIdentifier: { type: any; name: any };
      factAlias: any;
      expressionAlias: any;
    }) => {
      const type = col.expressionIdentifier.type; // OTHER | GIVEN | EXPECT
      // const field = col.expressionIdentifier.name;
      if (type === "OTHER") {
        const name = col.factAlias;
        columnDefsOther.push({ name });
      } else {
        const name = col.expressionAlias;
        const group = col.factAlias;
        if (!byGroup) {
          if (type === "GIVEN") {
            numGiven = numGiven + 1;
            columnDefsGiven.push({ name, group });
          } else {
            // EXPECT
            numExpect = numExpect + 1;
            columnDefsExpect.push({ name, group });
          }
        } else {
          if (type === "GIVEN") {
            numGiven = numGiven + 1;
            // check if the group already exists, if so push to it, otherwise create a new group
            if (columnDefsGiven.length === 0 || columnDefsGiven[columnDefsGiven.length - 1].group !== group) {
              // new group
              columnDefsGiven.push({ group, children: [{ name }] });
            } else {
              // push to last group
              columnDefsGiven[columnDefsGiven.length - 1].children!.push({ name })
            }
          } else {
            // EXPECT
            numExpect = numExpect + 1;
            // check if the group already exists, if so push to it, otherwise create a new group
            if (columnDefsExpect.length === 0 || columnDefsExpect[columnDefsExpect.length - 1].group !== group) {
              // new group
              columnDefsExpect.push({ group, children: [{ name }] });
            } else {
              // push to last group
              columnDefsExpect[columnDefsExpect.length - 1].children!.push({ name })
            }
          }
        }
      }
    }
  );
  return {
    other: columnDefsOther,
    given: columnDefsGiven,
    expect: columnDefsExpect,
    numGiven,
    numExpect
  };
};

export const getRows = (data: {
  value: { simulation: { scenarios: { scenario: any } } };
}) => {
  const rows: any[] = [];
  const { scenario } = data.value.simulation.scenarios;
  scenario.forEach(
    (dataRow: { factMappingValues: { factMappingValue: any } }) => {
      let row: any[] = [];
      const columns = dataRow.factMappingValues.factMappingValue;
      columns.forEach((col: { rawValue?: { value: any } }) => {
        if (!col.rawValue) {
          row.push(null);
        } else {
          const { value } = col.rawValue;
          row.push(value);
        }
      });
      // for some reason the last item is the index, it should be at the front
      if (row.length) {
        row.unshift(row.pop()!)
      }
      rows.push(row);
    }
  );
  return rows;
};
