import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react"
import classes from './auth-form.module.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  };

  function createUser(email, password) {
    fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then(data => {
          throw new Error(data.message);
        })
      })
      .then(data => console.log(data.message))
      .catch(error => console.log(error.message))
  }

  const onSubmitHandler = async ( event ) => {
    event.preventDefault();

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: emailInput.current.value,
        password: passwordInput.current.value,
      });

      if (!result.error) {
        router.replace('/profile');
      }

      console.log(result);
    }

    if (!isLogin) {
      await createUser(emailInput.current.value, passwordInput.current.value);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInput} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInput} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
