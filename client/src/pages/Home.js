// STYLING
import {
	Box,
	Heading,
	Container,
	Text,
	Button,
	Stack,
	Icon,
	useColorModeValue,
	createIcon,
	VStack,
  HStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Home() {
	return (
		<div>
			<Container maxW={'640px'}>
				<VStack
					as={Box}
					textAlign={"center"}
					spacing={{ base: 8, md: 14 }}
					py={{ base: 20, md: 36 }}
				>
					<Heading
					
						fontFamily="karla"
						fontWeight="bolder"
						fontSize={{ base: "3xl", sm: "4xl", md: "7xl" }}
						lineHeight={"110%"}
					>
						discover your next favorite
						
						<Text as={"span"} color={"tomato"}> business </Text>
					</Heading>
					<Text maxW={'500px'} color="gray.500">
						looking for a new place to eat, drink, shop etc? let scramble
						take away the pressure of picking a place with the click of a
						button.
					</Text>
          <HStack>
            <Button bg="tomato" color="white" size='md' as={NavLink} to={"/login"} borderRadius="30px"> log in </Button>
            <Button color="tomato" variant={'outline'} colorScheme="tomato" size='md' as={NavLink} to={"/login"} borderRadius="30px">  sign up</Button>
          </HStack>
				</VStack>
			</Container>
		</div>
	);
}

export default Home;
