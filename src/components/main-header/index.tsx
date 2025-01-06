import Link from 'next/link';
import logoImage from '@/asset/common/logo.png';
import Image from 'next/image';

import classes from './main-header.module.css';
import { MainHeaderBackground } from './main-header-background';

export const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImage} alt="logo-image" priority />
          Next Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/meals">Browse meals</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
