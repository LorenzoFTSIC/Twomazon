const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const Data = await Tag.findAll({
      include: [{ model : Product }]
    });
    res.status(200).json(Data);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const Data = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    if (!Data) {
      res.status(404).json({ message: "No tag found using that ID" });
      return;
    }
    res.status(200).json(Data);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const Data = await Tag.create(req.body);
    res.status(200).json(Data);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const Data = await Tag.create(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!Data) {
      res.status(404).json({ message: "No tag found using that ID"});
      return;
    }
    res.status(200).json(Data);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const Data = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!Data) {
      res.status(404).json({ message: "No Tag found using that ID" });
      return;
    }
    res.status(200).json(Data);
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;
