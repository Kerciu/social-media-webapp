import { Button, Flex, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'

const CreatePost = () => {
  return (
    <Flex w='100%' h='100%' justifyContent='center' pt='50px'>
        <VStack w='95%' maxW='450px' alignItems='start' gap='40px'>
            <Heading>Create Post</Heading>
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Input bg='white' type='text' />
            </FormControl>
            <Button w='100%' colorScheme='blue'>Submit</Button>
        </VStack>
    </Flex>
  )
}

export default CreatePost