import { Box, Flex, Heading, HStack, Text, VStack, Image, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import UserService from "../services/UserService";
import { BASE_URL as SERVER_URL } from "../utils/constants";

export const UserProfile = () => {

    const {username} = useParams();
    const [user, setUser] = useState(username)

    useEffect(() => {
        setUser(username)
    }, [username])

    return (
        <Flex w='100%' justifyContent='center'>
            <VStack w='75%' >
                <Box w='100%' mt='40px'>
                    <UserDetails username={user}/>
                </Box>
            </VStack>
        </Flex>
    )
}

const UserDetails = ({username}) => {

    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await UserService.getUserProfileData(username)
                setUserData(response)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData();
    }, [])

    return (
        <VStack w='100%' alignItems='start' gap='40px'>
            <Heading>@{username}</Heading>
            <HStack gap='20px'>
                <Box boxSize='150px' border='2px solid' borderColor='gray.300' borderRadius='full' overflow='hidden'>
                    <Image src={loading ? '' : `${SERVER_URL}${userData.profile_img}`} alt='profile picture' borderRadius='full' boxSize='100%' objectFit='cover'/>
                </Box>
                <VStack gap='20px'>
                    <HStack gap='20px' fontSize='18px'>
                        {/* <VStack gap='20px'>
                            <Text>Posts</Text>
                            <Text>{userData.follower}</Text>
                        </VStack> */}
                        <VStack gap='20px'>
                            <Text>Followers</Text>
                            <Text>{loading ? '-' : userData.follower_count}</Text>
                        </VStack>
                        <VStack gap='20px'>
                            <Text>Following</Text>
                            <Text>{loading ? '-' : userData.following_count}</Text>
                        </VStack>
                    </HStack>
                    <Button w='100%'>Edit Profile</Button>
                </VStack>
            </HStack>

            <Text fontSize='18px'>{loading ? '-' : userData.bio}</Text>
        </VStack>
    )
}