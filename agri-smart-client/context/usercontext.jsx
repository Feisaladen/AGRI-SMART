import { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from '../src/api/axios'

const UserContext = createContext() //empty container 

export const UserProvider = ({ children }) => {
    const { user, isLoaded } = useUser()    //  to handle user auth
    const [dbUser, setDbUser] = useState(null)   // handle new user creation
    const [loading, setLoading] = useState(true)   // handles loading state

    useEffect(() => {
        if (isLoaded && user) {
            axios.get(`/api/users/${user.id}`)
            .then(res => setDbUser(res.data))
            .catch(() => setDbUser(null))
            .finally(() => setLoading(false))
        } else if (isLoaded && !user) {
            setLoading(false)
        }
    }, [isLoaded, user])

    return (
        <UserContext.Provider value={{ dbUser, loading }}>{children}</UserContext.Provider>
    )
}

export const useAppUser = () => useContext(UserContext)
