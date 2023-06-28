import React, { useRef, useState } from 'react';
import CustomButton from '../components/ui/CustomButton';
import { useAuth } from '../contexts/authContext';
import { NavLink, useNavigate } from 'react-router-dom';
import CustomInput from '../components/ui/CustomInput';

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg('');
      setLoading(true);
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg('Please fill in the fields');
        return;
      }
      const {
        data: { user, session },
        error,
      } = await login(emailRef.current.value, passwordRef.current.value);
      if (error) setErrorMsg(error.message);
      if (user && session) navigate('/tasks');
    } catch (error) {
      setErrorMsg('Email or Password Incorrect');
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
          {errorMsg && <div>{errorMsg}</div>}
          <div className="flex flex-col mt-5">
            <CustomButton disabled={loading} type="submit" mainColor="#713fff">
              Login
            </CustomButton>
            <div className="flex justify-center mt-10 font-sans">
              <span>
                Don't have an account yet?{' '}
                <NavLink
                  to="/register"
                  style={({ isActive }) => ({
                    color: isActive ? '#713fff' : '#6F2C4F',
                  })}
                >
                  Register
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
