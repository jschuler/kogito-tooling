import * as React from "react";
import { Tooltip } from '@patternfly/react-core';
import { useKeyPress } from './useKeyPress'; 
import { setCaretPositionAtEnd } from './utils';
import './Input.css';

const Input = React.memo<{ 
  originalValue: any, 
  path: string, 
  id?: any, 
  type?: string, 
  onActivateInput?: any, 
  isReadOnly?: boolean,
  deactivateAndFocusCell: any,
  setEditable: any
}>(({ originalValue, path, id, type, onActivateInput, isReadOnly, deactivateAndFocusCell, setEditable }) => {
  const [value, setValue] = React.useState<any>(originalValue);
  const [savedValue, setSavedValue] = React.useState<any>(originalValue);
  const [overflown, setOverflown] = React.useState<boolean>(false);

  const inputRef = React.useRef(null);

  const getActiveElement = () => {
    return (document && document.activeElement && document.activeElement.getAttribute('id')) || id;
  };

  const thisElement = () => {
    return document.getElementById(id) as HTMLInputElement;
  }

  React.useEffect(() => {
    setTimeout(() => {
      if (!isReadOnly) {
        console.log('set caret position at end');
        setCaretPositionAtEnd(thisElement());
      }
    }, 1)
  });

  const handleTextInputChange = (event: any) => {
    setValue(event.currentTarget.value);
  }

  /**
   * save current input
   */
  const onEnter = (event: any) => {
    console.log('currently editable, will save');
    // save operation
    setSavedValue(value);
    // mark itself as not editable but maintain focus
    deactivateAndFocusCell(event.target.id);
  };

  const onEscape = (event: any) => {
    console.log('revert cell changes');
    setValue(savedValue);
    // mark itself as not editable but maintain focus
    deactivateAndFocusCell(event.target.id);
  };

  useKeyPress('Escape', onEscape, { 
    log: 'input',
    id,
    isActive: !isReadOnly
  });
  useKeyPress('Enter', onEnter, { 
    log: 'input',
    id,
    isActive: !isReadOnly
  });

  /**
   * Save the value and notify the Editor that we're not editable anymore
   */
  const onLoseFocus = (event: any) => {
    if (!isReadOnly) {
      console.log(`lost focus for id ${id}, save value: ${value}`);
      setSavedValue(value);
      setEditable('');
    }
  };

  /**
   * When the element receives focus, check if we should show a tooltip
   */
  const onGainFocus = (event: any) => {
    checkForOverflow();
  }

  /**
   * Check if the element is overflown
   */
  const checkForOverflow = (event?: any) => {
    const element = event ? event.target : thisElement();
    const isOverflown = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    console.log(`isOverflown: ${isOverflown}`);
    setOverflown(isOverflown);
  }

  const input = (
    <input 
      ref={inputRef}
      onMouseOver={checkForOverflow}
      className="editor-input truncate" 
      style={{ background: isReadOnly ? 'white' : 'yellow', cursor: isReadOnly ? 'default' : 'text', textAlign: type === 'string' ? 'left' : 'center' }} 
      value={value} 
      type="text" 
      onChange={handleTextInputChange}
      onBlur={onLoseFocus}
      onFocus={onGainFocus}
      aria-label={value} 
      id={id} 
      readOnly={isReadOnly}
    />
  );
  return <Tooltip content={value} distance={0} exitDelay={0} trigger={overflown ? 'mouseenter focus' : 'manual'}>{input}</Tooltip>;
}, (prevProps, nextProps) => {
  /*
   return true if passing nextProps to render would return
   the same result as passing prevProps to render,
   otherwise return false
   */
  const shouldRerender = prevProps.isReadOnly !== nextProps.isReadOnly;
  if (shouldRerender) {
    console.log(`${nextProps.id} will re-render`);
    return false;
  }
  return true;
});

// @ts-ignore
Input.whyDidYouRender = {
  customName: 'Input'
};

export { Input };
