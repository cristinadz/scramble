import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentUserState } from "../recoil/atoms";
import api from "../api/posts";
import axios from "axios";

// STYLING
import {
	FormControl,
	FormLabel,
	Input,
	Button,
	Alert,
	AlertIcon,
	AlertTitle,
	Heading,
} from "@chakra-ui/react";

function SignUpForm() {
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

	const handleImageSubmit = async (e) => {
	
		const formData = new FormData();
		formData.append("file", imageSrc);
		formData.append("upload_preset", "ppjkc2zh");

		console.log(imageSrc);
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
		<div>
			<Heading> Sign Up </Heading>
			<form onSubmit={handleImageSubmit}>
				<FormControl isRequired>
					<FormLabel>Email</FormLabel>
					<Input
						type="text"
						name="email"
						value={signUpForm.email}
						onChange={handleFormChange}
					/>
					<FormLabel>Password</FormLabel>
					<Input
						type="password"
						name="password"
						value={signUpForm.password}
						onChange={handleFormChange}
					/>
					<FormLabel>Confirm Password</FormLabel>
					<Input
						type="password"
						name="confirmPassword"
						value={signUpForm.confirmPassword}
						onChange={handleFormChange}
					/>
					<FormLabel>Username</FormLabel>
					<Input
						type="text"
						name="username"
						value={signUpForm.username}
						onChange={handleFormChange}
					/>
				</FormControl>
				<FormLabel>Upload Profile Picture</FormLabel>
				<Input
					type="file"
					name="avatar"
					value={signUpForm.avatar}
					onChange={handleImageChange}
				/>
				{imageSrc ? (
					<div>
						<img src={imageSrc} style={{ width: "250px" }} />
						<Button
							type="submit"
							onClick={() => {
								handleImageSubmit(imageSrc);
							}}
						>
							Sign Up
						</Button>
					</div>
				) : (
					<Button type="submit" onClick={handleSubmit}>
						Sign Up
					</Button>
				)}
			</form>
			{errorMessage ? (
				<Alert status="error" variant="subtle">
					<AlertIcon />
					<AlertTitle> {errorMessage}</AlertTitle>
				</Alert>
			) : null}
		</div>
	);
}

export default SignUpForm;
