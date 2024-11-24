import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/signin';
import Home from './pages/home';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 및 회원가입 페이지 */}
        <Route path="/signin" element={<SignIn />} />

        {/* 보호된 경로: 인증된 사용자만 접근 가능 */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
