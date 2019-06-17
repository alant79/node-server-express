module.exports.get = function (req, res) {
  try {
    const { msgslogin } = req.body;
    res.render('login', { msgslogin });
  } catch (err) {
    console.log(err);
  }
};

module.exports.post = function (req, res) {
  try {
    const { password, email } = req.body;
    let err;
    if (!email || !password) {
      err = 'Email & pass are required';
      res.render('login', { msgslogin: err });
      return;
    }

    if (email !== 'admin@admin.com' || password !== 'admin') {
      err = 'Unathorized';
      res.render('login', { msgslogin: err });
      return;
    }
    req.session.isAuth = true;
    res.redirect('/admin');
  } catch (err) {
    console.log(err);
  }
};
