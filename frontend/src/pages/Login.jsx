import { Button, Flex, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'

const Login = () => {

  const [credentails, setCredentials] = useState(
    {
      username: '',
      password: ''
    }
  );

  const nav = useNavigate();

  const handleLogin = async () => {
    const {username, password} = credentails;
    const response = await AuthService.login(username, password);
    console.log(response);
    if (response.success) {
      nav(`/profile/${username}`)
    } else {
      alert('Invalid credentials');
    }
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
            <Button w='100%' colorScheme='green' onClick={handleLogin}>Login</Button>
        </VStack>
    </Flex>
  )
}

export default Login