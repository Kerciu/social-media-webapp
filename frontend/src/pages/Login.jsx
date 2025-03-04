import { Button, Flex, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'

const Login = () => {
  return  (
    <Flex w='100%' h='calc(100vh - 90px)' justifyContent='center' alignItems='center'>
        <VStack w='90%' maxWidth='400px' alignItems='start' gap='30px'>
          <Heading>Login</Heading>
            <FormControl>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input id='username' type='username'/>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type='password'/>
            </FormControl>
            <Button w='100%' colorScheme='green'>Login</Button>
        </VStack>
    </Flex>
  )
}

export default Login