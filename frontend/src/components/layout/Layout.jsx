import { Flex, VStack, Box } from '@chakra-ui/react'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <VStack w='100vh' minH='100vh'>
        <Box w='100%'>
            {children}
        </Box>
    </VStack>
  )
}

export default Layout