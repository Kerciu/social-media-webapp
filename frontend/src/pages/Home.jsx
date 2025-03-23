import { Flex, Heading, Text, VStack, Spinner } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import PostService from '../services/PostService';
import Post from '../components/Post';

const Home = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [nextPage, setNextPage] = useState(1)

    const [isFetchingMore, setFetchingMore] = useState(false);
    const loadingRef = useRef(null)


    const fetchPosts = useCallback(async () => {
        try {
            setFetchingMore(true)
            const response = await PostService.getHomepagePosts(nextPage);
            console.log(response)

            setPosts((prevPosts) => [...prevPosts, ...(response.results || [])])
            setNextPage((prevPage) => prevPage + 1)
        } catch (error) {
            setErrorMessage(error.response || "An error occured")
        } finally {
            setFetchingMore(false)
            setLoading(false)
        }
    }, [nextPage])

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <Flex w='100%' h='100%' justifyContent='center' pt='50px'>
            <VStack alignItems='start' pb='50px' gap='30px'>
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

                <div ref={loadingRef} style={{ height: '50px' }} />
                {isFetchingMore && <Spinner size="xl" />}
            </VStack>
        </Flex>
    )
}

export default Home