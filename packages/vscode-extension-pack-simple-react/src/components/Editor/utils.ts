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
      let name = col.expressionAlias || '';
      let group = col.factAlias || '';
      columns.push({
        name,
        group
      });
    }
  );
  return columns;
};

type Column = Array<({ name: any; group: any; children?: undefined; } | { group: any; children: { name: any; }[]; name?: undefined; })>;

export const getColumns = (data: {
  value: {
    simulation: {
      simulationDescriptor: { factMappings: { factMapping: any } };
    };
  };
}, byGroup: boolean = false, typeDefinitions?: any) => {
  let columnDefsOther: { name: any }[] = [];
  let columnDefsGiven: Column = [];
  let columnDefsExpect: Column = [];
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
  // construct the path so we can save back to the same location in the json file
  const dataPathRoot: string = 'value.simulation.scenarios.scenario';
  const rows: any[] = [];
  const { scenario } = data.value.simulation.scenarios;
  scenario.forEach(
    (dataRow: { factMappingValues: { factMappingValue: any } }, index: number) => {
      const dataPath = `${dataPathRoot}[${index}].factMappingValues.factMappingValue`;
      let row: any[] = [];
      const columns = dataRow.factMappingValues.factMappingValue;
      columns.forEach((col: { rawValue?: { value: any } }, index: number) => {
        if (!col.rawValue) {
          row.push(null);
        } else {
          const path = `${dataPath}[${index}].rawValue.value`;
          const { value } = col.rawValue;
          row.push({
            value,
            path
          });
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

export const getDefinitions = (data: { value: { itemDefinition?: any; drgElement?: any; name?: any; }; }) => {
  let definitions: any = {};
  const title = data.value.name;
  const { itemDefinition } = data.value;
  const elementsMap: any = {};
  itemDefinition.forEach((def: any) => {
    // let definitionName = def.name.substring(1);
    let definitionTypes = {} as any;
    // let definition = {
    //   name: def.name.substring(1),
    //   types: {} as any
    // };
    const { itemComponent } = def;
    itemComponent.forEach((type: { name: any; typeRef: any; }) => {
      definitionTypes[type.name] = type.typeRef;
      // definition.types.push({
      //   name: type.name,
      //   type: type.typeRef
      // });
    });
    // definitions.push(definition);
    definitions[def.name] = definitionTypes;
  });

  const { drgElement } = data.value;
  const typeDefinitions: any = {
    '_title': title,
    simple: [],
    complex: [],
    map: {}
  };
  drgElement.forEach((element: any) => {
    const type = element.name.localPart; // inputData | decision
    const text = element.value.name;
    const question = element.value.question;
    const choices = element.value.allowedAnswers || null;
    const typeRef = element.value.variable.typeRef; // e.g. tViolation, tFine, tDriver, string
    typeDefinitions[typeRef.charAt(0) === 't' ? 'complex' : 'simple'].push(
      {
        typeRef,
        type,
        text,
        choices,
        question,
        elements: definitions[typeRef] || {
          value: choices
        }
      }
    );
    typeDefinitions.map[text] = definitions[typeRef] || {
      value: choices
    };
  });
  return typeDefinitions;
}

export const setCaretPosition = (element: any, caretPos: number) => {
  // (el.selectionStart === 0 added for Firefox bug)
  if (element.selectionStart || element.selectionStart === 0) {
    element.focus();
    element.setSelectionRange(caretPos, caretPos);
    return true;
  }
}

export const setCaretPositionAtEnd = (element: HTMLInputElement) => {
  const end = element.value.length;
  setCaretPosition(element, end);
};