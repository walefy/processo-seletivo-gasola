import React from 'react'
import { If } from './If'

type InputProps = {
  label: string
  type: 'text' | 'password' | 'email'
  inputId: string
  innerRef: React.RefObject<HTMLInputElement>
  isErrored: boolean
  errorMessage: string
}

export default function Input({ label, type, innerRef, isErrored, errorMessage, inputId }: InputProps) {
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input type={type} ref={innerRef} id={inputId} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
      <If condition={isErrored}>
        <p className="mt-2 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      </If>
    </div>
  )
}
