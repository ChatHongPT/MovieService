import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * PrivateRoute 컴포넌트
 * @param {Object} children - 보호된 경로에 렌더링할 컴포넌트
 * @returns {JSX.Element} - 인증된 사용자는 children을, 그렇지 않은 사용자는 /signin으로 리디렉션
 */
const PrivateRoute = ({ children }) => {
  // 로그인 여부 확인 (Local Storage에서 TMDb-Key 확인)
  const isLoggedIn = !!localStorage.getItem('TMDb-Key');

  return isLoggedIn ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
