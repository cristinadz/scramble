import api from "../api/posts.js";
import { useEffect, useState } from "react";

function BusinessDetail({ togglePopUp, business }) {
	
	// const getBusiness = async () => {
	// 	try {
	// 		const response = await api.get(`businesses/${id}`, {
	// 			params: { id: id },
	// 		});
	// 		console.log(response.data.name)
	// 		setBusiness(response.data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	// useEffect(() => {
	// 	getBusiness();
	// }, []);

	const handlePopUp = () => togglePopUp();

	return (
		<div onClick={handlePopUp}>
			
			<h1>{business.name}</h1>
			<h2>{business.location.display_address[0]}</h2>
			
		</div>
	);
}

export default BusinessDetail;
