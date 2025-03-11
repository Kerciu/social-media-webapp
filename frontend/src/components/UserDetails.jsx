import React, { useState, useEffect } from "react"
import { VStack, Heading, HStack, Box, Image, Text, Spacer, Button } from "@chakra-ui/react"
import { BASE_URL as SERVER_URL } from "../utils/constants"

import UserService from "../services/UserService"
import FollowerService from "../services/FollowerService"

const UserDetails = ({username}) => {

    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await UserService.getUserProfileData(username)
                console.log(response)
                setUserData(response)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData();
    }, [])

    const toggleFollow = async () => {
        try {
            const response = await FollowerService.toggleFollow(userData.username)
            if (response.now_following) {
                setUserData({
                    ...userData,
                    follower_count: userData.follower_count + 1,
                    is_following: true
                })
            } else {
                setUserData({
                    ...userData,
                    follower_count: Math.max(userData.follower_count - 1, 0),
                    is_following: false
                })
            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

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
                    {
                        loading ? <Spacer/> :
                        !userData.is_logged_user
                        ?
                        <Button colorScheme="blue" w='100%' onClick={toggleFollow}>
                            {userData.is_following ? 'Unfollow' : 'Follow'}
                        </Button>
                        :
                        <Button w='100%'>Edit Profile</Button>
                    }
                </VStack>
            </HStack>

            <Text fontSize='18px'>{loading ? '-' : userData.bio}</Text>
        </VStack>
    )
}

export default UserDetails;