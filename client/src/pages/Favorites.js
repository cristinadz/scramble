import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { favoritesState } from "../recoil/atoms";
import FavoriteList from "../components/FavoriteList";
import FavoriteFilter from "../components/FavoriteFilter.js";
import { Button, Stack, Text, Container, Flex } from "@chakra-ui/react";

function Favorites() {
	const favorites = useRecoilValue(favoritesState);
	const [filter, setFilter] = useState()
	

	const [random, setRandom] = useState(null);

	const getFilteredList = () => {
		if (!filter) {
			return favorites;
		}
		return favorites.filter((fav) => fav.collection === filter || fav.price === filter)
	};

	const filteredList = useMemo(getFilteredList, [filter, favorites]);

	const handleFilter = (chosenFilter) => {
		setFilter(chosenFilter);
	};

	const handleRandomClick = () => {
		const randNum = Math.floor(Math.random() * favorites.length);
		setRandom(favorites[randNum]);
	};
	return (
		<Container maxW={"7xl"}>
			<Text fontWeight={'bold'} py={4} align={'center'} fontSize={'3xl'}> Favorite Businesses</Text>

			<Stack
				spacing={{ base: 8, md: 10 }}
				py={{ base: 5, md: 10 }}
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
						filter={filter}
						
					/>
					<Button
						bg="#B3C0A4"
						color="black"
						fontWeight={"normal"}
						fontSize="lg"
						borderRadius="30px"
						onClick={handleRandomClick}
					>
						Random
					</Button>
					{random ? (
						<Button 
						bg={"white"}
						fontWeight={"normal"}
						fontSize="lg"
						borderRadius="30px"
						onClick={() => setRandom(null)}>Back</Button>
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

