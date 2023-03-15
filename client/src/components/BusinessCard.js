import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atoms";
import api from "../api/posts.js";
import { useState } from "react";
import BusinessRating from "./BusinessRating";
import BusinessBadge from "./BusinessBadge";

//STYLING

import {
	Button,
	Card,
	Image,
	Text,
	HStack,
	Select,
	VStack,
	Center,
	Flex,
	Heading,
	Link,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";

function BusinessCard({ business }) {
	const { id, name, image_url, categories, rating, price, location } = business;
	const [collection, setCollection] = useState(null);
	const currentUser = useRecoilValue(currentUserState);
console.log(business)

	const handleChange = (e) => setCollection(e.target.value);
	const handleClick = async () => {
		try {
			const response = await api.post(
				"/favorites",
				{
					business_id: id,
					name: name,
					image_url: image_url,
					price: price,
					collection: collection,
					location_city: location.city,
					location_state: location.state,
					owner_id: currentUser.id,
				},
				{ headers: { Authorization: `Bearer ${currentUser.access_token}` } }
			);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Center py={1}>
				<Stack
					w={{ sm: "70%", md: "600px" }}
					height={{ sm: "70%", md: "20rem" }}
					direction={{ base: "column", md: "row", lg: "row" }}
					bg={useColorModeValue("white", "gray.900")}
					boxShadow={"2xl"}
					padding={4}
				>
					<Flex flex={1}>
						<Image
							src={image_url}
							alt={id}
							objectFit="cover"
							boxSize="100%"
						/>
					</Flex>

					<Stack
						flex={1}
						flexDirection="column"
						//   justifyContent="center"
						alignItems="left"
					>
						<Text fontSize={"2xl"}> {name} </Text>
						<BusinessBadge categories={categories} />
						<Text color={"gray.500"} size="sm" mb={4}>
							<HStack> 
							<BusinessRating rating={rating} />
							<Text color={'gray.400'}> {price ? "· " + price : null}</Text>
							</HStack>
						</Text>
						<Text
							textAlign={"left"}
							color={useColorModeValue("gray.700", "gray.400")}
							
						>
							{(business.location.display_address.map( i => (i)).join(',\n'))}
						</Text>

						<Stack
							width={"100%"}
							mt={"2rem"}
							direction={"row"}
							padding={2}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<Button> button</Button>
						</Stack>
					</Stack>
				</Stack>
			</Center>
		</>
	);
}

export default BusinessCard;

// <ul>
// <Card padding="20px" maxW="100%">
// 	<HStack>
// 		<VStack>
// 			<Text fontSize={"xl"} fontWeight="bold">
// 				{business.name.toLowerCase()}
// 			</Text>
// 			<HStack padding="10px">
// 				<BusinessRating rating={business.rating} />
// 			</HStack>

// 			<Select onChange={handleChange}>
// 				<option value="">-</option>
// 				<option value="Food">Food</option>
// 				<option value="Bars">Bars</option>
// 				<option value="Health & Beauty">Health & Beauty</option>
// 				{/* <option value="other">Other</option> */}
// 			</Select>
// 			<Button onClick={handleClick}>
// 				{collection ? `Add to Collection` : "Add to Favorites"}
// 			</Button>
// 		</VStack>
// 	</HStack>
// </Card>
// </ul>
