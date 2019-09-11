const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({type: 'success', message: 'You accessed api routes'})
});

module.exports = router;