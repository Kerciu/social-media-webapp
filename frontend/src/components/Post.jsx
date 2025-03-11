import { VStack, Text, HStack, Flex, Button } from '@chakra-ui/react'
import React from 'react'

const Post = (props) => {

    const { username, description, formatted_date, like_count } = props.post

    return (
        <VStack w='400px' h='400px' border='1px solid black' p='20px' borderColor='gray.300' borderRadius='md'>
            <HStack w='100%' flex='1'>
                <Text>{username}</Text>
            </HStack>
            <Flex flex='6' w='100%' h='100%' justifyContent='center' alignItems='center'>
                <Text textAlign='center'>{description}</Text>
            </Flex>
            <Flex flex='2'>
                <HStack>
                    <HStack>
                        <Button>Like</Button>
                        <Text>{like_count}</Text>
                    </HStack>
                    <HStack><Text>{formatted_date}</Text></HStack>
                </HStack>
            </Flex>
        </VStack>
    )
}

export default Post