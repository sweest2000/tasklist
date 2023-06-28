import React, { useState, useRef } from 'react';
import CustomButton from '../components/ui/CustomButton';
import { useAuth } from '../contexts/authContext';
import { NavLink } from 'react-router-dom';
import CustomInput from '../components/ui/CustomInput';

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg('Please fill all the fields');
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords doesn't match");
      return;
    }
    if (!passwordRegExp.test(passwordRef.current.value)) {
      setErrorMsg(
        'Password is too weak. It should be 8 symbols or longer, contain at least one capital letter and one digit '
      );
      return;
    }
    try {
      setErrorMsg('');
      setLoading(true);
      const { data, error } = await register(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (!error && data) {
        setMsg('Success. Check your email to confirm your account');
      }
    } catch (error) {
      setErrorMsg('Error in Creating Account');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col bg-white p-10 rounded-3xl gap-12 w-4/12">
        <div className="flex justify-center text-4xl">
          <h1>TaskList</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <span>E-mail</span>
            <CustomInput
              type="text"
              placeholder="Type your e-mail here"
              inputRef={emailRef}
            />
          </div>
          <div className="flex flex-col">
            <span>Password</span>
            <CustomInput
              type="password"
              placeholder="Type your password here"
              inputRef={passwordRef}
            />
          </div>
          <div className="flex flex-col">
            <span>Confirm password</span>
            <CustomInput
              type="password"
              placeholder="Confirm your password"
              inputRef={confirmPasswordRef}
            />
          </div>
          {errorMsg && <div>{errorMsg}</div>}
          {msg && <div>{msg}</div>}
          <div className="flex flex-col mt-5">
            <CustomButton disabled={loading} type="submit" mainColor="#6F2C4F">
              Register
            </CustomButton>
            <div className="flex justify-center mt-10 font-sans">
              <span>
                Have an account already?{' '}
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? '#713fff' : '#6F2C4F',
                  })}
                >
                  Login
                </NavLink>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
