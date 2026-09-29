import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../../State/Store'
import { requestPasswordReset, resetPassword } from '../../../State/AuthSlice'
import { UserRole } from '../../../types/UserTypes'
import AuthLayout from './AuthLayout'
import { AuthField, AuthHeading, FormAlert, PasswordField, SubmitButton } from './AuthFields'

const MIN_PASSWORD_LENGTH = 8;

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const isSeller = searchParams.get('as') === 'seller';
  const role = isSeller ? UserRole.ROLE_SELLER : UserRole.ROLE_CUSTOMER;
  const signInPath = isSeller ? '/seller-login' : '/login';
  const buttonVariant = isSeller ? 'seller' : 'primary';

  const [step, setStep] = useState<'email' | 'code' | 'done'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const withRequest = async (request: () => Promise<void>) => {
    setError(null);
    setLoading(true);
    try {
      await request();
    } catch (message) {
      setError(typeof message === 'string' ? message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      setError('Enter the email you use to sign in.');
      return;
    }
    withRequest(async () => {
      const message = await dispatch(requestPasswordReset({ email: email.trim(), role })).unwrap();
      setInfo(message);
      setStep('code');
    });
  };

  const handleResetSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.length !== 6) {
      setError('Enter the 6-digit code from the email.');
      return;
    }
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("The passwords don't match.");
      return;
    }
    withRequest(async () => {
      await dispatch(resetPassword({ email: email.trim(), otp, newPassword, role })).unwrap();
      setStep('done');
    });
  };

  const backToEmail = () => {
    setStep('email');
    setOtp('');
    setInfo(null);
    setError(null);
  };

  return (
    <AuthLayout variant={isSeller ? 'seller' : 'buyer'}>
      {step === 'email' && (
        <>
          <AuthHeading title='Reset your password'>Enter the email you use to sign in, and we'll send you a code to set a new password.</AuthHeading>
          <form onSubmit={handleEmailSubmit} noValidate className='flex flex-col gap-5'>
            <AuthField id='reset-email' label='Email' type='email' autoComplete='email' placeholder='you@example.com'
              value={email} onChange={(e) => setEmail(e.target.value)}/>
            {error && <FormAlert>{error}</FormAlert>}
            <SubmitButton loading={loading} variant={buttonVariant}>Send code</SubmitButton>
          </form>
        </>
      )}

      {step === 'code' && (
        <>
          <AuthHeading title='Choose a new password'>Enter the code from the email and your new password.</AuthHeading>
          {info && <FormAlert tone='success'>{info}</FormAlert>}
          <form onSubmit={handleResetSubmit} noValidate className='flex flex-col gap-5'>
            <AuthField id='reset-code' label='Code from email' inputMode='numeric' autoComplete='one-time-code'
              maxLength={6} placeholder='6-digit code'
              value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}/>
            <PasswordField id='new-password' label='New password' autoComplete='new-password' placeholder='At least 8 characters'
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            <PasswordField id='confirm-password' label='Confirm new password' autoComplete='new-password' placeholder='Repeat the new password'
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            {error && <FormAlert>{error}</FormAlert>}
            <SubmitButton loading={loading} variant={buttonVariant}>Update password</SubmitButton>
          </form>
          <p className='text-center text-sm text-gray-500'>
            Didn't get the code?{' '}
            <button type='button' onClick={backToEmail} className='font-semibold text-primary-color hover:underline'>Send it again</button>
          </p>
        </>
      )}

      {step === 'done' && (
        <>
          <AuthHeading title='Password updated'>You can now sign in with your new password.</AuthHeading>
          <Link to={signInPath}
            className={`h-[52px] rounded-full font-bold text-base flex items-center justify-center ${isSeller ? 'bg-amber text-[#1E1B4B]' : 'bg-primary-color text-white'}`}>
            Go to sign in
          </Link>
        </>
      )}

      {step !== 'done' && (
        <p className='text-center text-sm text-gray-500'>
          Remembered it? <Link to={signInPath} className='font-semibold text-primary-color hover:underline'>Back to sign in</Link>
        </p>
      )}
    </AuthLayout>
  )
}

export default ResetPassword