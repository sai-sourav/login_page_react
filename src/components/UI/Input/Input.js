import React, { useRef, useImperativeHandle } from 'react';

import './Input.css';

const Input = React.forwardRef((props, ref) => {
    const InputRef = useRef();
    const activate = () => {
        InputRef.current.focus();
    }

    useImperativeHandle(ref, () => { return {focus: activate} } )
  return (
    <input
      ref={InputRef}
      type={props.type}
      className={`${props.className}`}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    >
    </input>
  );
});

export default Input;
