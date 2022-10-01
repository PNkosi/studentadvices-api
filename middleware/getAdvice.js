const StudentAdvice = require('../models/StudentAdvice')

const getAdvice = async (req, res, next) => {
  let advice
  try {
    advice = await StudentAdvice.findById(req.params.id)
    if (advice === null) {
      return res.status(404).json({ message: 'Cannot find advice' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

  res.advice = advice
  next()
}

module.exports = getAdvice
