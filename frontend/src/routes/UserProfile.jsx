import { Box, Flex, Heading, HStack, Text, VStack, Image, Button } from "@chakra-ui/react"

export const UserProfile = () => {
    return (
        <Flex w='100%' justifyContent='center'>
            <VStack w='75%' >
                <Box w='100%' mt='40px'>
                    <UserDetails/>
                </Box>
            </VStack>
        </Flex>
    )
}

const UserDetails = () => {

    const USER_IMAGE_PATH = 'http://localhost:8000/media/profile_image/default.jpg'

    return (
        <VStack w='100%' alignItems='start' >
            <Heading>@Username</Heading>
            <HStack gap='20px'>
                <Box boxSize='150px' border='2px solid' borderColor='gray.300' borderRadius='full' overflow='hidden'>
                    <Image src='' alt='profile picture' borderRadius='full' boxSize='100%' objectFit='cover'/>
                </Box>
                <VStack gap='20px'>
                    <HStack gap='20px' fontSize='18px'>
                        <VStack gap='20px'>
                            <Text>Posts</Text>
                            <Text>0</Text>
                        </VStack>
                        <VStack gap='20px'>
                            <Text>Followers</Text>
                            <Text>0</Text>
                        </VStack>
                        <VStack gap='20px'>
                            <Text>Following</Text>
                            <Text>0</Text>
                        </VStack>
                    </HStack>
                    <Button w='100%'>Edit Profile</Button>
                </VStack>
            </HStack>

            <Text fontSize='18px'>Hi, this is my BIO !!!</Text>
        </VStack>
    )
}