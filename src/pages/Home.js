import React from "react";

const Home = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {isLoggedIn ? (
        <>
          <h1 className="text-3xl font-bold text-gray-800">환영합니다!</h1>
          <p className="text-gray-600">로그인 상태입니다.</p>
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              window.location.href = "/signin";
            }}
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-600">로그인되지 않았습니다.</h1>
          <p className="text-gray-600">로그인 후 다시 시도해주세요.</p>
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            onClick={() => (window.location.href = "/signin")}
          >
            로그인 페이지로 이동
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
