const fs = require('fs');
const path = require('path');
const productsPath = path.join(__dirname, '../temp/products.json');
const skillsPath = path.join(__dirname, '../temp/skills.json');

module.exports.get = function (req, res) {
  try {
    const { msgemail } = req.body;
    let products = [];
    let skills = [];
    if (fs.existsSync(productsPath)) {
      products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    }
    if (fs.existsSync(skillsPath)) {
      skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
    }
    res.render('index', { products, skills, msgemail });
  } catch (err) {
    return res.send(new Error(err));
  }
};

module.exports.post = function (req, res) {
  try {
    const { name, email, message } = req.body;
    let products = [];
    let skills = [];
    if (fs.existsSync(productsPath)) {
      products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    }
    if (fs.existsSync(skillsPath)) {
      skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
    }
    if (!name || !email) {
      const err = 'All fields are required';
      res.render('index', { msgemail: err, products, skills });
      return;
    }
    console.log(name, email, message);
    res.render('index', { products, skills });
  } catch (err) {
    return res.send(new Error(err));
  }
};
