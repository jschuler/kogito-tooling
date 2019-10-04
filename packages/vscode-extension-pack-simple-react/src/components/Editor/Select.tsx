import * as React from "react";
import { TextInput, Tooltip, Select as PfSelect, SelectOption, SelectVariant, SelectOptionObject, SelectProvider } from '@patternfly/react-core';
import { useKeyPress } from './useKeyPress'; 
import './Input.css';
import './Select.css';

const Select = React.memo<{ 
  originalValue?: any, 
  path?: string, 
  id?: any, 
  type?: string, 
  onActivateInput?: any, 
  isReadOnly?: boolean,
  setActiveInput?: any,
  onSelectToggleCallback?: any,
  options?: any,
  deactivateAndFocusCell?: any,
  setEditable: any
}>(({ originalValue, path, id, type, onActivateInput, isReadOnly, setActiveInput, onSelectToggleCallback, options, deactivateAndFocusCell, setEditable }) => {
  // console.log(`render select ${id}`);
  const [overflown, setOverflown] = React.useState<boolean>(false);
  const [isExpanded, setExpanded] = React.useState<boolean>(true);
  const [selected, setSelected] = React.useState<any>(originalValue);

  const thisElement = () => {
    return document.getElementById(id) as HTMLInputElement;
  }

  const selectOptions = options.map((option: string, index: number) => (
    <SelectOption key={index} value={option} isSelected />
  ));

  const onToggle = (isExpanded: boolean) => {
    setExpanded(isExpanded);
    onSelectToggleCallback(id, isExpanded);
  };

  React.useEffect(() => {
    if (!isReadOnly) {
      onToggle(true);
      setTimeout(() => {
        const element = document.querySelector(`button[id="${id}"]`);
        if (element && element.parentNode && (element.parentNode as HTMLElement).querySelector('.pf-c-select__menu-item')) {
          ((element.parentNode as HTMLElement).querySelector('.pf-c-select__menu-item') as HTMLButtonElement).focus();
        }
      }, 1);
    }
  }, [isReadOnly]);

  const onSelect = (event: React.MouseEvent | React.ChangeEvent, selection: string | SelectOptionObject, isPlaceholder?: boolean) => {
    if (isPlaceholder) clearSelection();
    else {
      setSelected(selection);
      onToggle(false);
      console.log('selected:', selection);
      // mark itself as not active
      deactivateAndFocusCell(id);
    }
  };

  const clearSelection = () => {
    setSelected(null);
    onToggle(false);
  };

  const getActiveElement = () => {
    return (document && document.activeElement && document.activeElement.getAttribute('id')) || id;
  };

  const setCaretPosition = (el: any, caretPos: number) => {
    // (el.selectionStart === 0 added for Firefox bug)
    if (el.selectionStart || el.selectionStart === 0) {
      el.focus();
      el.setSelectionRange(caretPos, caretPos);
      return true;
    }
  }

  const setCaretPositionAtEnd = () => {
    const el = thisElement();
    const end = el.value.length;
    setCaretPosition(el, end);
  };

  /**
   * Copy contents of cell that is not in editing mode
   */
  const copyToClipboard = () => {
    /* Get the text field */
    const copyText = thisElement();
    if (copyText) {
      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
      /* Copy the text inside the text field */
      document.execCommand('copy');
      // do not mark the whole text as selected
      setCaretPositionAtEnd();
      console.log(`Copied the text: ${copyText.value}`);
    }
  };

  // const onEscape = (event: any) => {
  //   console.log('revert cell changes');
  //   // setValue(savedValue);
  //   // mark itself as not active
  //   // setActiveInput('');
  //   // setActive(false);
  //   deactivateAndFocusCell(event.target.id);
  // };

  // copy cell
  useKeyPress(/c/i, (event: any) => {
    if (isReadOnly) {
      // if not in editing mode, copy the whole cell
      copyToClipboard();
    }
  }, { id, withModifier: true, isActive: !isReadOnly });

  // useKeyPress('Escape', onEscape, { 
  //   log: 'input',
  //   id,
  //   isActive: !isReadOnly
  // });

  const onKeyDown = (event: any) => {
    const { key } = event;
    if (key === 'Escape') {
      onSelectToggleCallback(false);
      deactivateAndFocusCell(id);
    }
  }

  // either save current input, or enter editing mode
  // useKeyPress('Enter', () => {
  //   if (isActive) {
  //     console.log('currently active, will save')
  //     // save operation
  //     setSavedValue(value);
  //     // mark itself as not active
  //     setActiveInput('');
  //     setActive(false);
  //   } else {
  //     console.log('currently not active, will make active')
  //     setActive(true);
  //     onActivateInput(id);
  //     setCaretPositionAtEnd();
  //   }
  // }, id);

  // const onLoseFocus = (event: any) => {
  //   console.log(`lost focus for id ${id}, save value: ${value}`);
  //   setValue(value);
  //   setActive(false);
  // };

  // const onGainFocus = (event: any) => {
  //   onMouseOver();
  //   setCaretPositionAtEnd();
  // }

  const onMouseOver = (event?: any) => {
    const element = event ? event.target : thisElement();
    const isOverflown = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    console.log(`isOverflown: ${isOverflown}`);
    setOverflown(isOverflown);
  }

  // const input = (
  //   <TextInput 
  //     onMouseOver={(event) => onMouseOver(event)}
  //     className="editor-input" 
  //     isReadOnly={isReadOnly} 
  //     style={{ cursor: isReadOnly ? 'default' : 'text', textAlign: type === 'string' ? 'left' : 'center' }} 
  //     value={value} 
  //     type="text" 
  //     onChange={(value: any) => isActive && handleTextInputChange(value)}
  //     onBlur={onLoseFocus}
  //     onFocus={onGainFocus}
  //     aria-label={value} 
  //     id={id} 
  //   />
  // );

  // const input = (
  //   <PfSelect
  //     variant={SelectVariant.typeahead}
  //     aria-label="Select a state"
  //     onToggle={onToggle}
  //     onSelect={onSelect}
  //     onClear={clearSelection}
  //     onFilter={customFilter}
  //     selections={selected}
  //     isExpanded={isExpanded}
  //     ariaLabelledBy="typeahead-select-id"
  //     placeholderText="Select a state"
  //   >
  //     {selectOptions}
  //   </PfSelect>
  // );

  // console.log('render Select');
  return (
    <>
      {isReadOnly ? (
        <input 
          className="editor-input" 
          style={{ cursor: 'default', textAlign: type === 'string' ? 'left' : 'center' }} 
          type="text" 
          defaultValue={selected}
          id={id}
          aria-label={selected}
          readOnly
        />
      ) : (
        <PfSelect
          toggleId={id}
          variant={SelectVariant.single}
          aria-label="Select Input"
          onToggle={onToggle}
          onSelect={onSelect}
          selections={selected}
          isExpanded={isExpanded}
          ariaLabelledBy="typeahead-select-id"
          onKeyDown={onKeyDown}
        >
          {selectOptions}
        </PfSelect>
      )}
    </>);
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

export { Select };
