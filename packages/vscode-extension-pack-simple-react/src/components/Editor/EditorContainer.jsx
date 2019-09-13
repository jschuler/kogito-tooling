import * as React from 'react';
import { EditorToolbar } from './EditorToolbar';

class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <EditorToolbar />
        {this.props.children}
      </React.Fragment>
    );
  }
}

export { EditorContainer };