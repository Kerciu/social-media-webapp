import React, { useState, useEffect } from 'react'
import PostService from '../services/PostService'
import { Flex, Box, Text } from '@chakra-ui/react'

import Post from './Post'

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
        <Flex w='100%' wrap='wrap' gap='20px' pb='40px'>
            {
                loading ? <Text>Loading...</Text> :
                posts.map(post => (
                    <Post post={post}/>
                ))
            }
        </Flex>
    )
}

export default UserPosts