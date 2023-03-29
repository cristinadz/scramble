import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentUserState } from "../recoil/atoms";
import api from "../api/axios";
import axios from "axios";

// STYLING
import {
	Container,
	FormControl,
	FormLabel,
	Input,
	Link,
	Button,
	Alert,
	AlertIcon,
	AlertTitle,
	Text,
} from "@chakra-ui/react";

function SignUp() {
	const [signUpForm, setSignUpForm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleFormChange = (e) =>
		setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
	

	const handleSubmit = async (e) => {
		e.preventDefault()
		// if (signUpForm.password != signUpForm.confirmPassword) {
		// 	alert("passwords don't match");
		// } else {
			try {
				const response = await api.post("users", {
					email: signUpForm.email,
					password: signUpForm.password,
					username: signUpForm.username,
				});
				console.log(response)
			} catch (err) {
				if (!err?.response) {
					console.log(err.error);
				} else if (err.response?.status === 400) {
					setErrorMessage("Missing Email or Password");
				} else if (err.response?.status === 401) {
					setErrorMessage("Unauthorized");
				} else {
					setErrorMessage("Incorrect Credentials");
				}
				// errRef.current.focus()
			}
		// }
	};

	return (
		<Container p={7}>
			<Text as={"b"} fontSize="4xl">
				Sign Up
			</Text>
			<form onSubmit={handleSubmit}>
				<FormControl>
					<FormLabel mt={5}>Email</FormLabel>
					<Input
						isRequired
						mb={5}
						type="text"
						name="email"
						value={signUpForm.email}
						onChange={handleFormChange}
					/>
					<FormLabel mt={5}>Username</FormLabel>
					<Input
						isRequired
						type="text"
						name="username"
						value={signUpForm.username}
						onChange={handleFormChange}
					/>
					<FormLabel mt={5}>Password</FormLabel>
					<Input
						isRequired
						mb={5}
						type="password"
						name="password"
						value={signUpForm.password}
						onChange={handleFormChange}
					/>
					<FormLabel mt={5}>Confirm Password</FormLabel>
					<Input
						isRequired
						mb={5}
						type="password"
						name="confirmPassword"
						value={signUpForm.confirmPassword}
						onChange={handleFormChange}
					/>

					<Button
						p={5}
						mt={5}
						type="submit"
						borderRadius="30px"
					>
						Sign Up
					</Button>
				</FormControl>
			</form>

			{errorMessage ? (
				<Alert status="error" color="red.600" bg={"white"}>
					<AlertIcon />
					<AlertTitle> {errorMessage}</AlertTitle>
				</Alert>
			) : null}
			<Text mt={5}>
				Already have an account?{" "}
				<Link as={ReactLink} to="/signup" color="tomato">
					Log in
				</Link>
			</Text>
		</Container>
	);
}

export default SignUp;

// <form onSubmit={handleImageSubmit}>
// 				<FormControl >
// 					<FormLabel mt={5}>Email</FormLabel>
// 					<Input isRequired
// 						mb={5}
// 						type="text"
// 						name="email"
// 						value={signUpForm.email}
// 						onChange={handleFormChange}
// 					/>
// 					<FormLabel mt={5}>Password</FormLabel>
// 					<Input isRequired
// 						mb={5}
// 						type="password"
// 						name="password"
// 						value={signUpForm.password}
// 						onChange={handleFormChange}
// 					/>
// 					<FormLabel mt={5}>Confirm Password</FormLabel>
// 					<Input isRequired
// 						mb={5}
// 						type="password"
// 						name="confirmPassword"
// 						value={signUpForm.confirmPassword}
// 						onChange={handleFormChange}
// 					/>
// 					<FormLabel mt={5}>Username</FormLabel>
// 					<Input isRequired
// 						type="text"
// 						name="username"
// 						value={signUpForm.username}
// 						onChange={handleFormChange}
// 					/>

// 				<FormLabel mt={5}>Profile Picture (optional)</FormLabel>
// 				<Input
// 					variant="unstyled"
// 					type="file"
// 					name="avatar"
// 					accept="image/png, image/jpeg"
// 					value={signUpForm.avatar}
// 					onChange={handleImageChange}
// 				/>
// 				{imageSrc ? (
// 					<div>
// 						<img src={imageSrc} style={{ width: "250px" }} />
// 						<Button p={5}
// 							borderRadius="30px"
// 							type="submit"
// 							onClick={() => {
// 								handleImageSubmit(imageSrc);
// 							}}
// 							mt={5}
// 						>
// 							Sign Up2
// 						</Button>
// 					</div>
// 				) : (
// 					<Button p={5}
// 						mt={5}
// 						type="submit"
// 						borderRadius="30px"
// 						onClick={handleSubmit}
// 					>
// 						Sign Up
// 					</Button>
// 				)}
// 				</FormControl>
// 			</form>


	// const handleImageSubmit = async () => {
	// 	const formData = new FormData();
	// 	formData.append("file", imageSrc);
	// 	formData.append("upload_preset", "ppjkc2zh");
	// 	try {
	// 		const response = await axios.post(
	// 			"https://api.cloudinary.com/v1_1/chenkhov/image/upload",
	// 			formData
	// 		);
	// 		setAvatarImage(response.data.public_id);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	//const handleImageChange = (e) => {
		// 	const reader = new FileReader();
		// 	reader.onload = function (onLoadEvent) {
		// 		setImageSrc(onLoadEvent.target.result);
		// 	};
		// 	reader.readAsDataURL(e.target.files[0]);
		// };