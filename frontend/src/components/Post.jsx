import { VStack, Text } from '@chakra-ui/react'
import React from 'react'

const Post = (props) => {

    const { username, description, formatted_date, like_count } = props.post

    return (
        <VStack>
            <Text>{username}</Text>
            <Text>{description}</Text>
            <Text>{formatted_date}</Text>
            <Text>{like_count}</Text>
        </VStack>
    )
}

export default Post