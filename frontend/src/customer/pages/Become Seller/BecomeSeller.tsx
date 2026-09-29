import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowBack, Check, MarkEmailReadOutlined } from '@mui/icons-material'
import { useAppDispatch } from '../../../State/Store'
import { createSeller, sendSellerSignupCode } from '../../../State/seller/sellerAuthSlice'
import AuthLayout from '../Auth/AuthLayout'
import { AuthField, AuthHeading, FormAlert, PasswordField, SubmitButton } from '../Auth/AuthFields'

const STEPS = ['Account', 'Business', 'Pickup address', 'Payout'];
const MIN_PASSWORD_LENGTH = 8;
const RESEND_SECONDS = 60;

const STEP_HEADINGS = [
  { title: 'Create your seller account', text: "You'll use this email and password to sign in to your store." },
  { title: 'Tell us about your store', text: 'Customers see your store name next to every product you list.' },
  { title: 'Where do we pick up orders?', text: 'Couriers collect your orders from this address.' },
  { title: 'Where should we send payouts?', text: 'We pay your earnings into this bank account.' },
];

interface SellerForm {
  sellerName: string;
  email: string;
  password: string;
  mobile: string;
  businessName: string;
  taxId: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  accountHolderName: string;
  iban: string;
}

const EMPTY_FORM: SellerForm = {
  sellerName: '', email: '', password: '', mobile: '',
  businessName: '', taxId: '',
  street: '', city: '', region: '', postalCode: '',
  accountHolderName: '', iban: '',
};

const normalizeIban = (value: string) => value.replace(/\s+/g, '').toUpperCase();

const validateStep = (step: number, form: SellerForm): string | null => {
  const missing = (...values: string[]) => values.some((value) => !value.trim());
  switch (step) {
    case 0:
      if (missing(form.sellerName, form.email, form.mobile)) return 'Fill in your name, email and phone.';
      if (form.password.length < MIN_PASSWORD_LENGTH) return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
      return null;
    case 1:
      return missing(form.businessName, form.taxId) ? 'Fill in the store name and tax ID.' : null;
    case 2:
      return missing(form.street, form.city, form.region, form.postalCode) ? 'Fill in the full pickup address.' : null;
    case 3:
      if (missing(form.accountHolderName, form.iban)) return 'Fill in the account holder and IBAN.';
      return /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(normalizeIban(form.iban))
        ? null
        : "That IBAN doesn't look right. It starts with two letters, like UA.";
    default:
      return null;
  }
};

