// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import SignInSignUp from '../components/SignInSignUp';  // 로그인/회원가입 폼
import Toast from '../components/Toast';  // Toast 컴포넌트
import useAuth from '../hooks/useAuth';  // useAuth 훅
import { validateApiKey } from '../api/tmdb';  // Axios를 사용하는 validateApiKey

const AuthPage = () => {
  const { login } = useAuth();  // 로그인 관련 훅 가져오기
  const [isSignUp, setIsSignUp] = useState(false);  // 로그인/회원가입 상태 관리
  const [error, setError] = useState('');  // 에러 상태
  const [toastMessage, setToastMessage] = useState('');  // Toast 메시지
  const [toastType, setToastType] = useState('success');  // Toast 타입 (성공/실패)

  // 로그인 처리
  const handleLogin = async (email, password, rememberMe) => {
    try {
      await validateApiKey(password);  // TMDB API Key로 로그인 검증
      login(email, password);  // 로그인 성공 시 상태 업데이트
      setToastMessage('Login successful!');
      setToastType('success');
    } catch (err) {
      setError('Invalid API Key');
      setToastMessage('Login failed');
      setToastType('error');
    }
  };

  // 회원가입 처리
  const handleSignUp = async (email, password) => {
    try {
      await validateApiKey(password);  // TMDB API Key로 회원가입 검증
      login(email, password);  // 로그인 처리
      setToastMessage('Sign Up successful! Logging in...');
      setToastType('success');
      setTimeout(() => setIsSignUp(false), 2000);  // 로그인 폼으로 전환
    } catch (err) {
      setError('Invalid API Key');
      setToastMessage('Sign Up failed');
      setToastType('error');
    }
  };

  // 로그인/회원가입 폼 전환
  const switchForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <div className="auth-page">
      <SignInSignUp
        onLogin={handleLogin}  // 로그인 처리 함수
        onSignUp={handleSignUp}  // 회원가입 처리 함수
        isSignUp={isSignUp}  // 로그인/회원가입 상태
        error={error}  // 에러 메시지
        onSwitchForm={switchForm}  // 폼 전환 함수
      />
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />}
    </div>
  );
};

export default AuthPage;
