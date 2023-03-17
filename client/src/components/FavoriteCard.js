import { useState } from "react";
import RatingForm from "./RatingForm";
import RatingShow from "./RatingShow";
import { BsSuitHeartFill } from "react-icons/bs";

//STYLING
import { Button, Image, Text, HStack, Flex, Stack, useColorModeValue } from "@chakra-ui/react";

function FavoriteCard({ favorite, deleteFavorite, togglePopUp }) {
	const { id, name, image_url, location_city, location_state, rating, price, comment, business_id,} = favorite;
	const [showEditForm, setShowEditForm] = useState(false);
	const handleShowEditFrom = () => setShowEditForm(!showEditForm);

	const handleDelete = () => deleteFavorite(id);
	// const handlePopUp = () => togglePopUp(business_id);

	return (
		<>
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
						alt={id}
						objectFit="cover"
						boxSize="100%"
						src={image_url}
					/>
				</Flex>
				<Stack flex={1} flexDirection="column" alignItems="left" padding={2}>
					<Text fontSize={"2xl"}> {name} </Text>
					<HStack>
						<Text color={"gray.500"}>
							{location_city}, {location_state}
						</Text>
						<Text color={"gray.400"}> · {price} </Text>
					</HStack>
					
					{rating && showEditForm == false ? (
						<> 
							<RatingShow  rating={rating} iconType={BsSuitHeartFill} />
							<Text> comment: {comment} </Text>
							<Stack > 
							<Button size='sm'  maxW='70px' borderRadius='30px' marginBottom={2} color="grey" variant={'link'}  onClick={handleShowEditFrom}>
								edit rating
							</Button>
							</Stack>
							</>
					) : (
						<> 
						{ showEditForm ? null : <Button color="tomato" variant={'outline'} colorScheme="tomato" borderRadius='30px' size='sm' onClick={handleShowEditFrom}>add rating</Button> }
						</>
					)}

					{showEditForm ? <RatingForm id={id} currentComment ={comment}/> : null}
					{showEditForm ? null :  <Button bg="tomato" color='white' borderRadius='30px' size='sm' onClick={handleDelete}>delete</Button>}</Stack>
				
			</Stack>
		</>
	);
}

export default FavoriteCard;

