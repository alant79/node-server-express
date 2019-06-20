const fs = require('fs');
const path = require('path');
const productsPath = path.join(__dirname, '../temp/products.json');

module.exports.get = function (req, res) {
  const { msgskill, msgfile } = req.query;
  try {
    res.render('admin', { msgskill, msgfile });
  } catch (err) {
    res.render('error', { status: res.status, message: err });
  }
};

module.exports.postEditSkills = function (req, res) {
  try {
    const { age, concerts, cities, years } = req.body;
    console.log(req.body);
    if (!age || !concerts || !cities || !years) {
      const err = 'All fields are required';
      res.render('admin', { msgskill: err });
      return;
    }
    let newSkills = [];
    newSkills.push({
      'number': age,
      'text': 'Возраст начала занятий на скрипке'
    },
    {
      'number': concerts,
      'text': 'Концертов отыграл'
    },
    {
      'number': cities,
      'text': 'Максимальное число городов в туре'
    },
    {
      'number': years,
      'text': 'Лет на сцене в качестве скрипача'
    });
    fs.writeFileSync(path.join(process.cwd(), '/temp/skills.json'), JSON.stringify(newSkills, '', 4));
    res.render('admin');
  } catch (err) {
    res.render('error', { status: res.status, message: err });
  }
};

module.exports.postAddProduct = function (req, res) {
  try {
    const { name, price } = req.body;
    const { originalname: photoName, size, buffer } = req.file;
    const uploadDir = path.join(
      process.cwd(),
      '/public',
      'assets',
      'img',
      'products'
    );

    let err;

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    if (!name || !price) {
      // fs.unlinkSync(tempPath);
      err = 'All fields are required';
      res.render('admin', { msgfile: err });
      return;
    }
    if (!photoName || !size) {
      // fs.unlinkSync(tempPath);
      err = 'File not saved';
      res.render('admin', { msgfile: err });
      return;
    }

    // fs.renameSync(tempPath, path.join(uploadDir, photoName));
    fs.writeFileSync(
      path.join(uploadDir, photoName),
      buffer);

    //
    let products = [];
    if (fs.existsSync(productsPath)) {
      products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    }

    let newProducts = products.slice();
    newProducts.push({
      src: './assets/img/products/' + photoName,
      name: name,
      price: price
    });

    fs.writeFileSync(
      path.join(process.cwd(), '/temp/products.json'),
      JSON.stringify(newProducts, '', 4)
    );

    res.render('admin');
  } catch (err) {
    res.render('error', { status: res.status, message: err });
  }
};
