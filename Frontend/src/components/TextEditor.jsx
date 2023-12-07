import React, { useRef } from 'react';
import { DocumentEditorContainerComponent, Toolbar, Inject } from '@syncfusion/ej2-react-documenteditor';
import '../App.css'
import { Box } from '@mui/material';
import { registerLicense } from '@syncfusion/ej2-base';

function TextEditor() {
  const editorObj = useRef(null);
  registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1NpR2BGfV5yd0VCalhYTnZbUj0eQnxTdEZjUH1dcXJRT2BZVkJ2XQ==');

  const onSave = () => {
    editorObj.current.documentEditor.save("Sample", "Docx");
  }

  return (
    <Box width={0.75}>
      <div className="App">
        <button onClick={onSave} style={{ marginBottom: 10 }}>Save</button>
        <DocumentEditorContainerComponent ref={editorObj} height='600' width='1170' enableToolbar={true}
          serviceUrl="Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1NpR2BGfV5yd0VCalhYTnZbUj0eQnxTdEZjUH1dcXJRT2BZVkJ2XQ==">
          <Inject services={[Toolbar]}></Inject>
        </DocumentEditorContainerComponent>
      </div>
    </Box>
  );
}

export default TextEditor;
