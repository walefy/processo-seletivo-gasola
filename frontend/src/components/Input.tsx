import React from 'react'
import { If } from './If'

type InputProps = {
  label: string
  type: 'text' | 'password' | 'email'
  innerRef: React.RefObject<HTMLInputElement>
  isErrored: boolean
  errorMessage: string
}

export default function Input({ label, type, innerRef, isErrored, errorMessage }: InputProps) {
  return (
    <label>
      {label}
      <input type={type} ref={innerRef} />

      <If condition={isErrored}>
        <span>{errorMessage}</span>
      </If>
    </label>
  )
}
