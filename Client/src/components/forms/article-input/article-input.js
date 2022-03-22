import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import articlesService from '../../../services/articles';
import Button from '../../button/button';
import Editor from '../../editor/editor';
import styles from './article-input.module.css';

const ArticleInputForm = ({ initialTitle, initialContent, mode }) => {
  const [model, setModel] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setModel({ title: initialTitle, content: initialContent });
  }, [initialTitle, initialContent]); // Only re-run the effect if initialTitle and content changes

  const validate = (title, content) => {
      const validationErrors = [];

      if (!title) {
        validationErrors.push("Title is required.");
      }

      if (title.length > 50) {
        validationErrors.push("Title must be with maximum length of 60.");
      }

      if (!content) {
        validationErrors.push("Content is required.");
      }

      return validationErrors;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(model.title, model.content);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);

      return;
    }

    const body = {
      title: model.title,
      content: model.content,
    };

    if (mode === "create") {
      await articlesService.createArticle(
        body,
        (response) => navigate(`$/articles/${response.id}`),
        () => console.log(),
      );
    } else if (mode === "edit") {
      await articlesService.editArticle(
        location.pathname.split("/").pop(), // id
        body,
        (response) => navigate(`/articles/${response.id}`),
        () => console.log(),
      );
    }
  };
  
  return (
    <React.Fragment>
        <form className={styles["form-styles"]} onSubmit={handleFormSubmit}>
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
        <div className={styles.error}>
            <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
    </React.Fragment>
  );
};

export default ArticleInputForm;
