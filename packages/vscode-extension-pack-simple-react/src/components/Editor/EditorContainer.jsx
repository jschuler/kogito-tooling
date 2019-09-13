import React from 'react';
import { EditorToolbar } from './EditorToolbar';
import { Editor } from './Editor';

class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <EditorToolbar />
        <Editor />
      </React.Fragment>
    );
  }
}

export { EditorContainer };