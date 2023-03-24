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
	let navigate = useNavigate();
	const userRef = useRef();
	const [signUpForm, setSignUpForm] = useState("");
	const [imageSrc, setImageSrc] = useState("");
	const [avatarImage, setAvatarImage] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

	const handleFormChange = (e) =>
		setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
	const handleImageChange = (e) => {
		const reader = new FileReader();
		reader.onload = function (onLoadEvent) {
			setImageSrc(onLoadEvent.target.result);
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const handleImageSubmit = async () => {
		const formData = new FormData();
		formData.append("file", imageSrc);
		formData.append("upload_preset", "ppjkc2zh");
		try {
			const response = await axios.post(
				"https://api.cloudinary.com/v1_1/chenkhov/image/upload",
				formData
			);
			setAvatarImage(response.data.public_id);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (avatarImage) {
			handleSubmit();
		}
	}, [avatarImage]);

	const handleSubmit = () => {
		if (signUpForm.password != signUpForm.confirmPassword) {
			alert("passwords don't match");
		} else {
			try {
				const response = api.post("users", {
					email: signUpForm.email,
					password: signUpForm.password,
					username: signUpForm.username,
					avatar: avatarImage,
				});
				setCurrentUser(response.data);
				navigate("/profile", { replace: true });
			} catch (err) {
				if (!err?.response) {
					setErrorMessage("No Server Response");
				} else if (err.response?.status === 400) {
					setErrorMessage("Missing Username or Password");
				} else if (err.response?.status === 401) {
					setErrorMessage("Unauthorized");
				} else {
					setErrorMessage("Login Failed");
				}
			}
		}
	};

	return (
		<Container p={7}>
			<Text as={"b"} fontSize="4xl">
				Sign Up
			</Text>{" "}
			<form onSubmit={handleImageSubmit}>
				<FormControl isRequired>
					<FormLabel mt={5}>Email</FormLabel>
					<Input
						mb={5}
						type="text"
						name="email"
						value={signUpForm.email}
						onChange={handleFormChange}
					/>
					<FormLabel mt={5}>Password</FormLabel>
					<Input
						mb={5}
						type="password"
						name="password"
						value={signUpForm.password}
						onChange={handleFormChange}
					/>
					<FormLabel mt={5}>Confirm Password</FormLabel>
					<Input
						mb={5}
						type="password"
						name="confirmPassword"
						value={signUpForm.confirmPassword}
						onChange={handleFormChange}
					/>
					<FormLabel mt={5}>Username</FormLabel>
					<Input
						type="text"
						name="username"
						value={signUpForm.username}
						onChange={handleFormChange}
					/>
				</FormControl>
				<FormLabel mt={5}>Profile Picture (optional)</FormLabel>
				<Input
					variant="unstyled"
					type="file"
					name="avatar"
					accept="image/png, image/jpeg"
					value={signUpForm.avatar}
					onChange={handleImageChange}
				/>
				{imageSrc ? (
					<div>
						<img src={imageSrc} style={{ width: "250px" }} />
						<Button p={5}
							borderRadius="30px"
							type="submit"
							onClick={() => {
								handleImageSubmit(imageSrc);
							}}
							mt={5}
						>
							Sign Up
						</Button>
					</div>
				) : (
					<Button p={5}
						mt={5}
						type="submit"
						borderRadius="30px"
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
				)}
			</form>
			{errorMessage ? (
				<Alert status="error" color="red.600" bg={"white"}>
					<AlertIcon />
					<AlertTitle> {errorMessage}</AlertTitle>
				</Alert>
			) : null}
			<Text mt={5}>
				{" "}
				Already have an account?{" "}
				<Link as={ReactLink} to="/signup" color="tomato">
					Log in{" "}
				</Link>{" "}
			</Text>
		</Container>
	);
}

export default SignUp;
