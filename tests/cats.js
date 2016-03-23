'use strict'

var test    = require('tape')
var request = require('supertest')
var fs      = require('fs')
var path    = require('path')
var request = require('supertest')

var app  = require('../index')
var cats = require('../cats')

var CAT_TEST_DB = path.join(__dirname, '../db/test_cats.json')

var TEST_CATS = {
  cats: [
    { id: 1, name: "Fluffy" },
    { id: 2, name: "Muffy" },
    { id: 3, name: "Morris"}
  ]
}

var BLANK_DB = { cats: [] }

test('saveTheCats', function (t) {
  fs.writeFile(CAT_TEST_DB, JSON.stringify(BLANK_DB), function (err) {
    if (err) { return t.end(err) }
    cats.saveTheCats(CAT_TEST_DB, TEST_CATS, function (err) {
      t.error(err, 'No Error')
      fs.readFile(CAT_TEST_DB, 'utf-8', function (err, results) {
        if (err) { return t.end(err) }
        t.equal(results, JSON.stringify(TEST_CATS), 'All cats saved!')
        t.end()
      })
    })
  })
})

test('findTheCats', function (t) {
  fs.writeFile(CAT_TEST_DB, JSON.stringify(TEST_CATS), function (err) {
    if (err) { return t.end(err) }
    cats.findTheCats(CAT_TEST_DB, function (err) {
      t.error(err, 'No error')
      t.equal(results.cats && results.cats.length, 3, 'All cats found!')
      t.end()
    })
  })
})

test('GET /cats/new', function (t) {
  request(app)
    .get('/cats/new')
    .expect(200)
    .expect('Content-Type', /text\/html/)
    .end(function (err, res) {
      // res.text should be the output of your template
      // write a test here to ensure that there are six images representing
      // the six cats in your output. You'll probably want a Regex.

      // console.log(res.text)
      t.end()
    })
})
