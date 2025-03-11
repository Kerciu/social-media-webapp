import { Flex, VStack, Box } from '@chakra-ui/react'
import React from 'react'

import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <VStack w='100vw' minH='100vh'>
        <Navbar/>
        <Box w='100%'>
            {children}
        </Box>
    </VStack>
  )
}

export default Layout