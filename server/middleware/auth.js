const { User } = require("../models/User");


const auth = (req, res, next) => {

  // 클라이언트 쿠키에서 token 가져오기
  let token = req.cookies.x_auth;
  if (!token) {
    return res.status(401).json({ isAuth: false, code: 'NoCookieXAuth', message: '사용자를 인증할 쿠키정보가 없습니다.' })
  }

  // token 복호화하여 user를 검증
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(401).json({ isAuth: false, code: 'NoSuchTokenUser', message: '사용자의 토큰 정보가 존재하지 않습니다.' })
    req.token = token;
    req.user = user;
    next();
  })
}

module.exports = { auth }