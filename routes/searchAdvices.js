const express = require('express')
const router = express.Router()
const _ = require('lodash')
const StudentAdvice = require('../models/StudentAdvice')
const getAdvice = require('../middleware/getAdvice')

//Search by institution
router.get('/', async (req, res) => {
  try {
    const queryInstitution = req.query.institution.toLowerCase()
    const advices = await StudentAdvice.find({ institution: queryInstitution })

    if (advices.length > 0) {
      const institutionAdvices = advices.map((advice) => {
        return {
          name: advice.name,
          advice: advice.advice,
        }
      })
      res.status(200).json({
        instituition: queryInstitution,
        count: advices.length,
        advices: institutionAdvices,
      })
    } else {
      res
        .status(404)
        .json({ message: `No advice from ${queryInstitution} exists` })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
