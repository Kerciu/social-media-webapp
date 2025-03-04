import { Box, Flex, Text, VStack } from "@chakra-ui/react"

export const UserProfile = () => {
    return (
        <Flex w='100%' justifyContent='center'>
            <VStack w='75%' >
                <Box w='100%'>
                    <UserDetails/>
                </Box>
            </VStack>
        </Flex>
    )
}

const UserDetails = () => {
    return (
        <VStack w='100%' alignItems='start' >
            <Text>User Details</Text>
        </VStack>
    )
}