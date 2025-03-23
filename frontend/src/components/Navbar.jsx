import { Flex, HStack, Text } from '@chakra-ui/react'
import { FaUserCircle } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { APP_NAME } from '../utils/constants';

const Navbar = () => {

    const [user, setUser] = useState('kacper')  // leave it for now
    const nav = useNavigate()

    const handleNavigate = (path) => {
        nav(`/profile/${path}`)
    }

    return (
        <Flex w='100vw' h='90px' bg='blue.500' justifyContent='center' alignItems='center'>
            <HStack justifyContent='space-between' w='90%' color='white' fontSize={24} fontWeight='bold'>
                <Text onClick={() => nav('/')} cursor='pointer'>{APP_NAME}</Text>
                <HStack gap='40px'>
                    <Text onClick={() => nav('/create-post')} cursor='pointer'>
                        <CiSquarePlus size='30px'/>
                    </Text>
                    <Text onClick={() => handleNavigate(user)} cursor='pointer'>
                        <FaUserCircle size='40px'/>
                    </Text>
                </HStack>
            </HStack>
        </Flex>
    )
}

export default Navbar