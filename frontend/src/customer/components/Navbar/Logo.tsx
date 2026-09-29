const Logo = ({compact, light}:{compact?: boolean, light?: boolean}) => (
  <div className='flex items-center gap-2'>
    <svg width="26" height="20" viewBox="0 0 19 16" fill="none" aria-hidden="true">
      <path d="M2 2 L8 8 L2 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={light ? 'text-white' : 'text-primary-color'}/>
      <path d="M11 2 L17 8 L11 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={light ? 'text-amber' : 'text-primary-color'}/>
    </svg>
    {!compact && (
      <span className={`font-display font-bold text-xl tracking-tight ${light ? 'text-white' : 'text-gray-900'}`}>
        sell<span className={light ? 'text-white' : 'text-primary-color'}>way</span>
      </span>
    )}
  </div>
)

export default Logo