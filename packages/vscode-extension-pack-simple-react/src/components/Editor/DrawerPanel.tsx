import * as React from "react";
import { Expandable, TextContent, Button } from '@patternfly/react-core';
import { DrawerPanelContent } from '@patternfly/react-core/dist/js/experimental';
import './DrawerPanel.css';

const DefinitionsDrawerPanel: React.FC<{ definitions: any }> = ({ definitions }) => {
  const [activeItem, setActiveItem] = React.useState('');

  const onToggle = (id: string) => {
    console.log(`selected: ${id}`);
    setActiveItem(id);
  };

  return (
    <DrawerPanelContent>
      <TextContent className="pf-u-m-lg">
        <p>To create a test template, define the "Given" and "Expect" columns by using the expression editor below.</p>
        <h2>Select Data Object</h2>
        <h3>Complex Types</h3>
        {definitions.complex.map((item: any) => (
          <Expandable key={item.typeRef} toggleText={item.text} onToggle={() => onToggle(item.text)} isExpanded={activeItem === item.text}>
            {Object.keys(item.elements).map((elementKey: any) => (
              <div className="pf-u-mb-sm" key={elementKey}>
                <Button variant="link">{elementKey}</Button>
                <span> [{item.elements[elementKey]}]</span>
              </div>
            ))}
          </Expandable>
        ))}
        
        <h3>Simple Types</h3>
        {definitions.simple.map((item: any) => (
          <Expandable key={item.typeRef} toggleText={item.text} onToggle={() => onToggle(item.text)} isExpanded={activeItem === item.text}>
            {Object.keys(item.elements).map((elementKey: any) => (
              <div className="pf-u-mb-sm" key={elementKey}>
                <Button variant="link">{elementKey}</Button>
                <span> [{item.elements[elementKey]}]</span>
              </div>
            ))}
          </Expandable>
        ))}
      </TextContent>
    </DrawerPanelContent>
  )
};

export { DefinitionsDrawerPanel };
