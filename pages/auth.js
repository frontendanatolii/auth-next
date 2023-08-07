import { useRouter } from 'next/router';
import AuthForm from '../components/auth/auth-form';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace('/profile');
      } else {
        setIsLogin(false)
      }
    })
  }, [])
  return (
    <>
      {
        isLogin 
          ? <p>Loading...</p>
          : <AuthForm />
      }
    </>
  );
}

export default AuthPage;
