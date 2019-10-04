import * as React from 'react';
import { EditorRow } from './EditorRow';
import { getColumns, getRows, getColumnNames, setCaretPositionAtEnd } from "./utils";
import { useKeyPress } from './useKeyPress';
// import { useInfiniteScroll } from './useInfiniteScroll';
// @ts-ignore
import InfiniteScroll from 'react-infinite-scroll-component';
// import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames';
import { Spinner } from '../Spinner';
import "./Editor.css";

const Editor: React.FC<{ data: any, definitions: any, className?: string }> = ({ data, definitions, className }) => {
  const [editableCell, setEditable] = React.useState<string>('');
  const [expandedSelect, setExpandedSelect] = React.useState(false);

  const editorRef = React.useRef(null);

  const rowsToFetch = 50;

  const allColumns = getColumns(data, true, definitions);
  let allRows = getRows(data);
  const allColumnNames = getColumnNames(data);
  // console.log(allColumnNames);
  // console.log(allColumns);
  // console.log(allRows);
  const columnNames = allColumnNames;
  const columnDefs = allColumns;
  for (let i = 0; i < 2000; i++) {
    const clonedArray = JSON.parse(JSON.stringify(allRows[0]))
    clonedArray[0].value = (i + 6).toString();
    allRows.push(clonedArray);
  }
  const rowData = allRows;
  const rowDataLength = allRows.length;

  
  const [currentPage, setCurrentPage] = React.useState(1);
  const [fetchedRows, setFetchedRows] = React.useState(rowData.slice(0, rowsToFetch));

  React.useEffect(() => {
    setTimeout(() => {
      setNumGivenColumns(allColumns.numGiven);
      setNumExpectColumns(allColumns.numExpect);
    }, 1)
  }, []);

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

  const focusCell = (id: string) => {
    if (id) {
      console.log(`focusing ${id}`);
      setTimeout(() => {
        document.getElementById(id)!.focus();
      }, 1)
    }
  }

  const activateCell = (id: string) => {
    if (id) {
      console.log(`editing: ${id}`);
      setEditable(id);
    }
  }

  const deactivateCell = () => {
    setEditable('');
  }

  const activateAndFocusCell = (id: string) => {
    activateCell(id);
    focusCell(id);
  }

  const deactivateAndFocusCell = (id: string) => {
    deactivateCell();
    focusCell(id);
  }

  const onCellClick = (event: any) => {
    const { id } = event.target;
    if (id === editableCell) {
      // already active
      return null;
    }
    console.log(`selected: ${id}`);
    console.log(`current editableCell: ${editableCell}`);
    if (editableCell) {
      // get out of a previous cell editing mode
      deactivateCell();
    }
    return id;
  };

  const onTabKeyPress = (event: any) => {
    // small timeout to let the browser focus a cell first
    setTimeout(() => {
      onCellClick(event);
    }, 1)
    onCellClick(event);
  };

  /**
   * Enter editing mode
   */
  const onCellDoubleClick = (event: any) => {
    const id = onCellClick(event);
    if (id) {
      activateAndFocusCell(id);
    }
  }

  /**
   * Enter editing mode
   */
  const onEnter = (event: any) => {
    // don't want Input's onEnter listener to fire
    event.stopPropagation();
    onCellDoubleClick(event);
  };

  /**
   * Up arrow key
   */
  const onUpKeyPress = (event: any) => {
    const activeElement = (document && document.activeElement && document.activeElement.getAttribute('id')) || '';
    if (expandedSelect) {
      return;
    }
    if (editableCell) {
      return;
    }
    const currentId = activeElement;
    const minRow = 0;
    let targetId;
    if (currentId) {
      // ['row', '1', 'column', '2']
      const currentIdArr: string[] = currentId.split(' ');
      const currentRow = Number.parseInt(currentIdArr[1]);
      // going up means decrementing the row
      const newRow = currentRow - 1;
      if (newRow < minRow) {
        return;
      } else {
        targetId = `row ${newRow} column ${currentIdArr[3]}`;
        console.log('up');
        focusCell(targetId);
      }
    }
  };

  /**
   * Down arrow key
   */
  const onDownKeyPress = (event: any) => {
    const activeElement = (document && document.activeElement && document.activeElement.getAttribute('id')) || '';
    if (expandedSelect) {
      return;
    }
    if (editableCell) {
      return;
    }
    const currentId = activeElement;
    const maxRow = rowDataLength - 1;
    let targetId;
    if (currentId) {
      // ['row', '1', 'column', '2']
      const currentIdArr: string[] = currentId.split(' ');
      const currentRow = Number.parseInt(currentIdArr[1]);
      // going down means incrementing the row
      const newRow = currentRow + 1;
      if (newRow > maxRow) {
        return;
      } else {
        targetId = `row ${newRow} column ${currentIdArr[3]}`;
        console.log('down');
        focusCell(targetId);
      }
    }
  };

  /**
   * Left arrow key
   */
  const onLeftKeyPress = (event: any) => {
    const activeElement = (document && document.activeElement && document.activeElement.getAttribute('id')) || '';
    if (expandedSelect) {
      return;
    }
    if (editableCell) {
      return;
    }
    const currentId = activeElement;
    const minCol = 1;
    let targetId;
    if (currentId) {
      // ['row', '1', 'column', '2']
      const currentIdArr: string[] = currentId.split(' ');
      const currentCol = Number.parseInt(currentIdArr[3]);
      // going left means decrementing the column
      const newCol = currentCol - 1;
      if (newCol < minCol) {
        return;
      } else {
        targetId = `row ${currentIdArr[1]} column ${newCol}`;
        console.log('left');
        focusCell(targetId);
      }
    }
  };

  /**
   * Right arrow key
   */
  const onRightKeyPress = (event: any) => {
    const activeElement = (document && document.activeElement && document.activeElement.getAttribute('id')) || '';
    if (expandedSelect) {
      return;
    }
    if (editableCell) {
      return;
    }
    const currentId = activeElement;
    const maxCol = columnDefs.numGiven + columnDefs.numExpect + 1;
    let targetId;
    if (currentId) {
      // ['row', '1', 'column', '2']
      const currentIdArr: string[] = currentId.split(' ');
      const currentCol = Number.parseInt(currentIdArr[3]);
      // going right means incrementing the column
      const newCol = currentCol + 1;
      if (newCol > maxCol) {
        return;
      } else {
        targetId = `row ${currentIdArr[1]} column ${newCol}`;
        console.log('right');
        focusCell(targetId);
      }
    }
  };

  /**
   * Copy cell listener
   */
  const onCopy = (event: any) => {
    /* Get the text field */
    const copyText = event.target;
    if (copyText) {
      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
      /* Copy the text inside the text field */
      document.execCommand('copy');
      // do not mark the whole text as selected
      setCaretPositionAtEnd(copyText);
      console.log(`Copied the text: ${copyText.value}`);
    }
  };

  // Command / CTRL + C copies the focused cell content
  useKeyPress(/c/i, onCopy, { log: 'editor', withModifier: true });
  useKeyPress('Enter', onEnter, { log: 'editor', isActive: !editableCell });
  useKeyPress('Tab', onTabKeyPress, { log: 'editor' });
  useKeyPress(38, onUpKeyPress, { log: 'editor' });
  useKeyPress(40, onDownKeyPress, { log: 'editor' });
  useKeyPress(37, onLeftKeyPress, { log: 'editor' });
  useKeyPress(39, onRightKeyPress, { log: 'editor' });

  const onSelectToggleCallback = (id: any, isExpanded: boolean) => {
    setExpandedSelect(isExpanded);
  };

  // rowData
  const fetchMoreRows = (page?: number) => {
    setTimeout(() => {
      if (page) {
        setFetchedRows(prevState => ([...prevState, ...rowData.slice(page * rowsToFetch, page * rowsToFetch + rowsToFetch)]));
      } else {
        setFetchedRows(prevState => ([...prevState, ...rowData.slice(currentPage * rowsToFetch, currentPage * rowsToFetch + rowsToFetch)]));
        setCurrentPage(currentPage + 1);
      }
    }, 1);
  };

  console.log('render Editor');
  return (
    <div id="kie-grid" className={classNames('kie-grid', className)} ref={editorRef}>
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

      <div className="kie-grid__body">
        <InfiniteScroll
          dataLength={fetchedRows.length} //This is important field to render the next data
          next={fetchMoreRows}
          hasMore={fetchedRows.length < rowData.length}
          loader={<Spinner text="Loading more rows..." />}
        >
            {fetchedRows.map((row, index) => (
              <EditorRow
                key={`row ${index}`}
                rowData={rowData[index]} 
                rowIndex={index}
                columnNames={columnNames}
                definitions={definitions}
                onSelectToggleCallback={onSelectToggleCallback}
                activeInput={editableCell}
                onActivateInput={activateAndFocusCell}
                setEditable={setEditable}
                onCellClick={onCellClick}
                onCellDoubleClick={onCellDoubleClick}
                style={{}}
                deactivateAndFocusCell={deactivateAndFocusCell}
              />
            ))}
        </InfiniteScroll>
      </div>
      {/* <InfiniteScroll
        style={{ display: 'contents' }}
        pageStart={1}
        loadMore={fetchMoreRows}
        hasMore={true || fetchedRows.length < rowData.length}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {fetchedRows.map((row, index) => (
          <EditorRow
            key={`row ${index}`}
            rowData={rowData[index]} 
            rowIndex={index}
            columnNames={columnNames}
            definitions={definitions}
            onSelectToggleCallback={onSelectToggleCallback}
            activeInput={editableCell}
            onActivateInput={activateAndFocusCell}
            setActiveInput={setEditable}
            onCellClick={onCellClick}
            onCellDoubleClick={onCellDoubleClick}
            style={{}}
            deactivateAndFocusCell={deactivateAndFocusCell}
          />
        ))}
      </InfiniteScroll> */}
    </div>
  );
};

// @ts-ignore
Editor.whyDidYouRender = {
  customName: 'Editor'
};

export { Editor };
