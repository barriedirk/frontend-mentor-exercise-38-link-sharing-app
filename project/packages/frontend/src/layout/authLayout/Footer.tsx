import clsx from 'clsx';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={clsx(
        'text-center mt-auto py-4 text-gray-500 text-xs',
        className
      )}
    >
      Challenge by
      <a
        className="m-0.5 "
        href="https://www.frontendmentor.io/profile/barriedirk/solutions"
        target="_blank"
        rel="noreferrer"
        aria-label="View solutions by Barrie Freyre on Frontend Mentor"
      >
        Frontend Mentor
      </a>
      . Coded by
      <a
        className="m-0.5"
        href="https://www.linkedin.com/in/barriefreyre/"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Barrie Freyre's LinkedIn profile"
      >
        Barrie Freyre
      </a>
      .
    </footer>
  );
}
