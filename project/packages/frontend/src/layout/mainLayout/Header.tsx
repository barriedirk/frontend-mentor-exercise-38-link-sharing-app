import clsx from 'clsx';

import styles from './Header.module.css';

import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className={clsx(
        className,
        'flex flex-row justify-between items-center lg:flex-col lg:h-[90dvh] lg:max-h-[800px] lg:w-[96px] lg:justify-start lg:gap-16',
        styles['header']
      )}
    ></header>
  );
}
