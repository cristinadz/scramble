import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentUserState, currentAuthState } from "../recoil/atoms";
import api from "../api/posts";

// STYLING
import {
	Heading,
	FormControl,
	FormLabel,
	Input,
	Button,
	Alert,
	AlertIcon,
	AlertTitle,
} from "@chakra-ui/react";

function LoginForm() {
	let navigate = useNavigate();
	const userRef = useRef();
	const [loginForm, setLoginForm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
	const [currentAuth, setCurrentAuth] = useRecoilState(currentAuthState);

	// useEffect(() => {
	//     userRef.current.focus()
	// }, [])

	// useEffect(() => {
	//     setErrorMessage('')
	// }, [currentUser, pass])

	const handleChange = (e) =>
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
	console.log(loginForm);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post(
				"login",
				{
					username: loginForm.username,
					password: loginForm.password,
				},
				{
					headers: {
						"content-type": "multipart/form-data",
					},
				}
			);
			setCurrentUser(response.data);
			localStorage.setItem("user", JSON.stringify(response.data));
			navigate("/businesses", { replace: true });
		} catch (err) {
			if (!err?.response) {
				setErrorMessage("No Server Response");
			} else if (err.response?.status === 400) {
				setErrorMessage("Missing Email or Password");
			} else if (err.response?.status === 401) {
				setErrorMessage("Unauthorized");
			} else {
				setErrorMessage("Incorrect Credentials");
			}
			// errRef.current.focus()
		}
	};

	return (
		<div>
			<Heading> Sign In </Heading>
			<form onSubmit={handleSubmit}>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input
						// variant="flushed"
						type="text"
						name="username"
						value={loginForm.username}
						onChange={handleChange}
					/>
					<FormLabel>Password</FormLabel>
					<Input
						type="text"
						name="password"
						value={loginForm.password}
						onChange={handleChange}
					/>
					<Button type="submit">Sign In</Button>
				</FormControl>
			</form>
			{ errorMessage ? 
			<Alert status="error" variant="subtle">
				<AlertIcon />
				<AlertTitle> {errorMessage}</AlertTitle>
			</Alert> : null }
		</div>
	);
}

export default LoginForm;
