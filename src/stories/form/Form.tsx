import React, {ChangeEventHandler} from "react";
import {Field as FormikField, FieldProps} from "formik";
import "./form.scss";

interface GenericFieldInterface {
  name: string
  label?: string
  onChange?: ChangeEventHandler
}

export interface FieldInterface extends GenericFieldInterface {
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel'
  placeholder?: string
}

export const Field = ({type = 'text', placeholder, name, onChange, label}: FieldInterface) => {
  return (
    <FormikField name={name}>
      {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: FieldProps) => {
          let inputClassName = 'form-control';
          if (meta.touched && meta.error) {inputClassName += ' is-invalid'};
          return (
            <div className='form-group'>
              {(label) && <label htmlFor={name} className="form-label">{label}</label>}
              <input
                id={name}
                type={type}
                placeholder={placeholder}
                className={inputClassName}
                {...field}
              />
              {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
            </div>
          )
      }}
    </FormikField>
  )
};

export const Checkbox = ({name, onChange, label}: GenericFieldInterface) => {
  return (
    <FormikField name={name}>
      {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: FieldProps) => {
          let inputClassName = 'form-check-input';
          if (meta.touched && meta.error) {inputClassName += ' is-invalid'};
          return (
            <div className="form-check">
              {(label) && <label htmlFor={name} className="form-check-label">{label}</label>}
              <input
                id={name}
                type='checkbox'
                className={inputClassName}
                {...field}
              />
              {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
            </div>
          )
      }}
    </FormikField>
  )
}
