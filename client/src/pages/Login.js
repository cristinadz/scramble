import  { useEffect, useState, useRef } from "react";

import { useRecoilState } from "recoil";
import { currentUserState, currentAuthState } from "../recoil/atoms";
import api from "../api/axios";
import { useNavigate, Link as ReactLink } from "react-router-dom";


// STYLING
import {
	FormControl,
	FormLabel,
	Input,
	Button,
  Link,
	Alert,
	AlertIcon,
	AlertTitle,
	Container,
	Text,
} from "@chakra-ui/react";

function Login() {
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
		<Container p={7}>
			<Text as={"b"} fontSize="4xl">
				Log in
			</Text>
			<form onSubmit={handleSubmit}>
				<FormControl>
					<FormLabel mt={5}>Email</FormLabel>
					<Input
						isRequired
						type="text"
						name="username"
						value={loginForm.username}
						onChange={handleChange}
					/>
					<FormLabel mt={5}>Password</FormLabel>
					<Input
						isRequired
						type="password"
						name="password"
						value={loginForm.password}
						onChange={handleChange}
					/>
					<Button p={5} mt={5} borderRadius="30px" type="submit">
						Log in
					</Button>
				</FormControl>
				<Text></Text>
			</form>
			{errorMessage ? (
				<Alert status="error" color="red.600" bg={"white"}>
					<AlertIcon />
					<AlertTitle> {errorMessage}</AlertTitle>
				</Alert>
			) : null}
      <Text mt={5}> Don't have an account? {' '}
      <Link as={ReactLink} to="/signup" color='tomato'>Sign Up </Link> </Text>
		</Container>
	);
}

export default Login;
