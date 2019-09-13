import React from 'react';
import { Table, TableHeader, TableBody, RowWrapper, TableVariant, ExpandableRowContent } from '@patternfly/react-table';
import {
  editableTableBody,
  editableRowWrapper,
  inlineEditFormatterFactory,
  TableEditConfirmation,
  TableTextInput
} from '@patternfly/react-inline-edit-extension';
import { Dropdown, DropdownToggle, DropdownItem, Checkbox } from '@patternfly/react-core';
import { getJsonFromSceSim, getColumns, getRows } from './util';

class ScenarioEditor extends React.Component {
  constructor(props) {
    super(props);

    const data = getJsonFromSceSim();
    // console.log(data);
    // console.log(getColumns(data));
    // console.log(getRows(data));

    // text input
    const textInputFormatter = inlineEditFormatterFactory({
      renderEdit: (value, { columnIndex, rowIndex, column }, { activeEditId }) => {
        const id = this.makeId({ rowIndex, columnIndex, column });
        return (
          <TableTextInput
            id={id}
            defaultValue={value}
            onBlur={newValue =>
              this.onChange(newValue, {
                rowIndex,
                columnIndex
              })
            }
            autoFocus={activeEditId === id}
          />
        );
      }
    });

    // dropdown
    const violationTypesFormatter = inlineEditFormatterFactory({
      resolveValue: (value, { rowData }) => rowData.data.violationType,
      renderEdit: (violationType, { column, rowData, columnIndex, rowIndex }, { activeEditId }) => {
        const dropdownItems = column.data.dropdownItems.map(item => <DropdownItem key={item}>{item}</DropdownItem>);
        const toggleId = this.makeId({ rowIndex, columnIndex, column, name: 'toggle' });
        return (
          <Dropdown
            id={this.makeId({ rowIndex, columnIndex, column, name: 'dropdown' })}
            onSelect={event =>
              this.onViolationTypeChange({ selected: event.target.text, isDropdownOpen: false }, { rowIndex })
            }
            toggle={
              <DropdownToggle
                id={toggleId}
                autoFocus={activeEditId === toggleId}
                onToggle={() => this.onViolationTypeChange({ isDropdownOpen: !violationType.isDropdownOpen }, { rowIndex })}
              >
                {violationType.selected}
              </DropdownToggle>
            }
            isOpen={violationType.isDropdownOpen}
            dropdownItems={dropdownItems}
          />
        );
      },
      renderValue: violationType => violationType.selected
    });

    // checkbox
    const decisionOutcomeFormatter = inlineEditFormatterFactory({
      resolveValue: (value, { rowData }) => rowData.data.decisionOutcome,
      renderEdit: (decisionOutcome, { column, columnIndex, rowIndex }) => (
        <Checkbox
          id={this.makeId({ rowIndex, columnIndex, column })}
          isChecked={decisionOutcome}
          onChange={value =>
            this.onDecisionOutcomeChange(value, {
              rowIndex,
              columnIndex
            })
          }
          aria-label="checkbox"
        />
      ),
      renderValue: (decisionOutcome, { columnIndex, rowIndex, column }) => (
        <Checkbox
          id={this.makeId({ rowIndex, columnIndex, column })}
          isChecked={decisionOutcome}
          isDisabled
          aria-label="checkbox"
        />
      )
    });

    this.state = {
      columns: [
        {
          title: '#',
        },
        {
          title: 'Scenario Description',
          cellFormatters: [textInputFormatter]
        },
        {
          title: 'Points',
          cellFormatters: [textInputFormatter]
        },
        {
          title: 'Type',
          cellFormatters: [violationTypesFormatter],
          data: {
            dropdownItems: ['speed', 'parking']
          }
        },
        {
          title: 'Speed Limit',
          cellFormatters: [textInputFormatter]
        },
        {
          title: 'Actual Speed',
          cellFormatters: [textInputFormatter]
        },
        {
          title: 'Points',
          cellFormatters: [textInputFormatter]
        },
        {
          title: 'Amount',
          cellFormatters: [textInputFormatter]
        },
        {
          title: 'value',
          cellFormatters: [decisionOutcomeFormatter]
        },
      ],
      rows: [
        {
          cells: [1, 'Above speed limit: 10km/h and 30 km/h', 10, null, 100, 120, 3, 500, null],
          data: {
            violationType: {
              selected: 'speed',
              isDropdownOpen: false
            },
            decisionOutcome: false
          }
          // isEditing: true,
        },
        {
          cells: [2, 'Above speed limit: more than 30 km/h', 10, null, 100, 150, 7, 1000, null],
          data: {
            violationType: {
              selected: 'speed',
              isDropdownOpen: false
            },
            decisionOutcome: true
          }
          // isEditing: true,
        },
        {
          cells: [3, 'Parking violation', 10, null, null, null, 1, 100, null],
          data: {
            violationType: {
              selected: 'parking',
              isDropdownOpen: false
            },
            decisionOutcome: false
          }
          // isEditing: true,
        }
      ],
      // eslint-disable-next-line react/no-unused-state
      editedRowBackup: null,
      activeEditId: null
    };

    this.WORKSPACE_COL = 3; //dropdown
    this.PRIVATE_REPO_COL = 8; //cb
    this.ACTIONS_COL = 9;

    this.makeId = ({ column, rowIndex, columnIndex, name }) =>
      `${column.property}-${rowIndex}-${columnIndex}${name ? `-${name}` : ''}`;

    this.onDecisionOutcomeChange = (value, { rowIndex }) => {
      this.setState(({ rows }) => {
        const row = rows[rowIndex];
        row.data.decisionOutcome = value;
        return { rows };
      });
    };

    this.onViolationTypeChange = (value, { rowIndex }) => {
      this.setState(({ rows }) => {
        const row = rows[rowIndex];
        row.data.violationType = Object.assign({}, row.data.violationType, value);
        return { rows };
      });
    };

    this.onChange = (value, { rowIndex, columnIndex }) => {
      this.setState(({ rows }) => {
        rows = [...rows];
        const row = rows[rowIndex];
        row.cells[columnIndex] = value;
        return {
          rows,
          activeEditId: null // stop autoFocus
        };
      });
    };

    this.idEquals = (elementId, activeEditId, { rowIndex, columnIndex }) => {
      if (columnIndex === this.WORKSPACE_COL) {
        // equality for dropdowns should take toggle vs dropdown id clicks into account
        const genericDropdownId = this.makeId({
          rowIndex,
          columnIndex,
          column: { property: 'violationTypes' }
        });
        return (
          elementId &&
          activeEditId &&
          elementId.startsWith(genericDropdownId) &&
          activeEditId.startsWith(genericDropdownId)
        );
      }
      return elementId === activeEditId;
    };

    this.onEditCellClicked = (event, clickedRow, { rowIndex, columnIndex, elementId }) => {
      if (
        !this.idEquals(elementId, this.state.activeEditId, { rowIndex, columnIndex }) &&
        clickedRow.isEditing &&
        columnIndex !== this.ACTIONS_COL
      ) {
        this.setState(({ rows }) => ({
          activeEditId: elementId,
          rows: rows.map((row, id) => {
            if (id === rowIndex) {
              if (elementId && columnIndex === this.WORKSPACE_COL) {
                row.data.violationType.isDropdownOpen = !row.data.violationType.isDropdownOpen;
              } else {
                if (elementId && columnIndex === this.PRIVATE_REPO_COL) {
                  row.data.decisionOutcome = !row.data.decisionOutcome;
                }
                row.data.violationType.isDropdownOpen = false;
              }
            }
            return row;
          })
        }));
      }
    };

    this.onEditActionClick = (event, rowId) => {
      this.setState(
        ({ rows, editedRowBackup }) =>
          !editedRowBackup && {
            editedRowBackup: JSON.parse(JSON.stringify(rows[rowId])), // clone
            rows: rows.map((row, id) => {
              row.isEditing = id === rowId;
              return row;
            })
          }
      );
    };

    this.onEditConfirmed = (event, clickedRow, { rowIndex }) => {
      this.setState(({ rows }) => {
        rows = [...rows];
        rows[rowIndex].isEditing = false;
        return {
          rows,
          editedRowBackup: null,
          activeEditId: null
        };
      });
    };

    this.onEditCanceled = (event, clickedRow, { rowIndex }) => {
      this.setState(({ rows, editedRowBackup }) => {
        rows = [...rows];
        rows[rowIndex] = editedRowBackup;
        return {
          rows,
          editedRowBackup: null,
          activeEditId: null
        };
      });
    };

    this.actionResolver = rowData =>
      rowData.isTableEditing
        ? null
        : [
            {
              title: 'Edit',
              onClick: this.onEditActionClick
            }
          ];
  }

  render() {
    const { columns, rows, activeEditId } = this.state;
    const editConfig = {
      activeEditId,
      onEditCellClicked: this.onEditCellClicked,
      editConfirmationType: TableEditConfirmation.ROW,
      onEditConfirmed: this.onEditConfirmed,
      onEditCanceled: this.onEditCanceled
    };

    const ComposedBody = editableTableBody(TableBody);
    const ComposedRowWrapper = editableRowWrapper(RowWrapper);

    return (
      <Table
        caption="Test scenarios"
        cells={columns}
        rows={rows}
        rowWrapper={ComposedRowWrapper}
        actionResolver={this.actionResolver}
      >
        <TableHeader />
        <ComposedBody editConfig={editConfig} />
      </Table>
    );
  }
}

export default ScenarioEditor;