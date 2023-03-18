import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { businessesState } from "../recoil/atoms";
import api from "../api/axios.js";

//STYLING
import { SearchIcon } from "@chakra-ui/icons";
import {FormControl, FormLabel, Input, IconButton, HStack, Box, VStack, Center} from "@chakra-ui/react";

function SearchForm() {
	const [businesses, setBusinesses] = useRecoilState(businessesState);
	const [terms, setTerms] = useState("");

	const handleChange = (e) =>
		setTerms({ ...terms, [e.target.name]: e.target.value });

	const getBusinesses = async (e) => {
		e.preventDefault();
		try {
			const response = await api.get("businesses", {
				params: {
					term: terms.term,
					radius: terms.radius,
					location: terms.location,
				},
			});
			setBusinesses(response.data.businesses);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getBusinesses();
	}, []);

	return (
		<>
			<Center margin="20px">
				<form onSubmit={getBusinesses}>
					<FormControl>
						<HStack>
							<Box>
								<VStack align="left" spacing={0}>
									<FormLabel>Category</FormLabel>
									<Input
										placeholder="Tacos, Bars, Spa..."
										type="text"
										name="term"
										value={terms.term}
										onChange={handleChange}
									/>
								</VStack>
							</Box>
							<Box>
								<VStack align="left" spacing={0}>
									<FormLabel>Radius</FormLabel>
									<Input
										placeholder="1-9000"
										type="number"
										name="radius"
										value={terms.radius}
										onChange={handleChange}
									/>
								</VStack>
							</Box>
							<Box>
								<VStack align="left" spacing={0}>
									<FormLabel>Location</FormLabel>
									<Input
										placeholder="Chicago"
										type="text"
										name="location"
										value={terms.location}
										onChange={handleChange}
									/>
								</VStack>
							</Box>
							<VStack>
								
							<IconButton marginTop='30px' icon={<SearchIcon />} type='submit'>Search</IconButton>
							</VStack>
						</HStack>
					</FormControl>
				</form>
			</Center>
		</>
	);
}

export default SearchForm;
