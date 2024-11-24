import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import tmdb from "../api/tmdb"; // tmdb 객체 import

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // 로그인/회원가입 상태
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [confirmApiKey, setConfirmApiKey] = useState(""); // 회원가입 시 API 키 확인
  const [rememberMe, setRememberMe] = useState(false); // 로그인 상태 유지
  const [agreeTerms, setAgreeTerms] = useState(false); // 회원가입 시 약관 동의

  const navigate = useNavigate();

  // Email 형식 검증
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("유효한 이메일을 입력해주세요.");
      return;
    }

    const isValid = await tmdb.verifyApiKey(apiKey); // tmdb 객체를 통해 호출
    if (!isValid) {
      toast.error("유효하지 않은 API 키입니다.");
      return;
    }

    // 로그인 성공 처리
    toast.success("로그인 성공!");
    if (rememberMe) {
      localStorage.setItem("rememberMe", true);
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("tmdb_api_key", apiKey);
    }
    navigate("/"); // 메인 페이지로 이동
  };

  // 회원가입 처리
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("유효한 이메일을 입력해주세요.");
      return;
    }
    if (apiKey !== confirmApiKey) {
      toast.error("API 키가 일치하지 않습니다.");
      return;
    }
    if (!agreeTerms) {
      toast.error("약관에 동의해주세요.");
      return;
    }

    const isValid = await tmdb.verifyApiKey(apiKey); // tmdb 객체를 통해 호출
    if (!isValid) {
      toast.error("유효하지 않은 API 키입니다.");
      return;
    }

    // 회원가입 성공 처리
    toast.success("회원가입 성공! 로그인 페이지로 이동합니다.");
    setIsLogin(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-xl font-bold text-center mb-6">
          {isLogin ? "로그인" : "회원가입"}
        </h1>
        <form onSubmit={isLogin ? handleLogin : handleSignUp}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-gray-700">
              TMDB API 키
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="API 키를 입력하세요"
              required
            />
          </div>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label htmlFor="confirmApiKey" className="block text-gray-700">
                  API 키 확인
                </label>
                <input
                  type="password"
                  id="confirmApiKey"
                  value={confirmApiKey}
                  onChange={(e) => setConfirmApiKey(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="API 키를 다시 입력하세요"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mr-2"
                  />
                  약관에 동의합니다
                </label>
              </div>
            </>
          )}
          {isLogin && (
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                로그인 상태 유지
              </label>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {isLogin ? "로그인" : "회원가입"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? "처음 방문하셨나요?" : "이미 계정이 있으신가요?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline"
          >
            {isLogin ? "회원가입" : "로그인"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;