import { Box, Flex, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import UserDetails from "../components/UserDetails";
import UserPosts from "../components/UserPosts";

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
                <Box w='100%' mt='40px'>
                    <UserPosts username={user}/>
                </Box>
            </VStack>
        </Flex>
    )
}
