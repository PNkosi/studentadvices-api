const express = require('express')
const router = express.Router()
const StudentAdvice = require('../models/StudentAdvice')
const getAdvice = require('../middleware/getAdvice')

// Getting a random advice
router.get('/', async (req, res) => {
  try {
    const numberOfDocuments = await StudentAdvice.countDocuments()

    //Checking if there are any advices
    if (numberOfDocuments < 1) {
      return res.status(200).json({ message: 'There are no advices' })
    }
    const randomId = Math.floor(Math.random() * numberOfDocuments + 1)

    const advice = await StudentAdvice.findById(randomId)
    res.status(200).json(advice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Getting one quote by id
router.get('/:id', getAdvice, async (req, res) => {
  res.json(res.advice)
})

// Creating one quote
router.post('/', async (req, res) => {
  let name = req.body.name
  let institution = req.body.institution.toLowerCase()
  const advice = req.body.advice

  if (name === '' || name === undefined || name === null) {
    name = 'anonymous'
  }
  if (institution === '' || institution === undefined || institution === null) {
    institution = 'anonymous'
  }

  try {
    const newAdvice = new StudentAdvice({
      // Incrementing the id base on the number of documents
      _id: (await StudentAdvice.countDocuments()) + 1,
      name: name,
      institution: institution,
      advice: advice,
    })
    await newAdvice.save()
    res.status(201).json({ message: 'Successfully created advice!' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Updating one quote
router.patch('/:id', getAdvice, async (req, res) => {
  if (req.body.name != null) {
    res.advice.name = req.body.name
  }
  if (req.body.institution != null) {
    res.advice.institution = req.body.institution
  }
  if (req.body.advice != null) {
    res.advice.advice = req.body.advice
  }

  try {
    const updatedAdvice = await res.advice.save()
    res.json(updatedAdvice)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
