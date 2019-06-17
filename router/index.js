const express = require('express');
const router = express.Router();
var multer = require('multer');
var upload = multer();
const ctrlHome = require('../controllers/home.js');
const ctrlAdmin = require('../controllers/admin.js');
const ctrlLogin = require('../controllers/login.js');
router.get('/', ctrlHome.get);
router.post('/', ctrlHome.post);
router.get('/admin', ctrlAdmin.get);
router.post('/admin/upload', upload.single('photo'), ctrlAdmin.postAddProduct);
router.post('/admin/skills', ctrlAdmin.postEditSkills);
router.get('/login', ctrlLogin.get);
router.post('/login', ctrlLogin.post);

// router.get('/admin', async (ctx) => {
//   const msgskill = ctx.flash && ctx.flash.get() ? ctx.flash.get().msgskill : null;
//   const msgfile = ctx.flash && ctx.flash.get() ? ctx.flash.get().msgfile : null;
//   try {
//     if (ctx.session.isAuth) {
//       ctx.render('admin', { msgskill, msgfile });
//     } else {
//       ctx.redirect('/login');
//     }
//   } catch (err) {
//     console.error(err.message);
//     ctx.status = 404;
//   }
// });

// router.post('/admin/upload', async (ctx) => {
//   try {
//     await productsCtrl.add({ ...ctx.request.files, ...ctx.request.body });
//     ctx.render('admin');
//   } catch (err) {
//     console.error(err.message);
//     ctx.status = 404;
//     ctx.flash.set({ msgfile: err.message });
//     ctx.redirect('/admin');
//   }
// });

// router.post('/admin/skills', async (ctx) => {
//   try {
//     await skillsCtrl.edit({ ...ctx.request.body });
//     ctx.render('admin');
//   } catch (err) {
//     console.error(err.message);
//     ctx.status = 404;
//     ctx.flash.set({ msgskill: err.message });
//     ctx.redirect('/admin');
//   }
// });

// router.get('/login', async (ctx) => {
//   try {
//     const msgslogin = ctx.flash && ctx.flash.get() ? ctx.flash.get().msgslogin : null;
//     ctx.render('login', {
//       msgslogin
//     });
//   } catch (err) {
//     console.error(err.message);
//     ctx.status = 404;
//   }
// });

// router.post('/login', async (ctx) => {
//   try {
//     await authCtrl.auth(ctx.request.body);
//     ctx.session.isAuth = true;
//     ctx.redirect('admin');
//   } catch (err) {
//     console.error(err.message);
//     ctx.flash.set({ msgslogin: err.message });
//     ctx.redirect('/login');
//   }
// });
module.exports = router;
