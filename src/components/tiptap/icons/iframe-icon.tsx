export function IFrameIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <rect x='2' y='3' width='20' height='14' rx='2' />
      <path d='M8 21h8' />
      <path d='M12 17v4' />
      <path d='m7 8 3 3-3 3' />
    </svg>
  );
}
