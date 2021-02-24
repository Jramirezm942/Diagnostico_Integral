const express = require('express');
const router  = express.Router();
const  {infantProcess} = require ("../controllers/infant")
/* GET home page */
router.get('/', (req, res) => {
  res.send('Diagnostico Integral');
});


router.post("/infants", infantProcess);

module.exports = router;
