import { Box, Flex, HStack, Button, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function NavBar() {
	return (
		<div>
			<Box px={4} bg='#EAEFD3'>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<HStack spacing={8} alignItems={"center"}>
						<Box as={NavLink} to={"/"} color='tomato' fontWeight="bolder" fontSize="xl"> scramble </Box>
					</HStack>
					<HStack as={"nav"} spacing={7}>
				
						<NavLink to={"/businesses"}> explore</NavLink>
						<NavLink to={"/favorites"}> favorites</NavLink>
						<NavLink to={"/profile"}> profile</NavLink>
						<Button bg="#27233A" color="white" size='sm' as={NavLink} to={"/login"} borderRadius="30px"> log in </Button>
            {/* <Button bg="#DCC48E" color="black" fontWeight="normal" size='sm' as={NavLink} to={"/login"} borderRadius="30px"> sign up </Button> */}
					</HStack>
				</Flex>
			</Box>
		</div>
	);
}

export default NavBar;
