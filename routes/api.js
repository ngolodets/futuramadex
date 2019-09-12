const express = require('express');
const router = express.Router();
const Character = require('../models/character');
const Quote = require('../models/quote');

router.get('/', (req, res) => {
  res.json({type: 'success', message: 'You accessed api routes'})
});

// GET /api/characters -- get all characters
router.get('/characters', (req, res) => {
  Character.find({}, function(arr, characters) {
    if (err) res.json(err)
    res.json(characters)
  })
})

// GET /api/characters/:cid - get one character
router.get('/characters/:cid', (req, res) => {
  Character.findById(req.params.aid).populate('quotes').exec(function(err, character) {
    if (err) res.status(500).json(err)
    res.status(200).json(character);
  })
})

// POST /api/characters - create new character
router.post('/characters', (req, res) => {
  let character = new Character({
    name: req.body.name
  });
  character.save((err, character) => {
    res.json(character)
  })
})

// PUT /api/characters/:cid - update a character
router.put('/characters/:cid', (req, res) => {
  Character.findByIdAndUpdate(
    req.params.cid,
    {
      name: req.body.name
    },
    {new: true},
    (err, character) => {
      if (err) res.json(err)
      res.status(203).json(character)
    }
  )
})

// DELETE /api/characters/:cid - delete character
router.delete('/characters/:cid', (req, res) => {
  Character.findByIdAndDelete(
    req.params.cid,
    function(err) {
      if (err) res.json(err)
      res.json({message: 'Deleted!'})
    }
  )
})

// GET /api/characters/:cid/quotes - get quotes for the character
router.get('/characters/:cid/quotes', (req, res) => {
  Character.findById(req.params.cid).populate('quotes').exec((err, character) => {
    if (err) res.json(err)
    res.json(character)
  })
})

// GET /api/characters/:cid/quotes/:qid
router.get('/characters/:cid/quotes/:qid', (req, res) => {
  Character.findById(req.params.cid, (err, quote) => {
    if (err) res.json(err)
    res.json(quote)
  })
})

// DELETE /api/characters/:cid/quotes/:qid - delete a quote from a character
router.delete('/characters/:cid/quotes/:qid', (req, res) => {
  Character.findById(req.params.cid, (err, character) => {
    character.quotes.pull(req.params.qid)
    character.save(err => {
      if (err) res.json(err)
      res.json(character)
    })
  })
})

module.exports = router;