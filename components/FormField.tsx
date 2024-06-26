import { FormFieldProps } from '@/common_types'
import React from 'react'

const FormField = ({ type, title, state, placeholder, isTextArea, setState }: FormFieldProps) => {
  return (
    <div className='flexStart flex-col w-full gap-4'>
        <label className='w-full text-gray-100'>
            {title}
        </label>

        {isTextArea ? (
            <textarea 
                placeholder={placeholder}
                value={state}
                required
                className='form_field-input'
                onChange={(e) => setState(e.target.value)}
            />
        ) : (
            <input 
                type={type || 'text'}
                placeholder={placeholder}
                value={state}
                required
                className='form_field-input'
                onChange={(e) => setState(e.target.value)} 
            />
        )}
    </div>
  )
}

export default FormField