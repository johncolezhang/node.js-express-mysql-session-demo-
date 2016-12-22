var sqlModel = {
  selectuser: 'select * from testuser where user=? and password=?',
  selectproduct: 'select * from testproduct',
  existuser: 'select user from testuser where user=?',
  signupuser: 'insert into testuser(user, password) values (?, ?)'
};
module.exports = sqlModel;