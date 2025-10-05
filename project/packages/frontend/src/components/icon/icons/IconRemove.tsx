import clsx from 'clsx';

export default function IconRemove({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={clsx(className)}
      aria-hidden="true"
    >
      <path
        d="M2.5 2.5l11 11m0-11l-11 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
