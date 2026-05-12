const User = require('../user')

const createUser = async (req, res) => {
    try {
        console.log('BODY:', req.body)
        const { clerkId, role } = req.body

        const userExists = await User.findOne({ clerkId })
        if (userExists) {
            return res.status(200).json(userExists)
        }

        const newUser = await User.create({ clerkId, role })
        return res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const { clerkId } = req.params
        const user = await User.findOne({ clerkId })
        if (!user) return res.status(404).json({ message: 'User not found' })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createUser, getUser }
