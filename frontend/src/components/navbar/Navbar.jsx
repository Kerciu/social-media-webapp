import { Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { APP_NAME } from '../../utils/appName'

const Navbar = () => {
  return (
    <Flex w='100vw' h='90px' bg='blue.500' justifyContent='center' alignItems='center'>
        <HStack justifyContent='space-between' w='90%' color='white' fontSize={24} fontWeight='bold'>
            <Text>{APP_NAME}</Text>
            <HStack>
                <Text>Profile</Text>
            </HStack>
        </HStack>
    </Flex>
  )
}

export default Navbar