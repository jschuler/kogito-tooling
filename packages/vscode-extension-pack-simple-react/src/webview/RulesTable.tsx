import * as React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  sortable,
  SortByDirection,
  headerCol,
  TableVariant,
  expandable,
  cellWidth,
  IRow,
  IRowData,
  IExtra,
  IActionsResolver,
  IAction,
  ISeparator,
  TableProps
} from '@patternfly/react-table';

 export class RulesTable extends React.Component<{ className?: string }, { columns: any, rows: IRow[] }> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      columns: [
        { title: 'Repositories', cellTransforms: [headerCol()] },
        'Branches',
        { title: 'Pull requests' },
        'Workspaces',
        'Last Commit'
      ],
      rows: [
        {
          cells: ['one', 'two', 'a', 'four', 'five'],
          type: 'green'
        },
        {
          cells: ['a', 'two', 'k', 'four', 'five']
        },
        {
          cells: ['p', 'two', 'b', 'four', 'five'],
          type: 'blue'
        },
        {
          cells: ['5', '2', 'b', 'four', 'five']
        }
      ]
    };
  }

   actionResolver(rowData: IRowData, { rowIndex }: IExtra) {
    if (rowIndex === 1) {
      return null;
    }

     const thirdAction =
      rowData.type === 'blue'
        ? [
            {
              isSeparator: true
            } as ISeparator,
            {
              title: 'Third action',
              // tslint:disable-next-line:no-shadowed-variable
              onClick: (event, rowId, rowData, extra) =>
                // tslint:disable-next-line:no-console
                console.log(`clicked on Third action, on row ${rowId} of type ${rowData.type}`)
            } as IAction
          ]
        : [];

     return [
      {
        title: 'Some action',
        // tslint:disable-next-line:no-shadowed-variable
        onClick: (event, rowId, rowData, extra) =>
          // tslint:disable-next-line:no-console
          console.log(`clicked on Some action, on row ${rowId} of type ${rowData.type}`)
      } as IAction,
      {
        title: 'Another action',
        // tslint:disable-next-line:no-shadowed-variable
        onClick: (event, rowId, rowData, extra) =>
          // tslint:disable-next-line:no-console
          console.log(`clicked on Another action, on row ${rowId} of type ${rowData.type}`)
      } as IAction,
      ...thirdAction
    ];
  }

   areActionsDisabled(rowData: any, { rowIndex }: any) {
    return rowIndex === 3;
  }

   componentDidMount() {
    window.scrollTo(0, 0)
  }

   render() {
    const { columns, rows } = this.state;
    const { className } = this.props;
    return (
      <Table
        className={className}
        variant={TableVariant.compact}
        caption="Actions Table"
        cells={columns}
        rows={rows}
        //@ts-ignore
        actionResolver={this.actionResolver}
        areActionsDisabled={this.areActionsDisabled}
      >
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
} 