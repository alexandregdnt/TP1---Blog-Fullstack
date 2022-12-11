import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';
// @ts-ignore
import { UilExclamationCircle, UilEye, UilEyeSlash } from '@iconscout/react-unicons';

export const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={`auth__content ${meta.touched && meta.error ? 'is-invalid' : ''}`}>
      <label htmlFor={field.name} className="auth__label">
        {label}
      </label>

      {props.type && props.type === 'password' ? (
        <input
          className="auth__input"
          {...field}
          {...props}
          type={showPassword ? 'text' : 'password'}
          autoComplete="off"
        />
      ) : (
        <input className="auth__input" {...field} {...props} autoComplete="off" />
      )}

      <div className="auth__field-icons">
        {props.name && props.name === 'password' ? (
          <div className="auth__field-icon auth__show-password" onClick={handleShowPassword}>
            {showPassword ? (
              <UilEyeSlash className="auth__icon" />
            ) : (
              <UilEye className="auth__icon" />
            )}
          </div>
        ) : (
          ''
        )}

        {meta.touched && meta.error ? (
          <div className="auth__field-icon">
            <UilExclamationCircle className="auth__icon error-icon" />
          </div>
        ) : (
          ''
        )}
      </div>

      <ErrorMessage component="div" name={field.name} className="error-msg" />
    </div>
  );
};

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    type: string;
}
