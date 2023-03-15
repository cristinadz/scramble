import { HStack } from "@chakra-ui/react";
import React from "react";
import { ImStarFull } from "react-icons/im";

function BusinessRating({ rating }) {
	const starArray = [...Array(5).keys()].map((i) => i + 1);

	const renderedRatings = starArray.map((i) => (
		<ImStarFull boxSize={9} key={i} color={rating >= i ? "tomato" : "grey"} />
	));

	return (
		<div>
			<HStack>{renderedRatings}</HStack>
		</div>
	);
}

export default BusinessRating;
