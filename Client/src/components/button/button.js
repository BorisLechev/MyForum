import React from 'react';
import styles from './button.module.css';

const Button = ({ text }) => (
  <button className={styles.submit} type="submit">
    {text}
  </button>
);

export default Button;
