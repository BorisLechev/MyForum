import React from 'react';
import styles from './auth.module.css';

const AuthForm = ({ title, children, onSubmit }) => (
  <div>
    <h2 className={styles.title}>{title}</h2>
    <form onSubmit={onSubmit}>{children}</form>
  </div>
);

export default AuthForm;
