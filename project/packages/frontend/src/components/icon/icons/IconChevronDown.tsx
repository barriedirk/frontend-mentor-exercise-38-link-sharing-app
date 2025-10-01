import clsx from 'clsx';

import styles from './Icons.module.css';

export default function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="9"
      fill="none"
      viewBox="0 0 14 9"
      className={clsx(styles['icon-empty'], className)}
      aria-hidden="true"
    >
      <path stroke="#633CFF" stroke-width="2" d="m1 1 6 6 6-6" />
    </svg>
  );
}
