const express = require('express')
const Model = require('../model/model')
const router = express.Router()

// Post Method
router.post('/post', async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all Method
router.get('/getAll', async (req, res) => {
  try {
    const data = await Model.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get by Id Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await Model.findById(req.params.id)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update by Id Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateData = req.body
    const options = { new: true }

    const result = await Model.findByIdAndUpdate(id, updateData, options)
    res.send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete by Id Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await Model.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been delete...`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router