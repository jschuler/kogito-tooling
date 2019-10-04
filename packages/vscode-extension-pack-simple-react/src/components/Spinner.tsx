import React from 'react';
import { Bullseye, Title } from '@patternfly/react-core';
import { Spinner as PfSpinner } from '@patternfly/react-core/dist/js/experimental';

const Spinner: React.SFC<{ text?: string }> = ({ text }) => (
  <Bullseye>
    <div className="pf-l-flex pf-m-column">
      <div className="pf-l-flex__item" style={{ textAlign: 'center' }}>
        <PfSpinner />
      </div>
      {text && <div>
        <Title headingLevel="h1" size="xl" className="pf-u-mt-md">{text}</Title>
      </div>}
    </div>
  </Bullseye>
);

export { Spinner };
