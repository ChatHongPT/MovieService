import React, { useState } from 'react';
import { tryLogin, tryRegister } from '../api/Authentication';
import { useNavigate } from 'react-router-dom';
import ToastNotification, { showSuccessToast, showErrorToast } from '../components/ToastNotification';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false); // 로그인/회원가입 전환 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false); // 약관 동의
  const navigate = useNavigate();

  // 이메일 형식 검증 함수
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAuth = () => {
    if (!validateEmail(email)) {
      showErrorToast('유효하지 않은 이메일 형식입니다.');
      return;
    }

    if (isSignUp) {
      // 회원가입 처리
      if (password !== confirmPassword) {
        showErrorToast('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (!agreeTerms) {
        showErrorToast('약관에 동의해야 합니다.');
        return;
      }
      tryRegister(
        email,
        password,
        (message) => {
          showSuccessToast(message); // 회원가입 성공 메시지
          setIsSignUp(false); // 로그인 화면으로 전환
        },
        (error) => showErrorToast(error) // 회원가입 실패 메시지
      );
    } else {
      // 로그인 처리
      tryLogin(
        email,
        password,
        (message) => {
          showSuccessToast(message); // 로그인 성공 메시지
          if (rememberMe) localStorage.setItem('rememberMe', email); // Remember me 처리
          navigate('/'); // 메인 페이지로 이동
        },
        (error) => showErrorToast(error), // 로그인 실패 메시지
        rememberMe
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <ToastNotification />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? '회원가입' : '로그인'}
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        {isSignUp && (
          <>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="mr-2"
              />
              약관에 동의합니다
            </label>
          </>
        )}
        {!isSignUp && (
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            Remember me
          </label>
        )}
        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
        >
          {isSignUp ? '회원가입' : '로그인'}
        </button>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-4 text-blue-500 hover:underline text-center"
        >
          {isSignUp ? '로그인 페이지로 전환' : '회원가입 페이지로 전환'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
