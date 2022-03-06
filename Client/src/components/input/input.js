import React from 'react';
import styles from './input.module.css';

const Input = ({ id, label, value, onChange, inputType }) => (
  <div className={styles["input-style"]}>
      <label htmlFor={id}>{label}</label>
      <input
          type={inputType || "text"}
          value={value}
          onChange={onChange}
      />
  </div>
);

export default Input;
