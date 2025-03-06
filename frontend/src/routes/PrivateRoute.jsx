import React from 'react'
import { Text } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

    const { auth, loading } = useAuth()

    if (loading) return <Text>Login</Text>;

    return auth ? children : <Navigate to='/login'/>

}

export default PrivateRoute