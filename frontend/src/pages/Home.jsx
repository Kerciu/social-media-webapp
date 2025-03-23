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


    const fetchPosts = useCallback(async (page) => {
        try {
            setFetchingMore(true)
            const response = await PostService.getHomepagePosts(page);
            console.log(response)

            setPosts((prevPosts) => [...prevPosts, ...(response.results || [])])
            setNextPage(page + 1)
        } catch (error) {
            setErrorMessage(error.response || "An error occured")
            if (error.status)
        } finally {
            setFetchingMore(false)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPosts(1);
    }, [fetchPosts])

    useEffect(() => {

        if (!loadingRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetchingMore)
                {
                    fetchPosts(nextPage);
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(loadingRef.current);

        return () => {
            if (loadingRef.current) observer.unobserve(loadingRef.current);
        }

    }, [nextPage, isFetchingMore, fetchPosts])

    return (
        <Flex w='100%' h='100%' justifyContent='center' pt='50px'>
            <VStack alignItems='start' pb='50px' gap='30px'>
                <Heading>Home</Heading>
                {errorMessage && <Text color='red.400'>Error: {errorMessage}</Text>}
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