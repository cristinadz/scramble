import { Select, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { favoritesState } from "../recoil/atoms";

function FavoriteFilter({ handleFilter, priceFilter }) {
	const [favorites, setFavorites] = useRecoilState(favoritesState);

	const compare = (a, b, ascendingOrder) => {
		if (a < b) {
			return ascendingOrder ? -1 : 1;
		}
		if (a > b) {
			return ascendingOrder ? 1 : -1;
		}
		return 0;
	};
	const handleSort = (value) => {
		if (value == "none") {
			setFavorites([...favorites]);
		} else {
			let toType, toAscending;
			switch (value) {
				case "ascending":
					toType = true;
					toAscending = true;
					break;
				case "descending":
					toType = true;
					toAscending = false;
					break;
				case "high":
					toType = false;
					toAscending = true;
					break;
				case "low":
					toType = false;
					toAscending = false;
					break;
			}
			let current = [...favorites];
			current.sort((a, b) =>
				toType
					? compare(a.name, b.name, toAscending)
					: compare(a.price, b.price, toAscending)
			);
			setFavorites([...current]);
		}
	};

	const handleChange = (e) => {
		handleFilter(e.target.value);
	};

	return (
		<>
			<label>
				<Text pb={2} fontSize="lg">
					sort by: <br />
				</Text>
				<Select bg="white" onChange={(e) => handleSort(e.target.value)}>
					<option value="none">default</option>
					<option value="ascending">Alphabetically, A-Z</option>
					<option value="descending">Alphabetically, Z-A</option>
				</Select>
			</label>
			<label>
				<Text pb={2} fontSize="lg">
					filter by price: <br />
				</Text>

				<Select bg="white" value={priceFilter} onChange={handleChange}>
				<option value={""}>all</option>
					<option value="$">$</option>
					<option value="$$">$$</option>
					<option value="$$$">$$$</option>
					
				</Select>
			</label>
		</>
	);
}

export default FavoriteFilter;
