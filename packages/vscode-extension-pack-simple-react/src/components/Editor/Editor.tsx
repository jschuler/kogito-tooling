import * as React from "react";
import "./Editor.css";
import { getColumns, getRows } from "./gridUtils";

const Editor: React.FC<{ data: any }> = ({ data }) => {
  const [columnDefs, setColumnDefs] = React.useState<any>({});
  const [rowData, setRowData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const allColumns = getColumns(data, true);
    console.log(allColumns);
    setColumnDefs(allColumns);
    setRowData(getRows(data));
    setLoading(false);
    setTimeout(() => {
      setNumGivenColumns(allColumns.numGiven);
      setNumExpectColumns(allColumns.numExpect);
    }, 1)
  }, [data]);

  const setNumGivenColumns = (num: number) => {
    document
      .getElementById("kie-grid")!
      .style.setProperty("--num-given-columns", num.toString());
  };

  const setNumExpectColumns = (num: number) => {
    document
      .getElementById("kie-grid")!
      .style.setProperty("--num-expect-columns", num.toString());
  };

  console.log('state update');

  return loading ? <div>Loading</div> : (
    <div id="kie-grid" className="kie-grid">
      {columnDefs.other.map((other: { name: string }, index: number) => {
        if (index === 0) {
          return <div className="kie-grid__item kie-grid__number" key="other-number">{other.name}</div>
        } else {
          return (
            <div className="kie-grid__item kie-grid__description" key="other-description">{other.name}</div>
          )
        }
      })}
      {/* The GIVEN and EXPECT groups are always there so this can be hardcoded */}
      <div className="kie-grid__header--given">
        <div className="kie-grid__item kie-grid__given">GIVEN</div>
      </div>
      <div className="kie-grid__header--expect">
        <div className="kie-grid__item kie-grid__expect">EXPECT</div>
      </div>

      {/* <!-- grid instance headers need to have a grid-column span set --> */}
      <div className="kie-grid__header--given">
        {columnDefs.given.map((given: any, index: number) => (
          <div
            key={`given instance ${index}`}
            className="kie-grid__item kie-grid__instance"
            style={{ gridColumn: `span ${given.children.length}` }}
          >
            {given.group}
          </div>
        ))}
      </div>

      <div className="kie-grid__header--expect">
        {columnDefs.expect.map((expect: any, index: number) => (
          <div
            key={`expect instance ${index}`}
            className="kie-grid__item kie-grid__instance"
            style={{ gridColumn: `span ${expect.children.length}` }}
          >
            {expect.group}
          </div>
        ))}
      </div>

      <div className="kie-grid__header--given">
        {columnDefs.given.map((given: any, index: number) => {
          return given.children.map((givenChild: any, index: number) => (
            <div key={`given property ${index}`} className="kie-grid__item kie-grid__property">{givenChild.name}</div>
          ));
        })}
      </div>
      <div className="kie-grid__header--expect">
        {columnDefs.expect.map((expect: any, index: number) => {
          return expect.children.map((expectChild: any, index: number) => (
            <div key={`expect property ${index}`} className="kie-grid__item kie-grid__property">{expectChild.name}</div>
          ));
        })}
      </div>

      {rowData.map((row, index) => {
        const rowIndex = index;
        return (
          <div className="kie-grid__rule" key={`row ${rowIndex}`}>
            {row.map((cell: any, index: number) => {
              const cellIndex = index;
              return (
                <div className="kie-grid__item" key={`cell ${cellIndex}`}>
                  {cellIndex === 0 ? <>{cell}</> : <input
                    className="pf-c-form-control"
                    type="text"
                    defaultValue={cell}
                    id={`row ${rowIndex} cell ${cellIndex}`}
                    aria-label={cell}
                  />}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  );
};

export { Editor };
