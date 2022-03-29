import React, { useState, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/authContext'

const Auth = ({ token }) => {
  const auth = useContext(AuthContext);
  const router = useRouter()
  const storedDataEl = useRef();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleOnChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const changeMode = () => {
    setIsLoginMode(prevState => !prevState);
  }


  const authSubmitHandler = async event => {

    event.preventDefault();

    const { checked: storedData } = storedDataEl.current;
    if (storedData) {
      localStorage.setItem('name', values.name);
      localStorage.setItem('password', values.password);
    } else {
      localStorage.removeItem('name', values.name);
      localStorage.removeItem('password', values.password);
    }


    if (!isLoginMode) {
      try {
        const res = await fetch("https://dev-mrp.insby.tech/api/session/sign-in", {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({
            login: values.name,
            password: values.password,
            confirmPassword: values.confirmPassword,
            rememberMe: true,
            autoRegister: true,
            admin: false
          }),

          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        }
        )
        const responseData = await res.json();

        auth.login([responseData.data.user.email, responseData.data.user.username, responseData.data.user.image_url], true, responseData.data.token);
        router.push(`/users/${responseData.data.user.username}`)
      } catch (err) {
        console.log(err);
      }
    } else {
      try {

        const res = await fetch("https://dev-mrp.insby.tech/api/session/sign-in", {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({
            login: values.name,
            password: values.password,
            confirmPassword: values.password,
            rememberMe: true,
            autoRegister: true,
            admin: false
          }),

          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        }
        )
        const responseData = await res.json();

        auth.login([responseData.data.user.email, responseData.data.user.username, responseData.data.user.image_url], true, responseData.data.token);
        router.push(`/users/${responseData.data.user.username}`)
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className="auth" >
      <input
        id='name'
        name='name'
        onChange={handleOnChange}
        placeholder='Username'
/*         value={typeof window !== 'undefined' ? localStorage.getItem('name') : ''}
 */      />
      <input
        type='password'
        id='password'
        name='password'
        placeholder='password'
/*         value={typeof window !== 'undefined' ? localStorage.getItem('password') : ''}
 */        onChange={handleOnChange}
      />
      {!isLoginMode && (
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          placeholder='Confirm password'
          onChange={handleOnChange}
        />
      )}
      <div className='check-box-holder'>
        <input ref={storedDataEl} type="checkbox" id="storedData" name="storedData" defaultChecked />
        <label htmlFor='storedData'>Remember me</label>
      </div>
      <button onClick={authSubmitHandler} id="btn-login">
        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
      </button>
      <div className='change-mode-holder'>
        <a id="change-mode" onClick={changeMode}>
          {isLoginMode ? 'create account' : 'back to login'}
        </a>
      </div>
    </div>
  )
}

const encodePass = btoa(process.env.INIT_USER + ':' + process.env.INIT_PASS);

export async function getServerSideProps(context) {

  const raw = {
    "uuid": "cool-workstation",
    "uuidOS": "Android"
  };

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(raw),
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + encodePass
    }
  };

  const res = await fetch("https://dev-mrp.insby.tech/api/init/app", requestOptions);
  const { data } = await res.json();
  const tokenId = data.token;

  return {
    props: {
      token: tokenId
    }
  }
}

export default Auth;
