module.exports.get = function (req, res) {
  try {
    const { msgslogin } = req.query;
    res.render('login', { msgslogin });
  } catch (err) {
    const status = 500;
    res.status(status).render('error', { status, message: err });
  }
};

module.exports.post = function (req, res) {
  try {
    const { password, email } = req.body;
    let err;
    if (!email || !password) {
      err = 'Email & pass are required';
      const status = 400;
      res.status(status).render('login', { msgslogin: err });
      return;
    }

    if (email !== 'admin@admin.com' || password !== 'admin') {
      err = 'Unathorized';
      const status = 400;
      res.status(status).render('login', { msgslogin: err });
      return;
    }
    req.session.isAuth = true;
    res.redirect('/admin');
  } catch (err) {
    const status = 500;
    res.status(status).render('error', { status, message: err });
  }
};
