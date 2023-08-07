import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"

import classes from './main-navigation.module.css';

function MainNavigation() {
  const { data: session, status } = useSession(); 

  const onLogout = () => {
    signOut();
  };

  return (
    <header className={classes.header}>
      <Link href='/'>
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && status !== 'loading' 
            ? (
              <li>
                <Link href='/auth'>Login</Link>
              </li>)
            : null
          }
          {session
            ? (
              <li>
                <Link href='/profile'>Profile</Link>
              </li>)
            : null}
          {
            session ? (
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>)
            : null
          }
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
