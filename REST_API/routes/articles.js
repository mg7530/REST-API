const express = require('express')
const router = express.Router()
const Article = require('../models/article')

// Getting all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find()
    res.json(articles)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One article
router.get('/:id', getArticle, (req, res) => {
  res.json(res.article)
})

// Creating  article
router.post('/', async (req, res) => {
  const article = new Article({
    name: req.body.name,
    publishDate: req.body.publishDate
  })
  try {
    const newArticle = await article.save()
    res.status(201).json(newArticle)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating article
router.patch('/:id', getArticle, async (req, res) => {
  if (req.body.name != null) {
    res.article.name = req.body.name
  }
  if (req.body.author != null) {
    res.article.author = req.body.author
  }
  try {
    const updatedArticle = await res.article.save()
    res.json(updatedArticle)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting article
router.delete('/:id', getArticle, async (req, res) => {
  try {
    await res.article.remove()
    res.json({ message: 'Article Deleted ' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getArticle(req, res, next) {
  let article
  try {
    article = await Article.findById(req.params.id)
    if (article == null) {
      return res.status(404).json({ message: 'Cannot find the article' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.article = article
  next()
}

module.exports = router