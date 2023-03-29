import { Center, Heading } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from "../recoil/atoms";

function Profile() {
   const user = useRecoilValue(currentUserState)
   console.log(user)
    return (
    <Center>
       <Heading>PROFILE PAGE UNDER CONSTRUCTION </Heading> 
    </Center>
     
  )
}

export default Profile