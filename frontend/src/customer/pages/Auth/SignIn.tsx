import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Storefront } from '@mui/icons-material'
import { useAppDispatch } from '../../../State/Store'
import { signin } from '../../../State/AuthSlice'
import { UserRole } from '../../../types/UserTypes'
import AuthLayout from './AuthLayout'
import { AuthField, AuthHeading, FormAlert, PasswordField, SubmitButton } from './AuthFields'

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const { role } = await dispatch(signin({ email: email.trim(), password })).unwrap();
      navigate(role === UserRole.ROLE_ADMIN ? '/admin' : '/');
    } catch (message) {
      setError(typeof message === 'string' ? message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeading title='Sign in'>Welcome back. Sign in to see your orders, cart and wishlist.</AuthHeading>

      <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-5'>
        <AuthField id='email' label='Email' type='email' autoComplete='email' placeholder='you@example.com'
          value={email} onChange={(e) => setEmail(e.target.value)}/>
        <PasswordField id='password' label='Password' autoComplete='current-password' placeholder='Your password'
          value={password} onChange={(e) => setPassword(e.target.value)}
          labelAction={<Link to='/reset-password' className='text-[13px] font-semibold text-primary-color hover:underline'>Forgot password?</Link>}/>
        {error && <FormAlert>{error}</FormAlert>}
        <SubmitButton loading={loading}>Sign in</SubmitButton>
      </form>

      <p className='text-center text-sm text-gray-500'>
        New to Sellway? <Link to='/register' className='font-semibold text-primary-color hover:underline'>Create an account</Link>
      </p>
      <div className='h-px bg-gray-200'/>
      <Link to='/seller-login' className='flex items-center justify-center gap-2 text-sm font-semibold text-amber-ink hover:underline'>
        <Storefront sx={{ fontSize: 18 }}/> Selling on Sellway? Seller sign in
      </Link>
    </AuthLayout>
  )
}

export default SignIn