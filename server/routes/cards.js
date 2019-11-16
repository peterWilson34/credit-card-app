const express = require('express');
const router = express.Router();
const CardsController = require('../controllers/cards');


router.route('/api/cards')

  .post(CardsController.add)
  .get(CardsController.getAll)

module.exports = router;
