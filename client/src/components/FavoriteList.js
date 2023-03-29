import { useEffect } from "react";
import api from "../api/axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { favoritesState, currentUserState } from "../recoil/atoms";
import FavoriteCard from "./FavoriteCard";
import { Stack } from "@chakra-ui/react";

function FavoriteList({ filteredList, random }) {
	const [favorites, setFavorites] = useRecoilState(favoritesState);
	const currentUser = useRecoilValue(currentUserState);

	useEffect(() => {
		getFavorites();
	}, []);

	const getFavorites = async () => {
		try {
			const response = await api.get("favorites", {
				headers: { Authorization: `Bearer ${currentUser.access_token}` },
				params: { id: currentUser.user },
			});
			setFavorites(
				response.data.sort((a, b) =>
					a.id > b.id ? 1 : b.id > a.id ? -1 : 0
				)
			);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteFavorite = async (id) => {
		try {
			await api.delete(`favorites/${id}`, {
				headers: { Authorization: `Bearer ${currentUser.access_token}` },
			});
			setFavorites((favorites) =>
				favorites.filter((favorite) => {
					return favorite.id !== id;
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	const renderedFavorites = filteredList.map((favorite) => (
		<FavoriteCard
			key={favorite.id}
			favorite={favorite}
			deleteFavorite={deleteFavorite}
		/>
	));
	return (
		<Stack w={{ sm: "70%", md: "100%", lg: "800px" }}>
			{random ? (
				<FavoriteCard
					key={random.id}
					favorite={random}
					deleteFavorite={deleteFavorite}
				/>
			) : (
				renderedFavorites
			)}
		</Stack>
	);
}

export default FavoriteList;
