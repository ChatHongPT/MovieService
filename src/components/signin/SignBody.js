import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const SignBody = ({ isSignup, handleSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded shadow-md p-6">
        <h1 className="text-xl font-bold text-center mb-4">
          {isSignup ? "회원가입" : "로그인"}
        </h1>
        <form onSubmit={(e) => handleSubmit(e, formData)}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              name="email"
              placeholder="이메일 입력"
              className="w-full p-2 border border-gray-300 rounded"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호 입력"
              className="w-full p-2 border border-gray-300 rounded"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {isSignup && (
            <>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호 확인 입력"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="agree"
                    className="form-checkbox"
                    checked={formData.agree}
                    onChange={handleChange}
                  />
                  <span className="ml-2 text-sm text-gray-700">약관에 동의</span>
                </label>
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                className="form-checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            {isSignup ? "회원가입" : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignBody;
