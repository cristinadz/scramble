import { useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atoms";
import api from "../api/posts";

//STYLING
import { Icon, HStack, Textarea, Button } from "@chakra-ui/react";
import { BsSuitHeartFill } from "react-icons/bs";

function FavoriteRating({ id , currentComment }) {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState();
	const [hover, setHover] = useState(0);
	const currentUser = useRecoilValue(currentUserState);

	const array = [...Array(5).keys()].map((i) => i + 1);

	const renderedRatings = array.map((i) => (
		<Icon
        key={i}
			as={BsSuitHeartFill}
			onClick={() => setRating(i)}
			color={(rating || hover) >= i ? "tomato" : "grey"}
			onMouseEnter={() => setHover(i)}
			onMouseLeave={() => setHover(rating)}
		/>
	));
	const handleSubmit = async () => {
		try {
			const response = await api.patch(
				`favorites/${id}`,
				{
					rating: rating,
					comment: comment,
				},
				{
					headers: { Authorization: `Bearer ${currentUser.access_token}` },
					params: { id: currentUser.user },
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<HStack>{renderedRatings} </HStack>
				<Textarea
					value={ currentComment }
					placeholder="Notes on your experience here..."
					name="comment"
					rows="3"
					cols="50"
					onChange={(e) => setComment(e.target.value)}
				></Textarea>
                <Button borderRadius='30px' color='white' bg='tomato' size='sm'  _hover={{ bg:'RGBA(0, 0, 0, 0.15)', color: 'tomato' }} type="submit"> submit</Button>
			</form>
		</div>
	);
}

export default FavoriteRating;
