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

module.exports = router;
