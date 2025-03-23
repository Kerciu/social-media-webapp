import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import PostService from '../services/PostService';

const CreatePost = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [postDesc, setPostDesc] = useState("");

    const handleDescription = (e) => {
        setPostDesc(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            const response = await PostService.createPost(postDesc)
            console.log(response)

        } catch(error) {
            setErrorMessage(error.response || "An error occurred");
        }
    }

    return (
        <Flex w='100%' h='100%' justifyContent='center' pt='50px'>
            <VStack w='95%' maxW='450px' alignItems='start' gap='40px'>
                <Heading>Create Post</Heading>
                {errorMessage && <FormErrorMessage>Error: {errorMessage}</FormErrorMessage>}
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input bg='white' type='text' value={postDesc} onChange={handleDescription}/>
                </FormControl>
                <Button w='100%' colorScheme='blue' onClick={handleSubmit}>Submit</Button>
            </VStack>
        </Flex>
    )
}

export default CreatePost