import * as React from 'react';
import { Input } from './Input';
import { Select } from './Select';

const compare = (prevProps: any, nextProps: any) => {
  /*
   return true if passing nextProps to render would return
   the same result as passing prevProps to render,
   otherwise return false
   */

  //  check if the current row needs to be re-rendered
  // re-render should happen if a cell got activated or deactivated
  if (prevProps.activeInput !== nextProps.activeInput) {
    if (!nextProps.activeInput && prevProps.activeInput) {
      // we had a cell deactivation, check if the previous active cell was part of this row
      // ['row', '1', 'column', '2']
      const idArr: string[] = prevProps.activeInput.split(' ');
      const row = Number.parseInt(idArr[1]);
      if (row === nextProps.rowIndex) {
        console.log(`row ${nextProps.rowIndex} will re-render`);
        return false;
      }
    } else if (nextProps.activeInput && !prevProps.activeInput) {
      // we had a cell activation, check if the next active cell is part of this row
      // ['row', '1', 'column', '2']
      const idArr: string[] = nextProps.activeInput.split(' ');
      const row = Number.parseInt(idArr[1]);
      if (row === nextProps.rowIndex) {
        console.log(`row ${nextProps.rowIndex} will re-render`);
        return false;
      }
    }
  }
 
  //  do not re-render
  return true;
};

const EditorRow = React.memo<{ 
  style: any,
  rowData: any,
  rowIndex: number,
  columnNames: any,
  definitions: any,
  onSelectToggleCallback: any,
  activeInput: any,
  onActivateInput: any,
  onCellClick: any,
  onCellDoubleClick: any,
  deactivateAndFocusCell: any,
  setEditable: any
}>(({
  style,
  rowData, 
  rowIndex,
  columnNames, 
  definitions, 
  onSelectToggleCallback, 
  activeInput, 
  onActivateInput, 
  onCellClick,
  onCellDoubleClick,
  deactivateAndFocusCell,
  setEditable
}) => {
  // console.log('render EditorRow');
  return (
    <div className="kie-grid__rule" style={style}>
      {rowData.map((cell: any, index: number) => {
        // get the type of the column to pass on to the input for formatting / validation
        let type = 'string';
        let columnGroup = '';
        let columnName = '';
        if (index === 0) {
          // row index
          type = 'number';
        } else if (index === 1) {
          // description
          type = 'string';
        } else if (index > 1) {
          columnGroup = columnNames[index].group;
          columnName = columnNames[index].name;
          type = (definitions.map[columnNames[index].group] && definitions.map[columnGroup][columnName]) || 'string';
        }
        const cellIndex = index;
        const value = cell && cell.value ? cell.value : '';
        const path = cell && cell.path ? cell.path : '';
        // const cellId = `cell ${cellIndex}`;
        const inputId = `row ${rowIndex} column ${cellIndex}`;
        let component;
        const typeArr = type.split(', ');
        if (typeArr.length > 1) {
          // Multiple options, render Select
          component = (
            <Select 
              isReadOnly={inputId !== activeInput} 
              id={inputId} 
              onSelectToggleCallback={onSelectToggleCallback} 
              options={typeArr} 
              originalValue={value}
              deactivateAndFocusCell={deactivateAndFocusCell}
              setEditable={setEditable}
            />
          );
        } else {
          component = (
            <Input
              isReadOnly={inputId !== activeInput} 
              onActivateInput={onActivateInput} 
              originalValue={value} 
              path={path} 
              type={type} 
              id={inputId} 
              deactivateAndFocusCell={deactivateAndFocusCell}
              setEditable={setEditable}
            />
          );
        }
        return (
          <div className="kie-grid__item" key={inputId} onClick={onCellClick} onDoubleClick={onCellDoubleClick}>
            {cellIndex === 0 ? value : component}
          </div>
        )
      })}
    </div>
  );
}, compare);

// @ts-ignore
EditorRow.whyDidYouRender = {
  customName: 'EditorRow'
};

export { EditorRow };