const Stepper = ({ current }: { current: number }) => (
  <ol aria-label='Registration steps' className='flex items-center gap-2'>
    {STEPS.map((label, index) => {
      const done = index < current;
      const active = index === current;
      return (
        <li key={label} className='flex items-center gap-2 flex-1 last:flex-none'>
          <span aria-current={active ? 'step' : undefined}
            className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold ${done || active ? 'bg-primary-color text-white' : 'bg-white text-gray-500 border border-gray-300'}`}>
            {done ? <Check sx={{ fontSize: 18 }}/> : index + 1}
          </span>
          <span className={`hidden sm:inline text-sm whitespace-nowrap ${active ? 'font-bold text-gray-900' : 'font-semibold text-gray-500'}`}>{label}</span>
          {index < STEPS.length - 1 && <span className={`flex-1 h-0.5 ${done ? 'bg-primary-color' : 'bg-gray-200'}`}/>}
        </li>
      );
    })}
  </ol>
);

const BecomeSeller = () => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<'form' | 'code' | 'done'>('form');
  const [form, setForm] = useState<SellerForm>(EMPTY_FORM);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn(resendIn - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  const update = (key: keyof SellerForm) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: event.target.value });

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

  const requestCode = () => withRequest(async () => {
    await dispatch(sendSellerSignupCode({ email: form.email.trim() })).unwrap();
    setStage('code');
    setResendIn(RESEND_SECONDS);
  });

  const handleStepSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const problem = validateStep(step, form);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    requestCode();
  };

  const handleBack = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleCodeSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.length !== 6) {
      setError('Enter the 6-digit code from the email.');
      return;
    }
    withRequest(async () => {
      await dispatch(createSeller({
        email: form.email.trim(),
        password: form.password,
        otp,
        sellerName: form.sellerName.trim(),
        mobile: form.mobile.trim(),
        taxId: form.taxId.trim(),
        businessDetails: { businessName: form.businessName.trim() },
        pickupAddress: {
          name: form.businessName.trim(),
          mobile: form.mobile.trim(),
          address: form.street.trim(),
          city: form.city.trim(),
          state: form.region.trim(),
          pinCode: form.postalCode.trim(),
        },
        bankDetails: { accountHolderName: form.accountHolderName.trim(), accountNumber: normalizeIban(form.iban) },
      })).unwrap();
      setStage('done');
    });
  };

  const stepFields = [
    <>
      <AuthField id='seller-name' label='Your name' autoComplete='name' placeholder='Olena Kovalenko'
        value={form.sellerName} onChange={update('sellerName')}/>
      <AuthField id='seller-phone' label='Phone' type='tel' autoComplete='tel' placeholder='+380 67 123 4567'
        value={form.mobile} onChange={update('mobile')}/>
      <div className='sm:col-span-2'>
        <AuthField id='seller-email' label='Email' type='email' autoComplete='email' placeholder='you@yourstore.com'
          hint="You'll use it to sign in. We'll send a code to confirm it."
          value={form.email} onChange={update('email')}/>
      </div>
      <div className='sm:col-span-2'>
        <PasswordField id='seller-password' label='Password' autoComplete='new-password' placeholder='At least 8 characters'
          hint='Use 8 or more characters.'
          value={form.password} onChange={update('password')}/>
      </div>
    </>,
    <>
      <div className='sm:col-span-2'>
        <AuthField id='store-name' label='Store name' autoComplete='organization' placeholder='Kovalenko Home'
          hint='Shown to customers on your products.'
          value={form.businessName} onChange={update('businessName')}/>
      </div>
      <div className='sm:col-span-2'>
        <AuthField id='tax-id' label='Tax ID' inputMode='numeric' placeholder='12345678'
          hint='ЄДРПОУ for a company, or РНОКПП (ІПН) for a sole trader (ФОП).'
          value={form.taxId} onChange={update('taxId')}/>
      </div>
    </>,
    <>
      <div className='sm:col-span-2'>
        <AuthField id='street' label='Street address' autoComplete='street-address' placeholder='Khreshchatyk St, 1'
          value={form.street} onChange={update('street')}/>
      </div>
      <AuthField id='city' label='City' autoComplete='address-level2' placeholder='Kyiv'
        value={form.city} onChange={update('city')}/>
      <AuthField id='region' label='Region' autoComplete='address-level1' placeholder='Kyiv Oblast'
        value={form.region} onChange={update('region')}/>
      <AuthField id='postal-code' label='Postal code' autoComplete='postal-code' inputMode='numeric' placeholder='01001'
        value={form.postalCode} onChange={update('postalCode')}/>
    </>,
    <>
      <div className='sm:col-span-2'>
        <AuthField id='account-holder' label='Account holder' autoComplete='name' placeholder='Olena Kovalenko'
          hint='The name on the bank account.'
          value={form.accountHolderName} onChange={update('accountHolderName')}/>
      </div>
      <div className='sm:col-span-2'>
        <AuthField id='iban' label='IBAN' autoComplete='off' placeholder='UA21 3223 1300 0002 6007 2335 6600 1'
          hint='UA followed by 27 digits. Payouts go to this account.'
          value={form.iban} onChange={update('iban')}/>
      </div>
    </>,
  ];

  if (stage === 'done') {
    return (
      <AuthLayout variant='seller'>
        <div className='w-14 h-14 rounded-2xl bg-amber/20 text-amber-ink flex items-center justify-center'>
          <Check/>
        </div>
        <AuthHeading title='Your store is submitted'>
          Thanks, {form.sellerName.trim()}. Your email is confirmed, and we'll review <strong className='text-gray-900'>{form.businessName.trim()}</strong> shortly. You can already sign in to your seller dashboard.
        </AuthHeading>
        <Link to='/seller-login' className='h-[52px] rounded-full bg-amber text-[#1E1B4B] font-bold flex items-center justify-center'>
          Sign in to my store
        </Link>
      </AuthLayout>
    )
  }

  if (stage === 'code') {
    return (
      <AuthLayout variant='seller'>
        <button type='button' onClick={() => { setStage('form'); setOtp(''); setError(null); }}
          className='inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-primary-color w-fit'>
          <ArrowBack sx={{ fontSize: 18 }}/> Back
        </button>
        <div className='w-14 h-14 rounded-2xl bg-amber/20 text-amber-ink flex items-center justify-center'>
          <MarkEmailReadOutlined/>
        </div>
        <AuthHeading title='Check your email'>
          We sent a 6-digit code to <strong className='text-gray-900'>{form.email.trim()}</strong>. Enter it to create your store.
        </AuthHeading>

        <form onSubmit={handleCodeSubmit} noValidate className='flex flex-col gap-5'>
          <AuthField id='seller-code' label='Verification code' inputMode='numeric' autoComplete='one-time-code'
            maxLength={6} placeholder='6-digit code'
            value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}/>
          {error && <FormAlert>{error}</FormAlert>}
          <SubmitButton loading={loading} variant='seller'>Create my store</SubmitButton>
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
    <AuthLayout variant='seller' wide>
      <div className='flex flex-col gap-2'>
        <p className='text-[13px] font-bold uppercase tracking-wider text-amber-ink'>Step {step + 1} of {STEPS.length}</p>
        <AuthHeading title={STEP_HEADINGS[step].title}>{STEP_HEADINGS[step].text}</AuthHeading>
      </div>
      <Stepper current={step}/>

      <form onSubmit={handleStepSubmit} noValidate className='flex flex-col gap-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          {stepFields[step]}
        </div>
        {error && <FormAlert>{error}</FormAlert>}
        <div className='flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4'>
          {step === 0
            ? <p className='text-sm text-gray-500'>Already selling on Sellway? <Link to='/seller-login' className='font-semibold text-primary-color hover:underline'>Sign in</Link></p>
            : <button type='button' onClick={handleBack} className='inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-primary-color'>
                <ArrowBack sx={{ fontSize: 18 }}/> Back
              </button>}
          <div className='sm:w-48 flex flex-col'>
            <SubmitButton loading={loading} variant='seller'>{step === STEPS.length - 1 ? 'Create store' : 'Continue'}</SubmitButton>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}

export default BecomeSeller