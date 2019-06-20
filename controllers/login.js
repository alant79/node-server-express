module.exports.get = function (req, res) {
  try {
    const { msgslogin } = req.query;
    res.render('login', { msgslogin });
  } catch (err) {
    res.render('error', { status: res.status, message: err });
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
    res.render('error', { status: res.status, message: err });
  }
};
