import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { favoritesState } from "../recoil/atoms";
import FavoriteList from "../components/FavoriteList";
import FavoriteFilter from "../components/FavoriteFilter.js";
import {
	Button,
	Stack,
	Container,
	Box,
	Flex,
	Center,
	Square,
} from "@chakra-ui/react";

function Favorites() {
	const favorites = useRecoilValue(favoritesState);
	const [priceFilter, setPriceFilter] = useState();
	const [random, setRandom] = useState(null);

	const getFilteredList = () => {
		if (!priceFilter) {
			return favorites;
		}
		return favorites.filter((fav) => fav.price === priceFilter);
	};

	const filteredList = useMemo(getFilteredList, [priceFilter, favorites]);

	const handleFilter = (price) => {
		setPriceFilter(price);
	};

	const handleRandomClick = () => {
		const randNum = Math.floor(Math.random() * favorites.length);
		setRandom(favorites[randNum]);
	};
	return (
		<Container maxW={"7xl"}>
			<Stack
				spacing={{ base: 8, md: 10 }}
				py={{ base: 20, md: 28 }}
				direction={{ base: "column", md: "row" }}
			>
				<Stack
					h="100%"
					flex={1}
					spacing={{ base: 5, md: 10 }}
					bg="#EDF2F6"
					borderRadius="30px"
					p={8}
				>
					<FavoriteFilter
						handleFilter={handleFilter}
						priceFilter={priceFilter}
					/>
					<Button
						bg="#B3C0A4"
						color="black"
						fontWeight={"normal"}
						fontSize="lg"
						borderRadius="30px"
						onClick={handleRandomClick}
					>
						pick for me!
					</Button>
					{random ? (
						<Button onClick={() => setRandom(null)}>Back</Button>
					) : null}
				</Stack>
				<Flex
					flex={1}
					justify={"center"}
					align={"center"}
					position={"relative"}
					w={"full"}
				>
					<FavoriteList filteredList={filteredList} random={random} />
				</Flex>
			</Stack>
		</Container>
	);
}

export default Favorites;
{
	/* <SimpleGrid columns={[1, 1, 2]} >
<Container w={{ sm: "60%", md: "50%", lg: "0%" }} pt={9} >
	<Stack flexDirection="column" bg="grey" p={9} borderRadius='30px' spacing={5}>
		<FavoriteFilter
			handleFilter={handleFilter}
			priceFilter={priceFilter}
		/>

		<Button onClick={handleRandomClick}>pick for me!</Button>
		{random ? (
			<Button onClick={() => setRandom(null)}>Back</Button>
		) : null}
	</Stack>
</Container>
<Center pt={9} pr={9}>
	<FavoriteList filteredList={filteredList} random={random} />
</Center>
</SimpleGrid> */
}
