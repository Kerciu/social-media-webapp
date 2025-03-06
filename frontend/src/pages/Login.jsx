import { Button, Flex, FormControl, FormLabel, Heading, Input, VStack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {

  const [credentails, setCredentials] = useState(
    {
      username: '',
      password: ''
    }
  );

  const nav = useNavigate();
  const { authLogin } = useAuth();

  const handleLogin = async () => {
    authLogin(credentails.username, credentails.password);
  }

  const handleChange = (event) => {
    setCredentials({
      ...credentails,
      [event.target.id]: event.target.value
    })
  }

  return  (
    <Flex w='100%' h='calc(100vh - 90px)' justifyContent='center' alignItems='center'>
        <VStack w='90%' maxWidth='400px' alignItems='start' gap='30px'>
          <Heading>Login</Heading>
            <FormControl>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input id='username' type='username' onChange={handleChange}/>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type='password' onChange={handleChange}/>
            </FormControl>
            <VStack w='100%' alignItems='start' gap='10px'>
                <Button w='100%' colorScheme='green' onClick={handleLogin}>Login</Button>
                <Text onClick={() => nav('/register/')}>Dont have an account yet? Register</Text>
            </VStack>
        </VStack>
    </Flex>
  )
}

export default Login