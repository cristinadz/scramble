import { HStack, Icon } from "@chakra-ui/react";
import React from "react";


function BusinessRating({ rating, iconType }) {
	const starArray = [...Array(5).keys()].map((i) => i + 1);

	const renderedRatings = starArray.map((i) => (
		<Icon as={iconType} boxSize={4} key={i} color={rating >= i ? "tomato" : "grey"} />
	));

	return (
		<div>
			<HStack>{renderedRatings}</HStack>
		</div>
	);
}

export default BusinessRating;
