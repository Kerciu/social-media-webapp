import { Button, Flex, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'

const CreatePost = () => {
  return (
    <Flex>
        <VStack>
            <Heading>Create Post</Heading>
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Input/>
            </FormControl>
            <Button>Submit</Button>
        </VStack>
    </Flex>
  )
}

export default CreatePost