import React, { Ref } from 'react';
import Textfield from '@atlaskit/textfield';
import classes from 'classnames';
import style from './InputWrapper.module.scss';

interface InputWrapperInterface {
  name?: string;
  label?: any;
  onChange?: (e: any) => void;
  onBlur?: () => void;
  description?: string;
  placeholder?: string;
  value: any;
  icon?: any;
  readonly?: boolean;
  ref?: Ref<any>;
  className?: any;
  autoFocus?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  onFocus?: () => void;
}

function InputWrapper({
  name,
  className,
  label,
  onChange,
  onBlur,
  description,
  placeholder,
  value,
  icon,
  readonly,
  ref,
  autoFocus,
  isRequired,
  errorMessage,
  onFocus,
}: InputWrapperInterface) {
  return (
    <div className={classes(style.inputContainer, className || '')}>
      {typeof label === 'string' ? (
        <div className={style.label}>
          {icon}
          {isRequired && '*'}
          {label}
        </div>
      ) : (
        label
      )}
      {description && !errorMessage && (
        <div className={style.description}>{description}</div>
      )}
      <Textfield
        name={name}
        aria-label="default text field"
        value={readonly ? '' : value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={style.Input}
        ref={ref}
        readOnly={readonly}
        autoFocus={autoFocus}
        onFocus={onFocus}
      />
      {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}
    </div>
  );
}

export default InputWrapper;
