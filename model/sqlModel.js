var sqlModel = {
  selectuser: 'select * from testuser where user=? and password=?',
  selectproduct: 'select * from testproduct',
  existuser: 'select user from testuser where user=?',
  signupuser: 'insert into testuser(user, password) values (?, ?)',
  selectadmin: 'select * from testadmin where admin=? and password=?',
  existadmin: 'select * from testadmin where admin=?',
  signupadmin: 'insert into testadmin(admin, password) values (?, ?)',
  addproduct: 'insert into testproduct(product_name, product_price, product_path) values (?, ?, ?)',
  delete_product: 'delete from testproduct where product_name=?',
  add_priture_array: 'insert into testproduct(product_name,product_price,product_path1,product_path2,product_path3,product_path4) values (?, ?, ?, ?, ? ,?)',
  delete_product: 'select product_path1, product_path2, product_path3, product_path4 from testproduct where product_name=? ; delete from testproduct where product_name=?'
};
module.exports = sqlModel;