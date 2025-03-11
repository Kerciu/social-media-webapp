import React, { useState, useEffect } from 'react'
import PostService from '../services/PostService'
import { Flex, Box, Text } from '@chakra-ui/react'

const UserPosts = ({ username }) => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await PostService.getPosts(username)
                console.log(response)
                setPosts(response)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserPosts();
    }, [])

    return (
        <Flex>
            {
                loading ? <Text>Loading...</Text> :
                posts.map(post => (
                    <Box key={post.id} w='100%' mt='40px'>
                        <div>{post.description}</div>
                    </Box>
                ))
            }
        </Flex>
    )
}

export default UserPosts