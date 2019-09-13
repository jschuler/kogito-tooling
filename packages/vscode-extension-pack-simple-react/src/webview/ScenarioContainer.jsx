import React from 'react';
import ScenarioToolbar from './ScenarioToolbar';
import ScenarioEditor from './ScenarioEditor';

class ScenarioContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <ScenarioToolbar />
        <ScenarioEditor />
      </React.Fragment>
    );
  }
}

export default ScenarioContainer;