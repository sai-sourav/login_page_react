import React from 'react';

import './Input.css';

const Input = (props) => {
  return (
    <input
      type={props.type}
      className={`${props.className}`}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    >
    </input>
  );
};

export default Input;
