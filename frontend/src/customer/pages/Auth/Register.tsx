import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowBack, MarkEmailReadOutlined } from '@mui/icons-material'
import { useAppDispatch } from '../../../State/Store'
import { sendSignupCode, signup } from '../../../State/AuthSlice'
import AuthLayout from './AuthLayout'
import { AuthField, AuthHeading, FormAlert, PasswordField, SubmitButton } from './AuthFields'

const MIN_PASSWORD_LENGTH = 8;
const RESEND_SECONDS = 60;

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'code'>('details');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn(resendIn - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  const requestCode = async () => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(sendSignupCode({ email: email.trim() })).unwrap();
      setStep('code');
      setResendIn(RESEND_SECONDS);
    } catch (message) {
      setError(typeof message === 'string' ? message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setError('Enter your name and email.');
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    requestCode();
  };

  const handleCodeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.length !== 6) {
      setError('Enter the 6-digit code from the email.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await dispatch(signup({ email: email.trim(), fullName: fullName.trim(), password, otp })).unwrap();
      navigate('/');
    } catch (message) {
      setError(typeof message === 'string' ? message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const backToDetails = () => {
    setStep('details');
    setOtp('');
    setError(null);
  };

  if (step === 'code') {
    return (
      <AuthLayout>
        <button type='button' onClick={backToDetails}
          className='inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-primary-color w-fit'>
          <ArrowBack sx={{ fontSize: 18 }}/> Back
        </button>
        <div className='w-14 h-14 rounded-2xl bg-primary-color/10 text-primary-color flex items-center justify-center'>
          <MarkEmailReadOutlined/>
        </div>
        <AuthHeading title='Check your email'>
          We sent a 6-digit code to <strong className='text-gray-900'>{email.trim()}</strong>. Enter it below to finish creating your account.
        </AuthHeading>

        <form onSubmit={handleCodeSubmit} noValidate className='flex flex-col gap-5'>
          <AuthField id='signup-code' label='Verification code' inputMode='numeric' autoComplete='one-time-code'
            maxLength={6} placeholder='6-digit code'
            value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}/>
          {error && <FormAlert>{error}</FormAlert>}
          <SubmitButton loading={loading}>Verify and create account</SubmitButton>
        </form>

        <p className='text-center text-sm text-gray-500'>
          Didn't get it?{' '}
          {resendIn > 0
            ? <span>Resend code in {resendIn}s</span>
            : <button type='button' onClick={requestCode} className='font-semibold text-primary-color hover:underline'>Resend code</button>}
        </p>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <AuthHeading title='Create your account'>Save your wishlist, track orders and check out faster.</AuthHeading>

      <form onSubmit={handleDetailsSubmit} noValidate className='flex flex-col gap-5'>
        <AuthField id='full-name' label='Full name' autoComplete='name' placeholder='Emma Wilson'
          value={fullName} onChange={(e) => setFullName(e.target.value)}/>
        <AuthField id='signup-email' label='Email' type='email' autoComplete='email' placeholder='you@example.com'
          hint="We'll send a 6-digit code to confirm it's you."
          value={email} onChange={(e) => setEmail(e.target.value)}/>
        <PasswordField id='signup-password' label='Password' autoComplete='new-password' placeholder='At least 8 characters'
          hint='Use 8 or more characters.'
          value={password} onChange={(e) => setPassword(e.target.value)}/>
        {error && <FormAlert>{error}</FormAlert>}
        <SubmitButton loading={loading}>Create account</SubmitButton>
      </form>

      <p className='text-center text-sm text-gray-500'>
        Already have an account? <Link to='/login' className='font-semibold text-primary-color hover:underline'>Sign in</Link>
      </p>
    </AuthLayout>
  )
}

export default Register