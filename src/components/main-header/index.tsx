import Link from 'next/link';
import logoImage from '@/asset/common/logo.png';
import Image from 'next/image';

import classes from './main-header.module.css';
import { MainHeaderBackground } from './main-header-background';
import { NavLink } from './nav-link';

export const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImage} alt="logo-image" priority />
          Next Food
        </Link>

        <NavLink />
      </header>
    </>
  );
};
