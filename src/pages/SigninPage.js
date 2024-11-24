import React, { useState } from "react";
import SignBody from "../components/signin/SignBody";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    const { email, password, confirmPassword, agree, rememberMe } = formData;

    if (isSignup) {
      if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      if (!agree) {
        alert("약관에 동의해야 합니다.");
        return;
      }
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      alert("회원가입 성공!");
      setIsSignup(false);
    } else {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (email === storedEmail && password === storedPassword) {
        if (rememberMe) localStorage.setItem("isLoggedIn", "true");
        alert("로그인 성공!");
        navigate("/");
      } else {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    }
  };

  return (
    <div className="transition-opacity duration-500">
      <SignBody isSignup={isSignup} handleSubmit={handleSubmit} />
      <button
        className="mt-4 text-blue-500"
        onClick={() => setIsSignup((prev) => !prev)}
      >
        {isSignup ? "로그인으로 전환" : "회원가입으로 전환"}
      </button>
    </div>
  );
};

export default SigninPage;
