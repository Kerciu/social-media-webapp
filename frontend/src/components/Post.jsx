import { VStack, Text, HStack, Flex, Box } from '@chakra-ui/react'
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PostService from '../services/PostService';

const Post = (props) => {

    const { id, username, description, formatted_date, liked, like_count } = props.post

    const [like, setLike] = useState(liked)
    const [likeCount, setLikeCount] = useState(like_count)
    const nav = useNavigate();

    const handleToggleLike = async () => {
        const data = await PostService.likePost(id);
        if (data.liked) {
            setLike(true);
            setLikeCount(likeCount + 1);
        } else {
            setLike(false);
            setLikeCount(Math.max(likeCount - 1, 0));
        }
    }

    return (
        <VStack w='400px' h='400px' border='1px solid black' borderColor='gray.300' borderRadius='8px'>
            <HStack w='100%' flex='1' borderBottom='1px solid' borderColor='gray.300' p='0 20px' bg='gray.50' borderRadius='8px 8px 0 0'>
                <Text onClick={() => nav(`/profile/${username}/`)}>@{username}</Text>
            </HStack>
            <Flex flex='6' w='100%' h='100%' justifyContent='center' alignItems='center'>
                <Text textAlign='center'>{description}</Text>
            </Flex>
            <Flex flex='2' w='100%' justifyContent='center' alignItems='center' borderTop='1px solid' bg='gray.50' borderColor='gray.400' borderRadius='0 0 8px 8px'>
                <HStack w='90%' justifyContent='space-between'>
                    <HStack>
                        <Box cursor='pointer'>
                            {like ? <AiFillLike onClick={handleToggleLike}/> : <AiOutlineLike onClick={handleToggleLike}/>}
                        </Box>
                        <Text>{likeCount}</Text>
                    </HStack>
                    <HStack><Text>{formatted_date}</Text></HStack>
                </HStack>
            </Flex>
        </VStack>
    )
}

export default Post