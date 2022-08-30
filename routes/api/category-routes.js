const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const Data = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(Data)
  } catch(err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const Data = await Category.findByPk(req.params.id, {
      include:[{ model: Product }]
    });
    if (!Data) {
      res.status(400).json({ message: "Issue finding a category with that ID"});
      return;
    }
    res.status(200).json(Data);
  } catch(err) {
    res.status(400).json(err);
  }
});



router.post('/', async (req, res) => {
  // create a new category
  try {
    const Data = await Category.create(req.body);
    res.status(200).json(Data)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const Data = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(Data);
  } catch (err) {
    res.status(400).json({ message: "Update failed" })
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const Data = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!Data) {
      res.status(400).json({ message: "No Category found using that ID" })
      return
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(400).json(err)
  }
});

module.exports = router;
