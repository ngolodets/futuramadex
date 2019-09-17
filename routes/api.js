const express = require('express');
const router = express.Router();
const Character = require('../models/character');
const Quote = require('../models/quote');

router.get('/', (req, res) => {
  res.json({type: 'success', message: 'You accessed api routes'})
});

// GET /api/characters -- get all characters - works!
router.get('/characters', (req, res) => {
  Character.find({}, function(err, characters) {
    if (err) res.json(err)
    res.json(characters)
  })
})

// GET /api/characters/:cid - get one character - works!
router.get('/characters/:cid', (req, res) => {
  Character.findById(req.params.cid).populate('quotes').exec(function(err, character) {
    if (err) res.status(500).json(err)
    res.status(200).json(character);
  })
})

// POST /api/characters - create new character - works!
router.post('/characters', (req, res) => {
  console.log('Hitting the post route')
  let character = new Character({
    name: req.body.name
  });
  character.save((err, character) => {
    if (err) res.json(err)
    res.json(character)
  })
})

// PUT /api/characters/:cid - update a character - works!
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

// DELETE /api/characters/:cid - delete character - works!
router.delete('/characters/:cid', (req, res) => {
  Character.findByIdAndDelete(
    req.params.cid,
    function(err) {
      if (err) res.json(err)
      res.json({message: 'Deleted!'})
    }
  )
})

// GET /api/characters/:name/quotes - get quotes for the character - works!
router.get('/characters/:name/quotes', (req, res) => {
  Character.find({name: req.params.name}).populate('quotes').exec((err, character) => {
    if (err) res.json(err)
    res.json(character)
  })
})

// GET /api/characters/:name/quotes/:qid - works!
router.get('/characters/:name/quotes/:qid', (req, res) => {
  Quote.findById(req.params.qid, (err, quote) => {
    if (err) res.json(err)
    res.json(quote)
  })
})

// POST /api/characters/:name/quotes - create new quote - works!
router.post('/characters/:name/quotes', (req, res) => {
  Character.find({name: req.params.name}, function(err, character) {
    Quote.create({
      quote: req.body.quote,
      character: req.params.name
    }, function(err, quote) {
      character.quotes.push(quote)
      character.save(function(err, character) {
        if (err) res.json(err)
        res.json(character)
      })
    })
  })
})

// DELETE /api/characters/:name/quotes/:qid - delete a quote from a character
router.delete('/characters/:name/quotes/:qid', (req, res) => {
  Character.find({name: req.params.name}, (err, character) => {
    character.quotes.pull(req.params.qid)
    character.save(err => {
      if (err) res.json(err)
      res.json(character)
    })
  })
})

module.exports = router;