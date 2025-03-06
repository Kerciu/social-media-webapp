import { Button, Flex, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'

const Register = () => {

  const [credentails, setCredentials] = useState(
    {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    }
  );

  const nav = useNavigate();

  const handleRegister = async () => {
    const response = await AuthService.register(credentails);
    console.log(response);
    if (response.success) {
      nav(`/login/`)
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
    <Flex w='100%' h='calc(100vh + 90px)' justifyContent='center' alignItems='center'>
        <VStack w='90%' maxWidth='400px' alignItems='start' gap='30px'>
            <Heading>Register</Heading>
            <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" type="text" onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input id="firstName" type="text" onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input id="lastName" type="text" onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" onChange={handleChange} />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <Input id="confirmPassword" type="password" onChange={handleChange} />
            </FormControl>
            <Button w='100%' colorScheme='green' onClick={handleRegister}>Register</Button>
        </VStack>
    </Flex>
  )
}

export default Register