import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../State/Store'
import { sellerLogin } from '../../../State/seller/sellerAuthSlice'
import { fetchSellerProfile } from '../../../State/seller/sellerSlice'
import AuthLayout from './AuthLayout'
import { AuthField, AuthHeading, FormAlert, PasswordField, SubmitButton } from './AuthFields'

const SellerSignIn = () => {
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
      const jwt = await dispatch(sellerLogin({ email: email.trim(), password })).unwrap();
      await dispatch(fetchSellerProfile(jwt));
      navigate('/seller');
    } catch (message) {
      setError(typeof message === 'string' ? message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout variant='seller' panelTitle='Welcome back to your store'>
      <AuthHeading title='Seller sign in'>Use the email and password you registered your store with.</AuthHeading>

      <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-5'>
        <AuthField id='seller-email' label='Email' type='email' autoComplete='email' placeholder='you@yourstore.com'
          value={email} onChange={(e) => setEmail(e.target.value)}/>
        <PasswordField id='seller-password' label='Password' autoComplete='current-password' placeholder='Your password'
          value={password} onChange={(e) => setPassword(e.target.value)}
          labelAction={<Link to='/reset-password?as=seller' className='text-[13px] font-semibold text-primary-color hover:underline'>Forgot password?</Link>}/>
        {error && <FormAlert>{error}</FormAlert>}
        <SubmitButton loading={loading} variant='seller'>Sign in to my store</SubmitButton>
      </form>

      <p className='text-center text-sm text-gray-500'>
        New to selling? <Link to='/become-seller' className='font-semibold text-primary-color hover:underline'>Open your store</Link>
      </p>
    </AuthLayout>
  )
}

export default SellerSignIn