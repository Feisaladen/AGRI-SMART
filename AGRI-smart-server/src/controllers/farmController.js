const User = require('../user')
const Farm = require('../farm')

const createFarm = async (req, res) => {
    try {
    const { clerkId, name, county, crops } = req.body

    // Find user by clerkId
    const user = await User.findOne({ clerkId })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Create farm
    const farm = await Farm.create({
      owner: user._id,
      name,
      county,
      crops
    })

    res.status(201).json(farm)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createFarm }