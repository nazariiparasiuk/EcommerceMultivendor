import React, { useState } from 'react'
import { Visibility, VisibilityOff, ErrorOutline, CheckCircleOutline } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'

const inputClass = 'w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px] text-gray-900 outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color/30';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  labelAction?: React.ReactNode;
}

const FieldLabel = ({ id, label, labelAction }: { id?: string, label: string, labelAction?: React.ReactNode }) => (
  <div className='flex items-baseline justify-between mb-2'>
    <label htmlFor={id} className='text-sm font-semibold text-gray-900'>{label}</label>
    {labelAction}
  </div>
);

export const AuthField = ({ label, hint, labelAction, id, ...inputProps }: FieldProps) => (
  <div>
    <FieldLabel id={id} label={label} labelAction={labelAction}/>
    <input id={id} {...inputProps} className={inputClass}/>
    {hint && <p className='mt-2 text-[13px] text-gray-500'>{hint}</p>}
  </div>
);

export const PasswordField = ({ label, hint, labelAction, id, ...inputProps }: FieldProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <FieldLabel id={id} label={label} labelAction={labelAction}/>
      <div className='relative'>
        <input id={id} {...inputProps} type={visible ? 'text' : 'password'} className={`${inputClass} pr-14`}/>
        <button type='button' onClick={() => setVisible(!visible)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className='absolute right-1 top-1 h-10 w-11 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900'>
          {visible ? <VisibilityOff sx={{ fontSize: 20 }}/> : <Visibility sx={{ fontSize: 20 }}/>}
        </button>
      </div>
      {hint && <p className='mt-2 text-[13px] text-gray-500'>{hint}</p>}
    </div>
  );
};

export const FormAlert = ({ tone = 'error', children }: { tone?: 'error' | 'success', children: React.ReactNode }) => (
  <div role={tone === 'error' ? 'alert' : 'status'}
    className={`flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-sm leading-relaxed ${tone === 'error' ? 'bg-rose/10 text-rose-ink' : 'bg-emerald-50 text-emerald-800'}`}>
    {tone === 'error' ? <ErrorOutline sx={{ fontSize: 20 }}/> : <CheckCircleOutline sx={{ fontSize: 20 }}/>}
    <span>{children}</span>
  </div>
);

export const SubmitButton = ({ loading, variant = 'primary', children }: { loading?: boolean, variant?: 'primary' | 'seller', children: React.ReactNode }) => (
  <button type='submit' disabled={loading}
    className={`h-[52px] rounded-full font-bold text-base flex items-center justify-center gap-2 transition disabled:opacity-70 ${variant === 'seller' ? 'bg-amber text-[#1E1B4B] hover:brightness-95' : 'bg-primary-color text-white hover:bg-[#4338CA]'}`}>
    {loading && <CircularProgress size={18} color='inherit'/>}
    {children}
  </button>
);

export const AuthHeading = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className='flex flex-col gap-2'>
    <h1 className='font-display font-bold text-[28px] lg:text-3xl tracking-tight text-gray-900'>{title}</h1>
    {children && <p className='text-[15px] leading-relaxed text-gray-500'>{children}</p>}
  </div>
);