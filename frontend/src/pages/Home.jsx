import { Flex, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import PostService from '../services/PostService';
import Post from '../components/Post';

const Home = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [nextPage, setNextPage] = useState(1)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await PostService.getHomepagePosts(nextPage);
                console.log(response)
                setPosts(response.results || [])
            } catch (error) {
                setErrorMessage(error.response || "An error occured")
            } finally {
                setLoading(false)
            }
        }

        fetchPosts();
    }, [posts])

    return (
        <Flex w='100%' h='100%' justifyContent='center'>
            <VStack>
                <Heading>Home</Heading>
                {errorMessage && <Text>Error: {errorMessage}</Text>}
                {
                    loading
                    ?
                    <Text>Loading...</Text>
                    :
                    posts ?
                        posts.map((post) => (
                            <Post key={post.id} post={post}/>
                        ))
                    :
                    <Text>No posts to display...</Text>
                }
            </VStack>
        </Flex>
    )
}

export default Home