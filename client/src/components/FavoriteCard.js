import { useState } from "react";
import RatingForm from "./RatingForm";
import RatingShow from "./RatingShow";
import { BsSuitHeartFill } from "react-icons/bs";

//STYLING
import {
	Button,
	Image,
	Text,
	HStack,
	Flex,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";

function FavoriteCard({ favorite, deleteFavorite }) {
	const { id, name, image_url, location_city, location_state, rating, price, comment } = favorite;
	const [showEditForm, setShowEditForm] = useState(false);
	const handleShowEditFrom = () => setShowEditForm(!showEditForm);
	const handleDelete = () => deleteFavorite(id);

	return (
		<Stack
			height={{ sm: "70%", md: "21rem" }}
			direction={{ base: "column", md: "row", lg: "row" }}
			bg={useColorModeValue("white", "gray.900")}
			boxShadow={"2xl"}
			spacing={0}
		>
			<Flex flex={1}>
				<Image alt={id} objectFit="cover" boxSize="100%" src={image_url} />
			</Flex>
			<Stack flex={1} flexDirection="column" alignItems="left" px={5}>
				<Text pt={2} fontSize={{ base: "18px", md: "25px", lg: "30px" }}>
					{name}
				</Text>
				<HStack>
					<Text
						fontSize={{ base: "12px", md: "15px", lg: "20px" }}
						color={"gray.500"}
					>
						{location_city}, {location_state}
					</Text>
					<Text color={"gray.400"}> · {price} </Text>
				</HStack>

				{rating && showEditForm === false ? (
					<>
						<RatingShow rating={rating} iconType={BsSuitHeartFill} />
						<Text fontWeight={"bold"}> review: </Text>

						<Text> {comment} </Text>
						<Stack>
							<Button
								size="md"
								alignSelf="baseline"
								borderRadius="30px"
								marginBottom={2}
								color="grey"
								variant={"link"}
								onClick={handleShowEditFrom}
							>
								edit rating
							</Button>
						</Stack>
					</>
				) : (
					<>
						{showEditForm ? null : (
							<Button
								color="tomato"
								variant={"outline"}
								colorScheme="tomato"
								borderRadius="30px"
								size="md"
								onClick={handleShowEditFrom}
							>
								add rating
							</Button>
						)}
					</>
				)}

				{showEditForm ? (
					<RatingForm id={id} currentComment={comment} />
				) : null}
				{showEditForm ? null : (
					<Button
						bg="tomato"
						color="white"
						borderRadius="30px"
						size="md"
						onClick={handleDelete}
					>
						delete
					</Button>
				)}
			</Stack>
		</Stack>
	);
}

export default FavoriteCard;
