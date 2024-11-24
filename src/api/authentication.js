// 사용자 데이터 초기화
const users = JSON.parse(localStorage.getItem('users')) || [];

/**
 * 사용자 로그인 처리
 */
export const tryLogin = (email, password, success, fail, saveToken) => {
  const user = users.find(user => user.id === email && user.password === password);
  if (user) {
    if (saveToken) {
      localStorage.setItem('TMDb-Key', user.password); // Remember me
    }
    success('로그인 성공!');
  } else {
    fail('아이디 또는 비밀번호가 올바르지 않습니다.');
  }
};

/**
 * 사용자 회원가입 처리
 */
export const tryRegister = (email, password, success, fail) => {
  const userExists = users.some(user => user.id === email);
  if (!userExists) {
    users.push({ id: email, password });
    localStorage.setItem('users', JSON.stringify(users));
    success('회원가입 성공!');
  } else {
    fail('이미 등록된 이메일입니다.');
  }
};
