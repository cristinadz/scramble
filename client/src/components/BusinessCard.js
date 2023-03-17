import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atoms";
import api from "../api/posts.js";
import { useState } from "react";
import RatingShow from "./RatingShow";
import BusinessBadge from "./BusinessBadge";

//STYLING
import { ImStarFull } from "react-icons/im";
import {Button, Image, Text, HStack, Select, Center, Flex, Stack, useColorModeValue,} from "@chakra-ui/react";


function BusinessCard({ business }) {
	const { id, name, image_url, categories, rating, price, location } = business
	const [collection, setCollection] = useState(null);
	const currentUser = useRecoilValue(currentUserState);

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
						alignItems="left"
					>
						<Text fontSize={"2xl"}> {name} </Text>
						<BusinessBadge categories={categories} />
						<Text color={"gray.500"} size="sm" mb={4}>
							<HStack>
								<RatingShow rating={rating} iconType={ImStarFull}/>
								<Text color={"gray.400"}>
									{price ? "· " + price : null}
								</Text>
							</HStack>
						</Text>
						<Text
							textAlign={"left"}
							color={useColorModeValue("gray.700", "gray.400")}
							paddingBottom={9}
						>
							{business.location.display_address
								.map((i) => i)
								.join(",\n")}
						</Text>

						<Stack
							width={"100%"}
							mt={"2rem"}
							direction={"column"}
							padding={2}
							justifyContent={"space-between"}
							alignItems={"left"}
						>
							<Select size={'sm'} onChange={handleChange}>
								 <option value="">-</option>
								<option value="Food">Food</option>
								 <option value="Bars">Bars</option>
								<option value="Health & Beauty">Health & Beauty</option>
							</Select>
							<Button size={'md'} _hover={{ bg:'rgb(80, 81, 104)', color: 'white' }} bg='tomato' color='white' borderRadius='30px' onClick={handleClick}>
								{collection ? `Add to Collection` : "Add to Favorites"}
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Center>
		</>
	);
}

export default BusinessCard;

