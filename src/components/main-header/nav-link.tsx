'use client';

import Link from 'next/link';
import classes from './nav-link.module.css';
import { usePathname } from 'next/navigation';

const NAVIGATION_ROUTES = [
  {
    href: '/meals',
    navigationText: 'Browse meals',
    exact: false
  },
  {
    href: '/community',
    navigationText: 'Foodies Community',
    exact: true
  }
];

export const NavLink = () => {
  const path = usePathname();

  return (
    <nav className={classes.nav}>
      <ul>
        {NAVIGATION_ROUTES.map((item) => {
          const activeCondition = item.exact ? path === item.href : path.startsWith(item.href);
          const className = activeCondition ? classes.active : undefined;

          return (
            <li key={item.href}>
              <Link href={item.href} className={className}>
                {item.navigationText}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
