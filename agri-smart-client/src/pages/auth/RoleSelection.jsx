import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const RoleSelection = () => {
    const navigate = useNavigate()
    const { user } = useUser()

    const selectRole = async (role) => {
        try {
            await axios.post('/api/users/create', {
                clerkId: user.id,
                role
            })
            if (role === 'farmer') {
                navigate('/farm-profile')
            } else {
                navigate('/buyer/home')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen gap-6'>
            <h1 className='text-2xl font-bold'>who are you</h1>
            <div className='flex gap-4'>
                <button
                    onClick={() => selectRole('farmer')}
                    className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg"
                >
                    🌾 Farmer
                </button>
                <button
                    onClick={() => selectRole('buyer')}
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg"
                >
                    🛒 Buyer
                </button>
            </div>
        </div>
    )
}

export default RoleSelection
