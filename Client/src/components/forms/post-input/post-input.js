import React, { useEffect, useState } from 'react';
import Button from '../../button/button';
import Editor from '../../editor/editor';
import styles from './post-input.module.css';

const PostInputForm = ({ initialTitle, initialContent, handleFormSubmit }) => {
  const [model, setModel] = useState({ title: "", content: "" });

  useEffect(() => {
    setModel({ title: initialContent, content: initialContent });
  }, [initialTitle, initialContent]); // Only re-run the effect if initialTitle and content changes
  
  return (
    <form
      className={styles["form-styles"]}
      onSubmit={(event) => handleFormSubmit(event, model.title, model.content)}
    >
      <input
        placeholder="Title"
        value={model.title}
        onChange={(event) => setModel({ ...model, title: event.target.value })}
      />
      <Editor
        initialContent={model.content}
        handleEditorChange={(c) => setModel({ ...model, content: c })}
      />
      <Button text="Submit" />
    </form>
  );
};

export default PostInputForm;
